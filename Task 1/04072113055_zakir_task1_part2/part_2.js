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
    let classA = [],
        classB = [],
        classC = [];

    // running the loop for each ip 
    ipAddresses.forEach(ip => {
        const firstOctet = parseInt(ip.split('.')[0]);

        if (firstOctet >= 1 && firstOctet <= 126) {
            classA.push(ip); // Class A
        } else if (firstOctet >= 128 && firstOctet <= 191) {
            classB.push(ip); // Class B
        } else if (firstOctet >= 192 && firstOctet <= 223) {
            classC.push(ip); // Class C
        }
    });

    // writing data in the respective files
    await fs.writeFile('A.txt', classA.join('\n'), (err) => {
        if(err)
        {
            console.log("Failed to write the IP Addresses in A file")
        }
        console.log("IP Addresses successfully Written in File A")
    });
    await fs.writeFile('B.txt', classB.join('\n'), (err) => {
        if(err)
        {
            console.log("Failed to write the IP Addresses in B file")
        }
        console.log("IP Addresses successfully Written in File B")
    })
    await  fs.writeFile('C.txt', classC.join('\n'),(err) => {
        if(err)
        {
            console.log("Failed to write the IP Addresses in C file")
        }
        console.log("IP Addresses successfully Written in File C")
    });

    console.log("IP Addresses successfully segregated based on classess and written in their respective files.")

   

} catch (err) {
    console.error(err);
}