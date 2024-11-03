import fs from "fs/promises"
import path from "path"

// const list1 = ["\nAhmed", "\nMohammad", "Ali", "Firoz"]

const fileName = "Ips.txt";
const Fpath = path.join(process.cwd(), fileName)

try {

    // reading data from the file :
    const data = await fs.readFile(Fpath, 'utf8');

    // splitting the data from the file
    const ipAddresses = data
        .split('\n')
        .map(ip => ip.trim())
        .filter(ip => ip);


    // declaring and initializing the array with zero
    let classA = [];

    // running the loop 
    ipAddresses.forEach(ip => {
        // for each split by . in an IP Address
        const firstOctet = parseInt(ip.split('.')[0]);

        if (firstOctet >= 1 && firstOctet <= 126) {
            classA.push(ip); // Class A
        } else if (firstOctet >= 128 && firstOctet <= 191) {
            classA.push(ip); // Class B
        } else if (firstOctet >= 192 && firstOctet <= 223) {
            classA.push(ip); // Class C
        }
    });


    console.log('IP Address being segregated');

} catch (error) {
    console.error(error);
}