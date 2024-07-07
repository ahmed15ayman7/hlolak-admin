import Link from 'next/link'
import React from 'react'

const CardPost = ({title,img,link,time}:{title:string,img:string,link:string,time:string}) => {
  return (
    <div className="p-4 md:w-1/3 md:mb-0 mb-6 flex flex-col justify-center items-center max-w-sm mx-auto">
              <Link href={link} className="w-full">
                <div
                  className="bg-gray-300 h-56 w-full rounded-lg shadow-md bg-cover bg-center"
                  style={{ backgroundImage: `url('${img}')` }}
                  data-aos="fade-down"
                ></div>
                <div className="w-full bg-white -mt-10 h-32 shadow-lg rounded-lg overflow-hidden p-5" data-aos="fade-up-left">
                  <div className="title-post font-medium">{title}</div>
                  <div className="text-justify">
                    <time dateTime="2024-05-25T14:36:45Z" data-local="time" data-format="%Y/%m/%d">
                      {time}
                    </time>
                  </div>
                </div>
              </Link>
            </div>
  )
}

export default CardPost