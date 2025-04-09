import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../database/dbConfig';
import { IBooking } from '../models/bookingModel';

export const getAllBookings = async (req: Request, res: Response) => {
  const db = await connectToDatabase();
  const bookings = await db.collection<IBooking>('Bookings').find({}).toArray();
  res.json(bookings);
};

export const getBookingById = async (req: Request, res: Response) => {
  const db = await connectToDatabase();
  const booking = await db.collection<IBooking>('Bookings').findOne({ _id: new ObjectId(req.params.id) });
  res.json(booking);
};

export const createBooking: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const db = await connectToDatabase();
    const { userId, eventId, numberOfTickets, seatLocations, eventDate, totalPrice, paymentStatus } = req.body;

    const newBooking: IBooking = {
      _id: null,
      userId,
      eventId,
      numberOfTickets,
      seatLocations,
      eventDate,
      totalPrice,
      paymentStatus,
      createdAt: new Date()
    };

    const result = await db.collection<IBooking>('Bookings').insertOne(newBooking);

    newBooking._id = result.insertedId;
    
    // Send 201 Created with the new record's ID
    res.status(201).json(newBooking._id);
};

export const updateBooking = async (req: Request, res: Response) => {
  const db = await connectToDatabase();
  const result = await db.collection<IBooking>('Bookings').updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body });
  res.json(result);
};

export const deleteBooking = async (req: Request, res: Response) => {
  const db = await connectToDatabase();
  const result = await db.collection<IBooking>('Bookings').deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(result);
};

