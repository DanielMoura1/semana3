import { notFoundError, unauthorizedError } from "@/errors";
import hotelsRepository from "@/repositories/hotels-repository";

async function ticket(idTicket: number) {
  const res =await hotelsRepository.ticket(idTicket);
  if(res.length ===0) {
    throw notFoundError();
  }
  return res;
}
async function GetHotels() {
  return await hotelsRepository.Hotels();
}
async function getRoom(id: number) {
  return await hotelsRepository.get(id);
}
const hotelsService = {
  ticket, GetHotels, getRoom
};
  
export default  hotelsService;
