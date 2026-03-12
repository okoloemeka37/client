"use client"
import { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios'
import { usePathname, useRouter } from "next/navigation";

const AuthContext=createContext({
    isAuthenticated:false,
   login:(data)=>{},
    logout:()=>{}, 
    Server_Url:'https://invbackend-shqm.onrender.com/api/',
    userCred: {userName: '', email: ''}

});
export const Authprovider=({ children })=>{

  const Pathname=usePathname();

  const router=useRouter(); 
 const [userCred, setuserCred] = useState({name:'',email:''})
//http://localhost:4000
 const [Server_Url]=useState("https://invbackend-shqm.onrender.com/api/")
    const [isAuthenticated, setisAuthenticated] = useState(false);
 

  
 
async function checkAuth() {
  try {
    const resp= await axios.get(`${Server_Url}auth/checkAuth`,{withCredentials:true});
   setuserCred(resp.data.user)
   if (Pathname=="/Auth/Login"){
    router.push('/Dashboard')
   }
  console.log(resp.data.user)
  } catch (error) {
    if (error.status===401) {

      if (Pathname=="/Auth/Register") {
        router.push("/Auth/Register")
      }else{
      router.push("/Auth/Login")
    }
    }
  }
}

async function logout() {
    try {
      const resp =await axios.get(`${Server_Url}auth/logout`, {withCredentials:true});
      console.log(resp.data)
      setisAuthenticated(false);
      setuserCred({userName:'',email:''})
       router.push("/Auth/Login")
    } catch (error) {
      console.log(error)
    }
}

function login(data) {
    setisAuthenticated(true);
    setuserCred(data.user);
}

useEffect(() => {
 (async () => {
   await checkAuth()
 })()
 },[])

 return (<AuthContext.Provider value={{isAuthenticated,userCred,logout,login,Server_Url}}>{children}</AuthContext.Provider>)
}
 export  const useAuth=()=>useContext(AuthContext);