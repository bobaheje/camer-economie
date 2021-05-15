import dotenv from 'dotenv';
import express, { NextFunction, Request, Response, urlencoded } from 'express';
import flash from 'express-flash';
import exphbs from 'express-handlebars';
import session, { MemoryStore } from 'express-session';
import { resolve } from 'path';
import { DatabaseConnector } from './app.database';
import { router } from './app.router';


//setup environment variables

dotenv.config({path:'config.env'});
// eslint-disable-next-line no-console

DatabaseConnector.initDatabase();

//expresss
const app=express();
//public folder & static files
app.use(express.static(`${process.cwd()}/public`));
/************************************ */
//Parse request
app.use(urlencoded({extended:true}));

//HBS templating engine
/******************** */
app.set('views', resolve(process.cwd(), 'src', 'views'));
const hbsConfig={extname:'.hbs'};
const hbs=exphbs.create(hbsConfig);
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

//Session Management

const sessionStore:MemoryStore=new MemoryStore();
app.use(session({
    cookie:{maxAge:60000},
    store:sessionStore,
    saveUninitialized:true,
    resave:true,
    secret:'triptyk'
}));

//Flash Messages Management
app.use(flash());

//Manage locals
app.use(async (req:Request, res:Response, next:NextFunction)=>{
   
    res.locals.errors = await req.flash('errors')||null;
    res.locals.user = req.session.user || null;
    
    next();
});

//router
app.use(router);
/************************************** */


//Server 

app.listen(process.env.PORT, ()=>{
    // eslint-disable-next-line no-console
    console.log(`The server is listening on port ${process.env.PORT}`);
});

/********************** */

