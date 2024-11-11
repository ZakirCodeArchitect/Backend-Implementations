const readline = require("readline");

const data = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

data.question("Enter Your name: ", async (name) => {
    const {default: chalk} = await import('chalk');
    if(name && name[0] === name[0].toUpperCase())
    {
        const StyledName = chalk.bgGreen.bold.white(name);
        console.log("Your Styled Name: ", StyledName)
    }
    else{
        console.log(chalk.red("First Letter of your name should be Capital"))
    }
    data.close();
})

