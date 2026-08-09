import { Response } from "express";
import HttpStatus from "../constants/httpStatus";
import Messages from "../constants/messages";

interface IResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: any;
}

class ApiResponse {
  /**
   * Success Response
   * @param res - Express Response object
   * @param data - The data to send (optional)
   * @param message - Success message
   * @param statusCode - HTTP Status (Default: 200 OK)
   */
  static success(
    res: Response,
    data: any = null,
    message: string = Messages.SUCCESS,
    statusCode: number = HttpStatus.OK,
  ): Response {
    const response: IResponse = {
      success: true,
      message,
    };

    if (data !== null && data !== undefined) {
      response.data = data;
    }

    return res.status(statusCode).json(response);
  }

  /**
   * Error Response
   * @param res - Express Response object
   * @param message - Error message
   * @param statusCode - HTTP Status (Default: 500)
   * @param error - Extra error details/stack (optional)
   */
  static error(
    res: Response,
    message: string = Messages.ERROR.INTERNAL_SERVER_ERROR,
    statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR,
    error: any = null,
  ): Response {
    const response: IResponse = {
      success: false,
      message,
    };

    if (error !== null && error !== undefined) {
      response.error = error;
    }

    return res.status(statusCode).json(response);
  }

  // Created Response (201)
  static created(
    res: Response,
    message: string = Messages.SUCCESS,
    data: any = null,
  ): Response {
    return this.success(res, data, message, HttpStatus.CREATED);
  }


  // No Content Response (204)
  static noContent(
    res: Response,
    message: string = Messages.SUCCESS,
    data: any = null,
  ): Response {
    return this.success(res, data, message, HttpStatus.NO_CONTENT);
  }

  // Unauthorized Response (401)
  static unauthorized(
    res: Response,
    message: string = Messages.ERROR.UNAUTHORIZED,
  ): Response {
    return this.error(res, message, HttpStatus.UNAUTHORIZED);
  }

  // Forbidden Response (403)
  static forbidden(
    res: Response,
    message: string = Messages.ERROR.FORBIDDEN,
  ): Response {
    return this.error(res, message, HttpStatus.FORBIDDEN);
  }

  // Bad Request Response (400)
  static badRequest(
    res: Response,
    message: string = Messages.ERROR.BAD_REQUEST,
    error: any = null,
  ): Response {
    return this.error(res, message, HttpStatus.BAD_REQUEST, error);
  }

  // Not Found Response (404)
  static notFound(
    res: Response,
    message: string = Messages.ERROR.NOT_FOUND,
    error: any = null,
  ): Response {
    return this.error(res, message, HttpStatus.NOT_FOUND, error);
  }
}

export default ApiResponse;
