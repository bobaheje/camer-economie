import { AutoIncrementID } from '@typegoose/auto-increment';
import { DocumentType, plugin, pre, prop, ReturnModelType } from '@typegoose/typegoose';
import { compare, hash } from 'bcrypt';

@pre<User>('save', async function(){
  // eslint-disable-next-line no-invalid-this
  this.password=await hash(this.password, 10);
})

@plugin(AutoIncrementID, {})
class User {
  @prop()
  public _id?:number;
  @prop({
    required:true,
    unique:true,
    lowercase:true,
    trim:true
  })
  public email?:string 

  @prop({
    required:true,
    uppercase:true

  })
  public nom?:string

  @prop()
  public prenom?:string

  @prop()
  public phone?:string

  @prop({
    default:'user'
  })
  public role?:string

  @prop({
    default:false
  })public active?:boolean

  @prop({
    default:Date.now()
  })
  public createdAt?:Date
  @prop({
    required:true
  })
  public password?:string

  public static async updatepassword(this:ReturnModelType<typeof User>, email:string, password:string, confirmation:string){
    const user = await this.findOne({email});
    user.password=password;
    user.active=true;
    try{
      await user.save();
      return true;
    }
    catch(e){
      // eslint-disable-next-line no-console
      require.flash('error', 'Bag request');
      //console.log("");
      return false;
    }
    
    

  }

  public static async authenticate(this:ReturnModelType<typeof User>, email:string, password:string){
    const user=await this.findOne({email});
    if(user){
      try{
          const match=compare(password, user.password);
          if(match){
            return user;
          }
          return false;
      }
      catch(e){
        // eslint-disable-next-line no-console
        //console.log(e);
        return false;
      }
    }

  }
  
}

export {User};