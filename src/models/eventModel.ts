import { ObjectId } from 'mongodb';

export interface IEvent {
    _id: ObjectId | null;
    title: string;
    description: string;
    eventDate: Date;
    city: string;
    venue: string;
    seatsAvailable: number;
    price: number;
}