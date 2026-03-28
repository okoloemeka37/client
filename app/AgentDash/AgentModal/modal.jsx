'use client'
import React, { useState } from "react";

export default function AddRecordModal({ open, onClose, onSave,parameter,error,mess,Isloading}) {

  const [form, setForm] = useState({location: "", parameter: "",quantity: "",width: "",breadth: "",
  });
 
const [paramChs,setparamChs]=useState('')

function setPrice(name) {
  if (name =="No Parameter") {
    setparamChs(0)
  }else{
  const rt=parameter.filter((rep)=>rep['name']==name);
  setparamChs(rt[0]['price'])
  }
}

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {onSave(form)};

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-lg p-6">
 {mess.message && (
      <div  className={`mb-6 mx-auto max-w-3xl rounded-xl border px-4 py-3 text-sm text-center backdrop-blur ${mess.color === "blue"? "bg-blue-500/10 border-blue-500/30 text-blue-300": "bg-rose-500/10 border-rose-500/30 text-rose-300"}`}>
        {mess.message}
      </div>
    )}
        <h2 className="text-xl font-semibold mb-4">
          Add New Record
        </h2>

        <div className="space-y-4">

          {/* Location */}
          <div>
            <label className="text-sm text-gray-500">Location</label>
            <input type="text"name="location"value={form.location} onChange={handleChange} className="w-full mt-1 border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
            <p className="text-red-500">{error['location']}</p>
          </div>

          {/* Blinds Type Dropdown */}
          <div>
            <label className="text-sm text-gray-500">Blinds Type</label>
            <select  name="parameter"value={form.parameter}onChange={(e)=>{handleChange(e);  setPrice(e.target.value) }} className="w-full mt-1 border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white">
              <option value="">Select Type</option> {parameter.map((Pam, index) => (<option key={index} value={Pam['name']}> {Pam['name']} </option>
              ))}
              <option value="No Parameter">No Parameter</option>
            </select>
            <p>{paramChs}</p>
            <p className="text-red-500">{error['parameter']}</p>
          </div>

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

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <button  onClick={onClose} className="px-4 py-2 rounded-lg border hover:bg-gray-100">Cancel</button>

          <button   onClick={handleSubmit} disabled={Isloading} className={`px-5 flex items-center justify-center gap-2  text-white py-3 rounded-xl font-semibold bg-indigo-600 hover:bg-indigo-700 transition-all shadow-md  ${Isloading ? "opacity-80 cursor-not-allowed" : ""}`} >
            {Isloading && (<span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span> )}
            <span>Save</span></button>
        </div>

      </div>
    </div>
  );
}