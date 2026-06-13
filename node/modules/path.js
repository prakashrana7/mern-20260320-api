import path from "path";
import url from "url";

const filePath="folder/folder2/folder3/data.json";

console.log(path.basename(filePath)); //file name
console.log(path.extname(filePath)); //extension name
console.log(path.dirname(filePath)); //folder/s name

const __filename=url.fileURLToPath(import.meta.url); //current working file ko full path & filename
const __dirname=path.dirname(__filename); //kun directory ma

console.log(__filename) //current file path

console.log(__dirname); //directory name