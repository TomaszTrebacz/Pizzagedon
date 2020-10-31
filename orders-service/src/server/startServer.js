import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

import accessEnv from "#root/helpers/accessEnv";
import setupRoutes from "./routes";

const PORT = accessEnv("PORT", 7102);

const app = express();

app.use(bodyParser.json());

app.use(
    cors({
        origin: (origin, cb) => cb(null, true),
        credentials: true
    })
);

setupRoutes(app);


app.use((err, req, res, next) => {
    return res.status(500).json({
        message: err.message
    });
});


app.listen(PORT, "0.0.0.0", () => {
    console.info(`Orders service listening on ${PORT}`);
});