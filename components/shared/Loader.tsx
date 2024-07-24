const Loader = ({is}:{is?:boolean}) => (
  <div className="fixed left-1/2 top-10 translate-x-1/2">

    <div className={`${is?'flex justify-center items-center h-[20vh] ':''} w-full`}>
      <img
        src={`/assets/loader.svg`}
        alt="loader"
        width={is?100:24}
        height={is?100:24}
        className={`animate-spin`}
        />
    </div>
        </div>
  );
  
  export default Loader;