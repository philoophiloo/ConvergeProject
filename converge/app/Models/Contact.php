<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;

    protected $fillable = [
        'organization_id',
        'first_name',
        'last_name',
        'job_title',
        'department',
        'is_primary_contact',
        'notes',
        'email',
        'office_phone_number',
        'mobile_phone_number',
        'is_active',
    ];

    public function organization()
    {
        return $this->belongsTo(\App\Models\Organization::class);
    }
}
