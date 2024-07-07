import Link from 'next/link';
const Services = ({img,title,subTitle,link,desc}:{img:string,title:string,subTitle:string,link:string,desc:string}) => {
return (
    <section className="mt-10  text-gray-700 body-font">
      <div className="mx-4  container px-5 py-24 shadow-xl bg-white rounded-lg ">
        <div className="lg:flex  flex-nowrap -mt-4">
          <div className="flex h-auto lg:w-3/6 xl:w-3/6 2xl:w-3/6 rounded-lg shadow-md p-2 m-4" data-aos="fade-up">
            <img
              className="w-full"
              src={img}
              alt="Description"
            />
          </div>
          <div className="w-full">
            <div className="flex w-full justify-center">
              <span className="flex mt-10 w-full mb-4 h-10 items-center md:flex-row max-w-6xl justify-center py-4 bg-gray-100 text-gray-700 text-l font-medium mr-2 px-2.5  rounded dark:bg-gray-700 dark:text-gray-300 border border-gray-300" data-aos="fade-up">
              {title}
              </span>
            </div>
            <div className="flex justify-center">
              <h2 className="font-bold my-10 text-xl" data-aos="fade-up">
                {subTitle}
              </h2>
            </div>
            <div className="flex justify-center">
              <p className="break-words mb-10" data-aos="fade-up">
                {desc}
              </p>
            </div>
            <div className="flex justify-center">
              <Link className="btn-blue p-3 mt-4" href={link}>
                تقدم بطلب الخدمة الآن
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
