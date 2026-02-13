const url = new URL("ws://localhost:8080?id=1")
const ws = new WebSocket(url, "json");

ws.onopen = (_event) => {
    // console.log("[clientA logs] connection of client A is opened");
    ws.send('{ "message" : "hello (cl A)" }');
}

ws.onmessage = (event) => {
    // console.log("[clientA logs] clientA received a message");
    ws.send(`{ "received" : "${event.data}" }`);
}

ws.onclose = (closeEv) => {
    // console.log(`[clientA logs] clientA logs off ${closeEv.reason}`);
    ws.send('{ "message" : "(A) i\'m outta here !" }');
}

while (true) {
    const buf = new Uint8Array(100);
    const PS1 = new TextEncoder().encode("[client a] Ctrl + C to exit $ "); 
    Deno.stdout.write(PS1);
    const bytes_read = await Deno.stdin.read(buf);
    const text = new TextDecoder().decode(buf);

    ws.send(text);
    console.log("text sent !");
}
