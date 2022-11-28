import app, { init } from "@/app";
import { prisma } from "@/config";
import faker from "@faker-js/faker";
import { TicketStatus } from "@prisma/client";
import console from "console";
import httpStatus from "http-status";
import { array } from "joi";
import * as jwt from "jsonwebtoken";
import supertest from "supertest";
import { createEnrollmentWithAddress, createUser, createTicketType, createTicketTypeRemoteFalse, createTicket, createHotels, createRoom } from "../factories";
import { cleanDb, generateValidToken } from "../helpers";

beforeAll(async () => {
  await init();
});
  
beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);
describe("GET /hotels", () => {
  it("should respond with status 401 if no token is given ", async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const enrollment = await createEnrollmentWithAddress(user);
    const ticketType = await createTicketType();
    const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.RESERVED);
    const hotels = await createHotels();
    const room = await createRoom(hotels.id);
    const body={
      idTicket: ticket.id
    };
    const response = await server.get("/hotels").send(body);
    
    expect(response.status).toBe(401);
  });
  it("should respond with status 400 if there is no paid or remote ", async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const enrollment = await createEnrollmentWithAddress(user);
    const ticketType = await createTicketType();
    const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.RESERVED);
    const hotels = await createHotels();
    const room = await createRoom(hotels.id);
    const body={
      idTicket: ticket.id
    };
    const response = await server.get("/hotels").set("Authorization", `Bearer ${token}`).send(body);

    expect(response.status).toBe(400);
  });
  it("should respond with status 404 if id invalid", async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const enrollment = await createEnrollmentWithAddress(user);
    const ticketType = await createTicketTypeRemoteFalse();
    const hotels = await createHotels();
    const room = await createRoom(hotels.id);
    const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
    const body={
      idTicket: 0
    };
    const response = await server.get("/hotels").set("Authorization", `Bearer ${token}`).send(body);

    expect(response.status).toBe(404);
  });
  it("should respond with status 400 if body invalid", async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const enrollment = await createEnrollmentWithAddress(user);
    const ticketType = await createTicketTypeRemoteFalse();
    const hotels = await createHotels();
    const room = await createRoom(hotels.id);
    const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
    const body={
      body: "ticket.id"
    };
    const response = await server.get("/hotels").set("Authorization", `Bearer ${token}`).send();

    expect(response.status).toBe(400);
  });
  it("should respond with status 200 and hotels", async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const enrollment = await createEnrollmentWithAddress(user);
    const ticketType = await createTicketTypeRemoteFalse();
    const hotels = await createHotels();
    const room = await createRoom(hotels.id);
    const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
    const body={
      idTicket: ticket.id
    };
    const response = await server.get("/hotels").set("Authorization", `Bearer ${token}`).send(body);

    expect(response.status).toBe(200);
    expect(response.body).toContainEqual({
      id: hotels.id,
      name: hotels.name,
      image: hotels.image,
      createdAt: hotels.createdAt.toISOString(),
      updatedAt: hotels.updatedAt.toISOString(),
    });
  });
});
describe("GET /hotels/:hotelId", () => {
  it("should respond with status 401 if no token is given ", async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const enrollment = await createEnrollmentWithAddress(user);
    const ticketType = await createTicketTypeRemoteFalse();
    const hotels = await createHotels();
    const room = await createRoom(hotels.id);
    const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
    const body={
      id: ticket.id
    };
    const response = await server.get(`/hotels/${room.hotelId}`).send(body);
    
    expect(response.status).toBe(401);
  });
    
  it("should respond with status 200 and rooms", async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const enrollment = await createEnrollmentWithAddress(user);
    const ticketType = await createTicketTypeRemoteFalse();
    const hotels = await createHotels();
    const room = await createRoom(hotels.id);
    const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
    const body={
      id: ticket.id
    };
    const response = await server.get(`/hotels/${room.hotelId}`).set("Authorization", `Bearer ${token}`).send(body);

    expect(response.status).toBe(200);
    expect(response.body).toContainEqual({
      id: hotels.id,
      name: hotels.name,
      image: hotels.image,
      createdAt: hotels.createdAt.toISOString(),
      updatedAt: hotels.updatedAt.toISOString(),
      Rooms: expect.any(Array)
    });
  });
  it("should respond with status 404 if not remote or not paid", async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const enrollment = await createEnrollmentWithAddress(user);
    const ticketType = await createTicketTypeRemoteFalse();
    const hotels = await createHotels();
    const room = await createRoom(hotels.id);
    const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.RESERVED);
    const body={
      id: ticket.id
    };
    const response = await server.get("/hotels/0").set("Authorization", `Bearer ${token}`).send(body);

    expect(response.status).toBe(404);
  });
});
