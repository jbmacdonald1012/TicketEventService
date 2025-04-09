import { ObjectId } from "mongodb";

export interface IBooking {
    _id : ObjectId | null;
    userId?: ObjectId | null;
    eventId?: ObjectId | null;
    numberOfTickets: number;
    seatLocations: string[];
    eventDate: Date;
    totalPrice: number;
    paymentStatus: string;
    createdAt?: Date;
}