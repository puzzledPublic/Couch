import { doAsync } from "../../../frontend/src/api/doAsync";

module.exports.main = doAsync( async (req, res, next) => {
    res.send('admin');
});