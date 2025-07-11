<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function index()
    {
        return Contact::with('organization')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'organization_id' => 'required|exists:organizations,id',
            'first_name' => 'required|string|max:50',
            'last_name' => 'required|string|max:50',
            'job_title' => 'nullable|string|max:100',
            'department' => 'nullable|string|max:50',
            'is_primary_contact' => 'boolean',
            'notes' => 'nullable|string',
            'email' => 'nullable|email|max:100',
            'office_phone_number' => 'nullable|string|max:50',
            'mobile_phone_number' => 'nullable|string|max:50',
            'is_active' => 'boolean',
        ]);

        // Optional: Ensure only one primary contact
        if (!empty($data['is_primary_contact'])) {
            Contact::where('organization_id', $data['organization_id'])->update(['is_primary_contact' => false]);
        }

        return Contact::create($data);
    }

    public function show(Contact $contact)
    {
        return $contact->load('organization');
    }

    public function update(Request $request, Contact $contact)
    {
        $data = $request->validate([
            'first_name' => 'sometimes|required|string|max:50',
            'last_name' => 'sometimes|required|string|max:50',
            'job_title' => 'nullable|string|max:100',
            'department' => 'nullable|string|max:50',
            'is_primary_contact' => 'boolean',
            'notes' => 'nullable|string',
            'email' => 'nullable|email|max:100',
            'office_phone_number' => 'nullable|string|max:50',
            'mobile_phone_number' => 'nullable|string|max:50',
            'is_active' => 'boolean',
        ]);

        if (!empty($data['is_primary_contact'])) {
            Contact::where('organization_id', $contact->organization_id)->update(['is_primary_contact' => false]);
        }

        $contact->update($data);
        return $contact;
    }

    public function destroy(Contact $contact)
    {
        $contact->delete();
        return response()->json(['message' => 'Contact deleted.']);
    }
}
