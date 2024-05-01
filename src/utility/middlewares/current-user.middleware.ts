
import { Injectable, NestMiddleware } from '@nestjs/common';
import { isArray } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
constructor(private readonly UserService:UsersService){}
    async use(req: Request, res: Response, next: NextFunction) {
    const authHeader=req.headers.authorization || req.headers.Authorization ;
    if(!authHeader || isArray(authHeader)|| !authHeader.startsWith('Bearer ')){
        //req.currentUser=null;
        next();
    }else{
        const token=authHeader.split(' ')[1];
        const{id}=<JwtPayLoad>verify(token,process.env.ACCESS_TOKEN_SECRET_KEY);
        const currentUser=await this.UserService.findOne(+id);
        console.log(currentUser);
        next();
    }
  }
}

interface JwtPayLoad{
    id:string;

}
