

const ClientStatsSection = () => {


  return (
    <section className="blog text-gray-700 body-font flex items-center justify-center">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap sm:-m-4 ">
          <div className="p-4 md:w-1/2 md:mb-0 mb-6 flex flex-col justify-center items-center max-w-sm mx-auto">
            <div className="bg-gray-300 h-40 w-40 rounded-full shadow-md bg-cover bg-center flex justify-center items-center transition duration-300 transition-colors hover:bg-blue-500 hover:text-white">
              <div className="count font-bold text-2xl" data-target="1822">
                0
              </div>
              <div className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 font-bold -mr-1"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                </svg>
              </div>
            </div>
            <div className="w-64 bg-white -mt-10 shadow-lg rounded-lg overflow-hidden p-5 flex items-center justify-center">
              <div className="title-post font-medium text-xl">عملاء جاري خدمتهم</div>
            </div>
          </div>
          <div className="p-4 md:w-1/2 md:mb-0 mb-6 flex flex-col justify-center items-center max-w-sm mx-auto">
            <div className="bg-gray-300 h-40 w-40 rounded-full shadow-md bg-cover bg-center flex justify-center items-center transition duration-300 transition-colors hover:bg-blue-500 hover:text-white">
              <div className="count font-bold text-2xl" data-target="4154">
                0
              </div>
              <div className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 font-bold -mr-1"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                </svg>
              </div>
            </div>
            <div className="w-64 bg-white -mt-10 shadow-lg rounded-lg overflow-hidden p-5 flex items-center justify-center">
              <div className="title-post font-medium text-xl">عملاء تمت خدمتهم</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientStatsSection;
