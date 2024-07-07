// pages/index.tsx

import React from 'react';

const FaqSection: React.FC = () => {
  return (
    <section className="blog text-gray-700 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
          <h1 className="sm:text-3xl text-4xl font-medium title-font mb-2 text-gray-700">الأسئلة الشائعة</h1>
          <img className="w-80 h-80" src="https://holoolak.com/assets/holoolak_company_logo-fbf516f6af84aea561274ece952ac5827d50fe364275bb06c03631114aec8721.svg" />
        </div>

        <div className="flex flex-col p-2 py-6">
          <form className="simple_form new_faq" id="new_faq" noValidate action="/faqs" acceptCharset="UTF-8" method="get">
            <div className="bg-white items-center justify-between w-full flex rounded-full shadow-lg p-2 mb-5 sticky top-5">
              <div className="input string optional faq_by_question w-full">
                <input
                  className="string optional font-bold rounded-full w-full p-4 pl-4 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline lg:text-sm text-xs"
                  name="by_question"
                  placeholder="السؤال يحتوي على"
                  type="text"
                  id="faq_by_question"
                />
              </div>
              <input
                type="submit"
                name="commit"
                value="بحث"
                className="bg-gray-600 p-2 hover:bg-blue-400 cursor-pointer mx-2 rounded-full text-white"
                data-disable-with="بحث"
              />
            </div>
          </form>

          <div className="flex flex-wrap sm:-m-4 -mb-10 -mt-4">
          

            {qutations.map(e=><Qutation title={e.title} answer={e.answer}/>)}
            
        </div>
        </div>

        <div className="text-center p-2 pt-6">
          <span className="page text-gray-500">&lsaquo;</span>
          <span className="page bg-blue-500 rounded text-white">1</span>
          <span className="page text-gray-500">&rsaquo;</span>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
let qutations=[

    {
        title:"هل خدماتكم تشمل جميع أنحاء المملكة؟",answer:"نعم، خدماتنا تشمل كافة مناطق المملكة العربية السعودية."
    },
    {
                   

        title:"هل يوجد لديكم إعادة تمويل عقاري؟",answer:"نعم، يوجد لدينا حلول لإعادة التمويل العقاري وفك الرهن."
    },
    {
        title:"هل النسبة عندكم ثابتة أو متغيرة؟",answer:"النسبة لدينا ثابتة وغير متغيرة."
    },
    {
        title:"هل يوجد إعفاء في حال الوفاة أو العجز التام لا قدر الله؟",answer: ` نعم، يوجد إعفاء في حال الوفاة أو العجز التام.`
    },
]
let Qutation=({title,answer}:{title:string,answer:string})=><div className="p-4 md:mb-0 mb-20 flex w-1/2 flex-col justify-center items-center">
<div className="flex bg-gray-300 h-32 w-full rounded-lg shadow-md bg-cover bg-center justify-center items-center transition-colors" data-aos="fade-down">
  <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-700">{title} </h1>
</div>
<div className="w-full bg-white -mt-10 shadow-lg rounded-lg overflow-hidden p-10" data-aos="fade-up">
  <div className="title-post font-medium mr-2">
    <p>{answer}</p>
  </div>
</div>
</div>
