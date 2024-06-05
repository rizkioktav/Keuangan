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
        // Dapatkan ID untuk role "business owner"
        $businessOwnerRoleId = MasterRole::where('role', 'business owner')->value('id');

        // Ambil semua perusahaan
        $companies = ProfileCompany::all();

        // Temukan semua entri di RoleCompany dengan role_id untuk "business owner"
        $owners = RoleCompany::where('role_id', $businessOwnerRoleId)->get()->keyBy('company_id');

        // Tentukan owner untuk setiap perusahaan berdasarkan company_id
        $companies->each(function ($company) use ($owners) {
            if ($owners->has($company->id)) {
                $company->owner = $owners[$company->id]->user; // Menggunakan relasi `user` untuk mendapatkan data user
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
            'company_name'    => 'required|string|max:255',
            'company_address' => 'nullable|string',
            'company_phone'   => 'nullable|string|max:20',
            'company_email'   => 'nullable|email|unique:master_company,company_email'
        ]);

        // Buat perusahaan baru
        $company = ProfileCompany::create([
            'company_name'    => $request->company_name,
            'company_address' => $request->company_address,
            'company_phone'   => $request->company_phone,
            'company_email'   => $request->company_email
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
            'company_id' => $company->id,
            'email'      => $user->email,
            'role_id'    => $ownerRole->id
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
        
        $companies = RoleCompany::with(['company', 'role'])
            ->where('email', $user->email)
            ->get()
            ->map(function($roleCompany) {
                return [
                    'company' => $roleCompany->company,
                    'role' => $roleCompany->role
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
            'company_id' => 'required|exists:master_company,id',
            'role_id'    => 'required|exists:master_role,id',
        ]);

        // Ambil user yang sedang login
        $user = Auth::user();
        $company = ProfileCompany::find($request->company_id);
        $role = MasterRole::find($request->role_id);

        // Periksa validitas company dan role
        if (!$company || !$role) {
            return response()->json([
                'success' => false,
                'message' => 'Company dan role tidak valid',
            ], 404);
        }

        // Periksa apakah user sudah memiliki role di company ini
        $existingRole = RoleCompany::where('company_id', $request->company_id)
                                    ->where('email', $user->email)
                                    ->first();

        if ($existingRole) {
            return response()->json([
                'success' => false,
                'message' => 'Anda sudah bergabung dengan company ini',
            ], 400);
        }

        // Jika peran yang diminta adalah 'business owner', periksa apakah sudah ada business owner
        if ($role->role === 'business owner') {
            $existingOwner = RoleCompany::where('company_id', $request->company_id)
                                        ->where('role_id', $role->id)
                                        ->exists();

            if ($existingOwner) {
                return response()->json([
                    'success' => false,
                    'message' => 'Perusahaan ini sudah memiliki Business Owner.',
                ], 400);
            }
        }

        // Buat role baru di company ini
        RoleCompany::create([
            'company_id' => $request->company_id,
            'email'      => $user->email,
            'role_id'    => $request->role_id,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Selamat, Anda sudah bergabung ke company ini',
        ], 200);
    }

    public function transferOwnership(Request $request)
    {
        $request->validate([
            'company_id' => 'required|exists:master_company,id',
            'target_identifier' => 'required',
            'new_role_id' => 'required|exists:master_role,id',
        ]);

        $user = Auth::user();
        $companyId = $request->company_id;
        $targetIdentifier = $request->target_identifier;  // Bisa email atau username
        $newRoleId = $request->new_role_id;

        // Pastikan user adalah business owner dari perusahaan yang dimaksud
        $currentOwnerRole = RoleCompany::where('company_id', $companyId)
                                    ->where('email', $user->email)
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
                        ->orWhere('username', $targetIdentifier)
                        ->orWhere('no_hp', $targetIdentifier)
                        ->first();

        if (!$targetUser) {
            return response()->json([
                'success' => false,
                'message' => 'User tidak ditemukan, coba input email, nomor handphone atau username yang valid.',
            ], 404);
        }

        // Pastikan user target adalah anggota company yang dituju
        $targetUserRole = RoleCompany::where('company_id', $companyId)
                                    ->where('email', $targetUser->email)
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
                'role_id' => $businessOwnerRoleId
            ]);

            // Update peran current user ke peran baru
            $currentOwnerRole->update([
                'role_id' => $newRoleId
            ]);
        });

        return response()->json([
            'success' => true,
            'message' => 'Ownership successfully transferred',
        ], 200);
    }



    public function updateCompany(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'company_name'    => 'required|string|max:255',
            'company_address' => 'nullable|string',
            'company_phone'   => 'nullable|string|max:20',
            'company_email'   => 'nullable|email|unique:master_company,company_email'
        ]);

        // Dapatkan company_id dari tabel company_role berdasarkan email pengguna yang login
        $roleCompany = RoleCompany::where('email', $user->email)->first();

        if (!$roleCompany) {
            return response()->json([
                'success' => false,
                'message' => 'Company role not found for the user'
            ], 404);
        }

        // Gunakan company_id untuk mendapatkan informasi perusahaan dari tabel master_company
        $company = ProfileCompany::find($roleCompany->company_id);

        if (!$company) {
            return response()->json([
                'success' => false,
                'message' => 'Company profile not found'
            ], 404);
        }

        $company->update([
            'company_name'    => $request->company_name,
            'company_address' => $request->company_address,
            'company_phone'   => $request->company_phone,
            'company_email'   => $request->company_email
        ]);

        return response()->json([
            'success' => true,
            'company' => $company
        ]);
    }
}
