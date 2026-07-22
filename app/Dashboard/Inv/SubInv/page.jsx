'use client'
import React, { useEffect, useState } from "react";

import { useAuth } from '@/app/context/AuthContext.js';
import Link from "next/link";
import { AdminSubInv } from "../../../Functions/Field";

export default function ViewSubInvPage() {
    
   const{Server_Url}=useAuth()
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getFields =async  () => {
    setLoading(true);
    setError(null);
   
      const resp =await AdminSubInv();
      if (resp.status === 200) {
        setFields(resp.data);
      }
      setLoading(false);
   
  };

  useEffect(() => {
    const fetchData = async () => {
      await getFields();
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
  <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Invoice Information
        </h1>

        
        {error && <p className="text-red-500 mb-4">Error: {error[0]}</p>}

        <div className="overflow-x-auto">
            {loading && <p className="text-gray-500 mb-4">Loading users...</p>}
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Tracking ID</th>
                <th className="py-3 px-4 text-left">Record Count</th>
                <th className="py-3 px-4 text-left">Agent Count</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-gray-200">
              {fields.length > 0 ? (
                fields.map((field,id) =>{
                return  (
                  <tr key={id} className="hover:bg-gray-50">
                    <td className="py-3 px-4"><Link href={`Dashboard/Inv/Invoice/ViewInvoice?id=${field.Tracking_Id}`}>{field.Tracking_Id}</Link></td>
                    <td className="py-3 px-4">{field.total_agent}</td>
                    <td className="py-3 px-4">{field.total_records}</td>
                  </tr>
                )})
              ) : (!loading && (<tr><td colSpan={7} className="text-center py-4 text-gray-500"> No Invoice found.</td></tr>)
              )}
            </tbody>
          </table>
        </div>
      </div> 
    </div>
  );
}