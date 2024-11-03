import fs from "fs/promises"
import path from "path"

// const list1 = ["\nAhmed", "\nMohammad", "Ali", "Firoz"]

const fileName = "Ips.txt";
const Fpath = path.join(process.cwd(), fileName)

const fileA = 'A.txt'
const fileB = 'B.txt'
const fileC = 'C.txt'

try {

    // reading data from the file :
    const data = await fs.readFile(Fpath, 'utf8');

    // splitting the data from the file
    const ipAddresses = data
        .split('\n')
        .map(ip => ip.trim())
        .filter(ip => ip);

    // running the loop for each ip 
    ipAddresses.forEach(ip => {
        const firstOctet = parseInt(ip.split('.')[0]);

        if (firstOctet >= 1 && firstOctet <= 126) {
            fs.appendFile(fileA, ipAddresses + '\n', (err)=>{
                if(err){
                    console.log(err, "Error writing in File B")
                }
            });

        } else if (firstOctet >= 128 && firstOctet <= 191) {
            fs.appendFile(fileB, ipAddresses + '\n', (err)=>{
                if(err){
                    console.log(err, "Error writing in File B")
                }
            });
        } else if (firstOctet >= 192 && firstOctet <= 223) {
            fs.appendFile(fileC, ipAddresses + '\n', (err)=>{
                if(err){
                    console.log(err, "Error writing in File B")
                }
            });
        }
    });

    console.log("IP Addresses successfully segregated based on classess and written in their respective files.")

} catch (err) {
    console.error(err);
}