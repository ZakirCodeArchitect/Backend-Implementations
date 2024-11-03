/* Now use async wait to do part ii or part iii. Again, call these functions in above 
mentioned order with the given delays and show the order of execution. See what 
order is followed. */


console.log("\n Part 3: \n")

const signup = async()=>{
    return new Promise((resolve)=>{
        setTimeout(()=>{
            console.log("Signup completed");
            resolve();
        },2000)
    })
}

const sendVerificationCode = async () => {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            console.log("Verification Code sent")
            resolve();
        },4000)
    })
    
}
const  signin = async () =>{
    return new Promise((resolve)=> {
        setTimeout(()=>{
            console.log("signin completed")
            resolve();
        },3500)
    })
}
const getData = async () => {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            console.log("Data retrieved")
            resolve();
        },4500)
    })
}
const checkEmail = async () => {
    return new Promise((resolve) => {
        setTimeout(()=>{
            console.log("Email checked")
            resolve();
        },1500)
    })
}
const composeEmail = async () => {
    return new Promise ((resolve)=>{
        setTimeout(()=>{
            console.log("Email composed")
            resolve();
        },2000)
    })
}

const sendEmail = async () => {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            console.log("Email sent")
            resolve();
        },3000) 
    })
}

const allTasks = async () => {
    await signup();
    await sendVerificationCode();
    await signin();
    await getData();
    await checkEmail();
    await composeEmail();
    await sendEmail();

    console.log("All tasks completed")
}

allTasks();


