import express from 'express'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

dotenv.config()
connectDB();
const app = express();
app.use(cookieParser());
app.use(express.json());

// app.use((req,res,next) =>{

//   console.log("this is  middleware")
//   next();
// })

app.use((err,req,res,next) => {
  console.log(err)
  next();
})

app.use(cors({
  origin:"http://localhost:5173",
  methods:["GET","POST","PUT","DELETE"],
  credentials:true,
})  );

app.use('/user', userRoutes)


app.get("/", (req, res) => {
    res.send("Server is running")
})

app.listen(5000, () => {
    console.log("Server is running at http://localhost:5000");
})
