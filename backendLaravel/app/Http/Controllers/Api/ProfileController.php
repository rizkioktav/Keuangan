<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function __construct(){
        $this->middleware('auth:api');
    }

    public function getProfile(Request $request)
    {
        $user = Auth::user();
        return response()->json([
            'success' => true,
            'profile' => $user->profile,
        ]);
    }
    public function updateProfile(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User tidak ditemukan',
            ], 404);
        }

        // Validasi data input
        $validator = Validator::make($request->all(), [
            'username'  => 'required|string|max:15',
            'name'      => 'required|string',
            'no_hp'     => 'nullable|string|max:15',
            'email'     => 'nullable|email|unique:users',
            'address'   => 'nullable|string|max:255',
            'birthdate' => 'nullable|date',
            'gender'    => 'nullable|in:male,female',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Update data profil pengguna
        $user->profile->update([
            'username'  => $request->username,
            'name'      => $request->name,
            'no_hp'     => $request->no_hp,
            'email'     => $request->email,
            'address'   => $request->address,
            'birthdate' => $request->birthdate,
            'gender'    => $request->gender,
        ]);
        
        if ($request->filled('email')) {
            $user->update(['email' => $request->email]);
        }
        if ($request->filled('no_hp')) {
            $user->update(['no_hp' => $request->no_hp]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Profile berhasil diperbarui',
            'profile' => $user->profile,
        ],201);
    }
}
