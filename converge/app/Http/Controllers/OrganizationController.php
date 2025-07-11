<?php

namespace App\Http\Controllers;

use App\Models\Organization;
use Illuminate\Http\Request;

class OrganizationController extends Controller
{
    public function index()
    {
        return Organization::with('industry')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:100',
            'description' => 'nullable|string',
            'industry_id' => 'nullable|exists:industries,id',
            'website' => 'nullable|url',
            'logo_url' => 'nullable|url',
            'founded_date' => 'nullable|date',
            'tax_id' => 'nullable|string|max:30',
            'is_active' => 'boolean',
        ]);

        return Organization::create($data);
    }

    public function show(Organization $organization)
    {
        return $organization->load('industry');
    }

    public function update(Request $request, Organization $organization)
    {
        $data = $request->validate([
            'name' => 'sometimes|required|string|max:100',
            'description' => 'nullable|string',
            'industry_id' => 'nullable|exists:industries,id',
            'website' => 'nullable|url',
            'logo_url' => 'nullable|url',
            'founded_date' => 'nullable|date',
            'tax_id' => 'nullable|string|max:30',
            'is_active' => 'boolean',
        ]);

        $organization->update($data);
        return $organization;
    }

    public function destroy(Organization $organization)
    {
        $organization->delete();
        return response()->json(['message' => 'Organization deleted']);
    }
}
