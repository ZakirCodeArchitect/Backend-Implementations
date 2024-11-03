
/* 1. First, call these functions in above mentioned order with the given delays and 
        show the order of execution. See what order is followed.  */

console.log("Part 1: \n")

function signup(){
     setTimeout(()=>{
        console.log("Signup completed")
    },2000)
}
function sendVerificationCode(){
     setTimeout(()=>{
        console.log("Verification Code sent")
    },4000)
}
function signin(){
     setTimeout(()=>{
        console.log("signin completed")
    },3500)
}
function getData(){
     setTimeout(()=>{
        console.log("Data retrieved")
    },4500)
}
function checkEmail(){
     setTimeout(()=>{
        console.log("Email checked")
    },1500)
}
function composeEmail(){
     setTimeout(()=>{
        console.log("Email composed")
    },2000)
}

function sendEmail(){
     setTimeout(()=>{
        console.log("Email sent")
    },3000) 
}

signup();
sendVerificationCode();
signin();
getData();
checkEmail();
composeEmail();
sendEmail();

setTimeout(()=>{
    console.log("All Tasks Completed")
}, 5000) // to show all the messages



