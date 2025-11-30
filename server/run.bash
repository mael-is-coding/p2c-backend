#!/bin/sh
mkdir -p logs &&

echo "---$(date) P2C EXPRESS SERVER"

echo

echo "DENO RUN LOGS" &&
(   
    echo "---$(date)" &&
    deno install &&
    deno run --allow-read --allow-env --allow-net ./server/server.ts &&
    echo "---"
) > logs/logs.txt

echo &&

echo "---"