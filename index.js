import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv'
import newsRouter from "./routes/newsRoute.js";
import userRouter from "./routes/userRoute.js";
import jwt from "jsonwebtoken";
import calenderRouter from "./routes/calenderRoute.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import societyRouter from "./routes/societyRoute.js";

dotenv.config();

const app = express();
app.use(cors());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));



app.use("/api/users",userRouter);

app.use((req,res,next)=>{
    let token=req.header("Authorization");
    if(token){
        token=token.replace("Bearer ","");
        jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
            if(!err){
                req.user=decoded;               
            }
        })
    }
    next();
})


let mongoUrl=process.env.MONGO_URL;

mongoose.connect(mongoUrl)
let connection =mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
    
})
app.use("/api/news",newsRouter);
app.use("/api/calender",calenderRouter);
app.use("/api/society",societyRouter);



app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

