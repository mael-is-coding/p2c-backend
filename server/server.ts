// @ts-types="npm:@types/express@4.17.15"
import express from "express";
import "@std/dotenv/load";


const app = express();
app.use(express.json());

const PORT = Deno.env.get("SERVER_PORT");

console.log(`PORT : ${PORT}`);

app.get('/', (_req, resp) => {
    resp.send("Hello from Deno !");
});

if (PORT) {
    app.listen({port: parseInt(PORT), hostname: `0.0.0.0`});
} else {
    app.listen({port: 3000, hostname: `0.0.0.0`});
}