import React, { useState, useEffect } from "react";

export default function OrganizationManager() {
  const [organizations, setOrganizations] = useState([]);
  const [form, setForm] = useState(initialFormState());
  const [editingOrg, setEditingOrg] = useState(null);

  useEffect(() => {
    fetchOrganizations();
  }, []);

  function initialFormState() {
    return {
      name: "",
      description: "",
      industry_id: "",
      website: "",
      logo_url: "",
      founded_date: "",
      tax_id: "",
      is_active: true,
    };
  }

  const fetchOrganizations = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/organizations");
      const data = await res.json();
      setOrganizations(data);
    } catch (err) {
      console.error("Failed to fetch organizations:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = editingOrg ? "PUT" : "POST";
    const url = editingOrg
      ? `http://localhost:8000/api/organizations/${editingOrg.id}`
      : "http://localhost:8000/api/organizations";

    try {
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      setForm(initialFormState());
      setEditingOrg(null);
      fetchOrganizations();
    } catch (err) {
      console.error("Error saving organization:", err);
    }
  };

  const handleEdit = (org) => {
    setEditingOrg(org);
    setForm(org);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this organization?")) return;

    try {
      await fetch(`http://localhost:8000/api/organizations/${id}`, {
        method: "DELETE",
      });
      fetchOrganizations();
    } catch (err) {
      console.error("Error deleting organization:", err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Organization Manager</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="name" value={form.name} onChange={handleChange} required placeholder="Name" className="border p-2 rounded" />
          <input name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border p-2 rounded" />
          <input name="industry_id" value={form.industry_id} onChange={handleChange} placeholder="Industry ID" className="border p-2 rounded" />
          <input name="website" value={form.website} onChange={handleChange} placeholder="Website" className="border p-2 rounded" />
          <input name="logo_url" value={form.logo_url} onChange={handleChange} placeholder="Logo URL" className="border p-2 rounded" />
          <input type="date" name="founded_date" value={form.founded_date || ""} onChange={handleChange} placeholder="Founded Date" className="border p-2 rounded" />
          <input name="tax_id" value={form.tax_id} onChange={handleChange} placeholder="Tax ID" className="border p-2 rounded" />
          <label className="flex items-center space-x-2">
            <input type="checkbox" name="is_active" checked={form.is_active} onChange={handleChange} />
            <span>Active</span>
          </label>
        </div>
        <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
          {editingOrg ? "Update" : "Add"} Organization
        </button>
      </form>

      {/* Organization List */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">All Organizations</h2>
        {organizations.length === 0 ? (
          <p className="text-gray-500">No organizations found.</p>
        ) : (
          <table className="w-full table-auto text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Website</th>
                <th className="px-4 py-2 text-left">Industry</th>
                <th className="px-4 py-2 text-left">Active</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {organizations.map((org) => (
                <tr key={org.id} className="border-t">
                  <td className="px-4 py-2">{org.name}</td>
                  <td className="px-4 py-2">{org.website || "-"}</td>
                  <td className="px-4 py-2">{org.industry?.name || "-"}</td>
                  <td className="px-4 py-2">{org.is_active ? "Yes" : "No"}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button className="text-blue-600 hover:underline" onClick={() => handleEdit(org)}>
                      Edit
                    </button>
                    <button className="text-red-600 hover:underline" onClick={() => handleDelete(org.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
