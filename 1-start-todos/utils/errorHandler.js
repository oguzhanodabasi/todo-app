const errorHandler = (err, req, res, next) => {
    const endpoint = req.originalUrl || req.route.path || 'Unknown endpoint';
    console.error(`Hata endpoint: ${endpoint}, \nHata: ${err.stack}`);

    // HTTP response ile hatayı müşteriye bildirme
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
};

export default errorHandler;
