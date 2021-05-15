import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';


class UserValidator{
  static getValidationRule=()=>{
    return [
      body('email').isEmail().normalizeEmail().withMessage('Le champ doit être un email'),
      body('nom').notEmpty().withMessage('Le nom est requis'),
      body('prenom').notEmpty().withMessage('Le prénom est requis'),
      body('password').notEmpty().withMessage('Le mot de passe est requis')
    ];
  }

  static getPasswordUpdateValidationRule=()=>{
    return[
      body('password').notEmpty().isStrongPassword().withMessage('Le mot de passe doit contenir un minimum de 8 caractères, 1 symbole, 1 chiffre, 1 majuscule')
      //body('confirmation').equals('password').withMessage('Les mots de passe ne sont pas identiques')
    ];
  }

  static validate=(req:Request, res:Response, next:NextFunction)=>{
      const errors=validationResult(req);
      if(errors.array().length>0){
        errors.array().forEach(error => req.flash('errors', error.msg));
        return res.redirect('/dashboard/user');
      }
      next();
  }

}

export {UserValidator};