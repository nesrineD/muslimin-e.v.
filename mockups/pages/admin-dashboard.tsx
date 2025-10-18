// Admin Dashboard - Minimal admin interface for system statistics and category management
"use client";

import { useState } from "react";
import Link from "next/link";

// Mock data - replace with actual data fetching
const initialStats = {
  total_members: 152,
  total_helpers: 23,
  active_helpers: 19,
  appointments_this_week: 42,
  appointments_this_month: 178,
  self_registered_helpers_today: 2,
};

const initialCategories = [
  {
    id: "1",
    name: "Psychologische Beratung",
    is_active: true,
    helper_count: 8,
  },
  { id: "2", name: "Sozialberatung", is_active: true, helper_count: 6 },
  {
    id: "3",
    name: "Schwangerschaftsbegleitung",
    is_active: true,
    helper_count: 5,
  },
  { id: "4", name: "Weitere Anliegen", is_active: true, helper_count: 4 },
  {
    id: "5",
    name: "Rechtliche Erstberatung",
    is_active: false,
    helper_count: 0,
  },
];

export default function AdminDashboard() {
  const [user] = useState({ vorname: "Admina", role: "admin" });
  const [stats] = useState(initialStats);
  const [categories, setCategories] = useState(initialCategories);
  const [isEditingCategory, setIsEditingCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleCategoryToggle = (id: string) => {
    setCategories(
      categories.map((cat) =>
        cat.id === id ? { ...cat, is_active: !cat.is_active } : cat
      )
    );
  };

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      const newCategory = {
        id: (categories.length + 1).toString(),
        name: newCategoryName,
        is_active: true,
        helper_count: 0,
      };
      setCategories([...categories, newCategory]);
      setNewCategoryName("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-emerald-600">
                Muslimin-Beratung (Admin)
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Salam, {user.vorname}
              </span>
              <button className="bg-gray-100 text-gray-700 px-3 py-2 rounded-md text-sm hover:bg-gray-200">
                Abmelden
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900">Admin-Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Übersicht über Systemstatistiken und Verwaltung der
            Beratungskategorien.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Mitglieder
                    </dt>
                    <dd className="text-3xl font-semibold text-gray-900">
                      {stats.total_members}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Helferinnen (Aktiv)
                    </dt>
                    <dd className="text-3xl font-semibold text-gray-900">
                      {stats.active_helpers}{" "}
                      <span className="text-lg text-gray-500">
                        / {stats.total_helpers}
                      </span>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Termine (Dieser Monat)
                    </dt>
                    <dd className="text-3xl font-semibold text-gray-900">
                      {stats.appointments_this_month}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Management */}
        <div className="mt-8 bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Beratungskategorien verwalten
            </h2>
            <div className="space-y-3">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                >
                  <div>
                    <p className="font-medium text-gray-800">{category.name}</p>
                    <p className="text-sm text-gray-500">
                      {category.helper_count} Helferinnen
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        category.is_active
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {category.is_active ? "Aktiv" : "Inaktiv"}
                    </span>
                    <button
                      onClick={() => handleCategoryToggle(category.id)}
                      className="text-sm font-medium text-emerald-600 hover:text-emerald-800"
                    >
                      {category.is_active ? "Deaktivieren" : "Aktivieren"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex space-x-2">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Neue Kategorie hinzufügen"
                className="flex-grow block border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
              <button
                onClick={handleAddCategory}
                className="bg-emerald-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-emerald-700"
              >
                Hinzufügen
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
