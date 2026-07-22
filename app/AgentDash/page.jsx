'use client'
import React, { useEffect, useState } from "react";
import { Eye, UserCircle } from "lucide-react";
import { useAuth } from '@/app/context/AuthContext.js';
import { getAgentField } from "../Functions/Field";
import Link from "next/link";
export default function AgentDashboard() {
const{userCred}=useAuth()

const [fields, setFields] = useState([]);

useEffect(() => {
  if (!userCred?.agentId) return;
console.log(userCred)
  getAgentField(userCred.agentId).then((e) => {
    console.log(e.data.fieldArray);
    setFields(e.data.fieldArray);
  });
}, [userCred]);

  return (
    <div className="min-h-screen p-6">

      <div className="max-w-7xl mx-auto space-y-6">

      

        {/* 📊 Stats */}
        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
            <p className="text-gray-500 text-sm">Total Fields</p>
          <h2 className="text-3xl font-bold text-indigo-600">{fields.length}</h2> 
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
            <p className="text-gray-500 text-sm">Pending</p>
            <h2 className="text-3xl font-bold text-orange-500">
              {/* {fields.filter(f => f.status === "Pending").length} */}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
            <p className="text-gray-500 text-sm">Completed</p>
            <h2 className="text-3xl font-bold text-green-600">
           {/*    {fields.filter(f => f.status === "Completed").length} */}
            </h2>
          </div>

        </div>

        {/* 📋 Table */}
        <div className="bg-white rounded-2xl shadow overflow-hidden">

          <div className="p-5 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold">
              Assigned Fields
            </h2>

            <input
              type="text"
              placeholder="Search..."
              className="border px-4 py-2 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">

              <thead className="bg-gray-50 text-gray-600 text-sm">
                <tr>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4">Date</th>
                  {/* <th className="py-3 px-4">Status</th> */}
                  <th className="py-3 px-4">Action</th>
                </tr>
              </thead>

              <tbody>
               
                {fields.length > 0 ?(fields.map((fi) => (

                  <tr key={fi.id} className="border-t hover:bg-gray-50 transition">

                    <td className="py-3 px-4 font-medium">{fi.name}</td>

                    <td className="py-3 px-4">{fi.email}</td>

                    <td className="py-3 px-4"> {fi.phone}</td>

                    <td className="py-3 px-4"> {fi.date} </td>

                   {/*  <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          fi.status === "Pending"
                            ? "bg-orange-100 text-orange-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {fi.status}
                      </span>
                    </td>
 */}
                    <td className="py-3 px-4">
                     <Link href={`/AgentDash/AgentField?id=${fi.id}`}>
                      <button className="flex items-center gap-1 text-indigo-600 hover:underline hover:cursor-pointer">
                        <Eye size={16} />
                        View
                      </button>
                      </Link>
                    </td>

                  </tr>

                ))):(<tr><td colSpan={7} className="text-center py-4 text-gray-500"> No Field Assigned.</td></tr>)}
              </tbody>

            </table>
          </div>
        
        </div>

      </div>
    </div>
  );
}