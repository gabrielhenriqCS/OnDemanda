import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWTPayload } from "../models/Usuario";

export const validadeToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Token não fornecido" });
    }

    const [, token] = authHeader.split(" ");

    try {
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN!) as JWTPayload;
        (req as any).user = decoded;
        return next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido ou expirado" });
    }
}