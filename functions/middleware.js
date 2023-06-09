module.exports = function () {
    const sessionStore = new mongoDbStore({
        uri:config.mongoDB,
        collection:'sessions'
    });

    app.use(express.json());
    app.use(express.urlencoded({extended:false}));
    app.set('view engine', 'ejs');
    app.set('views', 'www');

    app.use('/home', express.static('www/home/assets'));
    app.use('/admin', express.static('www/admin/assets'));
    app.use('/uploads', express.static('www/admin/uploads'));
    app.use('/slider', express.static('www/home/slider'));
    app.use('/ajax', express.static('www/admin/ajax'));
    app.use('/ajaxs', express.static('www/home/ajax'));
    app.use('/urungorselleri', express.static('www/home/urungorselleri'));

    app.use(session({
        secret:config.mongoDB,
        resave:false,
        saveUninitialized: true,
        cookie:{
            maxAge:36000000
        },
        store:sessionStore
    }));
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());


    app.use((req,res,next) =>{
        res.locals.validation_error = req.flash('validation_error');
        res.locals.success_message = req.flash('success_message');
        res.locals.baslik = req.flash('baslik');
        res.locals.aciklama = req.flash('aciklama');
        res.locals.anahtar = req.flash('anahtar');
        res.locals.logo = req.flash('logo');
        res.locals.favicon = req.flash('favicon');
        res.locals.uyemail = req.flash('uyemail');
        res.locals.email = req.flash('email');
        res.locals.uyeadi = req.flash('uyeadi');
        next();
    })
}


 