"use client"


import AddGalleryForm from '@/components/forms/AddGalleryForm'
import React, { useEffect, useState } from 'react'
import LatestPostsSection from '@/components/shared/LatestPostsSection'
import AddBlogForm from '@/components/forms/AddBlogForm'
import { getUserByRedux } from '@/lib/redux/dispatch'
import { usePathname, useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { selectUser } from '@/lib/redux/userSlice'
import Loader from '@/components/shared/Loader'

const Page = () => {
  let [reload,setReload]= useState(0)
  let [add,setAdd]= useState(false)
  const user = useSelector(selectUser);
  let path = usePathname();
  let router = useRouter();
  let [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    getUserByRedux(router, path, user,setLoading);},[]);
  return (
    <div >
      {loading&&<Loader is/>}
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