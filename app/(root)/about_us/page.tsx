import PhotoGallery from '@/components/shared/GallerySection'
import AboutPreview from '@/components/shared/about'
import Test from '@/components/shared/test'
import React from 'react'

const About = () => {
  return (
    <div>
      <AboutPreview/>
        <PhotoGallery />
 <Test />
    </div>
  )
}

export default About