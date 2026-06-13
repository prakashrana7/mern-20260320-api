import http from "http";

const server = http.createServer((request, response)=>{
    response.end("Hello world");
});
server.listen(5000);