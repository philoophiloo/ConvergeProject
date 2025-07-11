<?php

namespace App\Http\Controllers;

use App\Models\Industry;
use Illuminate\Http\Request;

class IndustryController extends Controller
{
    // GET /api/industries
    public function index()
    {
        return Industry::all();
    }

    // POST /api/industries
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:50|unique:industries',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $industry = Industry::create($data);
        return response()->json($industry, 201);
    }

    // GET /api/industries/{id}
    public function show(Industry $industry)
    {
        return $industry;
    }

    // PUT /api/industries/{id}
    public function update(Request $request, Industry $industry)
    {
        $data = $request->validate([
            'name' => 'sometimes|required|string|max:50|unique:industries,name,' . $industry->id,
            'description' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $industry->update($data);
        return response()->json($industry);
    }

    // DELETE /api/industries/{id}
    public function destroy(Industry $industry)
    {
        $industry->delete();
        return response()->json(['message' => 'Industry deleted.']);
    }
}
