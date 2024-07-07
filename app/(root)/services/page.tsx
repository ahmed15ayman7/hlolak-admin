import Services from '@/components/shared/Services'
import ServicesSection from '@/components/shared/ServicesSection'
import { servicesArray } from '@/constant/services'
import React from 'react'

const Service = () => {
  return (
    <div className=' flex flex-col items-center'>
      {servicesArray.map(service =>
        <Services key={service.img} img={service.img} title={service.title} subTitle={service.subTitle} link={service.link} desc={service.desc} />
     ) }
     <ServicesSection />
    </div>
  )
}

export default Service