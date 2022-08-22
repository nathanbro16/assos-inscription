<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Registrations extends Model
{
    use HasFactory;

    /**
    * The attributes that are mass assignable.
    *
    * @var array<int, string>
    */
    protected $fillable = [
        'Title',
        'IsSuccess',
        'IsOpen',
        'DateOpen',
        'DateClosed',
        'CheckList'

    ];


    public function Families() {
        return $this->hasMany('MembersFamilies', 'registrations_id');
    }
}
