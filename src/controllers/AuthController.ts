import { getModelForClass } from '@typegoose/typegoose';
import { NextFunction, Request, Response } from 'express';
import { User } from '../models/user/User';


class AuthController {
  static model=getModelForClass(User)
  static async userAuthenticate(req:Request, res:Response){
    const user=await AuthController.model.authenticate(req.body.email, req.body.password);
    if(user)
    {
      req.session.user=user;
      // eslint-disable-next-line no-unused-expressions
      user.active ? res.redirect('/dashboard/user'): res.redirect('/dashboard/user/pwupdate');
      
    }
    else{
      req.flash('error', 'Bad credantial');
      res.redirect('/login');
    }
  }
  
  public static isLoggedIn(req:Request, res:Response, next:NextFunction){
      // eslint-disable-next-line no-unused-expressions
      console.log(req.session.user);
      req.session.user ? next() : res.redirect('/login');
  }
}

export {AuthController};