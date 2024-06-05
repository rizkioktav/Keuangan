<?php

use App\Http\Controllers\Api\CompanyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProfileController;

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:api')->group(function () {
    //company routes
    Route::get('/companies', [CompanyController::class, 'getAllCompaniesWithOwners']);
    Route::put('/update-company', [CompanyController::class, 'updateCompanies']);
    Route::get('/user/profile/companies', [CompanyController::class, 'getUserCompanies']);
    Route::post('/company/create', [CompanyController::class, 'createCompany']);
    Route::post('/company/join', [CompanyController::class, 'joinCompany']);
    Route::post('/company/transfer-ownership', [CompanyController::class, 'transferOwnership']);

    //user profile routes
    Route::get('/user/profile', [ProfileController::class, 'getProfile']);
    Route::put('/user/profile/update', [ProfileController::class, 'updateProfile']);

    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Route ini memastikan user harus login untuk mengakses profile
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
