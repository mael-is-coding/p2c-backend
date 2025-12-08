
Deno.serve({
    port: 8080,
    hostname: "127.0.0.1",
    async handler(request: Request) {
        if(request.headers.get("upgrade") !== "websocket") {
            const file = await Deno.open("./ws/index.html");

            return new Response(file.readable);
        }

        const { socket, response } = Deno.upgradeWebSocket(request);

        socket.onopen = () => {
            console.log("OPEN")
        }

        socket.onmessage = (event) => {
            console.log(`
                RECEIVED : ${event.data}
            `);
            socket.send("pong");
        }

        socket.onclose = () => {
            console.log("DISCONNECTED");
        }

        socket.onerror = (error) => {
            console.log(`ERROR FROM SERVER : ${error}`)
        }

        return response
    }
});