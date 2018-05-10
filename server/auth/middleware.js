let err;

function isUser(req, res, next) {
    if(req.user){
        return next();
    }
    err = new Error('UNAUTHORIZED')
    err.status = 401;
    next(err);
}


function isAdmin(req, res, next){
    if(req.user){
      if (req.user.dataValues.admin) return next();
    }
    err = new Error('UNAUTHORIZED')
    err.status = 401;
    next(err);
}

module.exports = {
    isUser,
    isAdmin
}



