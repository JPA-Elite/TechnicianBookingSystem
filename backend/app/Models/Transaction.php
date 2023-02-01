<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\BookingRequest;
use App\Models\TechnicianAccount;
use App\Models\CustomerAccount;
class Transaction extends Model
{
    protected $fillable=[
        'booking_request_id',
        'technician_account_id',
        'customer_account_id'
    ];
    use HasFactory;

    public function booking(){
        return $this->belongsToMany(BookingRequest::class,'booking_request_id', 'id');
    }
    public function technician(){
        return $this->belongsToMany(TechnicianAccount::class,'technician_account_id', 'id');
    }
    public function customer(){
        return $this->belongsToMany(CustomerAccount::class,'customer_account_id', 'id');
    }
}
