import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import supertokens from "supertokens-node";

import {
    middleware as supertokensMiddleware,
    errorHandler as supertokensErrorHandler
} from "supertokens-node/framework/express";

dotenv.config();

// Import SuperTokens Config
import { supertokensConfig, getAppDomain } from "./services/supertokens-service";

// Import Routes
import supertokensRoutes from "./routes/supertokensRoutes";

// Init SuperTokens Service
supertokens.init(supertokensConfig);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// SuperTokens CORS
app.use(
    cors({
        origin: "http://localhost:3000",
        allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
        methods: ["GET", "PUT", "POST", "DELETE"],
        credentials: true,
    })
);

// SuperTokens Middleware
app.use(supertokensMiddleware());

// Routes
app.use("/", supertokensRoutes);

// SuperTokens Error Handler
app.use(supertokensErrorHandler());

const PORT = process.env.BACKEND_API_PORT;
app.listen(PORT, () => console.log(`API Server listening on port ${PORT}`));
