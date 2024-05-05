import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, mixin } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';


//this code works but for this we have to use decorator and add another decorator later so solve this we will be implementing down code 
// @Injectable()
// export class AuthorizeGuard implements CanActivate {

//     constructor(private reflector:Reflector){}

//   canActivate(
//     context: ExecutionContext,
//   ): boolean {
//     const allowedRoles=this.reflector.get<string[]>('allowedRoles',context.getHandler());
//     const request = context.switchToHttp().getRequest();
//     const result=request?.currentUser?.roles.map((role:string)=>allowedRoles.includes(role)).find
//     ((val:boolean)=>val===true);
//     if(result)return true;
//     throw new UnauthorizedException('Sorry, you are not authorized. ')
//   }
// }

export const AuthorizeGuard = (allowedRoles:string[])=>{
  class RoleGuardMixin implements CanActivate{
    canActivate(context: ExecutionContext): boolean{
      const request = context.switchToHttp().getRequest();
    const result=request?.currentUser?.roles.map((role:string)=>allowedRoles.includes(role)).find
    ((val:boolean)=>val===true);
    if(result)return true;
    throw new UnauthorizedException('Sorry, you are not authorized. ')    
    }
  }
  const guard=mixin(RoleGuardMixin);
  return guard;
}
