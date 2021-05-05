import express from 'express';
import exphbs from 'express-handlebars';
import { resolve } from 'path';
import { router } from './app.router';



const port=3000;
const app=express();

//expresss
//public folder
app.use(express.static(`${process.cwd()}/public`));
/************************************ */

//HBS templating engine
/******************** */
app.set('views', resolve(process.cwd(), 'src', 'views'));
const hbdConfig={extname:'.hbs'};
const hbs=exphbs.create(hbdConfig);
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');





//router
app.use(router);
/************************************** */


//Server 

app.listen(port, ()=>{
    // eslint-disable-next-line no-console
    console.log(`The server is listening on port ${port}`);
});

/********************** */

