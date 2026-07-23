# Node with express API

## Node.JS
- Node.js is a javascript runtime.
- Runtine: A program that runs another program.
- Run JS in local Machine.
- Built on c++.
- Powered by Google Chrome V8 Engine
- used to build:API, real time apps, micro-services

## architecture
- signle threaded
- Non-Blocking I/O operation
- Event loop
===========================
## modules
- File system
- HTTP
- Path
- URL
- OS
- Event

- Callback/Promises/Async-await

## Express.js

- It is a Node.js API/Backend Framework.
- Used to build API(Application Program Interface)
- It simplea the HTTP module of node.js
- Minimalist, fast and unopinionated framework

## API

- API format: JSON (JavaScript Object Notation)
- REST API (Representational State Transfer)

## JSON

- JS Object => JSON.stringify()=> JSON
- JSON => JSON.parse() => JS Object

## HTTP Methods

1. GET - Read
2. POST - Create
3. PUT - Update
4. DELETE -Delete
5. PATCH - Partial update


## Layered Architeture

1. API Layer
    a. Routes: Handle routes/endpoints
    b. Controllers: Handle request/response
    c. Middlewares: Handle request/response, Logging, Auth

2. Business Logic Layer
    a. Services

3. Data Logic Layer
    a. Models

4. Database Layer

# MongoDB

- Non-relational databse
- Data are stored in collection & documents
- Database: Main container, all collections are stored here
- Collection: Equivalent to table of relational database
- Document: Equivalent to Row
- Field: Equivalent to Column

## Tools used

- Locally: MongoDB Compass
- Cloud: MongoDB Atlas

**Run MongoDB Compass**

1. Open mongoDB compass
2. Setup a new connection (mongodb://localhost:27017) [mongodb://localhost:27017]

## MongoDB Queries

- `show dbs` : Shows list of database
- `use <dbname>` : Use existing db or create a new one
- `show collections` : Shows list of collections in that db

1. Create
- `db.users.insertOne({name:"Prakash"})`
- `db.users.insertMany([{name:"Ramesh"},{name:"Sita"}])`

2. Read
- `db.users.find({age:25})` Returns multiple result if exists
- `db.users.findOne({age:21})`

3. Update
- `db.users.updateOne({name:"Prakash"}, {$set:{age:26}})`

4. Delete
- `db.users.deleteOne({name:"Ram"})`


## Complex Filters
1. $eq: db.users.find({name:{$eq:"Rohan"}}) //SELECT *FROM users WHERE name="Rohan"
2. $ne: db.users.find({name:{$ne:"Rohan"}})
3. $gt/gte: db.users.find({age:{$gt:50}})
4. $lt/lte: db.users.find({age:{$lt:50}})
5. $and: db.users.find({$and:[{name:"Rohan"},{age:45}]})
6. $or: db.users.find({$or:[{name:"Rohan"},{age:45}]})
7. $in: db.users.find({name:{$in:["Ramesh","Rohan"]}})

a. limit: db.users.find().limit(2)
b. skip: db.users.find().skip(1)
c. sort: db.users.find().sort({name:1}) 1:ASC -1:DESC 

## Mongose
- ODM of MongoDB for Node.js
- Create Schema
- Validate Schema
- create models using Schema
- Realtionships

# Cryptography

## Encryption
- Encryption: Converting readable text to unreadable/cipher text
- for e.g: hello->ajskdjrhfvof-

- Decryption: Converting cipher text to readable text
- for e.g: ajskdjrhfvof- -> hello

### Types
- Symmetric: Same key is used for encryption and decryption
- Assymetric: Different keys are used for encryption and decryption, Public/Private key

## Hashing
- One way encryption
- Convert the readable text to cipher text but not back to readable
- Hashing always returns same cipher
- hello=> 1243144jkgfd

## Salt
- Adding random characters in the hash
- hello-> 122433ghhrgsdfhsfhs
- hello=> 12241dggghsfab12

## Authentican & Authorization

1. Authentication: who you are?
2. Authorization: what you can do? user role

## Json Web Token (JWT)

- Self verified
- Tamper proof
- Used for both authentication & authorization

## JWT Structure

- Header
- Payload
- Signature

## Storage

1. Cookie Storage
- Size: 4KB
- Storage: Server & Brower
- Expiry: Cookie expiry

2. Local Storage
- Size: 5-10MB
- Storage: Only Browser
- Expiry: Never

3. Session Storage
- Size: 5MB
- Storage: Only Browser
- Expiry: On tab close

## Auth Process

1. Login/Register success
2. Generate token(JWT)
3. Store token: Cookie, Session, Local Storage
4. Append the token in every request to handle auth
5. Verify the token and authenticate/authorize user(Middleware)

## Middleware
- Function that lies between request and response
- Function that has access of both request and response object.
- It has additional functionality to go to next() middleware call

Broswer -----Request----->Server
Middleware, Middleware, Middleware
Server ------Response---->Browser

### Usage
- Logging
- Authentication & Authorization
- Request & Response object modification
- Error handling
- Data validation[ZOD]

## File Upload
1. File with data -> Send using FormData
2. Use `multer` package to handle formdata
    - When file is sent through formdata, multer handles it
    - Store the file temporily, local folder or RAM
    - Upload the file
    - Remove the file after successful upload
    - File can be single or multiple 
3. Cloudinary: Upload file to cloudinary(store your file here)
    - Signin/Signup to cloudinary
    - Create an API key or Use your existing API key
    - Use cloudinary sdk, and use your api key here
4. Receive the file url from uploaded file in cloudinary
5. Store the URL in database

## Reset password 

## Forget password
1. User requests for forget password
2. User inputs email address
3. Using email address, find the user, create a reset password link and token
4. Send the reset password link to the email

## Reset password
1. User clicks on the reset password link from the received email
2. The links contains the reset-password route with token
3. User inputs new password
4. Send requests for reset password with the new password and token
5. Verify the user and token
6. Update the password

## MongoDB Aggregation

- Performing operation in multiple documents (table)
- Complex queries
- Filtering in multiple documents
- Data formatting

1. $match => Filtering
2. $lookup => LEFT JOIN
3. $unwind => INNER JOIN
4. $project => Data formatting
5. $group => Complex grouped operation


# Template Engine

- Building UI from Node.js and Express
- Building templates for email or pdf
- for e.g: handlebars, ejs, njk
