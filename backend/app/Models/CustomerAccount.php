<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use App\Models\CustomerSchedule;

class CustomerAccount extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'gender',
        'birthdate',
        'age',
        'address',
        'phone',
        'email',
        'password',
        'type',
        'image',
        'email_verified_at',
        'remember_token'
    ];
    protected $hidden = [
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    // public function place(){
    //     return $this->belongsTo(Place::class);
    // }

    public function schedule(){
        return $this->hasMany(CustomerSchedule::class);
    }




}
