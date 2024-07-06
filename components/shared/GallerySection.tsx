"use client"
import Link from 'next/link';
import React, { useRef } from 'react';
const PhotoGallery: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (contentRef.current) {
      contentRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  const scrollLeft = () => {
    if (contentRef.current) {
      contentRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  return (
    <section className="blog text-gray-700 body-font flex items-center justify-center">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-700">معرض الصور</h1>
          <Link href="/galleries">
            <h1 className="text-sm font-medium title-font text-gray-900 underline">عرض المزيد</h1>
          </Link>
        </div>
        <div className="flex flex-nowrap sm:-m-4 -mx-4 -mb-10 -mt-4 justify-center items-center">
          <div
            id="right-button"
            className="h-10 mt-2 mb-2 p-2 mx-4 flex justify-center transition-colors rounded-lg shadow-md hover:bg-blue-500 hover:text-white cursor-pointer items-center"
            onClick={scrollLeft}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </div>
          <div
            className="h-80 flex flex-nowrap sm:-m-4 -mx-4 -mb-10 -mt-4 overflow-x-auto scrollbar-hide"
            id="content"
            ref={contentRef}
          >
            {galleryItems.map((item) => (
              <div key={item.id} className="p-4 md:w-1/3 md:mb-0 mb-6 flex flex-col justify-center items-center mx-auto">
                <Link className="w-full" href={`/gallery?id=${item.id}`}>
                  <div
                    className="bg-gray-300 md:h-56 h-40 w-64 md:w-80 rounded-lg shadow-md bg-cover bg-center"
                    style={{ backgroundImage: `url(${item.imageUrl})` }}
                    data-aos="fade-up-right"
                  ></div>
                  <div
                    className="md:w-80 w-64 bg-white -mt-10 shadow-lg rounded-lg overflow-hidden p-5"
                    data-aos="fade-up-left"
                  >
                    <div className="title-post font-medium">{item.title}</div>
                    <div className="summary-post text-base text-justify">
                      <time dateTime={item.date} data-local="time" data-format="%Y/%m/%d">
                        {item.dateFormatted}
                      </time>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div
            id="left-button"
            className="h-10 mt-2 mb-2 p-2 mx-4 flex justify-center transition-colors rounded-lg shadow-md hover:bg-blue-500 hover:text-white cursor-pointer items-center"
            onClick={scrollRight}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

const galleryItems = [
  {
    id: 1,
    title: 'طاقم العمل',
    date: '2024-05-25T15:00:52Z',
    dateFormatted: '2024/05/25',
    imageUrl: 'https://holoolak.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb1FKIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c7d865527b72178c57f62f40833c4ce2795942ee/fe302167-cd4e-45eb-87f2-a258bc9eb41a.jpg',
  },
  {
    id: 2,
    title: 'طاقم العمل',
    date: '2024-05-25T15:01:25Z',
    dateFormatted: '2024/05/25',
    imageUrl: 'https://holoolak.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb1lKIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--ce96b54dc1074b50f8a0bede5c8b4ea995555a63/3.jpg',
  },
  {
    id: 3,
    title: 'مقر العمل',
    date: '2024-05-25T15:02:34Z',
    dateFormatted: '2024/05/25',
    imageUrl: 'https://holoolak.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb2dKIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--a853e8e9d6134cdfd95f31d20740022e924b2f62/f56208ef-38e9-4b3e-9a16-01a8f9d723b6.jpg',
  },
];

export default PhotoGallery;
