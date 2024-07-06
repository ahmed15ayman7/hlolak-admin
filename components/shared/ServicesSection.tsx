import React from 'react';

const ServicesSection: React.FC = () => {
  return (
    <section className="blog text-gray-700 body-font flex items-center justify-center">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">خدماتنا</h1>
          <p className="lg:w-1/2 xl:w-1/2 w-full leading-relaxed text-base">
            حلول تمويلية تمكنك من امتلاك بيت العمر بكل يسر وسهولة.
          </p>
        </div>
        <div className="flex flex-wrap sm:-m-4 -mb-10 -mt-4">
          {services.map((service, index) => (
            <div key={index} className="p-4 md:w-1/4 md:mb-0 mb-6 flex flex-col justify-center items-center max-w-sm mx-auto">
              <div className={`flex bg-gray-300 h-32 w-32 rounded-full shadow-md bg-cover bg-center justify-center items-center transition-colors transition duration-300 hover:bg-blue-500 hover:text-white`} data-aos="fade-down">
                {service.icon}
              </div>
              <div className="w-64 bg-white -mt-10 shadow-lg rounded-lg overflow-hidden p-5" data-aos="fade-up">
                <div className="header-content inline-flex ">
                  <div className={`category-badge flex-1 h-4 w-4 m rounded-full m-1 ${service.badgeColor}`}>
                    <div className="h-2 w-2 rounded-full m-1 bg-blue-500"></div>
                  </div>
                  <div className="category-title flex-1 text-sm">{service.category}</div>
                </div>
                <div className="title-post font-medium mr-2">{service.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const services = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-20 h-20">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
    badgeColor: 'bg-blue-100',
    category: 'حلول',
    title: 'تمويلية للعقارات',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-20 h-20">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    badgeColor: 'bg-yellow-100',
    category: 'الرهن',
    title: 'العقاري',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-20 h-20">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    badgeColor: 'bg-blue-100',
    category: 'خدمات',
    title: 'استشاريه',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-20 h-20">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    badgeColor: 'bg-green-100',
    category: 'توحيد',
    title: 'الاقساط',
  },
];

export default ServicesSection;
