const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log error stack to console for debugging
  
    // Default error response
    res.status(err.statusCode || 500).json({
      message: err.message || 'Something went wrong!',
      details: err.details || null,
    });
  };
  
  module.exports = errorHandler;
  