/**
 * fs:file system module of node js, used for file operations
 * like create, read, update, delete
 * synchronous: blocking operation
 * asynchronous: non-blocking operation
 */

import fs from 'fs';

//1.Synchromous method

//Read file
// const result=fs.readFileSync("data/data.txt","utf8");
// console.log(result);

// const image=fs.readFileSync("data/T-Shirt.jpg","base64");
// console.log(image);

//Write file
// fs.writeFileSync("data/file.txt","This is a newly created file.");
// fs.writeFileSync("data/data.txt","Hello world data is updated.");
// fs.writeFileSync("data/data.json", JSON.stringify({hello:"world"}));

//Update file
// fs.appendFileSync("data/file.txt","this is newly appended");

//Delete file
// fs.rmSync("data/data.json");
// fs.mkdirSync("myFolder");

//2.Asynchronous method
//Read File
console.log("file before");
fs.readFile("data/data.txt","utf8",(error, data)=>{
    if(error){
        console.log(error);
    }else {
        console.log(data);
    }
});
console.log("file after");


//write file
fs.writeFile("data/data.json", JSON.stringify({name:"Ram"}),()=>{
    console.log("file written successful.");
});

//update file
fs.appendFile("data/data.json", JSON.stringify({age:"20"}),()=>{
    console.log("file update successful.");
});

//delete file
fs.rm("data/data.json")