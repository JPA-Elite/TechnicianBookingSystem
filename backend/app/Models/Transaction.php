<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable=[
        'booking_request_id',
        'technician_account_id',
        'customer_account_id'
    ];
    use HasFactory;
}
