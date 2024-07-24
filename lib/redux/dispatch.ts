export let getUserByRedux=(router: { replace: (arg0: string) => void; },path:string,user: any,setLoading:any)=>{
  if (!user) {
    if (path!=="/sign-up") {
        if(path==="/sign-in"){
            setLoading(false)
        }else{
            router.replace("/sign-in");
        }
    }
    if(path==="/sign-up"){
        setLoading(false)
    }
}else if (user){
    if (!user?.onboarding) {
        if(path==="/onboarding"){
            console.log(user.type);
            setLoading(false)
        }else{
            router.replace("/onboarding");
        }
    } else {
        if (user.type==="admin") {
            if(path.includes("dashboard")){
                console.log(user.type);
                setLoading(false)
            }else{
                router.replace("/dashboard");
            }
        }
        if (user.type==="employee") {
            if(path.includes("work")){
                console.log(user.type);
                setLoading(false)
            }else{
                router.replace("/work");
            }
        }

    }
  }
}