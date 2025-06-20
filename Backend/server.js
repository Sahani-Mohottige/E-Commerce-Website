const express = require("express")
const cors = require("cors")
const dotenv=require("dotenv")
const connectDB = require("./Config/db")
const userRoutes = require("./routes/userRoutes")
const productRoutes = require("./routes/productRoutes");

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3000;

connectDB();

app.get("/",(req,res)=>{
    res.send("Welcome to Pickzy API!")
})

//API Routes
app.use("/api/users",userRoutes);
app.use("/api/products",productRoutes);

app.listen(PORT,()=>{
    console.log(`Server is Running on http://localhost:${PORT}`)
})