import { getModelForClass, pre } from '@typegoose/typegoose';
import { hash } from 'bcrypt';
import { Request, Response } from 'express';
import { request } from 'http';
import { titleCase } from 'title-case';
import { User } from '../models/user/User';


class UserController {

  static userModel=getModelForClass(User);

  static async addUser(req:Request, res:Response){
    res.render('dashboard/user/user', {layout:'dashboard'});
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
    res.redirect('/dashboard/user/list');
  }
  static async showUpdateUserPassword(req:Request, res:Response){
    res.render('dashboard/user/userupdatepw', {layout:'dashboard'});
  }


  static async updateUserPassword(req:Request, res:Response){
    const isUpdated = await UserController.userModel.updatepassword(req.session.user.email, req.body.password, req.body.confirmation);
    req.session.user=null;
    res.redirect('/login');
    
    
  }

  static async getUsers(req:Request, res:Response){
    const users =await UserController.userModel.find({}).sort({nom:'asc'}).lean();
    res.render('dashboard/user/userlist', {layout:'dashboard', datas:users});
  }

  static async getUser(req:Request, res:Response){
    
    const id=parseInt(req.params.id);
    try{
      const user=await UserController.userModel.findById({_id:id}).lean();
      res.render('dashboard/user/useredit', {layout:'dashboard', datas:user});
    }
    catch(e){
      req.flash('error', e);
      console.log(e);
      res.redirect('/dashboard/user/list');
    }
    
    
  }

  
  public static async logOut(req:Request, res:Response, next:NextFunction){
    req.session.user=null;
    res.redirect('/login');
  }

  public static async updateUser(req:Request, res:Response){

    const id=parseInt(req.params.hiddenid);
    const updates=Object.keys(req.body);
    const user=UserController.userModel.findById({_id:id});

    try{
      updates.forEach(element => user[element]=req.body[element]);
      await user.save();
      res.redirect('/dashboard/user/list');
    }
    catch(e){
      req.flash('error', 'Problem occurs when updating');
      console.log(e);
      res.redirect('/dashboard/user/list');
    }
  }

}

export {UserController};