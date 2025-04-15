import {Server} from "socket.io";
import http from "http";
import express from "express";

// const {Server} = require("socket.io");
// const http = require("http");
// const express = require("express");

const app= express();
const server=http.createServer(app);

const io=new Server(server,{
    cors:{
        origin:["http://localhost:3000"],

    },
});


export function getReceiverSocketId(userId){
    return userSocketMap[userId];
}

//store online users
const userSocketMap={} //userId:socketId

io.on("connection",(socket)=>{
console.log("A user Connected",socket.id);

const userId=socket.handshake.query.userId;

if(userId) userSocketMap[userId]=socket.id;

//io emit connects event to all the connected user
io.emit("getOnlineUsers",Object.keys(userSocketMap));

socket.on("disconnect",()=>{
    console.log("A user disconnected",socket.id);
    delete userSocketMap[userId];

    io.emit("getOnlineUsers",Object.keys(userSocketMap));
});
});

export{
    io,
    app,
    server,
   
}