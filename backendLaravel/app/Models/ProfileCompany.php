<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProfileCompany extends Model
{
    use HasFactory;

    protected $table = 'master_company';

    protected $fillable = [
        'company_name',
        'company_address',
        'company_phone',
        'company_email'
    ];

}
