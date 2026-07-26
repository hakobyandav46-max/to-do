import express from "express"
import cors from "cors";
import cookieParser from "cookie-parser";
import todoRoute from "./routes/todo.route"
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
const app = express()
const port = process.env.PORT || 7777

app.use(
    cors({
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "DELETE", "PATCH"],
        credentials: true, //cookie-neri normal ashxatanqi hmar
    }),
);
app.all('/api/auth/{*any}', toNodeHandler(auth));
app.use(express.json());
app.use(cookieParser());

app.get("/api/me", async (req, res) => {
    const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers),
    });
    return res.json(session);
});

app.use("/api/todos", todoRoute)

app.listen(port, () => {
    console.log(`kokojambo ${port}`)
})