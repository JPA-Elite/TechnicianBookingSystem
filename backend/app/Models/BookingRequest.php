<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookingRequest extends Model
{
    protected $fillable =[
       'subject',
       'message',
        'date',
        'customer_account_id',
        'technician_account_id'
    ];
    use HasFactory;
}
