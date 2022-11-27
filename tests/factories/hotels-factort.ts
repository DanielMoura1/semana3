import dayjs from "dayjs";
import faker from "@faker-js/faker";
import { prisma } from "@/config";
import { date } from "joi";

export function createHotels() {
  return prisma.hotel.create({
    data: {
      name: faker.name.findName(),
      image: faker.image.imageUrl(),
    }
  });
}

