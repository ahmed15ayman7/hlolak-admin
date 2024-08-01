"use client"

import Link from 'next/link'
import styles from './menuLink.module.css'
import { usePathname } from 'next/navigation'

const MenuLink = ({item}:{item:{path:string,icon:JSX.Element,title:string}}) => {

  const pathname = usePathname()

  return (
    <Link href={item.path} className={`${styles.container} ${pathname === item.path && styles.active} max-lg:p-0 `}>
      <span className="max-lg:scale-150">
      {item.icon}
      </span>
      <span className="max-lg:hidden">

      {item.title}
      </span>
    </Link>
  )
}

export default MenuLink