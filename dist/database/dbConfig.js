"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = connectToDatabase;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongodb_1 = require("mongodb");
let database;
async function connectToDatabase() {
    if (database) {
        return database;
    }
    try {
        const client = new mongodb_1.MongoClient(process.env.MONGODB_CONNECTION_STRING || '');
        await client.connect();
        database = client.db(process.env.MONGO_DB_NAME || '');
        console.log('Successfully connected to the Database');
        return database;
    }
    catch (error) {
        console.error('Error connecting to the Database', error);
        throw error;
    }
}
