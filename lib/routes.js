module.exports = (app, rscript) => {
    app.get('/', (req, res) => {
        res.render('index');
    });

    app.get('/run', (req, res) => {
        rscript.run();
        res.redirect('/');
    });
};