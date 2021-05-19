import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
    console.log({'|INFO|': {'method': req.method, 'response': res.statusCode, 'URL': req.originalUrl, timestamp: new Date().toISOString()}});
    next();
}
