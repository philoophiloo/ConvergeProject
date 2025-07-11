import React, { useState, useEffect } from "react";

export default function IndustryManager() {
  const [industries, setIndustries] = useState([]);
  const [form, setForm] = useState(initialFormState());
  const [editingIndustry, setEditingIndustry] = useState(null);

  useEffect(() => {
    fetchIndustries();
  }, []);

  function initialFormState() {
    return {
      name: "",
      description: "",
      is_active: true,
    };
  }

  const fetchIndustries = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/industries");
      const data = await res.json();
      setIndustries(data);
    } catch (err) {
      console.error("Failed to fetch industries:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = editingIndustry ? "PUT" : "POST";
    const url = editingIndustry
      ? `http://localhost:8000/api/industries/${editingIndustry.id}`
      : "http://localhost:8000/api/industries";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const error = await res.json();
        console.error("Validation error:", error);
        return;
      }

      setForm(initialFormState());
      setEditingIndustry(null);
      fetchIndustries();
    } catch (err) {
      console.error("Error saving industry:", err);
    }
  };

  const handleEdit = (industry) => {
    setEditingIndustry(industry);
    setForm(industry);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this industry?")) return;

    try {
      await fetch(`http://localhost:8000/api/industries/${id}`, {
        method: "DELETE",
      });
      fetchIndustries();
    } catch (err) {
      console.error("Error deleting industry:", err);
    }
  };

  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">Industry Manager</h2>

      {/* Industry Form */}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Industry Name"
            className="border p-2 rounded"
          />
          <input
            name="description"
            value={form.description || ""}
            onChange={handleChange}
            placeholder="Description"
            className="border p-2 rounded"
          />
          <label className="flex items-center space-x-2 col-span-full">
            <input
              type="checkbox"
              name="is_active"
              checked={form.is_active}
              onChange={handleChange}
            />
            <span>Active</span>
          </label>
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          {editingIndustry ? "Update" : "Add"} Industry
        </button>
      </form>

      {/* Industry List */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-semibold mb-4">All Industries</h3>
        {industries.length === 0 ? (
          <p className="text-gray-500">No industries found.</p>
        ) : (
          <table className="w-full table-auto text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-left">Active</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {industries.map((industry) => (
                <tr key={industry.id} className="border-t">
                  <td className="px-4 py-2">{industry.name}</td>
                  <td className="px-4 py-2">{industry.description || "-"}</td>
                  <td className="px-4 py-2">
                    {industry.is_active ? "Yes" : "No"}
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(industry)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(industry.id)}
                      className="text-red-600 hover:underline"
                    >
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
