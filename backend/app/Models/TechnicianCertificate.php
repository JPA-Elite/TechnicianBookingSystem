<?php

namespace App\Models;

use App\Models\TechnicianAccount;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TechnicianCertificate extends Model
{
    use HasFactory;

    protected $fillable = [
        'image',
        'category',
        'technician_account_id',
    ];

    public function technician()
    {
        return $this->belongsToMany(TechnicianAccount::class, 'technician_account_id', 'id');
    }
}
