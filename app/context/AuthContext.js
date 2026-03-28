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
//http://localhost:4000/api/
 const [Server_Url]=useState("https://invbackend-shqm.onrender.com/api/")
    const [isAuthenticated, setisAuthenticated] = useState(false);
 

  
 
async function checkAuth() {
  try {
    const resp= await axios.get(`${Server_Url}auth/checkAuth`,{withCredentials:true});
    console.log(resp.data.user)
   setuserCred(resp.data.user)

    if (resp.data.user.type =="Admin") {
        router.push('/Dashboard')
    }else{
        router.push('/AgentDash')
    }
   
  } catch (error) {
    if (error.status===401 || error.status===404) {

      if (Pathname=="/Auth/Register") {router.push("/Auth/Register")}
      else if (Pathname=="/Auth/Agent"){ router.push("/Auth/Agent")}
      else{router.push("/Auth/Login")}
    }
  }
}

async function logout() {
    try {
      let role=userCred.type;
      const resp =await axios.get(`${Server_Url}auth/logout`, {withCredentials:true});
      console.log(resp.data)
      setisAuthenticated(false);
      setuserCred({userName:'',email:''})
      
      if (role=='Admin') {role=''; router.push("/Auth/Login")}else{role=''; router.push("/Auth/Agent")}
      
    } catch (error) {
      console.log(error)
    }
}

function login(data) {
    setisAuthenticated(true);
    console.log(data)
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