import express from "express";
import CPmon from "../models/CPmon.js";
import CPmons from "../data/CPmons.js";

/** @type {express.RequestHandler} */
export const getCPmonStatus = async (req, res) => {
    const CPmonName = req.body.CPmonName
    const CPmon = CPmons.find(CPmon => CPmon.name == CPmonName);
    res.status(202).json(CPmon)
};
