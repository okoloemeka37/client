import React from 'react'
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
export default function DashboardLayout({children}) {
  return (
    <>
     <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          <div className="flex items-center gap-8">
            <h1 className="text-lg font-bold text-indigo-600">
              ZylerApp
            </h1>

            <div className="hidden md:flex gap-6 text-sm">
              <Link href="/Dashboard" className="text-gray-700 hover:text-indigo-600">
                Dashboard
              </Link>

              <Link href="#" className="text-gray-700 hover:text-indigo-600">
                Projects
              </Link>

              <Link href="/Dashboard/Field/ViewField" className="text-gray-700 hover:text-indigo-600">
                Fields
              </Link>

              <Link href="#" className="text-gray-700 hover:text-indigo-600">
                Reports
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">

            <button className="relative p-2 rounded-lg hover:bg-gray-100">
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405C18.79 15.21 18 13.11 18 11V8a6 6 0 10-12 0v3c0 2.11-.79 4.21-1.595 4.595L3 17h5m4 0a3 3 0 11-6 0"
                />
              </svg>

              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="relative group">

             

              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border hidden group-hover:block">

                <div className="p-3 border-b">
                  <p className="text-sm font-medium">Emeka</p>
                  <p className="text-xs text-gray-500">
                    emeka@email.com
                  </p>
                </div>

                <Link href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">
                  Profile
                </Link>

                <Link href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">
                  Settings
                </Link>

                <Link
                  href="#"
                  className="block px-4 py-2 text-sm hover:bg-gray-100 text-red-500"
                >
                  Logout
                </Link>

              </div>
            </div>

          </div>

        </div>
      </div>
    </nav>

     <main className="flex-1">
        {children}
      </main>
    </>
  )
}
