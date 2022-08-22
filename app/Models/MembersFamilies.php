<?php

namespace App\Models;

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
        'last_name',
        'first_name_1',
        'first_name_2',
        'phone_1',
        'phone_2',
        'email',
        'CheckList',
        'locked'

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

}
