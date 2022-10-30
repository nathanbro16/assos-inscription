<?php

namespace App\Models;

use App\Enum\FamilyState;
use App\Models\Traits\HasUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Members;


class MembersFamilies extends Model
{
    use HasFactory, HasUuid;


    /**
    * The attributes that are mass assignable.
    *
    * @var array<int, string>
    */
    protected $fillable = [
        'registrations_id',
        'last_name_1',
        'last_name_2',
        'first_name_1',
        'first_name_2',
        'phone_1',
        'phone_2',
        'email_1',
        'email_2',
        'CheckList',
        'locked',
        'type_of_register'

    ];

    protected $primaryKey = 'id';

    protected $keyType = 'string';

    public $incrementing = false;

    public function members() {
        return $this->hasMany(Members::class);
    }

    public function Registrations() {
        return $this->belongsTo(Registrations::class);
    }

    protected $casts = [
        'CheckList' => 'array'
    ];
}

