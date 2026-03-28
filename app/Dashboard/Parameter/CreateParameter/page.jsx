'use client'
import React, { useState } from 'react'
import axios from 'axios'
import  { useRouter } from 'next/navigation'

import { useAuth } from '@/app/context/AuthContext.js';


export default function CreatePPage() {
      const router=useRouter()
      const [mess, setmess] = useState({message:'',color:''})
    const [data, setData] = useState({name:'',price:''})
        const [Error, setError] = useState({name:'',price:''})
 const [Isloading, setIsloading] = useState(false);

 const{Server_Url}=useAuth()

 const save = async ()=> {
  setError({name:'',price:''})
        setIsloading(true);
        console.log(data)
        try {
        const resp=await axios.post(`${Server_Url}parameter/create`,data,{withCredentials:true})
        console.log(resp)
        if (resp.status==200) {
          setData({name:'',price:''})
          setmess(resp.data);
        //router.push("/Dashboard")
        }
        setIsloading(false);
        } catch (err) {
              setIsloading(false);
            console.log(err)
          setError(err.response.data)
        }
      }

      setTimeout(() => {
        setmess({name:'',price:''})
      }, 8000);
  return (
   <>
    {mess.message && (
      <div  className={`mb-6 mx-auto max-w-3xl rounded-xl border px-4 py-3 text-sm text-center backdrop-blur ${mess.color === "blue"? "bg-blue-500/10 border-blue-500/30 text-blue-300": "bg-rose-500/10 border-rose-500/30 text-rose-300"}`}>
        {mess.message}
      </div>
    )}

   <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-8 space-y-6">

<h2 className="text-2xl font-semibold text-gray-800">Create Parameters</h2>

  <div className="space-y-4">

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
      <input placeholder='Parameter'  value={data.name} onChange={(e)=>{setData(prev=>({...prev,name:e.target.value}))}}  type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"/>
     <p className='text-red-600'>{Error['name']}</p>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Passcode</label>
      <input placeholder='Price'  value={data.price} onChange={(e)=>{setData(prev=>({...prev,price:e.target.value}))}}  type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"/>
      <p className='text-red-600'>{Error['price']}</p>
    </div>
  </div>

     <button type="submit" disabled={Isloading} className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold  hover:from-blue-700 hover:to-purple-700  transition-all shadow-md  ${Isloading ? "opacity-80 cursor-not-allowed" : ""}`} onClick={save}>
      {Isloading && (
        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      )}
      <span>Add Parameter</span>
    </button>
</div>
   </>
  )
}
