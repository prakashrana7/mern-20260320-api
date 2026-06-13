//callback function: function used as a parameter in another function
//higher order function : function that accepts another as parameter

// function test(hello){
//     console.log("this is test message");
   
//     hello();
// }

// test(()=>{
//     console.log("hello world");

// });

import fs from "fs";

fs.readFile("data/data.txt","utf8",(error, data)=>{
    if(error){
        console.log(error);
    }else{
        console.log(data);
    }
});

//Scenario:Read file 1=>Success=>Read file 2=>Success=>Read file 3
//callback hell
fs.readFile("data/file1.txt","utf8",(error1, data1)=>{
    if(error1){
        console.log(error1);
        }else{
       fs.readFile("data/file2.txt","utf8",(error2, data2)=>{
            if(error2){
            console.log(error2);
            }else{
          fs.readFile("data/file3.txt","utf8",(error3, data3)=>{
            if(error3){
         console.log(error3);
            }else{
            console.log(data1);
            console.log(data2);
            console.log(data3);
          }
        });
      }
    });
  }
});