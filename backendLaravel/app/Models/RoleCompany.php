<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoleCompany extends Model
{
    use HasFactory;
    protected $table = 'company_role';
    protected $fillable = [
        'company_id',
        'email',
        'role_id'
    ];

    public function company()
    {
        return $this->belongsTo(ProfileCompany::class, 'company_id');
    }
    
    public function user()
    {
        return $this->belongsTo(User::class, 'email', 'email');
    }

    public function role()
    {
        return $this->belongsTo(MasterRole::class, 'role_id');
    }
}
