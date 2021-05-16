import moment from 'moment';
import slug from 'slug';


class Helpers {
  static registerHelpers(engine:any){
    engine.handlebars.registerHelper('slug', (arg:string, arg2:string)=>{
      return slug(arg);
    });
  }

  static registerEqHelpers(engine:any){
    engine.handlebars.registerHelper('eq', (arg:string, arg2:string)=>{
      return arg===arg2;
    });
  }

  static registerDateformatHelpers(engine:any){
    engine.handlebars.registerHelper('dateFormat', (date, options)=>{
      // eslint-disable-next-line prefer-rest-params
      moment.locale('fr');
      const formatToUse=(arguments[1] && arguments[1].hash && arguments[1].hash.format) || 'DD MMM YYYY';
      return moment(date).format(formatToUse);
    });
  }
}

export {Helpers};