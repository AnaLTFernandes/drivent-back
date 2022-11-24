import { Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares";
import hotelsService from "@/services/hotels-service";

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    //console.log(1)
    const hotels = await hotelsService.getHotels(userId);
    //console.log(2)
    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    //console.log(3)
    if (error.name === "PaymentRequiredError") {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }

    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}

export async function getRoomsFromHotel(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const hotelId = Number(req.params.id) || null;

  if (!hotelId) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const rooms = await hotelsService.getRoomsFromHotel(hotelId, userId);

    return res.status(httpStatus.OK).send(rooms);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    if (error.name === "PaymentRequiredError") {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }

    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}
