import express from "express";
import rooms from "../data/rooms.js";
import Player from "../models/Player.js";
import Room from "../models/Room.js";
import CPmon from "../models/cpmonModel.js";

/** @type {express.RequestHandler} */
export const getRooms = async (req, res) => {
    res.status(200).json(rooms);
};

/** @type {express.RequestHandler} */
export const getRoom = async (req, res) => {

    const roomId = parseInt(req.params.id);

    /** @type {Room} */
    const room = rooms.find(room => room.roomId === roomId);

    if(!room) {
        res.status(404).json({ message: "Room not found" });
        return;
    }

    res.status(200).json({ room });
};

/** @type {express.RequestHandler} */
export const joinRoom = async (req, res) => {

    const { username } = req.body;
    const player = new Player(username);
    const roomId = parseInt(req.params.id, 10);

    /** @type {Room} */
    const room = rooms.find(room => room.roomId === roomId);

    if (!room) {
        res.status(404).json({ message: "Room not found" });
        return;
    }

    try {
        room.addPlayer(player);
    } catch (error) {
        res.status(404).json({ message: "This room is already full", room });
    }

    res.status(200).json({ message: "Successfully joined the room", room });
    console.log(`[room ${room.roomId}] ${username} joined.`)
};

/** @type {express.RequestHandler} */
export const addPokemon = async (req, res) => {

    const { username, pokemonName } = req.body;
    const roomId = parseInt(req.params.id, 10);

    /** @type {Room} */
    const room = rooms.find(room => room.roomId === roomId);

    if (!room) {
        res.status(404).json({ message: "Room not found" });
        return;
    }

    /** @type {Player} */
    const player = room.players.find(player => username === player.name)

    if (!player) {
        res.status(404).json({ message: "Player not found in this room" });
        return;
    }

    player.addPokemon(new CPmon(pokemonName, null));

    res.status(200).json({ message: "Successfully add CPmon", room});
    console.log(`CPmon added in player: ${username} in room: ${room.roomId}`)
};