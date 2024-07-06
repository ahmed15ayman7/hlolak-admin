// components/Testimonial.js
import React from 'react';

const Testimonial = ({ text, author, date }:{text:string, author:string, date:string}) => {
  return (
    <div className="p-4 md:w-1/3 md:mb-0 mb-6 flex flex-col justify-center items-center max-w-sm mx-auto">
      <p className="p-2 md:h-56 h-40 rounded-lg shadow-md break-words md:w-80 w-64 bg-cover bg-center text-center justify-center">{text}</p>
      <div className="md:w-80 w-64 bg-white -mt-10 shadow-lg rounded-lg overflow-hidden p-5">
        <div className="title-post font-medium">{author}</div>
        <div className="flex items-center space-x-1">
          {/* Rating SVGs */}
        </div>
        <div className="title-post text-xs">
          <time dateTime={date} data-local="time" data-format="%Y/%m/%d">
            {date}
          </time>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
