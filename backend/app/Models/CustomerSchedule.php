<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\CustomerAccount;

class CustomerSchedule extends Model
{
    use HasFactory;
    protected $fillable = [
        'customer_account_id',
        'description',
        'date_started',
        'date_ended',
        'time_started',
        'time_ended',
        'status',
    ];

    public function customer(){
        return $this->belongsToMany(CustomerAccount::class, 'customer_account_id', 'id');
    }
}
