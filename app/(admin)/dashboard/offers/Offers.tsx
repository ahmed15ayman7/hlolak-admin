"use client"
import React, { useEffect, useState } from 'react'
import OffersSection from '@/components/shared/OffersSection'
import AddOffersForm from '@/components/forms/AddOffersForm'
import { getUserByRedux } from '@/lib/redux/dispatch'
import { usePathname, useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { selectUser } from '@/lib/redux/userSlice'
import Loader from '@/components/shared/Loader'

const Galleries = () => {
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
      <AddOffersForm setReload={setReload}/>
    </div>
    </div>}
      <OffersSection reload={reload} setAdd={setAdd} isPage add={add}/>
    </div>
  )
}
export default Galleries
export const dynamic = 'force-dynamic'