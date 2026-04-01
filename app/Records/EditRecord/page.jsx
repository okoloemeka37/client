'use client'
import { useSearchParams ,useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { EditRec,UpdateRec } from "@/app/Functions/Field";
import AgentLayout from "@/app/AgentDash/layout";
import DashboardLayout from "@/app/Dashboard/layout";



export default function EditRecord() {
  const router=useRouter()

const params=useSearchParams();
const id=params.get('id');
const from=params.get('from')

  const [form, setForm] = useState({location: "", parameter: "",quantity: "",width: "",breadth: "",});
const [paramChs,setparamChs]=useState('')
  const [Isloading, setIsloading] = useState(false);
const [mess, setmess] = useState({message:'',color:''})
const [parameter, setparameter] = useState({})
const [error, seterror] = useState({location:"",parameter:"",quantity:"",breadth:"",width:""});
const[test,settest]=useState(0)

function get(){
  EditRec(id).then(rep=>{
    settest(rep.data.quest.length)
    setForm(rep.data.quest[0])
    setparamChs(rep.data.quest[0]['price'])
    setparameter(rep.data.parameter)
  })
}

useEffect(() => {
get()
}, [])


function showPrice(name) {
  if (name =="No Parameter") {
    setparamChs(0)
  }else{
  const rt=parameter.filter((rep)=>rep['name']==name);
  setparamChs(rt[0]['price'])
  }
}

 
const handleChange = (e) => {setForm({...form,[e.target.name]: e.target.value, });};

function setPrice(name) {
  console.log(name)
  if (name =="No Parameter") { return {id:'0',price:'0'} }else{
  const found = parameter.find(rep => rep.name === name);
  return found ? { id:found['parameterId'] , price:found['price'] } : { id: '', price: '' };
  }
}

 const handleSubmit =async () => {
  setIsloading(true)
  const par=setPrice(form.parameter)
    console.log(par)
    const updatedForm= {...form,'ect':par,'price':par.price,'parameterId':par.id};

  try {
    
    const resp=await UpdateRec(updatedForm);
     setmess(resp.data)
         seterror({location:"",parameter:"",quantity:"",breadth:"",width:""})
setIsloading(false)
if (from =="Agent") {
  router.push(`/AgentDash/AgentField/${form.fieldId}`)
}else{router.push(`/Dashboard/Inv/Invoice/ViewInvoice/${form.Tracking_Id}`)}
  } catch (error) {
    if (error.response) {
        setIsloading(false)
        if (error.response.status==400 && error.response.data['type']=='empty' ) {
           seterror(error.response.data)
        }
       
       }
  }
 
 };


return (
  <>
    {from === "Admin" ? <DashboardLayout /> : <AgentLayout />}
    <div className="flex items-center justify-center">

 
      <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-lg p-6">
     {mess.message && (<div  className={`mb-6 mx-auto max-w-3xl rounded-xl border px-4 py-3 text-sm text-center backdrop-blur ${mess.color === "blue"? "bg-blue-500/10 border-blue-500/30 text-blue-300": "bg-rose-500/10 border-rose-500/30 text-rose-300"}`}>{mess.message}</div>)}
        <h2 className="text-xl font-semibold mb-4"> Edit Record </h2>

      {test==0 ?('No Record Found'):(
          <div className="space-y-4">

          {/* Location */}
          <div>
            <label className="text-sm text-gray-500">Location</label>
            <input type="text"name="location"value={form.location} onChange={handleChange} className="w-full mt-1 border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
            <p className="text-red-500">{error['location']}</p>
          </div>

          {/* Parameter  Dropdown */}
         {<div>
            <label className="text-sm text-gray-500">Blinds Type</label>
            <select  name="parameter"value={form.parameter}onChange={(e)=>{handleChange(e);  showPrice(e.target.value) }} className="w-full mt-1 border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white">
              <option value="">Select Type</option> {parameter.map((Pam, index) => (<option key={index} value={Pam['name']}> {Pam['name']} </option>
              ))}
              <option value="No Parameter">No Parameter</option>
            </select>
            <p>{paramChs}</p>
            <p className="text-red-500">{error['parameter']}</p>
          </div> }

          {/* Qty */}
          <div>
            <label className="text-sm text-gray-500">Quantity</label>
            <input type="number" name="quantity"min={0} value={form.quantity} onChange={handleChange}  className="w-full mt-1 border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
              <p className="text-red-500">{error['quantity']}</p>
          </div>

          {/* Width & Breadth */}
          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="text-sm text-gray-500">Width</label>
              <input type="number"  name="width" value={form.width}  onChange={handleChange}  className="w-full mt-1 border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
              <p className="text-red-500">{error['width']}</p>
            </div>

            <div>
              <label className="text-sm text-gray-500">Breadth</label>
              <input type="number" name="breadth"  value={form.breadth}   onChange={handleChange}   className="w-full mt-1 border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
              <p className="text-red-500">{error['breadth']}</p>
            </div>

          </div>

        </div>
      )}

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
         

          <button  onClick={handleSubmit}  disabled={Isloading} className={`px-5 flex items-center justify-center gap-2  text-white py-3 rounded-xl font-semibold bg-indigo-600 hover:bg-indigo-700 transition-all shadow-md  ${Isloading ? "opacity-80 cursor-not-allowed" : ""}`} >
            {Isloading && (<span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span> )}
            <span>Save</span></button>
        </div>

      </div>
    </div>
    </>
  );
}