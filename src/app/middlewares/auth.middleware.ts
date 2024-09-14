import { Request, Response, NextFunction } from "express";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    return next();
};

export default authMiddleware;
