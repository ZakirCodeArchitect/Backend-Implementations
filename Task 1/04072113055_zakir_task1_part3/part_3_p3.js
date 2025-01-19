/* 3. Now you should use promises to do part ii. Again, call these functions in above 
mentioned order with the given delays and show the order of execution. See what 
order is followed.  */

console.log("\n Part 3: \n")

function signup(){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            console.log("Signup completed");
            resolve();
        },2000)
    })
}
function sendVerificationCode(){
    
    return new Promise((resolve)=>{
        setTimeout(()=>{
            console.log("Verification Code sent")
            resolve();
        },4000)
    })
    
}
function signin(){
    return new Promise((resolve)=> {
        setTimeout(()=>{
            console.log("signin completed")
            resolve();
        },3500)
    })
}
function getData(){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            console.log("Data retrieved")
            resolve();
        },4500)
    })
}
function checkEmail(){
    return new Promise((resolve) => {
        setTimeout(()=>{
            console.log("Email checked")
            resolve();
        },1500)
    })
}
function composeEmail(){
    return new Promise ((resolve)=>{
        setTimeout(()=>{
            console.log("Email composed")
            resolve();
        },2000)
    })
}

function sendEmail(){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            console.log("Email sent")
            resolve();
        },3000) 
    })
}

signup()
    .then(sendVerificationCode)
    .then(signin)
    .then(getData)
    .then(checkEmail)
    .then(composeEmail)
    .then(sendEmail)
    .then(()=>{
    console.log("All Tasks Completed")
})