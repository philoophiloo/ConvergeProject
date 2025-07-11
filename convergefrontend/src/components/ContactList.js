// components/ContactList.js
import React from "react";

export default function ContactList({ contacts, onEdit, onDelete }) {
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this contact?");
    if (!confirm) return;

    await fetch(`http://localhost:8000/api/contacts/${id}`, {
      method: "DELETE",
    });

    onDelete();
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">All Contacts</h2>
      {contacts.length === 0 ? (
        <p className="text-gray-500">No contacts available.</p>
      ) : (
        <table className="w-full table-auto text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Job Title</th>
              <th className="px-4 py-2 text-left">Organization</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id} className="border-t">
                <td className="px-4 py-2">
                  {contact.first_name} {contact.last_name}
                </td>
                <td className="px-4 py-2">{contact.email || "-"}</td>
                <td className="px-4 py-2">{contact.mobile_phone_number || "-"}</td>
                <td className="px-4 py-2">{contact.job_title || "-"}</td>
                <td className="px-4 py-2">{contact.organization?.name || "-"}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => onEdit(contact)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDelete(contact.id)}
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
  );
}
