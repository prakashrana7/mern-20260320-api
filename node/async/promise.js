//Promise: Async programming, promise is a future value
//pending->fulfilled, rejected

import fs from "fs/promises";
fs.readFile("data/data.txt","utf8")
.then((data)=>{
    console.log(data);
})
.catch((error)=>{
    console.log(error);
})
.finally(()=>{
    console.log("finally");
});


fs.readFile("data/file1.txt","utf8")
.then((data1)=>{
    console.log(data1);
    return fs.readFile("data/file2.txt","utf8");
})
.then((data2)=>{
    console.log(data2);
     return fs.readFile("data/file2.txt","utf8");
})
.then((data3)=>{
    console.log(data3);
     return fs.readFile("data/file3.txt","utf8");
})
.catch((error)=>{
    console.log(error);
});
