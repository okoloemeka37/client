'use client'
import  { useRouter } from 'next/navigation'
import {useState}  from 'react'
import axios from 'axios'
import { useAuth } from '@/app/context/AuthContext.js';
import { Eye, EyeOff } from "lucide-react";


export default function Login() {
  const router=useRouter()
  const [show,setShow]=useState(false)
  const [data, setdata] = useState({userName:'',password:""})
  const [error, seterror] = useState({userName:'',password:"",color:"",message:'',gen:''})
  const [Isloading, setIsloading] = useState(false);
 const{login,Server_Url}=useAuth()



      const submit = async (e)=> {
        e.preventDefault();
        setIsloading(true)
        try {
         
        const resp=await axios.post(`${Server_Url}auth/login`,data,{withCredentials:true})
        if (resp.status==200) {
                login(resp.data);
                 setIsloading(false)
        router.push("/Dashboard")
        }
        } catch (err) {
          seterror(err.response.data)
         
        }
         setIsloading(false)
      }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full mb-4 text-3xl">
            🔑
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-gray-500 mt-2">Log in to continue</p>
        </div>

        <form className="space-y-4">
          {error.message && <div className="bg-red-100 text-red-700 border border-red-300 rounded-lg px-4 py-3">    <p className="text-sm">{error.message}</p></div>}
           
          <div>
            <label className="block text-gray-600 text-sm mb-1">UserName</label>
            <input type="text"  placeholder="UserName" value={data.userName} onChange={(e)=>setdata(prev=>({...prev,userName:e.target.value}))}   className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition"  />
                <p className='text-red-600'>{error['userName']}</p>
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-1">Password</label> 
            <div className='flex items-baseline w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition'>
                <input className='w-full outline-0'  type={show ? "text" : "password"} placeholder="••••••••" value={data.password} onChange={(e)=>{setdata(prev=>({...prev,password:e.target.value}))}}  />
                 <p onClick={() => setShow(!show)}  className=" text-gray-500 hover:text-gray-700">{show ? <EyeOff size={18} /> : <Eye size={18} />}</p>
            </div>
             <p className='text-red-600'>{error['password']}</p>

          </div>

          <button type="submit" disabled={Isloading} className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold  hover:from-blue-700 hover:to-purple-700  transition-all shadow-md  ${Isloading ? "opacity-80 cursor-not-allowed" : ""}`} onClick={submit}>
      {Isloading && (
        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      )}
      <span>Login</span>
    </button>
        </form>

      </div>
    </div>
  )
}
