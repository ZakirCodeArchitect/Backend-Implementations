const readline = require("readline");
const fs = require('fs'); // Added missing chalk import

const data = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Main function to prompt email input
const EmailInput = () => {
    data.question("Enter your Email Address : ", (email) => {
        if (validateEmail(email)) {
            console.log("Email Format is Valid");
            IPInput();  // then asking for IP
        } else {
            console.log("Email Format is invalid");
            EmailInput();
        }
    });
}

// Function to prompt IP input
const IPInput = () => {
    data.question("Enter IPv4 Address : ", (ip) => {
        if (validateIP(ip)) {
            console.log("IPv4 Address Format is Correct");
            authenticate(ip);
        } else {
            console.log("IPv4 Format is incorrect");
            IPInput();  // Prompt again if IP format is invalid
        }
    });
}

// Function to validate email format using regex
const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

// Function to validate IPv4 address format
const validateIP = (ip) => {
    const Octet = ip.split('.');
    if (Octet.length !== 4) return false;

    for (let part of Octet) {
        const number = parseInt(part, 10);
        if (isNaN(number) || number < 0 || number > 255 || part !== String(number)) {
            return false;
        }
    }
    return true;
}

// Function to read IPs from JSON file
const IPFromFile = (filename) => {
    try {
        const data = fs.readFileSync(filename, "utf-8");
        return JSON.parse(data);
    } catch (err) {
        console.log("Failed to Read File:", filename);
        return [];
    }
}

const whiteList = IPFromFile('White.json');
const blackList = IPFromFile('Black.json');

// Function to authenticate IP
function authenticate(ip){
    if (isIPInList(ip, whiteList)) {
        console.log('Authorized: This IP Address is Authorized');
        data.close(); // Close the readline interface after completion
        return;
    }

    if (isIPInList(ip, blackList)) {
        console.log('Blocked: This IP is Blocked');
        data.close();
        return;
    }

    const ipNetwork = networkAddress(ip);
    for (let entry of whiteList) {
        if (networkAddress(entry.ip_address) === ipNetwork) {
            console.log('Warning: Your IP belongs to an authorized network. Contact the administrator');
            data.close();
            return;
        }
    }

    addToPending(ip);
    console.log("Failed to authenticate, added to Pending.json File");
    data.close();
}

// Function to get network address assuming /24 subnet
function networkAddress(ip) {
    const octet = ip.split('.');
    octet[3] = '0';
    return octet.join('.');
}

// Helper function to check if IP is in the list
function isIPInList(ip, ipList) {
    for (let entry of ipList) {
        if (ip === entry.ip_address) {
            return true;
        }
    }
    return false;
}

// Function to add unrecognized IP to "Pending.json"
function addToPending(ip) {
    const pendingData = IPFromFile('Pending.json');
    pendingData.push({ ip_address: ip, name: "Unknown" }); // Adding a default name
    fs.writeFileSync('Pending.json', JSON.stringify(pendingData, null, 2), 'utf-8');
}

// Start the email input prompt
EmailInput();

