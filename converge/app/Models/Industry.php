<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Industry extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'is_active'];

    /**
     * An industry has many organizations.
     */
    public function organizations()
    {
        return $this->hasMany(\App\Models\Organization::class);
    }
}
