import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { gethotels, getRoom } from "@/controllers";
import { Gethotels } from "@/schemas";
const hotelsRouter = Router();

hotelsRouter 
  .get("/", validateBody(Gethotels), gethotels )
  .get("/:hotelId", getRoom);
export { hotelsRouter  };
