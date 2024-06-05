<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProfileUser extends Model
{
    use HasFactory;

    protected $table = 'profile';

    protected $fillable = [
        'id_user', 
        'username', 
        'name', 
        'no_hp', 
        'email', 
        'address', 
        'birthdate', 
        'gender'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }
    
}
