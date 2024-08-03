// CustomToast.js
import Link from 'next/link';
import styles from './CustomToast.module.css'; // Optional: for custom styles
import { FaEnvelope } from 'react-icons/fa';

const CustomToast = ({content,name,link}:{content:string,name:string,link:string}) => {
  return (
    <div className={styles.toast}>
      <Link href={link}>
      <FaEnvelope style={{ marginRight: '8px' }} />
       <p>{`رساله جديده من ${name}`}</p>
       <p>{content}</p>
      </Link>
    </div>
  );
};

export default CustomToast;
