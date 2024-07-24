"use client";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CardPost from "../cards/cardPost";
import { deleteTestimonial, getAllTestimonials } from "@/lib/actions/testimonials.actions";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { SkeletonCard } from "../cards/CardLoad";
interface Testimonial {
  _id: string;
  text: string;
  author: string;
  date: string;
}

const CustomLeftArrow = ({ onClick }: { onClick?: () => void }) => {
  return (
    <button className="custom-arrow custom-left" onClick={onClick}>
      <ChevronLeft color="#ffffff" />
    </button>
  );
};

const CustomRightArrow = ({ onClick }: { onClick?: () => void }) => {
  return (
    <button className="custom-arrow custom-right" onClick={onClick}>
      <ChevronRight color="#ffffff" />
    </button>
  );
};

const Test = ({
  reload,
  isPage,
  setAdd,
  add,
}: {
  reload?: number;
  isPage?: boolean;
  setAdd?: any;
  add?: boolean;
}) => {
  const navigation = useRouter();
  const [showMore, setShowMore] = useState(false);
  const [testimonials2, setTestimonials] = useState<Testimonial[]>([]);
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items:
        testimonials2.length < 3 && testimonials2.length > 1
          ? testimonials2.length - 1
          : testimonials2.length == 1
          ? 1
          : 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 564 },
      items:
        testimonials2.length < 2 && testimonials2.length > 1
          ? testimonials2.length - 1
          : testimonials2.length == 1
          ? 1
          : 2,
    },
    mobile: {
      breakpoint: { max: 564, min: 0 },
      items:
        testimonials2.length < 1 && testimonials2.length > 1
          ? testimonials2.length - 1
          : testimonials2.length == 1
          ? 1
          : 1,
    },
  };

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const items = await getAllTestimonials();
        setTestimonials(items!);
      } catch (err) {
        console.error("Failed to fetch gallery items:", err);
      }
    };

    fetchGalleryItems();
  }, [reload]);
  let hoverCards = [1, 2, 3];
  return (
    <section className="blog text-gray-700 body-font flex items-center justify-center">
      <div className="container max-w-[1000px] px-5 py-16 mx-auto">
        <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">
            أراء من عملائنا
          </h1>
          <div className="flex">
            <Button
              variant={"link"}
              onClick={() => {
                if (isPage) {
                  setAdd(!add);
                } else {
                  navigation.push("/opinion");
                }
              }}>
              <h3 className="text-sm font-medium title-font text-[#bbbac1] underline">
                {add ? "الغاء الاضافه" : " ضف رايك  "}
              </h3>
            </Button>
            <Button
              variant={"link"}
              onClick={() => {
                if (isPage) {
                  setShowMore(!showMore);
                } else {
                  navigation.push("/opinion");
                }
              }}>
              <h3 className="text-sm font-medium title-font text-[#bbbac1] underline">
                عرض {showMore ? "أقل" : "المزيد"}
              </h3>
            </Button>
          </div>
        </div>
        {testimonials2.length === 0 ? (
          <div className="flex justify-center gap-[5%] max-sm:gap-[1%] max-md:gap-[3%] flex-wrap">
            {hoverCards.map((e) => (
              <div
                key={e}
                className="w-[23%] max-md:w-[40%] max-sm:w-[47%] max-lg:w-1/4">
                <SkeletonCard />
              </div>
            ))}
          </div>
        ) : (
          <>
            {showMore ? (
              <div className="flex justify-center gap-[5%] max-sm:gap-[1%] max-md:gap-[3%] flex-wrap">
                {testimonials2.map((item: any) => (
                  <div
                    key={item.text}
                    className="w-[23%] max-md:w-[40%] max-sm:w-[47%] max-lg:w-1/4">
                    <CardPost
                    deleteFunc={deleteTestimonial}
                    id={item._id}
                      disc={item.text}
                      title={item.author}
                      time={format(item.date, "d/M/yyyy")}
                      link={isPage ? `/opinion?id=${item._id}` : "/opinion"}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <Carousel
                responsive={responsive}
                ssr
                infinite
                autoPlay
                autoPlaySpeed={3000}
                keyBoardControl
                customTransition="all .5 ease-in-out"
                transitionDuration={500}
                containerClass="carousel-container"
                // removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
                customLeftArrow={<CustomLeftArrow />}
                customRightArrow={<CustomRightArrow />}>
                {testimonials2.map((item) => (
                  <div key={item?.text} className="p-4 max-md:p-2 max-sm:p-0">
                    <CardPost
                    deleteFunc={deleteTestimonial}
                    id={item._id}
                      disc={item.text}
                      title={item.author}
                      time={format(item.date, "d/M/yyyy")}
                      link={isPage ? `/opinion?id=${item._id}` : "/opinion"}
                    />
                  </div>
                ))}
              </Carousel>
            )}
          </>
        )}
      </div>
    </section>
  );
};

const testimonials2 = [
  {
    text: "تجربة ممتازة وموظفين في قمة الاخلاق وحريصين على ارضاء العميل",
    author: "فؤاد العتيبي",
    date: "2024-05-08",
  },
  {
    text: "مؤسسة حلولك العقارية متميزة وراقية في التعامل بصدق وامانه وإنجاز",
    author: "سعيد القحطاني",
    date: "2024-04-20",
  },
  {
    text: "تجربة ممتازة وموظفين في قمة الاخلاق وحريصين على ارضاء العميل",
    author: "فؤاد العتيبي",
    date: "2024-05-08",
  },
  {
    text: "مؤسسة حلولك العقارية متميزة وراقية في التعامل بصدق وامانه وإنجاز",
    author: "سعيد القحطاني",
    date: "2024-04-20",
  },
];

export default Test;
