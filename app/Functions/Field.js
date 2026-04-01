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

export async function getAgentField(agentId) {

    const resp=await axios.get(`${Server_Url}agent/getAgentField?agentId=${agentId}`,{withCredentials:true});

    return resp
}


export async function getSingleFA(id) {
    const resp=await axios.get(`${Server_Url}agent/getSingFA?id=${id}`,{withCredentials:true});

    return resp
}

export async function SubmitRec(data) {
    const resp=await axios.post(`${Server_Url}records/create`,data,{withCredentials:true});
    return resp
}

export async function EditRec(id) {
    const resp=await axios.get(`${Server_Url}records/edit?id=${id}`,{withCredentials:true});
    return resp
}

export async function UpdateRec(data) {
    const resp=await axios.post(`${Server_Url}records/update`,data,{withCredentials:true});
    return resp
}

export async function DelRec(id) {
    const resp=await axios.get(`${Server_Url}records/delete?id=${id}`,{withCredentials:true});
    return resp
}


export async function AdminSubInv() {
    const resp=await axios.get(`${Server_Url}field/AdminSubInv`, {withCredentials: true });
    return resp
}

export async function getAdminRec(id) {
    const resp=await axios.get(`${Server_Url}records/getAdminRec?id=${id}`, {withCredentials: true });
    return resp
}