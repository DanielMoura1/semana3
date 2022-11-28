import { AuthenticatedRequest } from "@/middlewares";
import hotelsService from "@/services/hotels-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function gethotels(req: AuthenticatedRequest, res: Response) {
  try{
    const { idTicket } = req.body;
    const ticket= await hotelsService.ticket(idTicket);
    if(ticket[0].status==="RESERVED" ||ticket[0].TicketType.isRemote===true) {
      return res.sendStatus(400);
    }
    const response= await hotelsService.GetHotels();
    return res.status(httpStatus.OK).send(response);
  }catch(error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
export async function getRoom(req: AuthenticatedRequest, res: Response) {
  try{
    const { hotelId } = req.params;
    const id: number = parseInt(hotelId);
    const response= await hotelsService.getRoom(id);
    if(response.length===0) {
      return res.sendStatus(404);
    }
    return res.status(httpStatus.OK).send(response);
  }catch(error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
