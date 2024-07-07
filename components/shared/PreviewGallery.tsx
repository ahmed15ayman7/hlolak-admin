// pages/index.tsx

import React from 'react';

const PreviewGallery: React.FC = () => {
  return (
    <section className="blog text-gray-700 body-font mb-10">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">معرض الصور</h1>
        </div>
        <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 justify-center items-center">
          <div className="p-4 md:w-1/3 md:mb-0 mb-6 flex flex-col justify-center items-center max-w-sm mx-auto">
            <a href="/gallery?id=3" className="w-full">
              <div
                className="bg-gray-300 h-56 w-full rounded-lg shadow-md bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://holoolak.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb2dKIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--a853e8e9d6134cdfd95f31d20740022e924b2f62/f56208ef-38e9-4b3e-9a16-01a8f9d723b6.jpg')",
                }}
                data-aos="fade-down"
              ></div>
              <div className="w-full bg-white -mt-10 h-32 shadow-lg rounded-lg overflow-hidden p-5" data-aos="fade-up">
                <div className="title-post font-medium">مقر العمل</div>
                <div className="text-justify">
                  <time dateTime="2024-05-25T15:02:34Z" data-local="time" data-format="%Y/%m/%d">
                    2024/05/25
                  </time>
                </div>
              </div>
            </a>
          </div>

          <div className="p-4 md:w-1/3 md:mb-0 mb-6 flex flex-col justify-center items-center max-w-sm mx-auto">
            <a href="/gallery?id=2" className="w-full">
              <div
                className="bg-gray-300 h-56 w-full rounded-lg shadow-md bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://holoolak.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb1lKIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--ce96b54dc1074b50f8a0bede5c8b4ea995555a63/3.jpg')",
                }}
                data-aos="fade-down"
              ></div>
              <div className="w-full bg-white -mt-10 h-32 shadow-lg rounded-lg overflow-hidden p-5" data-aos="fade-up">
                <div className="title-post font-medium">طاقم العمل</div>
                <div className="text-justify">
                  <time dateTime="2024-05-25T15:01:25Z" data-local="time" data-format="%Y/%m/%d">
                    2024/05/25
                  </time>
                </div>
              </div>
            </a>
          </div>

          <div className="p-4 md:w-1/3 md:mb-0 mb-6 flex flex-col justify-center items-center max-w-sm mx-auto">
            <a href="/gallery?id=1" className="w-full">
              <div
                className="bg-gray-300 h-56 w-full rounded-lg shadow-md bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://holoolak.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb1FKIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c7d865527b72178c57f62f40833c4ce2795942ee/fe302167-cd4e-45eb-87f2-a258bc9eb41a.jpg')",
                }}
                data-aos="fade-down"
              ></div>
              <div className="w-full bg-white -mt-10 h-32 shadow-lg rounded-lg overflow-hidden p-5" data-aos="fade-up">
                <div className="title-post font-medium">طاقم العمل</div>
                <div className="text-justify">
                  <time dateTime="2024-05-25T15:00:52Z" data-local="time" data-format="%Y/%m/%d">
                    2024/05/25
                  </time>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className="text-center p-2 pt-6">
        <span className="page text-gray-500">&lsaquo;</span>

        <span className="page bg-blue-500 rounded text-white">1</span>

        <span className="page text-gray-500">&rsaquo;</span>
      </div>
    </section>
  );
};

export default PreviewGallery;
