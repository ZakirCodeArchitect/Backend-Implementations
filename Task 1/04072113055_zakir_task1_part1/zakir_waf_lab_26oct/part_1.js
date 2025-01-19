import fs from 'fs/promises'
import path from 'path'


console.log("Tab Task 1 - Part 1")

const fname = "part_1"
const fpath = path.join(process.cwd(), fname) // joining current directory

// 3. Inside the part_1.js file, write code to programmatically create a folder named as  “part_1” in the same directory with the .js file (your_name_waf_lab_28sep).
try {   
    await fs.mkdir(fpath, { recursive: true })
    console.log("Folder Created : ", fname)
} catch (err) {
    console.log(err)
}


const fileName = "test.txt";
const filePath = path.join(process.cwd(), fileName)
const fContent = "";

// 4. Write a code statement to create a file named “test.txt”. 
try {
    await fs.writeFile(filePath, fContent);
    console.log("File Created")
} catch (err) {
    console.log(err)
}

// 5. Write a code statement to write your registration number inside the “test.txt” file. 
const FileContent = "04072113055"

try {
    await fs.writeFile(filePath, FileContent)
    console.log("Data Written in the File successfully")
} catch (err) {
    console.log(err)
}

// 6. Write a code statement to read the data from the “part_1.txt” file (your registration number) and display it on the console. 
try {
    const data = await fs.readFile(filePath, "utf-8");
    console.log("Data Read from the File :", data);
} catch (err) {
    console.log(err)
}

// 7. Write code to overwrite your registration number in the “test.txt” with the last four  
//    digits of your registration number. 

try {
    const data = await fs.readFile(filePath, "utf-8")
    const LastFour = data.slice(-4); //getting last four digits
    await fs.writeFile(filePath, LastFour)
    console.log("Data Overwritten successfully")
} catch (err) {
    console.log(err)
}

// 8. Repeat Step 6
try {
    const data = await fs.readFile(filePath, "utf-8")
    console.log("Data Read from the File :", data)
} catch (err) {
    console.log(err)
}

// 9. Erase data from the file “test.txt”
try {
    await fs.truncate(filePath, 0)
    console.log("Emptyed successfully")
} catch (err) {
    console.log(err)
}

// 10.  Repeat step 5. 

const FileC = "04072113055"

try {
    await fs.writeFile(filePath, FileC)
    console.log("Data Written in the File successfully")
} catch (err) {
    console.log(err)
}

