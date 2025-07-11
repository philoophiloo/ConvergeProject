<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Organization extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'industry_id',
        'website',
        'logo_url',
        'founded_date',
        'tax_id',
        'is_active',
    ];

    public function industry()
    {
        return $this->belongsTo(\App\Models\Industry::class);
    }
    public function contacts()
{
    return $this->hasMany(\App\Models\Contact::class);
}

}
