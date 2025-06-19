const wrapAsync = (fn) => {
    return (req, res, next) => {
      fn(req, res, next).catch(next); // Automatically catch any unhandled errors
    };
  };
  
module.exports = wrapAsync;
  