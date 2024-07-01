<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\ProfileCompany;
use App\Models\RoleCompany;
use App\Models\MasterRole;
use App\Models\User;

class CompanyController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function getAllCompaniesWithOwners()
    {
        $businessOwnerRoleId = MasterRole::where('role', 'business owner')->value('id');
    
        $companies = ProfileCompany::all();
    
        $owners = RoleCompany::with(['user', 'user.profile']) // Load relasi user dan user.profile
            ->where('id_role', $businessOwnerRoleId)
            ->get()
            ->keyBy('id_company');
    
        // Query to get total members per company
        $totalMembersPerCompany = RoleCompany::select('id_company', DB::raw('count(id_user) as total_members'))
            ->groupBy('id_company')
            ->get();
    
        // Map total members to company ID for easy retrieval
        $membersPerCompany = $totalMembersPerCompany->map(function ($item) {
            return [
                'id_company' => $item->id_company,
                'total_members' => $item->total_members
            ];
        })->keyBy('id_company');
    
        $companies->each(function ($company) use ($owners, $membersPerCompany) {
            if ($owners->has($company->id)) {
                $owner = $owners[$company->id];
                $company->owner = $owner->user; // Menambahkan data user sebagai owner
            }
            
            // Menambahkan total members ke setiap company
            if ($membersPerCompany->has($company->id)) {
                $company->total_members = $membersPerCompany[$company->id]['total_members'];
            } else {
                $company->total_members = 0; // Jika tidak ada total members, defaultnya menjadi 0
            }
        });
    
        return response()->json([
            'success' => true,
            'companies' => $companies
        ], 200);
    }
    public function createCompany(Request $request)
    {
        $user = Auth::user();

        // Validasi input
        $request->validate([
            'c_nama'    => 'required|string|max:255',
            'c_alamat' => 'nullable|string',
            'c_no_hp'   => 'nullable|string|max:20',
            'c_email'   => 'nullable|email|unique:master_company,c_email'
        ]);

        // Buat perusahaan baru
        $company = ProfileCompany::create([
            'c_nama'    => $request->c_nama,
            'c_alamat' => $request->c_alamat,
            'c_no_hp'   => $request->c_no_hp,
            'c_email'   => $request->c_email
        ]);

        // Dapatkan role owner dari tabel master_role
        $ownerRole = MasterRole::where('role', 'business owner')->first();

        if (!$ownerRole) {
            return response()->json([
                'success' => false,
                'message' => 'Role owner not found'
            ], 404);
        }

        // Tetapkan pengguna sebagai pemilik di tabel company_role
        RoleCompany::create([
            'id_company' => $company->id,
            'id_user'      => $user->id,
            'id_role'    => $ownerRole->id
        ]);

        return response()->json([
            'success' => true,
            'company' => $company,
            'role'    => $ownerRole,
        ], 201);
    }
    public function getUserCompanies()
    {
        $user = Auth::user();
        $companies = RoleCompany::with(['company', 'user', 'role'])
            ->where('id_user', $user->id)
            ->get()
            ->map(function($roleCompany) {
                $company = $roleCompany->company;

                $totalMembers = RoleCompany::where('id_company', $company->id)
                    ->count();

                $members = RoleCompany::where('id_company', $company->id)
                    ->with(['user.profile'])
                    ->get()
                    ->map(function($roleCompany) {
                        return $roleCompany->user;
                    });

                return [
                    'company' => [
                        'id' => $company->id,
                        'c_nama' => $company->c_nama,
                        'c_alamat' => $company->c_alamat,
                        'c_no_hp' => $company->c_no_hp,
                        'c_email' => $company->c_email,
                    ],
                    'role' => $roleCompany->role,
                    'members' => $members,
                    'total_members' => $totalMembers
                ];
            });

        return response()->json([
            'success' => true,
            'companies' => $companies
        ], 200);
    }
    // public function joinCompany(Request $request)
    // {
    //     $request->validate([
    //         'company_id' => 'required|exists:master_company,id',
    //         'role_id'    => 'required|exists:master_role,id',
    //     ]);

    //     $user = Auth::user();
    //     $company = ProfileCompany::find($request->company_id);
    //     $role = MasterRole::find($request->role_id);

    //     if (!$company || !$role) {
    //         return response()->json([
    //             'success' => false,
    //             'message' => 'Company dan role tidak valid',
    //         ], 404);
    //     }

    //     $existingRole = RoleCompany::where('company_id', $request->company_id)
    //                                 ->where('email', $user->email)
    //                                 ->first();

    //     if ($existingRole) {
    //         return response()->json([
    //             'success' => false,
    //             'message' => 'Anda sudah bergabung dengan company ini',
    //         ], 400);
    //     }

    //     // Jika peran yang diminta adalah 'business owner', periksa apa udah ada business owner
    //     if ($role->role === 'business owner') {
    //         $existingOwner = RoleCompany::where('company_id', $request->company_id)
    //                                     ->where('role_id', $role->id)
    //                                     ->exists();

    //         if ($existingOwner) {
    //             return response()->json([
    //                 'success' => false,
    //                 'message' => 'Anda tidak bisa menjadi Business Owner.',
    //             ], 400);
    //         }
    //     }

    //     RoleCompany::create([
    //         'company_id' => $request->company_id,
    //         'email'      => $user->email,
    //         'role_id'    => $request->role_id,
    //     ]);

    //     return response()->json([
    //         'success' => true,
    //         'message' => 'Selamat, Anda sudah bergabung ke company ini',
    //     ], 200);
    // }

    public function joinCompany(Request $request)
    {
        // Validasi request
        $request->validate([
            'id_company' => 'required|exists:master_company,id',
            'id_role'    => 'required|exists:master_role,id',
        ]);

        // Ambil user yang sedang login
        $user = Auth::user();
        $company = ProfileCompany::find($request->id_company);
        $role = MasterRole::find($request->id_role);

        // Periksa validitas company dan role
        if (!$company || !$role) {
            return response()->json([
                'success' => false,
                'message' => 'Company dan role tidak valid',
            ], 404);
        }

        // Periksa apakah user sudah memiliki role di company ini
        $existingRole = RoleCompany::where('id_company', $request->id_company)
                                    ->where('id_user', $user->id)
                                    ->first();

        if ($existingRole) {
            return response()->json([
                'success' => false,
                'message' => 'Anda sudah bergabung dengan company ini',
            ], 400);
        }

        // Jika peran yang diminta adalah 'business owner', periksa apakah sudah ada business owner
        if ($role->role === 'business owner') {
            $existingOwner = RoleCompany::where('id_company', $request->id_company)
                                        ->where('id_role', $role->id)
                                        ->exists();

            if ($existingOwner) {
                return response()->json([
                    'success' => false,
                    'message' => 'Perusahaan ini sudah memiliki Business Owner, anda tidak berhak mendaftar.',
                ], 400);
            }
        }

        // Buat role baru di company ini
        RoleCompany::create([
            'id_company' => $request->id_company,
            'id_user'    => $user->id,
            'id_role'    => $request->id_role,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Selamat, Anda sudah bergabung ke company ini',
        ], 200);
    }
    public function transferOwnership(Request $request)
    {
        $request->validate([
            'id_company' => 'required|exists:master_company,id',
            'target_identifier' => 'required',
            'new_id_role' => 'required|exists:master_role,id',
        ]);

        $user = Auth::user();
        $companyId = $request->id_company;
        $targetIdentifier = $request->target_identifier;  // Bisa email atau username
        $newRoleId = $request->new_id_role;

        // Pastikan user adalah business owner dari perusahaan yang dimaksud
        $currentOwnerRole = RoleCompany::where('id_company', $companyId)
                                    ->where('id_user', $user->id)
                                    ->whereHas('role', function ($query) {
                                        $query->where('role', 'business owner');
                                    })
                                    ->first();

        if (!$currentOwnerRole) {
            return response()->json([
                'success' => false,
                'message' => 'Anda bukan business owner',
            ], 403);
        }

        // Cari user target berdasarkan email, no_hp atau username
        $targetUser = User::where('email', $targetIdentifier)
                        ->orWhere('no_hp', $targetIdentifier)
                        ->first();

        if (!$targetUser) {
            return response()->json([
                'success' => false,
                'message' => 'User tidak ditemukan, coba input email, nomor handphone atau username yang valid.',
            ], 404);
        }

        // Pastikan user target adalah anggota company yang dituju
        $targetUserRole = RoleCompany::where('id_company', $companyId)
                                    ->where('id_user', $targetUser->id)
                                    ->first();

        if (!$targetUserRole) {
            return response()->json([
                'success' => false,
                'message' => 'User bukan anggota dari company ini',
            ], 404);
        }

        // Update role user target jadi business owner
        $businessOwnerRoleId = MasterRole::where('role', 'business owner')->first()->id;

        DB::transaction(function () use ($targetUserRole, $businessOwnerRoleId, $currentOwnerRole, $newRoleId) {
            $targetUserRole->update([
                'id_role' => $businessOwnerRoleId
            ]);

            // Update peran current user ke peran baru
            $currentOwnerRole->update([
                'id_role' => $newRoleId
            ]);
        });

        return response()->json([
            'success' => true,
            'message' => 'Pemberian Ownership berhasil!',
        ], 200);
    }
    public function updateCompany(Request $request)
    {
        $user = Auth::user();
    
        $request->validate([
            'c_nama'    => 'required|string|max:255',
            'c_alamat'  => 'nullable|string',
            'c_no_hp'   => 'nullable|string|max:20',
            'c_email'   => 'nullable|email|unique:master_company,c_email'
        ]);
    
        // Dapatkan roleCompany dari tabel role_company berdasarkan id_user dan role 'business owner'
        $roleCompany = RoleCompany::where('id_user', $user->id)
                                   ->whereHas('role', function($query) {
                                       $query->where('role', 'business owner');
                                   })
                                   ->first();
    
        if (!$roleCompany) {
            return response()->json([
                'success' => false,
                'message' => 'Hanya owner yang boleh mengedit profile company!'
            ], 403);
        }
    
        // Gunakan company_id untuk mendapatkan informasi perusahaan dari tabel master_company
        $company = ProfileCompany::find($roleCompany->id_company);
    
        if (!$company) {
            return response()->json([
                'success' => false,
                'message' => 'Tidak ditemukan'
            ], 404);
        }
    
        // Update informasi perusahaan
        $company->update([
            'c_nama'    => $request->c_nama,
            'c_alamat'  => $request->c_alamat,
            'c_no_hp'   => $request->c_no_hp,
            'c_email'   => $request->c_email
        ]);
    
        return response()->json([
            'success' => true,
            'company' => $company
        ]);
    }
    public function getCompanyMembers($id_company)
{
    $user = Auth::user();

    $company = ProfileCompany::find($id_company);

    if (!$company) {
        return response()->json([
            'success' => false,
            'message' => 'Company not found',
        ], 404);
    }

    $members = RoleCompany::where('id_company', $id_company)
                          ->with(['company', 'user', 'role'])
                          ->get()
                          ->map(function ($roleCompany) {
                              return [
                                'id' => $roleCompany->user->id,
                                'nama' => $roleCompany->user->profile->nama,
                                'email' => $roleCompany->user->email,
                                'no_hp' => $roleCompany->user->profile->no_hp,
                                'role' => $roleCompany->role->role,
                              ];
                          });

    return response()->json([
        'success' => true,
        'company' => $company,
        'members' => $members,
    ], 200);
}

}
