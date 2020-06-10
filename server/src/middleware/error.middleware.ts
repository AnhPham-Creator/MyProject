import HttpException from "../common/http-exception";
import { Request, Response, NextFunction } from "express";

const errorHandler = (
    error: HttpException,
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const status = error.statusCode || 500
    console.log(error)
    console.log(error.statusCode)
    const message =
        error.message || "It's not you. It's us. We are having some problems."

    response.status(status).send(message);
};

export default errorHandler;
