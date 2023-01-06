import express from "express"
import { router } from "./routes/route.js"
const app = express()
const port = 3000
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router)
app.listen(port, console.log("running in port ", port))
