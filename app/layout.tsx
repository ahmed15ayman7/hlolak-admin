import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ProviderRedux from "@/lib/redux/ProviderRedux";
import MiddelWare from "@/lib/redux/MiddelWare";
// import SocketComp from "@/lib/realtime/SocketComp";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: {
    default: "HLOLAK-ADMIN | AUTH ",
    template: "%s - HLOLAK-ADMIN ",
  },
  description: "HLOLAK-ADMIN",
  openGraph: {
    // type: 'website',
    // url: 'https://www.sporton.website/',
    title: "HLOLAK-ADMIN | AUTH",
    description: "HLOLAK-ADMIN",
    // images: [
    //   {
    // url: 'https://www.sporton.website/logo.png',
    // alt: 'HR CHAT LOGO',
    //   },
    // ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ProviderRedux>
        <body className={inter.className + " bg-[#151c2c] "}>
        <MiddelWare/>
          <div className=" min-h-screen flex w-full items-center justify-center">
            {children}
            {/* <SocketComp/> */}
          </div>
        </body>
      </ProviderRedux>
    </html>
  );
}
