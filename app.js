let path = require ('path');
// let Loader = require ('loader');
let LoaderConnect = require ('loader-connect');;
let express = require ('express');
let session = require ('express-session');
let bodyParser = require ('body-parser');
let busboy = require ('connect-busboy');
let compress = require ('compression');
// let  _ = require ('loadsh');
let csurf = require ('csurf');
let errorhandler = require('errorhandler');
// let helmet = require('helmet');
let bytes = require('bytes');
let passport = require('passport');
let webRouter = require ('./we_router.js');
let zj = require('./zj')
let cors = require('cors');
//静态资源
let staticDir = path.join(__dirname,'public');

//此部分待用



let app = express ();
app.use(cors());

// app.set('views',path.join(__dirname,'views'));
// app.set('view eenginee','html')
app.use('/index',express.static(staticDir));
app.use(require('response-time')());
// app.use(helmet.frameguard('sameorigin'));
app.use(bodyParser.json({limt : '2MB'}));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(require('method-override')());
// app.use(require('cookie-parser')(config.session_secret));
app.use(compress());


// app.use(function (req,res,next) {
//     res.locals.csrf = req.csrfToken ? req.csrfToken() : '';
//     next();
// })

// app.use(busboy({
//     limits: {
//       fileSize: bytes(config.file_limit)
//     }
//   }));

app.use('/api1', webRouter);
app.use('/zj', zj);


// app.use('/', staticDir);
app.use(function (err, req, res, next) {
    console.error(err);
    return res.status(500).send('500 status');
  });
  app.listen('8088',function() {
      console.log('Server Start locallHost:8088')
  })