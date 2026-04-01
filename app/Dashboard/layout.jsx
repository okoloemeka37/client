'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/app/context/AuthContext.js'
import { Bell, Search, UserCircle, LogOut } from 'lucide-react'

export default function DashboardLayout({ children }) {
  const [loading, setLoading] = useState(false)
  const { logout,userCred } = useAuth()

  const logt = async () => {
    setLoading(true)
    try {
      await logout()
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  return (
    <>
      {/* 🔝 Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md border-b shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* Logo */}
          <Link href="/Dashboard" className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Invoice System
          </Link>

          {/* 🔍 Search */}
          <div className="hidden md:flex items-center bg-gray-100 px-3 py-2 rounded-lg w-1/3">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none ml-2 w-full text-sm"
            />
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">

            {/* Notifications */}
            <button className="relative p-2 rounded-full hover:bg-gray-100">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-lg hover:bg-gray-100 cursor-pointer">
              <UserCircle size={24} className="text-gray-600" />
              <span className="text-sm font-medium text-gray-700">{userCred.userName}</span>
            </div>

            {/* Logout */}
            <button
              onClick={logt}
              className={`flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition shadow ${
                loading ? "opacity-80 cursor-not-allowed" : ""
              }`}
            >
              {loading && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              )}
              <LogOut size={16} />
              Logout
            </button>

          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="pt-24 bg-gray-100 min-h-screen">
        {children}
      </div>
    </>
  )
}