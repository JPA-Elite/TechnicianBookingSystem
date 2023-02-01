<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\CustomerAccount;

class CustomerNotification extends Model
{
    use HasFactory;
    protected $fillable = [
        'message',
        'customer_account_id'
    ];

    public function customer()
    {
        return $this->belongsToMany(CustomerAccount::class, 'customer_account_id', 'id');
    }
}
