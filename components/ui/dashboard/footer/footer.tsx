import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.text}>© جميع الحقوق تمتلكها شركة</div>
      <div className={styles.logo}>حلول الإمكان العقارية</div>
    </div>
  );
};

export default Footer;
