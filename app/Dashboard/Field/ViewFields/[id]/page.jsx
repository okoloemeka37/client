'use client'
import React, { useEffect, useState } from "react";
import { Pencil, Trash,ChevronDown } from "lucide-react";
import { useParams } from "next/navigation";
import { getSingleField, setAgent } from "../../../../Functions/Field";
import AgentModal from "../../../../Models/Agents";

export default function FieldDetails() {
  const [reload,setReload] = useState(false)
  const [field, setfield] = useState({})
  const [agent, setagent] = useState({});
  const [Aload, setAload] = useState(false);
  const [agn, setagn] = useState([])
    const [loading, setLoading] = useState(true);
     const [mess, setmess] = useState({message:'',color:''})

  const params=useParams();
  const id=params.id
const [open, setOpen] = useState(false);
const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    getSingleField(id).then((res)=>{

      setfield(res.data.field)
       setagent(res.data.agents)
       setLoading(false)
       if (res.data.field[0].agents) {
        setagn(res.data.field[0].agents.split(","))
       }
       if (reload) {
        if (agn.length==1) {
          setagn([])
        }
        setReload(false)
       }
    })
  }, [id,reload])

  const setA=async(agent_id,agent_name)=>{
      setagn((prev=>[...prev, agent_id]))
    setAload(true)
     setAgent(agent_id,field[0].id).then((res)=>{

      setAload(false)
      setmess(res.data);
      setSelectedAgent(agent_name);
      setOpen(false);
    })
  }
  
  const [selectedAgent, setSelectedAgent] = useState("");

   const [chsAgent,setchsAgent]=useState([]);
   
   const modal=()=>{
    const et=[];
    agent.forEach(l => {
      if (agn.includes(l.agentId)) {

      et.push(l)
      }
    });
    setchsAgent(et)
    setOpenModal(true)
   }

   setTimeout(() => {
        setmess({message:'',color:''})
      }, 12000);
  return (<>

  {openModal && (
    <div className="fixed inset-0 bg-black/50 z-40" onClick={() => {setOpenModal(false);}}>
      <div className="flex items-center justify-center h-full"onClick={(e) => e.stopPropagation()}>
        <AgentModal fieldId={field[0].id} status={openModal} initialAgents={chsAgent} onClose={() => {setOpenModal(false);setReload(true)}} />
      </div>
    </div>
   )}
  
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Field Information</h1>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              <Pencil size={16} />
              Edit
            </button>

            <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
              <Trash size={16} />
              Delete
            </button>
          </div>
        </div>

        {/* Main Card */}
            {loading?(<p className="text-gray-500 mb-4">Loading Field...</p>):(
              <div className="bg-white shadow rounded-xl p-8 space-y-8">

          {/* User Info Grid */}

{field.map((re,i)=>{
  const d=new Date(re.date).toLocaleDateString()
  return (
            <div className="grid md:grid-cols-2 gap-6" key={i}>
              <div >
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-semibold text-lg">{re.name}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold text-lg">{re.email}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-semibold text-lg">{re.phone}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-semibold text-lg">{d}</p>
            </div>

             <div>
              <p className="text-sm text-gray-500">Tracking Id</p>
              <p className="font-semibold text-lg">{re.Tracking_Id}</p>
            </div>

            <div className="">
              <p className="text-sm text-gray-500">Address</p>
              <p className="text-gray-700">{re.address}</p>
            </div>
</div>

)})}
         
            {mess.message && ( <div  className={` mb-6 mx-auto max-w-3xl rounded-xl border px-4 py-3 text-sm text-center backdrop-blur ${mess.color === "blue"? "bg-blue-500/10 border-blue-500/30 text-blue-300": "bg-rose-500/10 border-rose-500/30 text-rose-300"}`}> {mess.message} </div>)}


          {/* Agent Section */}
          <div className="border-t pt-6">

            <h2 className="text-lg font-semibold mb-4">
              Agent Assignment
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              {/* Number of Agents */}
              <div>
                <p className="text-sm text-gray-500">Total Agents</p>
                <p className="text-2xl font-bold text-indigo-600" onClick={modal}>
                  {agn.length||0}
                </p>
              </div>

              {/* Dropdown */}
              <div>
                <label className="text-sm text-gray-500">
                  Assign Agent
                </label>

                <div className="relative w-full">
      
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-2 bg-white border rounded-xl shadow-sm hover:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition"
      >
        <span className={`${!selectedAgent && "text-gray-400"}`}>
          {selectedAgent || "Select Agent"}
        </span>
        <ChevronDown size={18} className={`transition ${open && "rotate-180"}`} />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-2 w-full bg-white border rounded-xl shadow-lg max-h-60 overflow-y-auto">
          
          <div
            onClick={() => {
              setSelectedAgent("");
              setOpen(false);
            }}
            className="px-4 py-2 hover:bg-indigo-50 cursor-pointer text-gray-500"
          >
            Select Agent
          </div>

          {agent.map((agt, i) => (
            agn.includes(agt.agentId)?(''):(
               <div key={i}>
  <div onClick={() => {setA(agt.agentId,agt.name) }}className={`flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-indigo-50 ${ selectedAgent === agt.name ? "bg-indigo-100 text-indigo-600" : ""}`}>
    <span>{agt.name}</span>
    {Aload?(<div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>):''}
  </div>
</div>
            )
         
          ))}
        </div>
      )}
    </div>
              </div>

            </div>

         
          </div>

        </div>
            )}

      </div>
    </div>
      </>
  );
}