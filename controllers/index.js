exports.index = function(req, res, next) {
    res.render('index', {title: 'Annoying time'});
}