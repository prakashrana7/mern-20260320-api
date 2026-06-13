// fetch("https://jsonplaceholder.typicode.com/todos")
//       .then(response => response.json())
//       .then((data) => console.log(data)) 
//       .catch((error)=> console.log(error));

async function fetchData(){
   try{
     const response = await fetch("https://jsonplaceholder.typicode.com/todos");

    const data = await response.json();
    console.log(data);
   }catch(error){
    console.log(error);
   }
}
fetchData();