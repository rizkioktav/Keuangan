<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\ProfileCompany;
use App\Models\MasterRole;
use App\Models\ProfileUser;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class AuthController extends Controller
{
    public function signup(Request $request){
        
        $validator = Validator::make($request->all(), [
            'no_hp'     => 'required|string|max:15',
            'email'     => 'required|email|unique:users',
            'password'  => 'required|min:6|confirmed',
            'role'      => 'nullable|in:user,admin',
        ]);
    
        $role = $request->input('role', 'user');
        
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
    
        // Create user
        $user = User::create([
            'no_hp'     => $request->no_hp,
            'email'     => $request->email,
            'password'  => bcrypt($request->password),
            'role'      => $role,
        ]);
    
        $user->email_verified_at = now();    
        $user->setRememberToken(Str::random(60));
        $user->save();
    
        if($user) {
            // Create profile for user
            $profile = ProfileUser::create([
                'id_user'   => $user->id,
                'no_hp'     => $user->no_hp,
                'email'     => $user->email,
            ]);
    
            return response()->json([
                'success' => true,
                'user'    => $user,
                'profile' => $profile,
            ], 201);
        }
    
        return response()->json([
            'success' => false,
        ], 409);
    
    }
        

    // public function signup(Request $request){

    //     //set validation
    //     $validator = Validator::make($request->all(), [
    //         'email'     => 'required|email|unique:users',
    //         'password'  => 'required|min:6|confirmed',
    //         'role'      => 'required|in:karyawan,owner' // Menambahkan validasi untuk peran
    //     ]);
    
    //     //if validation fails
    //     if ($validator->fails()) {
    //         return response()->json($validator->errors(), 422);
    //     }
    
    //     //create user
    //     $user = User::create([
    //         'email'     => $request->email,
    //         'password'  => bcrypt($request->password)
    //     ]);
    
    //     // Set email_verified_at
    //     $user->email_verified_at = now();
    
    //     // Generate remember token
    //     $user->setRememberToken(Str::random(60));
    
    //     // Save the user
    //     $user->save();
    
    //     // Save Role to role_master table
    //     $user = MasterRole::create([
    //         'role_detail' => $request->role
    //     ]);
    
        // //return response JSON user is created
        // if($user) {
        //     return response()->json([
        //         'success' => true,
        //         'user'    => $user,  
        //     ], 201);
        // }
    
        // //return JSON process insert failed 
        // return response()->json([
        //     'success' => false,
        // ], 409);
    // }
    
    
    // public function signup(Request $request){

    //     $validator = Validator::make($request->all(), [
    //         'email'         => 'required|email|unique:users',
    //         'password'      => 'required|min:6|confirmed',
    //         'role'          => 'required|in:karyawan,owner',
    //         'company_name'  => 'required|string|max:255', // Tambahkan validasi untuk nama perusahaan
    //     ]);
    
    //     if ($validator->fails()) {
    //         return response()->json($validator->errors(), 422);
    //     }
    
    //     $user = User::create([
    //         'email'     => $request->email,
    //         'password'  => bcrypt($request->password)
    //     ]);
    
    //     $user->email_verified_at = now();
    
    //     $user->setRememberToken(Str::random(60));
    
    //     $user->save();
    
    //     $role = MasterRole::create([
    //         'role_detail' => $request->role
    //     ]);
    
    //     $company = ProfileCompany::create([
    //         'company_name' => $request->company_name,
    //     ]);

    //     $company_role = DB::table('company_role')->insert([
    //         'company_id' => $company->id,
    //         'email' => $user->email,
    //         'role_id' => $role->id,
    //         'created_at' => now(),
    //         'updated_at' => now()
    //     ]);

    //     if($user && $role && $company) {
    //         return response()->json([
    //             'success' => true,
    //             'user'    => $user,
    //             'role'  => $role,
    //             'company name' => $company,
    //             'company role' => $company_role  
    //         ], 201);
    //     }
    
    //     return response()->json([
    //         'success' => false,
    //     ], 409);
    // }
    
    // public function login(Request $request){

    //     $validator = Validator::make($request->all(), [
    //         'email'     => 'required',
    //         'password'  => 'required'
    //     ]);

    //     if ($validator->fails()) {
    //         return response()->json($validator->errors(), 422);
    //     }

    //     $credentials = $request->only('email', 'password');

    //     if(!$token = auth()->guard('api')->attempt($credentials)) {
    //         return response()->json([
    //             'success' => false,
    //             'message' => 'Email atau Password Anda salah'
    //         ], 401);
    //     }

    //     return response()->json([
    //         'success' => true,
    //         'user'    => auth()->guard('api')->user(),    
    //         'token'   => $token   
    //     ], 200);
    // }

    
    public function login(Request $request){
        $validator = Validator::make($request->all(), [
            'email'     => 'sometimes',
            'no_hp'     => 'sometimes',
            'password'  => 'required',
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
    
        $credentials = $request->only('password');
    
        if ($request->filled('email')) {
            $credentials['email'] = $request->email;
        } elseif ($request->filled('no_hp')) {
            $credentials['no_hp'] = $request->no_hp;
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Email atau Nomor Handphone diperlukan untuk login'
            ], 422);
        }

        if(!$token = auth()->guard('api')->attempt($credentials)) {
            return response()->json([
                'success' => false,
                'message' => 'Email, Nomor Handphone, atau Password Anda salah'
            ], 401);
        }

        return response()->json([
            'success' => true,
            'user'    => auth()->guard('api')->user(),    
            'token'   => $token   
        ], 200);
    }
    
    public function logout(Request $request){
        
        $removeToken = JWTAuth::invalidate(JWTAuth::getToken());

        if($removeToken) {
            //return response JSON
            return response()->json([
                'success' => true,
                'message' => 'Logout Berhasil!',  
            ]);
        }
    }
}
