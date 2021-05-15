import express, { Request, Response } from 'express';


class LoginController{

  static async showLogin(req:Request, res:Response){

    res.render('login/showlogin', {layout:'mainlogin'});
  }

}

export {LoginController};