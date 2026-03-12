'use client'
import Link from "next/link";

export default function page() {
  return (
  <>

<div>
  <button className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition"><Link href={'Dashboard/Field/CreateField'}>AddField</Link></button>
</div>
 </>
  )
}
