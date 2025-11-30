#!/bin/sh
mkdir -p logs &&

echo "---$(date) P2C WEBSOCKET SERVER" &&

echo &&

echo "DENO RUN LOGS" &&
(   
    echo "---$(date)" &&
    deno run --allow-read --allow-env --allow-net ./ws/sockets.ts &&
    echo "---"
) > logs.txt

echo &&

echo "---"