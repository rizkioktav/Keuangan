<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\ProfileCompany;
use App\Models\RoleCompany;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class UserInfoController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    // Endpoint to get the total number of registered users
    public function getDashboardStatistics()
    {
        $totalUsers = User::count();

        $totalCompanies = ProfileCompany::count();

        $today = Carbon::today();
        $totalUsersToday = User::whereDate('created_at', $today)->count();

        $dashboardStatInfo = [
            'total_users' => $totalUsers,
            'total_companies' => $totalCompanies,
            'total_users_today' => $totalUsersToday,
        ];

        return response()->json([
            'success' => true,
            'data' => $dashboardStatInfo,
        ], 200);
    }
}
