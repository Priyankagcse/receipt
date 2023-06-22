function refresh(response, callBack) {
    try {
        const sprocs_init = require('./sprocs/sprocs_class/sproc_init');
        sprocs_init(response, callBack);
    } catch(err) {
        console.log(err.message);
    }
}

module.exports = refresh;