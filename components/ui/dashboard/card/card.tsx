import { MdSupervisedUserCircle } from "react-icons/md";
import styles from "./card.module.css";

const Card = ({ item,setType,type }:{ item:{title:string,title2:string,number:number,change:number,},setType:any,type:string }) => {
  return (
    <div className={`${styles.container} ${ type===item.title.split(" ")[1].toLocaleLowerCase()? styles.active:""}`} onClick={()=>setType(item.title.split(" ")[1].toLocaleLowerCase())}>
      <MdSupervisedUserCircle size={24} />
      <div className={styles.texts}>
        <span className={styles.title}>{item.title2}</span>
        <span className={styles.number}>{item.number}</span>
        {/* <span className={styles.detail}>
          <span className={item.change > 0 ? styles.positive : styles.negative}>
            {item.change}%
          </span>{" "}
          {item.change > 0 ? "more" : "less"} than previous week
        </span> */}
      </div>
    </div>
  );
};

export default Card;
