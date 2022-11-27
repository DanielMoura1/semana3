import { prisma } from "@/config";

async function ticket(id: number) {
  return prisma.ticket.findMany({
    where: {
      id,
    }, include: {
      TicketType: true
    }
  });
}
async function Hotels() {
  return prisma.hotel.findMany({
  });
}
async function get(id: number) {
  return prisma.hotel.findMany({
    where: {
      id
    }, include: {
      Rooms: true
    }
  });
}

const hotelsRepository = {
  ticket, Hotels, get
};
  
export default hotelsRepository;
  
