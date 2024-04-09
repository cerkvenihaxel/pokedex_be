import { Router } from "express";
import pokemon from "./routes/pokemon";

export default () => {
    const app = Router();
    pokemon(app);

    return app;
}