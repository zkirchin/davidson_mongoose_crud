module.exports = function (req, res, next) {
  let banners = { message: false };

  if (req.query.ref && req.query.ref === 'Hello') {
    banners.message = true;
  }

  res.locals.banners = banners;
  next();
}
