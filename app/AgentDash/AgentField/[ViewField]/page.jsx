'use client'

import { useParams } from "next/navigation"
import { useAuth } from '@/app/context/AuthContext.js';
import { Plus,Pencil,Trash2} from "lucide-react";
import { getSingleFA, SubmitRec,DelRec } from "@/app/Functions/Field";
import { useState,useEffect } from "react";
import Link from "next/link";
import { ConfirmDelModal } from "@/app/Models/Confrim";
import AddRecordModal from "../../AgentModal/modal";


export default function FieldRecords() {

  const{userCred}=useAuth()
const params=useParams();
const id=params.ViewField;
const [field, setfield] = useState({});
const [IsloadData, setIsloadData] = useState(true);
const [Isloading, setIsloading] = useState(false);
const [mess, setmess] = useState({message:'',color:''})
const [parameter, setparameter] = useState({})
const [error, seterror] = useState({location:"",parameter:"",quantity:"",breadth:"",width:""});

const [records,setRecords]=useState([{Tracking_Id:"",agentId: "",breadth:"",created_at:"",fieldId:"",id:'',location:"",parameter:"",parameterId:"",price:0,quantity:0,record_Id:"",updated_at:"",width:"",}]);
const [agent,setAgent]=useState([{agentId:'',name:'',id:''}]);
const [openModal,setOpenModal]=useState(false)

const [openDelModal,setOpenDelModal]=useState(false)
const [delId,setdelId]=useState(0)

const [delLoader,setDelLoader]=useState(false);


function setPrice(name) {
  if (name =="No Parameter") { return {id:'0',price:'0'} }else{
  const found = parameter.find(rep => rep.name === name);
  return found ? { id:found['parameterId'] , price:found['price'] } : { id: '', price: '' };
  }
}


 useEffect(() => {
 
    getSingleFA(id).then((res)=>{
       setIsloadData(false)
       setfield(res.data.field[0])
      console.log(res.data)
      setRecords(res.data.records)
      setAgent(res.data.agents)
       setparameter(res.data.parameter)

    })

    },[id,mess])

  const fieldName = field.name;

  const sendRec=async (data)=>{
    setIsloading(true)
    const par=setPrice(data['parameter'])
    data['TrackingId']=field['Tracking_Id']
    data['fieldId']=field['id'];
    data['userId']=field['user_id']
    data['etc']=par
   

      try {
        const resp= await SubmitRec(data)
        setIsloading(false)
        if (resp.status==200) {
         setmess(resp.data)
         seterror({location:"",parameter:"",quantity:"",breadth:"",width:""})
        }
      } catch (error) {
       if (error.response) {
        setIsloading(false)
        if (error.response.status==400 && error.response.data['type']=='empty' ) {
           seterror(error.response.data)
        }
       
       }
      }
  }

  
     useEffect(() => {
  if (mess.message) {
    const timer = setTimeout(() => {
      setmess({ message: '', color: '' });
    }, 3000);

    return () => clearTimeout(timer);
  }
}, [mess]);



      function selectAgent(id) {
  return agent.find((re) => re.agentId == id)?.name || "";
}

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

    <div className="min-h-screen p-6">
 {mess.message && (
      <div  className={`mb-6 mx-auto max-w-3xl rounded-xl border px-4 py-3 text-sm text-center backdrop-blur ${mess.color === "blue"? "bg-blue-500/10 border-blue-500/30 text-blue-300": "bg-rose-500/10 border-rose-500/30 text-rose-300"}`}>
        {mess.message}
      </div>
    )}


      <div>
            {openModal && (<AddRecordModal
  open={openModal}
  onClose={() => setOpenModal(false)}
  onSave={(data) => sendRec(data)}
  parameter={parameter}
  error={error}
  mess={mess}
  Isloading={Isloading}
/>)}
      </div>


         <ConfirmDelModal  isOpen={openDelModal}  onClose={() => setOpenDelModal(false)} onConfirm={handleDelete} message="This action cannot be undone. Are you sure?"/>

      <div className="max-w-7xl mx-auto space-y-6">

        {/* 🔝 Header */}
        <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow">
          
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{fieldName}</h1>
            <p className="text-gray-500 text-sm">Manage records for this field</p>
          </div>

          <button className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition" onClick={()=>setOpenModal(true)}><Plus size={18} />Add Record</button>

        </div>

        {/* 📊 Table */}
        <div className="bg-white rounded-2xl shadow overflow-hidden">

          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="font-semibold text-lg">
              Records
            </h2>

            <input
              type="text"
              placeholder="Search records..."
              className="border px-4 py-2 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div className="overflow-x-auto relative">
            {IsloadData && <p className="text-gray-500 mb-4">Loading Data...</p>}
            <table className="w-full text-sm text-left">

              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="py-3 px-4">Invoice No</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Blinds Type</th>
                  <th className="py-3 px-4">Qty</th>
                  <th className="py-3 px-4">Width</th>
                  <th className="py-3 px-4">Breadth</th>
                  <th className="py-3 px-4">SQ.M</th>
                  <th className="py-3 px-4">Total SQ.M</th>
                  <th className="py-3 px-4">Price/SQ.M</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Report By</th>
                  <th className="py-3 px-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {records.length>0?(records.map((rec) =>
                {
                  const price=parseFloat(String(rec.price).replace(/[^0-9.]/g, "")) || 0;
                 const quantity = parseFloat(rec.quantity) || 0; 
                 const sq=rec.width*rec.breadth;
                 const total= price*quantity;
                 const date=new Date(rec.updated_at)
                 return(
                  <tr  key={rec.id} id={rec.id} className="border-t hover:bg-gray-50 transition">
                    <td className="py-3 px-4 font-medium">{field.Tracking_Id}</td>
                    <td className="py-3 px-4">{rec.location}</td>
                    <td className="py-3 px-4">{rec.parameter}</td>
                    <td className="py-3 px-4">{rec.quantity}</td>
                    <td className="py-3 px-4">{rec.width}</td>
                    <td className="py-3 px-4">{rec.breadth}</td>
                    <td className="py-3 px-4">{sq.toFixed(2)}</td>
                    <td className="py-3 px-4">{(sq*quantity).toFixed(2)}</td>
                    <td className="py-3 px-4">₦{rec.price}</td>
                    <td className="py-3 px-4 font-semibold text-indigo-600">₦{total}</td>
                    <td className="py-3 px-4 font-semibold text-indigo-600">{date.toLocaleDateString()}</td>
                    <td className="py-3 px-4">{selectAgent(rec.agentId)}</td>
                    <td className="py-3 px-4">{rec.agentId==userCred.agentId?(<div className="flex "><Link href={{pathname:'/Records/EditRecord',query:{id:rec.id,from:'Agent'}}}><p className="py-3 rounded-xl font-semibold bg-indigo-600 hover:bg-indigo-700 text-white px-2"><Pencil/></p></Link><p className="py-3 rounded-xl font-semibold bg-red-600 hover:bg-red-700 text-white px-3" onClick={()=>{setOpenDelModal(true);setdelId(rec.id)}}> <Trash2  /></p></div>):''}</td>
                  </tr>
)})):(<tr><td colSpan={7} className="text-center py-4 text-gray-500"> No Record found.</td></tr>)}
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