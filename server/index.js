const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const UserModel=require('./models/users')

const app=express();
app.use(express.json())//this for whenever we send json data from client to server to the button 
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/crud")//mongodb connection
//basic auth middleware
const basicAuth = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        res.setHeader('WWW-Authenticate', 'Basic');
        return res.status(401).json({ message: "Authentication required" });
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    // Set your own username & password
    const USER = "admin";
    const PASS = "12345";

    if (username === USER && password === PASS) {
        next();
    } else {
        return res.status(401).json({ message: "Invalid Credentials" });
    }
};

// APPLY BASIC AUTH TO ALL ROUTES
app.use(basicAuth);

//after creation use this get for show the records in home page
app.get("/",(req,res) => {
    UserModel.find({})
    .then(users => res.json(users))
    .catch(err=> res.json(err))
})

app.get("/getUser/:id",(req,res) => {
    const id=req.params.id;
    UserModel.findById({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.put("/updateUser/:id",(req,res) => {
    const id=req.params.id;
    UserModel.findByIdAndUpdate({_id:id}, {name: req.body.name, email: req.body.email, age: req.body.age}) 
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.delete("/deleteUser/:id",(req,res) => {
    const id=req.params.id;
    UserModel.findByIdAndDelete({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})


//create a new reocord
app.post("/createUser",(req,res) => {
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

//dispaly all users
app.listen(3001,() => {
    console.log("Server is running on port 3001")//listen(callback?: (error?: Error) => void): Server<typeof IncomingMessage, typeof ServerResponse>
})
