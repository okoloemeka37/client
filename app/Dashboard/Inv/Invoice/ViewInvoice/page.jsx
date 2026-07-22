'use client'


import { useAuth } from '@/app/context/AuthContext.js';
import { useEffect,useState } from "react";
import { getAdminRec,DelRec } from "@/app/Functions/Field";
import Link from "next/link";
import {Pencil,Trash2} from "lucide-react";
import { ConfirmDelModal } from "@/app/Models/Confrim";

  import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminRecords />
    </Suspense>
  );
}

function AdminRecords() {

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const {userCred}=useAuth()
  
  const[records,setRecords]=useState([]);
  const[agent,setagent]=useState([]);
  const[field,setfield]=useState([]);
  const [mess, setmess] = useState({message:'',color:''})
  const [rev,setTotalRev]=useState(0)

/*   const records = [
    {
      id: 1,
      invoice: "INV-001",
      field: "Living Room",
      location: "Lagos",
      type: "Vertical",
      qty: 2,
      width: 1.5,
      breadth: 2.0,
      total: 3.0,
      price: 5000,
      amount: 15000,
      agent: "Agent John",
      date: "18 March 2026",
    },
    {
      id: 2,
      invoice: "INV-002",
      field: "Office Blinds",
      location: "Abuja",
      type: "Roller",
      qty: 1,
      width: 2.0,
      breadth: 2.5,
      total: 5.0,
      price: 6000,
      amount: 30000,
      agent: "Agent Mike",
      date: "17 March 2026",
    },
  ];
 */
useEffect(() => {
  let isMounted = true;
  
  const getrec = async () => {
    try {
      const resp = await getAdminRec(id)
      setRecords(resp.data.records)
      setfield(resp.data.field)
      setagent(resp.data.agent)
      let arr=[]
              resp.data.records.forEach(e => {
                const price=parseFloat(String(e.price).replace(/[^0-9.]/g, "")) || 0;
                const quantity = parseFloat(e.quantity) || 0; 
               arr.push(price*quantity)
              })
setTotalRev(arr.reduce((acc,cur)=>acc+cur,0))
    } catch (error) {
      if (isMounted) {
        setmess(error.response.data)
      }
    }
  }
  
  getrec()
  
  return () => {
    isMounted = false
  }
}, [id,mess])


useEffect(() => {
  if (mess.message) {
    const timer = setTimeout(() => {
      setmess({ message: '', color: '' });
    }, 3000);

    return () => clearTimeout(timer);
  }
}, [mess]);

function showField(id){
const f=field.find((e)=>e.id==id)
return f.name
}
function showAgent(id){
const f=agent.find((e)=>e.agentId==id)
return f.name
}

const [openDelModal,setOpenDelModal]=useState(false)
const [delId,setdelId]=useState(0)

const [delLoader,setDelLoader]=useState(false);

const handleDelete=async () => {
  setDelLoader(true)
 try {

   const resp=await DelRec(delId);
   setmess(resp.data)
   setDelLoader(false)

 } catch (error) {

  console.log(error)
  setDelLoader(false)

 }

}

  return (
    <div className="min-h-screen bg-gray-100 p-6 pt-24">
{mess.message && (
      <div  className={`mb-6 mx-auto max-w-3xl rounded-xl border px-4 py-3 text-sm text-center backdrop-blur ${mess.color === "blue"? "bg-blue-500/10 border-blue-500/30 text-blue-300": "bg-rose-500/10 border-rose-500/30 text-rose-300"}`}>
        {mess.message}
      </div>
    )}

      <div className="max-w-7xl mx-auto space-y-6">

        {/* 🔝 Header */}
        <div className="bg-white p-6 rounded-2xl shadow flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              All Records
            </h1>
            <p className="text-gray-500 text-sm">
              Monitor all agent activities and invoices
            </p>
          </div>

         <ConfirmDelModal  isOpen={openDelModal}  onClose={() => setOpenDelModal(false)} onConfirm={handleDelete} message="This action cannot be undone. Are you sure?"/>

          <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700">
            Export Data
          </button>
        </div>

        {/* 📊 Summary */}
        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-2xl shadow">
            <p className="text-gray-500 text-sm">Total Records</p>
            <h2 className="text-3xl font-bold text-indigo-600">
              {records.length}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <p className="text-gray-500 text-sm">Total Revenue</p>
            <h2 className="text-3xl font-bold text-green-600">
              ₦{new Intl.NumberFormat('en-US').format(rev)}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <p className="text-gray-500 text-sm">Active Agents</p>
            <h2 className="text-3xl font-bold text-purple-600">
              {agent.length}
            </h2>
          </div>

        </div>

        {/* 📋 Table */}
        <div className="bg-white rounded-2xl shadow overflow-hidden">

          {/* Top bar */}
          <div className="p-4 border-b flex flex-col md:flex-row gap-3 md:justify-between">

            <input
              type="text"
              placeholder="Search invoice, agent, field..."
              className="border px-4 py-2 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-full md:w-1/3"
            />

            <select className="border px-4 py-2 rounded-lg text-sm">
              <option>Filter by Agent</option>
              {agent.length >0 ? agent.map((ang,id)=>
                (<option key={id}>{ang.name}</option>)
              ):('')}
            </select>

          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">

              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="py-3 px-4">Invoice</th>
                  <th className="py-3 px-4">Field</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Qty</th>
                  <th className="py-3 px-4">Width</th>
                  <th className="py-3 px-4">Breadth</th>
                  <th className="py-3 px-4">SQ.M</th>
                  <th className="py-3 px-4">Total SQ.M</th>
                  <th className="py-3 px-4">Price/SQ.M</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Agent</th>
                  <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {records.map((rec) =>{
                  const price=parseFloat(String(rec.price).replace(/[^0-9.]/g, "")) || 0;
                 const quantity = parseFloat(rec.quantity) || 0; 
                 const sq=rec.width*rec.breadth;
                 const total= price*quantity;
                 const date=new Date(rec.updated_at)
                 return (
                  <tr key={rec.id} className="border-t hover:bg-gray-50">

                    <td className="py-3 px-4 font-medium"> {rec.Tracking_Id} </td>
                    <td className="py-3 px-4">{showField(rec.fieldId)}</td>
                    <td className="py-3 px-4">{rec.location}</td>
                    <td className="py-3 px-4">{rec.parameter}</td>
                    <td className="py-3 px-4">{rec.quantity}</td>
                    <td className="py-3 px-4">{rec.width}</td>
                    <td className="py-3 px-4">{rec.breadth}</td>
                    <td className="py-3 px-4">{new Intl.NumberFormat('en-US').format(sq.toFixed(2))}</td>
                    <td className="py-3 px-4">{new Intl.NumberFormat('en-US').format((sq*quantity).toFixed(2))}</td>
                    <td className="py-3 px-4">₦{rec.price}</td>
                    <td className="py-3 px-4 font-semibold text-indigo-600">₦{new Intl.NumberFormat('en-US').format(total)}</td>
                    <td className="py-3 px-4">{showAgent(rec.agentId)}</td>
                    <td className="py-3 px-4">{date.toLocaleDateString()}</td>
                    <td className="py-3 px-4"><div className="flex "><Link href={{pathname:'/Records/EditRecord',query:{id:rec.id,from:'Admin'}}}><p className="py-3 rounded-xl font-semibold bg-indigo-600 hover:bg-indigo-700 text-white px-2"><Pencil/></p></Link><p className="py-3 rounded-xl font-semibold bg-red-600 hover:bg-red-700 text-white px-3" onClick={()=>{setOpenDelModal(true);setdelId(rec.id)}}> <Trash2  /></p></div></td>
                  </tr>
                )})}
              </tbody>

            </table>

              {/* Delete Record Spinner overlay */}
            {delLoader &&   <div className="absolute inset-0 flex items-center justify-center bg-black opacity-70 z-50">
                  <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
               </div>
            }
          </div>

        </div>

      </div>
    </div>
  );
}