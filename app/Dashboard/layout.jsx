'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/app/context/AuthContext.js';

export default function DashboardLayout({children}) {
  const [loading, setloading] = useState(false)
  const{logout}=useAuth()

  const logt = async () => {
  setloading(true);

  try {
    await logout();
  } catch (error) {
    console.log(error);
  }

  setloading(false);
};
  return (
    <>
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b top-0 left-0 z-50 fixed w-full">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-indigo-600"><Link href={'/Dashboard'}>Invoice System</Link></h1>

          <div className="flex items-center gap-4"><button onClick={logt} className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold  hover:from-blue-700 hover:to-purple-700 px-4 py-2 rounded-lg  transition-all shadow-md  ${loading ? "opacity-80 cursor-not-allowed" : ""}`}>{loading && (
        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      )} <span>Logout</span>  </button> </div>
        </div>
      </nav>
    <div className='pt-24'>
      {children}
    </div>
    </>
  )
}
