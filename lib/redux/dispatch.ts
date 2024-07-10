export let getUserByRedux=(router: { replace: (arg0: string) => void; },path:string,user: any)=>{
  if (!user) {
    router.replace("/sign-in");
}else if (user){
    if (!user?.onboarding) {
        if(path==="/onboarding"){
            console.log(user);
        }else{
            router.replace("/onboarding");
        }
    } else {
        if (user.type==="admin") {
            if(path.includes("dashboard")){
                console.log(user);
            }else{
                router.replace("/dashboard");
            }
        }
        if (user.type==="employee") {
            if(path.includes("work")){
                console.log(user);
            }else{
                router.replace("/work");
            }
        }

    }
  }
}