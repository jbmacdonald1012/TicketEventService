"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.updateEvent = exports.createEvent = exports.getEventById = exports.getAllEvents = void 0;
const mongodb_1 = require("mongodb");
const dbConfig_1 = require("../database/dbConfig");
const getAllEvents = async (req, res) => {
    const db = await (0, dbConfig_1.connectToDatabase)();
    const events = await db.collection('Events').find().toArray();
    res.json(events);
};
exports.getAllEvents = getAllEvents;
const getEventById = async (req, res) => {
    const db = await (0, dbConfig_1.connectToDatabase)();
    const event = await db.collection('Events').findOne({ _id: new mongodb_1.ObjectId(req.params.id) });
    res.json(event);
};
exports.getEventById = getEventById;
const createEvent = async (req, res) => {
    const db = await (0, dbConfig_1.connectToDatabase)();
    const { title, description, eventDate, city, venue, seatsAvailable, price } = req.body;
    const newEvent = {
        _id: null,
        title,
        description,
        eventDate,
        city,
        venue,
        seatsAvailable,
        price
    };
    const result = await db.collection('Events').insertOne(newEvent);
    newEvent._id = result.insertedId;
    res.status(201).json(newEvent._id);
};
exports.createEvent = createEvent;
const updateEvent = async (req, res) => {
    const db = await (0, dbConfig_1.connectToDatabase)();
    const { title, description, eventDate, city, venue, seatsAvailable, price } = req.body;
    const updatedEvent = await db.collection('Events').updateOne({ _id: new mongodb_1.ObjectId(req.params.id) }, { $set: { title, description, eventDate, city, venue, seatsAvailable, price } });
    res.json(updatedEvent);
};
exports.updateEvent = updateEvent;
const deleteEvent = async (req, res) => {
    const db = await (0, dbConfig_1.connectToDatabase)();
    const deletedEvent = await db.collection('Events').deleteOne({ _id: new mongodb_1.ObjectId(req.params.id) });
    res.json(deletedEvent);
};
exports.deleteEvent = deleteEvent;
