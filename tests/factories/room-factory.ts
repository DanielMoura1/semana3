import dayjs from "dayjs";
import faker from "@faker-js/faker";
import { prisma } from "@/config";
import { date } from "joi";

export function createRoom(hotelId: number) {
  return prisma.room.create({
    data: {
      name: faker.name.findName(),
      capacity: faker.datatype.number({ min: 1, max: 9 }),
      hotelId,
    }
  });
}
