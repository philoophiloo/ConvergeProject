// App.js
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import OrganizationManager from "./components/OrganizationManager";
import IndustryManager from "./components/IndustryManager";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const [view, setView] = useState("home");
  const [orgCount, setOrgCount] = useState(0);
  const [industryCount, setIndustryCount] = useState(0);

  const fetchContacts = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/contacts");
      const data = await res.json();
      setContacts(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const fetchOrganizations = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/organizations");
      const data = await res.json();
      setOrgCount(data.length);
    } catch (error) {
      console.error("Error fetching organizations:", error);
    }
  };

  const fetchIndustries = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/industries");
      const data = await res.json();
      setIndustryCount(data.length);
    } catch (error) {
      console.error("Error fetching industries:", error);
    }
  };

  useEffect(() => {
    fetchContacts();
    fetchOrganizations();
    fetchIndustries();
  }, []);

  return (
    <div className="bg-gradient-to-br from-white to-blue-50 min-h-screen font-sans">
     <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center sticky top-0 z-50">
  <div className="flex items-center space-x-3">
    <div className="w-8 h-8 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold">A</div>
    <h1 className="text-2xl font-bold text-blue-800 tracking-wide">Admin Portal</h1>
  </div>
  
  <div className="flex space-x-6">
    <button
      onClick={() => setView("home")}
      className={`text-sm font-medium text-gray-700 hover:text-blue-700 transition duration-300 ${
        view === "home" ? "border-b-2 border-blue-700 pb-1" : ""
      }`}
    >
      Home
    </button>
    <button
      onClick={() => setView("contacts")}
      className={`text-sm font-medium text-gray-700 hover:text-blue-700 transition duration-300 ${
        view === "contacts" ? "border-b-2 border-blue-700 pb-1" : ""
      }`}
    >
      Contacts
    </button>
    <button
      onClick={() => setView("organizations")}
      className={`text-sm font-medium text-gray-700 hover:text-blue-700 transition duration-300 ${
        view === "organizations" ? "border-b-2 border-blue-700 pb-1" : ""
      }`}
    >
      Organizations
    </button>
    <button
      onClick={() => setView("industries")}
      className={`text-sm font-medium text-gray-700 hover:text-blue-700 transition duration-300 ${
        view === "industries" ? "border-b-2 border-blue-700 pb-1" : ""
      }`}
    >
      Industries
    </button>
  </div>
</nav>

      {view === "home" && (
        <motion.div
          className="text-center py-16 px-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-extrabold text-blue-800 mb-4">Welcome to the Admin Portal</h2>
          <p className="text-gray-600 text-lg mb-10">
            Seamlessly manage Contacts, Organizations, and Industries.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <button
              onClick={() => setView("contacts")}
              className="bg-white border-t-4 border-blue-500 shadow rounded-lg p-6 text-left hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-blue-700 mb-2">Contacts</h3>
              <p className="text-gray-600 mb-1">View, add and manage contacts easily.</p>
              <p className="text-sm text-blue-800 font-bold">Total: {contacts.length}</p>
            </button>
            <button
              onClick={() => setView("organizations")}
              className="bg-white border-t-4 border-green-500 shadow rounded-lg p-6 text-left hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-green-700 mb-2">Organizations</h3>
              <p className="text-gray-600 mb-1">Manage organization records and details.</p>
              <p className="text-sm text-green-800 font-bold">Total: {orgCount}</p>
            </button>
            <button
              onClick={() => setView("industries")}
              className="bg-white border-t-4 border-indigo-500 shadow rounded-lg p-6 text-left hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-indigo-700 mb-2">Industries</h3>
              <p className="text-gray-600 mb-1">Categorize organizations by industry sectors.</p>
              <p className="text-sm text-indigo-800 font-bold">Total: {industryCount}</p>
            </button>
          </div>
        </motion.div>
      )}

      {view === "contacts" && (
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Contacts Manager</h2>
          <ContactForm
            contact={editingContact}
            onSuccess={fetchContacts}
            onClear={() => setEditingContact(null)}
          />
          <ContactList
            contacts={contacts}
            onEdit={setEditingContact}
            onDelete={fetchContacts}
          />
        </div>
      )}

      {view === "organizations" && (
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">Organizations</h2>
          <OrganizationManager />
        </div>
      )}

      {view === "industries" && (
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Industries</h2>
          <IndustryManager />
        </div>
      )}
    </div>
  );
}
