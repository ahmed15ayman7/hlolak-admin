
import ServiceForm from '@/components/forms/ServiceForm'
import React from 'react'

const Page = () => {
  return (
    <div className=" flex flex-col w-full justify-center gap-10 items-center min-h-screen">
        <h1 className="text-[30px]" > اضافة محتسب جديد</h1>
    <div className="flex items-center w-full ">
        
        <ServiceForm emp/>
    </div>
    </div>
  )
}

export default Page