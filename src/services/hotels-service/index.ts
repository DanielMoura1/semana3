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
  const a =await hotelsRepository.Hotels();
  return a;
}
async function getRoom(id: number) {
  const a =await hotelsRepository.get(id);
  return a;
}
const hotelsService = {
  ticket, GetHotels, getRoom
};
  
export default  hotelsService;
