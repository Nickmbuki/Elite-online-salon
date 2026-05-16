import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export class HttpError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message);
  }
}

export function notFoundHandler(_request: Request, _response: Response, next: NextFunction) {
  next(new HttpError(404, "Route not found"));
}

export function errorHandler(error: unknown, _request: Request, response: Response, _next: NextFunction) {
  if (error instanceof ZodError) {
    return response.status(400).json({
      error: "Validation failed",
      details: error.flatten()
    });
  }

  if (error instanceof HttpError) {
    return response.status(error.statusCode).json({ error: error.message });
  }

  if (typeof error === "object" && error && "code" in error && error.code === "23P01") {
    return response.status(409).json({
      error: "That appointment time was just booked. Please choose another available slot."
    });
  }

  console.error(error);
  return response.status(500).json({ error: "Internal server error" });
}
