<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TechnicianNotification extends Model
{
    use HasFactory;
    protected $fillable = [
        'message',
        'technician_account_id'
    ];
}
