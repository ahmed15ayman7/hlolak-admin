import React from 'react'

const AboutPreview = () => {
  return (
    <section className="blog text-gray-700 body-font">
    <div className="container px-5 py-24 mx-auto">
      <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
        <h1 className="sm:text-3xl text-4xl font-medium title-font mb-2 text-gray-700">نبذة عنا</h1>
        <img className=" w-80 h-80 " src="https://holoolak.com/assets/holoolak_company_logo-fbf516f6af84aea561274ece952ac5827d50fe364275bb06c03631114aec8721.svg" />
      </div>
      <div className="sm:-m-4 -mb-10 -mt-4">
        <div className="p-4 md:mb-0 mb-20 mt-40 flex flex-col justify-center items-center">
          <div className="flex bg-gray-300 h-32 w-full rounded-lg shadow-md bg-cover bg-center justify-center items-center transition-colors " data-aos="fade-down">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-700">المؤسسة الأمثل في مجال وساطة التمويل والرهن العقاري .</h1>
          </div>
          <div className="w-full bg-white -mt-10 shadow-lg rounded-lg overflow-hidden p-10" data-aos="fade-up">
            <div className="title-post font-medium mr-2"><p>حلولنا التمويلية طريقك الاسهل لتملك بيت العمر .</p></div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default AboutPreview