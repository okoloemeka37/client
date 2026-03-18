'use client'

import Link from "next/link";
import React from "react";
import {useState}  from 'react'
import { FileText, UserPlus, Settings, PlusCircle,Eye } from "lucide-react";
import { useAuth } from '@/app/context/AuthContext.js';
import ViewFPage from "./Field/ViewFields/page.jsx"
import CreateFPage from "./Field/CreateField/page.jsx"
import CreateAPage from "./Agent/CreateAgent/page.jsx"
import ViewAPage from "./Agent/ViewAgent/page.jsx"
import CreatePPage from "./Parameter/CreateParameter/page.jsx"
import ViewPPage from "./Parameter/ViewParameter/page.jsx"

export default function Dashboard() {
 const{Server_Url,logout}=useAuth()
  const actions = [
    {
      title: "Field",
      description: "Add new invoice fields",
      icon: <PlusCircle size={28} />,
       view: <Eye size={28} />,
      color: "bg-blue-500",
      link:'Dashboard/Field/CreateField'
    },
    {
      title: "Agent",
      description: "Register a new agent",
      icon: <UserPlus size={28} />,
      view: <Eye size={28} />,
      color: "bg-green-500",
       link:'Dashboard/Agent/CreateAgent'
    },
    {
      title: "Parameters",
      description: "Configure invoice rules",
      icon: <Settings size={28} />,
      view: <Eye size={28} />,
      color: "bg-purple-500",
       link:'./Field/CreateField'
    },
    {
      title: "Invoice",
      description: "Create a new invoice",
      icon: <FileText size={28} />,
      view: <Eye size={28} />,
      color: "bg-orange-500",
       link:'./Field/CreateField'
    },
  ];
  const type={'Field':<ViewFPage/>,'CAgent':<CreateAPage/>,'CField':<CreateFPage/>,'Agent':<ViewAPage/>,'CParameters':<CreatePPage/>,'Parameters':<ViewPPage/>,'def':""}

  const [disType, setdisType] = useState('def')



  return (
    <div className="min-h-screen bg-gray-100">

      {/* Main */}
      <div className="max-w-7xl mx-auto p-6">

        {/* Title */}
        <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {actions.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer">
              <div className="flex justify-between">
                  <p className={`w-12 h-12 flex items-center justify-center rounded-lg text-white ${item.color}`} onClick={()=>setdisType(`C${item.title}`)}>{item.icon}</p>
                  <p className={`w-12 h-12 flex items-center justify-center rounded-lg text-white ${item.color}`} onClick={()=>setdisType(item.title)}> {item.view}</p>
              </div>
              <h3 className="mt-4 text-lg font-semibold">{item.title} </h3>

              <p className="text-gray-500 text-sm mt-1"> {item.description} </p>

              <button className="mt-4 text-indigo-600 font-medium hover:underline">Open →</button>
            </div>
          ))}

        </div>

      </div>

         {type[disType]}

    </div>
  );
}