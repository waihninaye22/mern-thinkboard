import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";


dotenv.config();
const PORT = process.env.PORT || 8001;

const app = express();

app.use(cors({
    origin : "http://localhost:5173"
}));
app.use(express.json());
app.use(express.urlencoded());
app.use(rateLimiter);


// app.use((req,res,next)=>{
//     console.log("We just got a new request");
//     next();
// })

app.use("/api/notes" , notesRoutes);


connectDB().then(()=>{
    app.listen(PORT , () => {
    console.log(`Server is running on PORT ${PORT}`);
    })
});



