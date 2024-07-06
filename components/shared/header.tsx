"use client"
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavBar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  let pathname =usePathname()
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className="bg-white  p-2 shadow-lg rounded-lg sticky top-0 z-50 flex flex-nowrap justify-center items-center">
      <div className="flex justify-between">
        <div className="flex space-x-32 items-center justify-center h-16 w-full">
          <Link href="/validate_login">
            <p className="mt-2 mb-2 p-2 transition-colors rounded-lg shadow-md hover:bg-blue-500 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
              </svg>
            </p>
          </Link>
          <div className="flex items-center justify-center py-4 px-2 mr-6">
            <Link href="/">
              <p>
                {/* <img className="sm:w-16 lg:w-64 md:w-64 h-24" src="/assets/holoolak_company_logo-fbf516f6af84aea561274ece952ac5827d50fe364275bb06c03631114aec8721.svg" alt="Logo" /> */}
              </p>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            <NavItem href="/" text="الرئيسية" />
            <NavItem href="/services" text="خدماتنا" />
            <NavItem href="/about_us" text="نبذة عنا" />
            <NavItem href="/blog_posts" text="المدونة" />
            <NavItem href="/galleries" text="معرض الصور" />
            <NavItem href="/offers" text="العروض العقارية" />
            <NavItem href="/faqs" text="الأسئلة الشائعة" />
          </div>
        </div>
      </div>
      <div className="md:hidden flex items-center">
        <button
          onClick={toggleSidebar}
          className={`mobile-menu-button p-2 transition-colors rounded-lg shadow-md ${isSidebarOpen ? 'bg-blue-400 text-white' : 'bg-white text-gray-500'}`}
        >
          <svg
            aria-hidden="true"
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        </button>
      </div>
      <div className={`fixed inset-y-0 left-0 z-10 flex-shrink-0 w-80 bg-white border-r-2 border-indigo-100 shadow-lg rounded-tr-3xl rounded-br-3xl overflow-scroll transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <nav aria-label="Main" className="flex flex-col h-full">
          <div className="flex items-center justify-center flex-shrink-0">
            <Link href="/">
              <p>
                <img className="w-32 h-auto" src="/assets/holoolak_company_logo-fbf516f6af84aea561274ece952ac5827d50fe364275bb06c03631114aec8721.svg" alt="Logo" />
              </p>
            </Link>
          </div>
          <div className="flex-1 px-4 space-y-2 overflow-hidden hover:overflow-auto">
            <NavItem href="/" text="الرئيسية" mobile />
            <NavItem href="/service" text="خدماتنا" mobile />
            <NavItem href="/about_us" text="نبذة عنا" mobile />
            <NavItem href="/blog_posts" text="المدونة" mobile />
            <NavItem href="/galleries" text="معرض الصور" mobile />
            <NavItem href="/offers" text="العروض العقارية" mobile />
            <NavItem href="/faqs" text="الأسئلة الشائعة" mobile />
          </div>
        </nav>
      </div>
    </nav>
  );
};

type NavItemProps = {
  href: string;
  text: string;
  mobile?: boolean;
};

    const NavItem: React.FC<NavItemProps> = ({ href, text, mobile }) => {
      let pathname =usePathname()
    let check=href==='/'?false:pathname.includes(href.slice(1))

    return(
<Link href={href}>
    <p className={`h-full flex items-center border-b-4  px-4 py-4 justify-center transition-colors  ${check||(href==='/'&&pathname==='/')?' border-blue-400':'border-transparent'} ${mobile ? 'text-black hover:bg-blue-400 hover:text-white p-2 rounded-lg' : ''}`}>
      {text}
    </p>
  </Link>
)};

export default NavBar;
