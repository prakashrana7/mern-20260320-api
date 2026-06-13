import Event from "events";

const eventEmitter= new Event();

eventEmitter.on("greet",()=>{
    console.log("hello world");
});
eventEmitter.emit("greet");
