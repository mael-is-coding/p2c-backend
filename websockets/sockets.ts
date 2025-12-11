
Deno.serve({
    port: 8080,
    hostname: "0.0.0.0",
    handler(request: Request) {
        console.log("handler runs");

        const UsrSockets = new Map<number, WebSocket>();

        if(request.headers.get("upgrade") !== "websocket") {
            return new Response(null, { status: 426} );
        }

        const { socket, response } = Deno.upgradeWebSocket(request);

        const Str_uid = new URL(`${request.url}`).searchParams.get("id");

        if(Str_uid) {
            const uid = parseInt(Str_uid);
            UsrSockets.set(uid, socket);
        }

        socket.onclose = (close_ev) => {
            console.log("close_ev : " + close_ev.reason);
        }

        socket.onmessage = (event) => {
            console.log(`received a message : ${event.data}`);
        }

        socket.onclose = (event) => {
            console.log("he's outta heare")
        }

        return response;
    },
});