import React from 'react';
import CardPost from '../cards/cardPost';

const LatestPostsSection: React.FC = () => {
    let blog_posts=[
        {
            title:"نصيحة عقارية",img:"https://holoolak.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb01KIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--d03ad87bc3f437b66ea62a326d6d24cfeb138d48/69913712-23a1-4597-b7c8-4974bed5e327.jpg",link:"/blog_posts/3",time:"2024/05/25"
        },
        {
            title:"نصيحة عقارية",img:"https://holoolak.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb0lKIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--ac40b9758910715295369215c5b9025080f60c38/WhatsApp%20Image%202024-05-25%20at%205.33.41%20PM.jpeg",link:"/blog_posts/2",time:"2024/05/25"
        },
        {
            title:"الصفقة العقارية الناجحة",img:"https://holoolak.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb0VKIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--cfcd293d5d5fe124616ad636acad88e69e31c0eb/bb627dc8-7a29-4aee-a9db-95bc874d6629.jpg",link:"/blog_posts/1",time:"2024/05/25"
        },
    ]
  return (
    <section className="blog text-gray-700 body-font mb-10">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">اخر التدوينات</h1>
        </div>
        <div className="flex flex-nowarp sm:-m-4 -mx-4 -mb-10 -mt-4 justify-center items-center">
          <div className="h-full lg:flex xl:flex 2xl:flex flex-wrap sm:-m-4 -mb-10 -mt-4 w-full">
            
          {blog_posts.map(e=>

<CardPost key={e.link} link={e.link} title={e.title} img={e.img} time={e.time}/>
)}
         
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

export default LatestPostsSection;
