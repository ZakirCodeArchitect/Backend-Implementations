/* 2 You should now use callbacks to execute the functions in the given order so that 
the order of events is intact.  Again, call these functions in above mentioned order 
with the given delays and show the order of execution. See what order is followed. */

console.log("\n Part 2: \n")

function signup(callback){
    setTimeout(()=>{
       console.log("Signup completed");
       callback()
   },2000)
}
function sendVerificationCode(callback){
    setTimeout(()=>{
       console.log("Verification Code sent")
       callback()
   },4000)
}
function signin(callback){
    setTimeout(()=>{
       console.log("signin completed")
       callback()
   },3500)
}
function getData(callback){
    setTimeout(()=>{
       console.log("Data retrieved")
       callback()
   },4500)
}
function checkEmail(callback){
    setTimeout(()=>{
       console.log("Email checked")
       callback()
   },1500)
}
function composeEmail(callback){
    setTimeout(()=>{
       console.log("Email composed")
       callback()
   },2000)
}

function sendEmail(callback){
    setTimeout(()=>{
       console.log("Email sent")
       callback()
   },3000) 
}

signup(()=>{
    sendVerificationCode(()=>{
        signin(()=>{
            getData(()=>{
                checkEmail(()=>{
                    composeEmail(()=>{    
                        sendEmail(()=>{
                            console.log("All Tasks Completed")
                        });
                    });
                });
            });
        });
    });
});