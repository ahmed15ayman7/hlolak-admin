"use client"
import { Button } from '@/components/ui/button'
import { usePathname,useRouter } from 'next/navigation'
import React from 'react'

const page = () => {
let path = usePathname()
let navigate=useRouter()
  return (
    <div className=' min-h-full flex justify-center items-center'>
        <div className="flex flex-col gap-20 text-white text-center " style={{fontSize:"50px"}}>
    <h2><strong>{path}</strong> <br/> is not found</h2>
        <Button className='bg-[#f00] hover:bg-[#ff000070] ' onClick={()=>navigate.back()}>Go Back</Button>
        </div>
    </div>
  )
}

export default page