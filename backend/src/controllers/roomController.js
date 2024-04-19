import rooms from "../data/rooms.js";

/** @type {import("express").RequestHandler} */
export const getRooms = async (req, res) => {
    res.status(200).json(rooms);
};
