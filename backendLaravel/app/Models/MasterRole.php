<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MasterRole extends Model
{
    use HasFactory;
    protected $table = 'master_role';
    protected $fillable = [
        'role'
    ];
    public function roleCompanies()
    {
        return $this->hasMany(RoleCompany::class, 'id_role');
    }
}
