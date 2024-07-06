// pages/index.tsx
import Testimonial from './Testimonial';

const testimonials = [
  {
    text: 'تجربة ممتازة وموظفين في قمة الاخلاق وحريصين على ارضاء العميل',
    author: 'فؤاد العتيبي',
    date: '2024-05-08',
  },
  {
    text: 'مؤسسة حلولك العقارية متميزة وراقية في التعامل بصدق وامانه وإنجاز',
    author: 'سعيد القحطاني',
    date: '2024-04-20',
  },
  // Add more testimonials as needed
];

const Test = () => {
  return (
    <div className="blog text-gray-700 body-font flex items-center justify-center">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
            أراء من عملائنا
          </h1>
        </div>
        <div className="flex flex-nowarp sm:-m-4 -mx-4 -mb-10 -mt-4 justify-center items-center">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              text={testimonial.text}
              author={testimonial.author}
              date={testimonial.date}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Test;
