// components/BlogSection.tsx
import Link from 'next/link';
import { useRef } from 'react';

const BlogSection = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (contentRef.current) {
      contentRef.current.scrollTo({
        left: contentRef.current.scrollLeft + 340,
        behavior: 'smooth',
      });
    }
  };

  const scrollLeft = () => {
    if (contentRef.current) {
      contentRef.current.scrollTo({
        left: contentRef.current.scrollLeft - 340,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="blog text-gray-700 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">اخر التدوينات</h1>
          <Link href="/blog_posts">
            <h1 className="text-sm font-medium title-font text-gray-900 underline">عرض المزيد</h1>
          </Link>
        </div>
        <div className="flex flex-nowrap sm:-m-4 -mx-4 -mb-10 -mt-4 justify-center items-center">
          <div
            id="right-button-blog-contenet"
            className="h-10 mt-2 mb-2 p-2 mx-4 flex justify-center transition-colors rounded-lg shadow-md hover:bg-blue-500 hover:text-white cursor-pointer items-center"
            onClick={scrollRight}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </div>
          <div
            className="h-80 flex flex-nowrap sm:-m-4 -mx-4 -mb-10 -mt-4 overflow-x-auto scrollbar-hide"
            id="content-blog-contenet"
            ref={contentRef}
          >
            <div className="p-4 md:w-1/3 md:mb-0 mb-6 flex flex-col justify-center items-center mx-auto">
              <Link className="w-full" href="/blog_post?id=1">
                <div
                  className="bg-gray-300 h-56 w-80 rounded-lg shadow-md bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://holoolak.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb0VKIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--cfcd293d5d5fe124616ad636acad88e69e31c0eb/bb627dc8-7a29-4aee-a9db-95bc874d6629.jpg')",
                  }}
                  data-aos="fade-up-right"
                ></div>
                <div className="w-80 bg-white -mt-10 shadow-lg rounded-lg overflow-hidden p-5" data-aos="fade-up-left">
                  <div className="title-post font-medium">الصفقة العقارية الناجحة </div>
                  <div className="summary-post text-base text-justify">
                    <time dateTime="2024-05-25T14:30:33Z" data-local="time" data-format="%Y/%m/%d">
                      2024/05/25
                    </time>
                  </div>
                </div>
              </Link>
            </div>
            <div className="p-4 md:w-1/3 md:mb-0 mb-6 flex flex-col justify-center items-center mx-auto">
              <Link className="w-full" href="/blog_post?id=2">
                <div
                  className="bg-gray-300 h-56 w-80 rounded-lg shadow-md bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://holoolak.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb0lKIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--ac40b9758910715295369215c5b9025080f60c38/WhatsApp%20Image%202024-05-25%20at%205.33.41%20PM.jpeg')",
                  }}
                  data-aos="fade-up-right"
                ></div>
                <div className="w-80 bg-white -mt-10 shadow-lg rounded-lg overflow-hidden p-5" data-aos="fade-up-left">
                  <div className="title-post font-medium">نصيحة عقارية </div>
                  <div className="summary-post text-base text-justify">
                    <time dateTime="2024-05-25T14:36:45Z" data-local="time" data-format="%Y/%m/%d">
                      2024/05/25
                    </time>
                  </div>
                </div>
              </Link>
            </div>
            <div className="p-4 md:w-1/3 md:mb-0 mb-6 flex flex-col justify-center items-center mx-auto">
              <Link className="w-full" href="/blog_post?id=3">
                <div
                  className="bg-gray-300 h-56 w-80 rounded-lg shadow-md bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://holoolak.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb01KIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--d03ad87bc3f437b66ea62a326d6d24cfeb138d48/69913712-23a1-4597-b7c8-4974bed5e327.jpg')",
                  }}
                  data-aos="fade-up-right"
                ></div>
                <div className="w-80 bg-white -mt-10 shadow-lg rounded-lg overflow-hidden p-5" data-aos="fade-up-left">
                  <div className="title-post font-medium">نصيحة عقارية </div>
                  <div className="summary-post text-base text-justify">
                    <time dateTime="2024-05-25T14:41:43Z" data-local="time" data-format="%Y/%m/%d">
                      2024/05/25
                    </time>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div
            id="left-button-blog-contenet"
            className="h-10 mt-2 mb-2 p-2 mx-4 flex justify-center transition-colors rounded-lg shadow-md hover:bg-blue-500 hover:text-white cursor-pointer items-center"
            onClick={scrollLeft}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
