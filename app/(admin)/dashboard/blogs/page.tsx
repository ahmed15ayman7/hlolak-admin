"use client"


import AddGalleryForm from '@/components/forms/AddGalleryForm'
import React, { useState } from 'react'
import LatestPostsSection from '@/components/shared/LatestPostsSection'
import AddBlogForm from '@/components/forms/AddBlogForm'

const Page = () => {
  let [reload,setReload]= useState(0)
  let [add,setAdd]= useState(false)
  return (
    <div >
      
      {add&&<div className="flex justify-center px-6">
      <div className="w-1/2 max-md:w-full">
      <AddBlogForm setReload={setReload}/>
    </div>
    </div>}
      <LatestPostsSection reload={reload} setAdd={setAdd} isPage add={add}/>
    </div>
  )
}
export default Page
export const dynamic = 'force-dynamic'