import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../database/dbConfig';
import { IEvent } from '../models/eventModel';


export const getAllEvents = async (req: Request, res: Response) => {
  const db = await connectToDatabase();
  const events = await db.collection<IEvent>('Events').find().toArray();
  res.json(events);
};

export const getEventById = async (req: Request, res: Response) => {
  const db = await connectToDatabase();
  const event = await db.collection<IEvent>('Events').findOne({ _id: new ObjectId(req.params.id) });
  res.json(event);
};

export const createEvent = async (req: Request, res: Response) => {
  const db = await connectToDatabase();
  const { title, description, eventDate, city, venue, seatsAvailable, price } = req.body;
  const newEvent: IEvent = {
    _id: null,
    title,
    description,
    eventDate,
    city,
    venue,
    seatsAvailable,
    price
  };

  const result = await db.collection<IEvent>('Events').insertOne(newEvent);

  newEvent._id = result.insertedId;
  res.status(201).json(newEvent._id);
};

export const updateEvent = async (req: Request, res: Response) => {
  const db = await connectToDatabase();
  const { title, description, eventDate, city, venue, seatsAvailable, price } = req.body;
  const updatedEvent = await db.collection<IEvent>('Events').updateOne({ _id: new ObjectId(req.params.id) }, { $set: { title, description, eventDate, city, venue, seatsAvailable, price } });
  res.json(updatedEvent);
};

export const deleteEvent = async (req: Request, res: Response) => {
  const db = await connectToDatabase();
  const deletedEvent = await db.collection<IEvent>('Events').deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(deletedEvent);
};