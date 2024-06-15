import express from 'express'
import cors from "cors";
import studentRoutes from "./src/routes/studentRoutes.js";

import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT

const app = express()
app.use(cors())
app.use(express.json())

app.use('/students', studentRoutes)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))