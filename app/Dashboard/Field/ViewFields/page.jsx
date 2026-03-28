'use client'
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useAuth } from '@/app/context/AuthContext.js';
import Link from "next/link";

export default function ViewFPage() {
   const{Server_Url}=useAuth()
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getFields = async () => {
    setLoading(true);
    setError(null);
    try {
      const resp = await axios.get(`${Server_Url}field/get`, { withCredentials: true });
      if (resp.status === 200) {
        setFields(resp.data);
      }
    } catch (err) {
      console.log(err);
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFields();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Invoice Information
        </h1>

        {loading && <p className="text-gray-500 mb-4">Loading users...</p>}
        {error && <p className="text-red-500 mb-4">Error: {error[0]}</p>}

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Address</th>
                <th className="py-3 px-4 text-left">Phone</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Tracking ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {fields.length > 0 ? (
                fields.map((field) => (
                  <tr key={field.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4"><Link href={`Dashboard/Field/ViewFields/${field.id}`}>{field.name}</Link></td>
                    <td className="py-3 px-4">{field.email}</td>
                    <td className="py-3 px-4">{field.address}</td>
                    <td className="py-3 px-4">{field.phone}</td>
                    <td className="py-3 px-4">{field.date}</td>
                    <td className="py-3 px-4">{field.Tracking_Id}</td>
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
    </div>
  );
}