export default (err, req, res, next) => {
    let message = "";
    let code = 500;

    switch (err.name) {
        case "":
            
            break;
    
        default:
            break;
    }

    res.status(code).json({
        message
    })
}