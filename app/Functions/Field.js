import axios from "axios"

//http://localhost:4000/api/
const Server_Url='https://invbackend-shqm.onrender.com/api/'


export async function getSingleField(id) {
    const resp=await axios.get(`${Server_Url}field/getSingF?id=${id}`,{withCredentials:true});

    return resp
}

export async function setAgent(agentId,fieldId) {
    const body={agentId,fieldId};
    
    const resp=await axios.post(`${Server_Url}field/setAgent`,body,{withCredentials:true});

    return resp
}

export async function removeAgent(agentId,fieldId) {
    const body={agentId,fieldId};
    
    const resp=await axios.post(`${Server_Url}field/removeAgent`,body,{withCredentials:true});

    return resp
}