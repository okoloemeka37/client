'use client'
import { useState } from "react";
import { Menu, X, User, LogOut } from "lucide-react";
import Link from "next/link";
import { useAuth } from '@/app/context/AuthContext.js';


export default function AgentLayout({children}) {
     const{Server_Url,logout}=useAuth()
      const [loading, setloading] = useState(false)
       
       const logt = async () => {
       setloading(true);
     
       try {
         await logout();
       } catch (error) {
         console.log(error);
       }
     
       setloading(false);
     };

  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Dashboard", href: "/agent/dashboard" },
    { name: "Assigned Fields", href: "/agent/fields" },
    { name: "Profile", href: "/agent/profile" },
  ];

  return (
    <>
    <nav className="fixed top-0 left-0 w-full bg-white shadow z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo / Brand */}
        <Link href="/agent/dashboard" className="text-xl font-bold text-indigo-600">Invoice Agent</Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              {link.name}
            </Link>
          ))}

          {/* Profile Dropdown */}
          <div className="relative">
            <button className="flex items-center gap-2 text-gray-700 hover:text-indigo-600">
              <User size={18} />
              <span>Agent</span>
            </button>
            {/* You can add a dropdown here if needed */}
          </div>

          <button className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium" onClick={()=>logt()}><LogOut size={18} />Logout{loading?(<span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>):""}</button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t shadow">
          <div className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-indigo-600 font-medium"
                onClick={() => setOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <button className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium">
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>


 <div className="pt-24">{children}</div>

 </>
  );
}