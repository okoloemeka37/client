'use client'
import React, { useState } from 'react'
import axios from 'axios'
import  { useRouter } from 'next/navigation'

import { useAuth } from '@/app/context/AuthContext.js';


export default function CreateFPage() {
      const router=useRouter()
    const [data, setData] = useState({name:'',email:'',address:'',phone:'',date:''})
        const [Error, setError] = useState({name:'',email:'',address:'',phone:'',date:''})
 const [Isloading, setIsloading] = useState(false);

 const{Server_Url}=useAuth()

 const save = async ()=> {
        setIsloading(true);
        console.log(data)
        try {
          setIsloading(false);
        const resp=await axios.post(`${Server_Url}field/create`,data,{withCredentials:true})
        console.log(resp)
        if (resp.status==200) {
        router.push("/Dashboard")
        }
        } catch (err) {
              setIsloading(false);
            console.log(err)
          setError(err.response.data)
        }
      }
  return (
   <>
   <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-8 space-y-6">

  <h2 className="text-2xl font-semibold text-gray-800">Create Field</h2>

  <div className="space-y-4">

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
      <input placeholder='Field Name'  value={data.name} onChange={(e)=>{setData(prev=>({...prev,name:e.target.value}))}}  type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"/>
     <p className='text-red-600'>{Error['name']}</p>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
      <input placeholder='Field Email'  value={data.email} onChange={(e)=>{setData(prev=>({...prev,email:e.target.value}))}}  type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"/>
      <p className='text-red-600'>{Error['email']}</p>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
      <input placeholder='Field Address'  value={data.address} onChange={(e)=>{setData(prev=>({...prev,address:e.target.value}))}}  type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"/>
      <p className='text-red-600'>{Error['address']}</p>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
      <input placeholder='Field Phone Number'  value={data.phone} onChange={(e)=>{setData(prev=>({...prev,phone:e.target.value}))}}  type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"/>
      <p className='text-red-600'>{Error['phone']}</p>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
      <input  value={data.date} onChange={(e)=>{setData(prev=>({...prev,date:e.target.value}))}}  type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"/>
       <p className='text-red-600'>{Error['date']}</p>
    </div>


  </div>

     <button type="submit" disabled={Isloading} className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold  hover:from-blue-700 hover:to-purple-700  transition-all shadow-md  ${Isloading ? "opacity-80 cursor-not-allowed" : ""}`} onClick={save}>
      {Isloading && (
        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      )}
      <span>Create Field</span>
    </button>
</div>
   </>
  )
}
