import express from "express";
import rooms from "../data/rooms.js";
import Player from "../models/Player.js";
import Room from "../models/Room.js";
import CPmon from "../models/CPmon.js";
import CPmons from "../data/CPmons.js";

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
    if(!username) {
        res.status(200).json({ status: "fail", message: `username not found in request body.` });
        return;
    }
    const player = new Player(username);
    const roomId = parseInt(req.body.roomNumber);

    /** @type {Room} */
    const room = rooms.find(room => room.roomId === roomId);
    
    if (!room) {
        res.status(200).json({ status: "fail", message: "Room not found" });
        return;
    }

    for (const _room of rooms) {
        for (const _player of _room.players) {
            if (player.name === _player.name) {
                res.status(200).json({ status: "fail", message: `This player already exist in ${_room.roomName}` });
                return;
            }
        }
    }

    try {
        room.addPlayer(player);
    } catch (error) {
        res.status(200).json({ status: "fail", message: `Error: ${error.message}` });
        return;
    }

    res.status(200).json({ status: "success", message: `[ROOM ID: ${room.roomId}] ${player.name} is joined.`, room });
    console.log(`[ROOM ID: ${room.roomId}] ${player.name} is joined.`);
};

/** @type {express.RequestHandler} */
export const addPokemon = async (req, res) => {

    const { username, pokemonName } = req.body;
    if(!username) {
        res.status(400).json({ message: `username not found in request body.` });
        return;
    }
    if(!pokemonName) {
        res.status(400).json({ message: `pokemonName not found in request body.` });
        return;
    }
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

    /** @type {CPmon} */
    const pokemon = CPmons.find(pokemon => pokemon.name === pokemonName);
    if(!pokemon) {
        res.status(400).json({ message: "Pokemon not found in the databases." });
        return;
    }

    player.addPokemon(pokemon.clone())

    res.status(200).json({ message: `[ROOM ID: ${room.roomId}] ${pokemonName} is added to ${player.name}.`, room});
    console.log(`[ROOM ID: ${room.roomId}] ${pokemonName} is added to ${player.name}.`);
};

/** @type {express.RequestHandler} */
export const removePlayer = async (req, res) => {

    const { username } = req.body;
    if(!username) {
        res.status(400).json({ message: `username not found in request body.` });
        return;
    }

    const roomId = parseInt(req.params.id, 10)

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
    if(!username) {
        res.status(400).json({ message: `username not found in request body.` });
        return;
    }
    const roomId = parseInt(req.params.id, 10);

    /** @type {Room} */
    const room = rooms.find(room => room.roomId === roomId);
    if (!room) {
        res.status(400).json({ message: "Room not found" });
        return;
    }

    /** @type {Player} */
    const player = room.players.find(player => player.name === username);
    if (!player) {
        res.status(400).json({ message: `[ROOM ID: ${room.roomId}] ${username} not found.` });
        return;
    }

    if (player.isPokemonEmpty()) {
        res.status(400).json({ message: `Please select your pokemon first!` });
        return;
    }

    player.isReady = true;
    room.startGame();

    res.status(200).json({ message: `[ROOM ID: ${room.roomId}] ${username} is ready.`, room });
    console.log(`[ROOM ID: ${room.roomId}] ${username} is ready.`);
};

/** @type {express.RequestHandler} */
export const action = async (req, res) => {

    const { username, action } = req.body;
    if(!username) {
        res.status(400).json({ message: `username not found in request body.` });
        return;
    }
    if(!action) {
        res.status(400).json({ message: `action not found in request body.` });
        return;
    }
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
    
    try {
        room.playerAction(player, action);
    } catch (error) {
        res.status(200).json({ message: `Error: ${error.message}` });
        return;
    }

    res.status(200).json({ message: `[ROOM ID: ${room.roomId}] ${username}'s action completed.`, room });
    console.log(`[ROOM ID: ${room.roomId}] ${username}'s action completed.`);
};

/** @type {express.RequestHandler} */
export const clearRoom = async (req, res) => {
    const roomId = parseInt(req.params.id, 10);
    const room = rooms.find(room => room.roomId === roomId);
    room.gameOverCount += 1
    if(room.gameOverCount == 2) {
        room.resetRoom();
    }
    res.status(200).json({message : `[ROOM ID: ${roomId}] resetted`})
}

/** @type {express.RequestHandler} */
export const Countdown = async (req, res) => {
    const roomId = parseInt(req.params.id, 10);
    const room = rooms.find(room => room.roomId === roomId);
    room.countDown()
    res.status(200).json({message : `[ROOM ID: ${roomId}] countdown`})

}

/** @type {express.RequestHandler} */
export const removePlayerFromAllRooms = async (req, res) => {

    const { username } = req.body;
    if(!username) {
        res.status(400).json({ message: `username not found in request body.` });
        return;
    }

    for (const room of rooms) {
        if (room.removePlayer(username)) {
            console.log(`[ROOM ID: ${room.roomId}] ${username} is removed.`);
        }
    }

    res.status(200).json({ message: `${username} is removed from all romms.` });
    console.log(`${username} is removed from all romms.`);
};