<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Members extends Model
{
    use HasFactory;

    protected $fillable = [
        'members_families_id',
        'first_name',
        'last_name',
        'birth',
        'address',
        'phone',
        'email',
        'rank',

    ];

}
