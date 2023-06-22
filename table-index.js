function refresh(response, callBack) {
    try {
        const table_init = require('./table/table_init');
        table_init(response, callBack);
    } catch(err) {
        console.log(err.message);
    }
}

module.exports = refresh;