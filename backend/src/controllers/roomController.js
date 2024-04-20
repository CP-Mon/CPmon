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
        res.status(400).json({ message: "Room not found" });
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
        res.status(400).json({ message: "Room not found" });
        return;
    }

    try {
        room.addPlayer(player);
    } catch (error) {
        res.status(400).json({ message: "This room is already full"});
        return;
    }

    res.status(200).json({ message: `[ROOM ID: ${room.roomId}] ${player.name} is joined.`, room });
    console.log(`[ROOM ID: ${room.roomId}] ${player.name} is joined.`);
};

/** @type {express.RequestHandler} */
export const addPokemon = async (req, res) => {

    const { username, pokemonName } = req.body;
    const roomId = parseInt(req.params.id, 10);

    /** @type {Room} */
    const room = rooms.find(room => room.roomId === roomId);

    if (!room) {
        res.status(400).json({ message: "Room not found" });
        return;
    }

    /** @type {Player} */
    const player = room.players.find(player => username === player.name)

    if (!player) {
        res.status(400).json({ message: "Player not found in this room" });
        return;
    }

    player.addPokemon(new CPmon(pokemonName, null));

    res.status(200).json({ message: `[ROOM ID: ${room.roomId}] ${pokemonName} is added to ${player.name}.`, room});
    console.log(`[ROOM ID: ${room.roomId}] ${pokemonName} is added to ${player.name}.`);
};

/** @type {express.RequestHandler} */
export const removePlayer = async (req, res) => {

    const { username } = req.body;
    const roomId = parseInt(req.params.id, 10);

    /** @type {Room} */
    const room = rooms.find(room => room.roomId === roomId);

    if (!room) {
        res.status(400).json({ message: "Room not found" });
        return;
    }

    if (!room.removePlayer(username)) {
        res.status(400).json({ message: "Player not found in this room"});
        return;
    }

    res.status(200).json({ message: `[ROOM ID: ${room.roomId}] ${username} is removed.`, room});
    console.log(`[ROOM ID: ${room.roomId}] ${username} is removed.`);
};

/** @type {express.RequestHandler} */
export const ready = async (req, res) => {

    const { username } = req.body;
    const roomId = parseInt(req.params.id, 10);

    /** @type {Room} */
    const room = rooms.find(room => room.roomId === roomId);
    if (!room) {
        res.status(400).json({ message: "Room not found" });
        return;
    }

    /** @type {Player} */
    const player = room.players.find(player => player.name === username);
    if(!player) {
        res.status(400).json({ message: `[ROOM ID: ${room.roomId}] ${username} not found.` });
        return;
    }

    player.isReady = true;
    if (room.allReady()) {
        room.startGame();
    }

    res.status(200).json({
        message: `[ROOM ID: ${room.roomId}] ${username} is ready.`,
        allReady: room.allReady(),
        room
    });
    console.log(`[ROOM ID: ${room.roomId}] ${username} is ready.`);
};
