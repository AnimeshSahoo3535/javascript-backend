const asynchandler = (requesthandler) => {

    return () => {
        Promise.resolve(requesthandler(req, res, next)).catch((err) => next(err));
    }
}







export { asynchandler }










// const asynchandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(re, res, next);
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }