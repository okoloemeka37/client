"use client";

import { useEffect, useState } from "react";
import axios from "axios";



const line=`http://localhost:4000/api/`

export async function login(data){
        const resp=await axios.post(`${line}auth/login`,data,{withCredentials:true})
        return resp
}