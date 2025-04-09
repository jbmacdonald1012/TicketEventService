"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBooking = exports.updateBooking = exports.createBooking = exports.getBookingById = exports.getAllBookings = void 0;
const mongodb_1 = require("mongodb");
const dbConfig_1 = require("../database/dbConfig");
const getAllBookings = async (req, res) => {
    const db = await (0, dbConfig_1.connectToDatabase)();
    const bookings = await db.collection('Bookings').find({}).toArray();
    res.json(bookings);
};
exports.getAllBookings = getAllBookings;
const getBookingById = async (req, res) => {
    const db = await (0, dbConfig_1.connectToDatabase)();
    const booking = await db.collection('Bookings').findOne({ _id: new mongodb_1.ObjectId(req.params.id) });
    res.json(booking);
};
exports.getBookingById = getBookingById;
const createBooking = async (req, res, next) => {
    const db = await (0, dbConfig_1.connectToDatabase)();
    const { userId, eventId, numberOfTickets, seatLocations, eventDate, totalPrice, paymentStatus } = req.body;
    const newBooking = {
        _id: null,
        userId: new mongodb_1.ObjectId(userId),
        eventId: new mongodb_1.ObjectId(eventId),
        numberOfTickets,
        seatLocations,
        eventDate,
        totalPrice,
        paymentStatus,
        createdAt: new Date()
    };
    const result = await db.collection('Bookings').insertOne(newBooking);
    newBooking._id = result.insertedId;
    // Send 201 Created with the new record's ID
    res.status(201).json(newBooking._id);
};
exports.createBooking = createBooking;
const updateBooking = async (req, res) => {
    const db = await (0, dbConfig_1.connectToDatabase)();
    const result = await db.collection('Bookings').updateOne({ _id: new mongodb_1.ObjectId(req.params.id) }, { $set: req.body });
    res.json(result);
};
exports.updateBooking = updateBooking;
const deleteBooking = async (req, res) => {
    const db = await (0, dbConfig_1.connectToDatabase)();
    const result = await db.collection('Bookings').deleteOne({ _id: new mongodb_1.ObjectId(req.params.id) });
    res.json(result);
};
exports.deleteBooking = deleteBooking;
