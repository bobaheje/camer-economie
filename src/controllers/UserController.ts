import { getModelForClass, pre } from '@typegoose/typegoose';
import { hash } from 'bcrypt';
import { Request, Response } from 'express';
import { request } from 'http';
import { titleCase } from 'title-case';
import { User } from '../models/user/User';

@pre<User>('save', function(){
   // eslint-disable-next-line no-invalid-this
   this.password=hash(this.password as string, 10);
  
})
class UserController {

  static userModel=getModelForClass(User);

  static async addUser(req:Request, res:Response){
    res.render('dashboard/user', {layout:'dashboard'});
  }

  static async createUser(req:Request, res:Response){
    req.body.prenom=titleCase(req.body.prenom);
    const pw=await hash(req.body.password as string, 10);
   
    try{
       
        req.body.password=pw;
        await UserController.userModel.create(req.body);
    }
    catch(e){
      // eslint-disable-next-line no-console
      console.log(e);
    }
    res.redirect('/dashboard/user');
  }
  static async showUpdateUserPassword(req:Request, res:Response){
    res.render('dashboard/userupdatepw', {layout:'dashboard'});
  }


  static async updateUserPassword(req:Request, res:Response){
    const isUpdated = await UserController.userModel.updatepassword(req.session.user.email, req.body.password, req.body.confirmation);
    req.session.user=null;
    res.redirect('/login');
    
    
  }
}

export {UserController};