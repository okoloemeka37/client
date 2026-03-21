"use client";
import { useState } from "react";
import { removeAgent } from "../Functions/Field";
import {useRouter } from "next/navigation";

export default function AgentModal({fieldId, status, initialAgents, onClose }) {


  const [agents, setAgents] = useState(initialAgents);
  const router=useRouter(); 

  const regent =(agentId) => {
    console.log(agentId)
     removeAgent(agentId,fieldId).then((res)=>{
   onClose()
   })
  };

  return (
    <>
      {status && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
          onClick={() => {
            onClose();
          }}
        >
          {/* Modal Content */}
          <div
            className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Agents
            </h2>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {agents.length === 0 && (
                <p className="text-gray-500 text-center">
                  No agents available
                </p>
              )}
              {agents.map((agt, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center px-4 py-2 rounded-lg hover:bg-indigo-50 transition"
                >
                  <span className="text-gray-800">{agt.name}</span>
                  <button
                    onClick={() => regent(agt.agentId)}
                    className="text-red-500 hover:text-red-700 text-sm font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}