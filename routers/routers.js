module.exports = function () {
    
    require('../functions/middleware')(this); 
    app.use('/', require('../routers/home/index'));
    app.use('/', require('../routers/admin/index'));
}