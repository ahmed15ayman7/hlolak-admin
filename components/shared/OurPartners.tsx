import { useEffect } from 'react';

const partners = [
  '/assets/partner_logos/Al_Rajhi_Bank_Logo.svg-fa4b3988798f2265e00b86812457359adeec6558d3af37f346be22a1fde0f829.png',
  '/assets/partner_logos/sinb-94226b2cfce277fefdb8ed6603bfc4e629f4818dce2de95ac9ef2a1a983138c4.png',
  '/assets/partner_logos/arabic-be35968119a2229edb15d1cfc1f25359b919c0428f00fcd38b7cdf795d3537ff.jpg',
  '/assets/partner_logos/Bank_Albilad_logo-b397c672f6de60a9520ce3febb428a2a097a4ea31055a1e6a6eceec1cc34c1b4.png',
  '/assets/partner_logos/bidayah-0fbbea2e2cffa802b9de3024f6d0fe8ef935a354af7daf2f8f02d73ed055092d.png',
  '/assets/partner_logos/gulf_finance-d6bdddcc8ce1483a18676797fe4e3a39ce3891121ecebc4b14f3b3a5deb64044.jpg',
  '/assets/partner_logos/meem-44e9b310dd6606952c3299f1b5143147349132634817d971abf9e02c6feebe97.jpg',
  '/assets/partner_logos/Riyad_Bank_logo.svg-2a9669c0a7e100502ca9f5c64c12e7114170ddf2b06375b0738e0cb8b77b2ab1.png',
  '/assets/partner_logos/SABB_Bank_Logo.svg-42e37a0bb7fd893b90f2e5929b0d4a430544e665988b5e11afe88f12d6122833.png',
  '/assets/partner_logos/sfc-e4ea18e6308c64707aa1937550297b8af81aee237a68f648256b5162538fb23e.jpg',
  '/assets/partner_logos/shl-fab4da39e86fcfd13b91a76c3e6af6b636e4420e02e8d5be73e821eac8f0c0dd.png',
  '/assets/partner_logos/tmkeen-2a5e66a11d69ef955edee6d6d3feddff7b21eef6d2fd391defc29bec5cca4c2e.png',
  '/assets/partner_logos/emkan-aa9bace15d6680ad6bac1d127d7e4067e7393b863321e3f1f980df607fae37c4.svg',
];

const IndexPage: React.FC = () => {
  useEffect(() => {
    const rightButton = document.getElementById('right-button-partner-contenet');
    const leftButton = document.getElementById('left-button-partner-contenet');
    const content = document.getElementById('content-partner-contenet');

    const scrollRight = () => {
      if (content) {
        content.scrollTo({
          left: content.scrollLeft + 340,
          behavior: 'smooth',
        });
      }
    };

    const scrollLeft = () => {
      if (content) {
        content.scrollTo({
          left: content.scrollLeft - 340,
          behavior: 'smooth',
        });
      }
    };

    if (rightButton && leftButton && content) {
      rightButton.addEventListener('click', scrollRight);
      leftButton.addEventListener('click', scrollLeft);
    }

    return () => {
      if (rightButton && leftButton) {
        rightButton.removeEventListener('click', scrollRight);
        leftButton.removeEventListener('click', scrollLeft);
      }
    };
  }, []);

  return (
    <section className="blog text-gray-700 body-font flex items-center justify-center">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">شركاؤنا</h1>
        </div>
        <div className="flex flex-nowrap sm:-m-4 -mx-4 -mb-10 -mt-4 justify-center items-center ">
          <div
            id="right-button-partner-contenet"
            className="h-10 mt-2 mb-2 p-2 mx-4 flex justify-center transition-colors rounded-lg shadow-md hover:bg-blue-500 hover:text-white cursor-pointer items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </div>
          <div
            className="h-80 flex flex-nowrap sm:-m-4 -mx-4 -mb-10 -mt-4 overflow-x-auto scrollbar-hide"
            id="content-partner-contenet"
          >
            {partners.map((partner, index) => (
              <div
                key={index}
                className="p-4 md:w-1/3 md:mb-0 mb-6 flex flex-col justify-center items-center max-w-sm mx-auto"
              >
                <div
                  className="flex justify-center items-center w-40 md:w-80 bg-white -mt-10 shadow-lg h-32 md:h-48 rounded-lg overflow-hidden p-5"
                  data-aos={index % 2 === 0 ? 'fade-down' : 'fade-up'}
                >
                  <img className="w-full" src={partner} alt={`Partner ${index}`} />
                </div>
              </div>
            ))}
          </div>
          <div
            id="left-button-partner-contenet"
            className="h-10 mt-2 mb-2 p-2 mx-4 flex justify-center transition-colors rounded-lg shadow-md hover:bg-blue-500 hover:text-white cursor-pointer items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndexPage;
