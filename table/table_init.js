const { db, DBName } = require('../config');
const all_tables = require("./table_collection");

class table_refresh {
    constructor() {
        this.init = this.init.bind(this);
        this.modify = this.modify.bind(this);
        this.refresh = (res = null, callBack) => {
            try {
                for (let table of all_tables) {
                    const sqlInsert = `CALL tableCheck('${DBName}', '${table.name}')`;
                    db.query(sqlInsert, (err, result) => {
                        if (result[0][0]['ALTER'] === "ALTER") {
                            const sqlColumns = `SHOW COLUMNS FROM ${table.name}`;                            
                            db.query(sqlColumns, (columnsErr, columnsResult) => {
                                if (columnsErr) {
                                    console.log('if');
                                    console.log('Columns ' + columnsErr.sqlMessage);
                                    throw columnsErr;
                                } else {
                                    console.log('else');
                                    let fieldListStr = '';
                                    let modifyListStr = '';
                                    for (var j = 0; j < table.queryList.length; j++) {
                                        let filterData = columnsResult.filter((cols) => cols.Field === table.queryList[j]['field']);
                                        if (filterData.length === 0) {
                                            fieldListStr += `${table.queryList[j]['field']} ${table.queryList[j]['type']} ${table.queryList[j]['null']},`;
                                        } else {
                                            if (filterData[0]['Type'] !== table.queryList[j]['type']) {
                                                modifyListStr += `MODIFY COLUMN ${table.queryList[j]['field']} ${table.queryList[j]['type']},`;
                                            }
                                        }
                                    }
                                    fieldListStr = fieldListStr.replace(/.$/,"");
                                    modifyListStr = modifyListStr.replace(/.$/,"");
                                    if (fieldListStr) {
                                        const sqlAlter = `ALTER TABLE ${table.name} ADD (${fieldListStr})`;
                                        console.log(sqlAlter);
                                        db.query(sqlAlter, (alterErr, alterResult) => {
                                            if (alterErr) {
                                                console.log(`${sqlAlter} ${alterErr.sqlMessage}`);
                                            } else {
                                                this.modify(table.name, modifyListStr);
                                            }
                                        });
                                    } else {
                                        console.log('modify');
                                        this.modify(table.name, modifyListStr);
                                    }
                                }
                            });
                        } else {
                            let fieldList = table.queryList.map((line) => {
                                return `${line.field} ${line.type} ${line.null}`;
                            });
                            let fieldListStr = fieldList.join(',')
                            let queryFormat = fieldListStr;
                            if (table.query) {
                                queryFormat += `, ${table.query}`;
                            }
                            const sqlCreate = `CREATE TABLE ${table.name} (${queryFormat});`;
                            db.query(sqlCreate, (createErr, createResult) => {
                                if (createErr) {
                                    console.log('Create ' + createErr.sqlMessage);
                                } else {
                                    //
                                }
                            });
                        }
                    });
                }
            } catch(err) {
                //
            } finally {
                callBack && callBack();
            }
        }
    }

    modify(tableName, modifyListStr) {
        if (modifyListStr) {
            const sqlModify = `ALTER TABLE ${tableName} ${modifyListStr}`;
            db.query(sqlModify, (modifyErr, modifyResult) => {
                if (modifyErr) {
                    console.log(`${sqlModify} ${modifyErr.sqlMessage}`);
                } else {
                    //
                }
            });
        }
    }

    init(response, callBack) {
        return this.refresh(response, callBack);
    }
}

const tb = new table_refresh();
module.exports = tb.init;