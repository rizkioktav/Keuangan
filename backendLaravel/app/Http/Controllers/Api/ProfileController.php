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
            'nama'      => 'required|string',
            // 'no_hp'     => 'nullable|string|max:15',
            // 'email'     => 'nullable|email|unique:users',
            'alamat'   => 'nullable|string|max:255',
            'tanggal_lahir' => 'nullable|date',
            'gender'    => 'nullable|in:laki-laki,perempuan',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Update data profil pengguna
        $user->profile->update([
            'username'  => $request->username,
            'nama'      => $request->nama,
            // 'no_hp'     => $request->no_hp,
            // 'email'     => $request->email,
            'alamat'   => $request->alamat,
            'tanggal_lahir' => $request->tanggal_lahir,
            'gender'    => $request->gender,
        ]);
        
        return response()->json([
            'success' => true,
            'message' => 'Profile berhasil diperbarui',
            'profile' => $user->profile,
        ],201);
    }
}
