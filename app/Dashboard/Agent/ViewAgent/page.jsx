'use client'
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useAuth } from '@/app/context/AuthContext.js';
import {Trash2} from "lucide-react";

export default function ViewAPage() {

       const{Server_Url}=useAuth()
        const [agent, setagent] = useState([]);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);
        
    const getagent = async () => {
    setLoading(true);
    setError(null);
    try {
      const resp = await axios.get(`${Server_Url}agent/get`, { withCredentials: true });
      if (resp.status === 200) {
        setagent(resp.data);
      }
    } catch (err) {
      console.log(err);
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getagent();
  }, []);


  return (
    <div> <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Agents</h1>

      
        {error && <p className="text-red-500 mb-4">Error: {error}</p>}

        <div className="overflow-x-auto">
            {loading && <p className="text-gray-500 mb-4">Loading Agents...</p>}
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Agent Id</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-gray-200">
              {agent.length > 0 ? (
                agent.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4">{user.name}</td>
                    <td className="py-3 px-4">{user.agentId}</td>
                    <td className="py-3 px-4"><Trash2/></td>
                  </tr>
                ))
              ) : (
                !loading && (
                  <tr>
                    <td colSpan={7} className="text-center py-4 text-gray-500">
                      No Invoice found.
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div></div>
  )
}
