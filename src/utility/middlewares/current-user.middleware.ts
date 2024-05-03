
import { Injectable, NestMiddleware } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import { isArray } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { CurrentUser } from '../decorators/current-user.decorator';

declare global{
    namespace Express{
        interface Request{
            currentUser?:UserEntity;
        }
    }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
constructor(private readonly UserService:UsersService){}
    async use(req: Request, res: Response, next: NextFunction) {
    const authHeader=req.headers.authorization || req.headers.Authorization ;
    if(!authHeader || isArray(authHeader)|| !authHeader.startsWith('Bearer ')){
        req.currentUser=null;
        next();
        return;
    }else{
        try{
        const token=authHeader.split(' ')[1];
        const{id}=<JwtPayLoad>verify(token,process.env.ACCESS_TOKEN_SECRET_KEY);
        const currentUser=await this.UserService.findOne(+id);
        req.currentUser=currentUser;
        //this is to show in the log section remove it later 
        console.log(currentUser);
        next();}catch(error){
            req.currentUser=null;
            next();
        }
    }
  }
}

interface JwtPayLoad{
    id:string;

}
