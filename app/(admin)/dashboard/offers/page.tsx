"use client"
import { Suspense } from 'react'
import Offers from './Offers'
function SearchBarFallback() {
  return <></>
}
const Page = () => {

  return (
    <Suspense fallback={<SearchBarFallback />} >
      <Offers/>
    </Suspense>
  )
}
export default Page
export const dynamic = 'force-dynamic'