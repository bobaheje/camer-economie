import { connect } from 'mongoose';

class DatabaseConnector {
  static async initDatabase(){
    try{
      await connect(process.env.DB_URI || 'mongodb://localhost:27017/camerecodb', {
        useCreateIndex:true,
        useNewUrlParser:true,
        useUnifiedTopology:true
      });
    }
    catch(e){
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };
}

export {DatabaseConnector};