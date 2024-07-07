import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: {
    default: "HR CHAT | AUTH | A real-time chat application",
    template: "%s - HR CHAT ",
  },

  description: 'HR CHAT is a seamless instant messaging platform designed for real-time communication. Connect with friends, family, and colleagues through text, voice, and video chat. Enjoy features like group chats, media sharing, and end-to-end encryption to ensure your conversations are secure and private. Available on all major platforms, ChatApp keeps you connected anytime, anywhere.',
  openGraph: {
    type: 'website',
    url: 'https://www.sporton.website/',
    title: 'HR CHAT',
    description: 'HR CHAT is a seamless instant messaging platform designed for real-time communication. Connect with friends, family, and colleagues through text, voice, and video chat. Enjoy features like group chats, media sharing, and end-to-end encryption to ensure your conversations are secure and private. Available on all major platforms, ChatApp keeps you connected anytime, anywhere.',
    images: [
      {
        url: 'https://www.sporton.website/logo.png',
        alt: 'HR CHAT LOGO',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" >
      <body className={inter.className +' '} >
        <div className=" min-h-screen flex w-full items-center justify-center" >
        {children}
        </div>
        </body>
    </html>
  )
}
