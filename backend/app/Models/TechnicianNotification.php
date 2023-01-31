<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\TechnicianAccount;

class TechnicianNotification extends Model
{
    use HasFactory;
    protected $fillable = [
        'message',
        'technician_account_id'
    ];

    public function technician()
    {
        return $this->belongsToMany(TechnicianAccount::class, 'technician_account_id', 'id');
    }
}
