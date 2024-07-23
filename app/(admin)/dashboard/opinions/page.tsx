"use client"
import { Suspense } from 'react'
import Opinion from './opinian'
function SearchBarFallback() {
  return <></>
}
const Page = () => {

  return (
    <Suspense fallback={<SearchBarFallback />} >
      <Opinion/>
    </Suspense>
  )
}
export default Page
export const dynamic = 'force-dynamic'