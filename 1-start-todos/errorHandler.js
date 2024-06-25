const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Hatanın stack trace'ini konsola yazdırma

    // HTTP response ile hatayı müşteriye bildirme
    res.status(500).json({
        success: false,
        message: 'Internal Server Error'
    });
};

export { errorHandler };
