'use client'
import React, { useEffect, useState } from "react";
import { Pencil, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { getSingleField } from "../../../../Functions/Field";

export default function FieldDetails() {
  const [field, setfield] = useState({})
    const [loading, setLoading] = useState(true);
  const params=useParams();
  const id=params.id
 /*  const field = {
    name: "John Doe",
    email: "john@example.com",
    address: "123 Main Street, Lagos",
    phone: "+2348012345678",
    date: "18 March 2026",
  };
 */
 

  const agents = [
    { id: 1, name: "Agent A" },
    { id: 2, name: "Agent B" },
    { id: 3, name: "Agent C" },
  ];
  useEffect(() => {
    getSingleField(id).then((res)=>{
       console.log(res.data)
      setfield(res.data)
       setLoading(false)
    })
  }, [id])
  
  const [selectedAgent, setSelectedAgent] = useState("");

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Field Information</h1>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              <Pencil size={16} />
              Edit
            </button>

            <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
              <Trash size={16} />
              Delete
            </button>
          </div>
        </div>

        {/* Main Card */}
            {loading?(<p className="text-gray-500 mb-4">Loading users...</p>):(
              <div className="bg-white shadow rounded-xl p-8 space-y-8">

          {/* User Info Grid */}

{field.map((re,i)=>{
  const d=new Date(re.date).toLocaleDateString()
  return (
            <div className="grid md:grid-cols-2 gap-6" key={i}>
              <div >
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-semibold text-lg">{re.name}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold text-lg">{re.email}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-semibold text-lg">{re.phone}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-semibold text-lg">{d}</p>
            </div>

             <div>
              <p className="text-sm text-gray-500">Tracking Id</p>
              <p className="font-semibold text-lg">{re.Tracking_Id}</p>
            </div>

            <div className="">
              <p className="text-sm text-gray-500">Address</p>
              <p className="text-gray-700">{re.address}</p>
            </div>
</div>

)})}
         

          {/* Agent Section */}
          <div className="border-t pt-6">

            <h2 className="text-lg font-semibold mb-4">
              Agent Assignment
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              {/* Number of Agents */}
              <div>
                <p className="text-sm text-gray-500">Total Agents</p>
                <p className="text-2xl font-bold text-indigo-600">
                  {agents.length}
                </p>
              </div>

              {/* Dropdown */}
              <div>
                <label className="text-sm text-gray-500">
                  Assign Agent
                </label>

                <select
                  value={selectedAgent}
                  onChange={(e) => setSelectedAgent(e.target.value)}
                  className="w-full mt-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option value="">Select Agent</option>

                  {agents.map((agent) => (
                    <option key={agent.id} value={agent.id}>
                      {agent.name}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* Selected Agent Display */}
            {selectedAgent && (
              <div className="mt-4 bg-green-50 text-green-700 px-4 py-2 rounded-lg">
                Agent assigned successfully
              </div>
            )}

          </div>

        </div>
            )}

      </div>
    </div>
  );
}