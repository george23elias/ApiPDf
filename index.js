import express from "express";
import morgan from "morgan";
import UserRoutesLogin from "./routers/Users.router.js";
import Conexion from "./controllers/Conexion.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(UserRoutesLogin);


app.listen(process.env.Port);
