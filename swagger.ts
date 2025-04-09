import swaggerAutogen from "swagger-autogen";

const swaggerAutogenInstance = swaggerAutogen();

const doc = {
  info: {
    title: "Ticket Booking API",
    description: "An API to manage events and bookings",
    version: "1.0.0",
  },
    host: "localhost:3000",
    schemes: ['http'],
};

const outputFile = "./swagger.json";

const endpointsFiles = [
    './src/app.ts',
];

swaggerAutogenInstance(outputFile, endpointsFiles, doc);
