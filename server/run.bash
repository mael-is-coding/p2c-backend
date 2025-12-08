#!/bin/sh
mkdir -p logs &&

echo "---$(date) P2C EXPRESS SERVER" &&

echo "DENO RUN LOGS" &&

echo "---$(date)" &&
deno run --allow-read --allow-write --allow-env --env-file=./server/.env --allow-net ./server/server.ts &&
echo "---" &&

echo &&

echo "---"