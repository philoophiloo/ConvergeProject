// components/ContactForm.js
import React, { useEffect, useState } from "react";

export default function ContactForm({ contact, onSuccess, onClear }) {
  const [form, setForm] = useState({
    organization_id: "",
    first_name: "",
    last_name: "",
    job_title: "",
    department: "",
    email: "",
    office_phone_number: "",
    mobile_phone_number: "",
    notes: "",
    is_primary_contact: false,
    is_active: true,
  });

  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    if (contact) setForm(contact);
  }, [contact]);

  useEffect(() => {
    fetch("http://localhost:8000/api/organizations")
      .then(res => res.json())
      .then(data => setOrganizations(data));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = contact ? "PUT" : "POST";
    const url = contact
      ? `http://localhost:8000/api/contacts/${contact.id}`
      : "http://localhost:8000/api/contacts";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({
      organization_id: "",
      first_name: "",
      last_name: "",
      job_title: "",
      department: "",
      email: "",
      office_phone_number: "",
      mobile_phone_number: "",
      notes: "",
      is_primary_contact: false,
      is_active: true,
    });

    onSuccess();
    onClear();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select
          name="organization_id"
          value={form.organization_id}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        >
          <option value="">Select Organization</option>
          {organizations.map(org => (
            <option key={org.id} value={org.id}>{org.name}</option>
          ))}
        </select>
        <input name="first_name" value={form.first_name} onChange={handleChange} placeholder="First Name" className="input" required />
        <input name="last_name" value={form.last_name} onChange={handleChange} placeholder="Last Name" className="input" required />
        <input name="job_title" value={form.job_title} onChange={handleChange} placeholder="Job Title" className="input" />
        <input name="department" value={form.department} onChange={handleChange} placeholder="Department" className="input" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="input" />
        <input name="office_phone_number" value={form.office_phone_number} onChange={handleChange} placeholder="Office Phone" className="input" />
        <input name="mobile_phone_number" value={form.mobile_phone_number} onChange={handleChange} placeholder="Mobile Phone" className="input" />
        <input name="notes" value={form.notes} onChange={handleChange} placeholder="Notes" className="input" />
        <label className="flex items-center">
          <input type="checkbox" name="is_primary_contact" checked={form.is_primary_contact} onChange={handleChange} />
          <span className="ml-2">Primary Contact</span>
        </label>
        <label className="flex items-center">
          <input type="checkbox" name="is_active" checked={form.is_active} onChange={handleChange} />
          <span className="ml-2">Active</span>
        </label>
      </div>
      <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
        {contact ? "Update" : "Add"} Contact
      </button>
    </form>
  );
}
