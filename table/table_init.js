const { db, DBName } = require('../config');
const all_tables = require("./table_collection");
const Sp = require('../sprocs/sprocs_class/sproc_base');

class table_refresh {
    constructor() {
        this.connection = new Sp();
        this.init = this.init.bind(this);
        this.refresh = async(res = null, callBack) => {
            try {
                for (let table of all_tables) {
                    console.log(`CALL tableCheck('${DBName}', '${table.name}')`);
                    const sqlInsert = await this.connection.connection_query(`CALL tableCheck('${DBName}', '${table.name}')`);
                    if (sqlInsert) {
                        if (sqlInsert[0][0]['ALTER'] === "ALTER") {
                            console.log(`SHOW COLUMNS FROM ${table.name}`);
                            const sqlColumns = await this.connection.connection_query(`SHOW COLUMNS FROM ${table.name}`);
                            if (sqlColumns.length) {
                                let fieldListStr = '';
                                let modifyListStr = '';
                                for (var j = 0; j < table.queryList.length; j++) {
                                    let filterData = sqlColumns.filter((cols) => cols.Field === table.queryList[j]['field']);
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
                                    console.log(`ALTER TABLE ${table.name} ADD (${fieldListStr})`);
                                    const sqlAlter = await this.connection.connection_query(`ALTER TABLE ${table.name} ADD (${fieldListStr})`);
                                    if (sqlAlter) {
                                        //
                                    }
                                    if (modifyListStr) {
                                        console.log(`ALTER TABLE ${table.name} ${modifyListStr}`);
                                        const sqlModify = await this.connection.connection_query(`ALTER TABLE ${table.name} ${modifyListStr}`);
                                        if (sqlModify) {
                                            //
                                        }
                                    }
                                } else {
                                    if (modifyListStr) {
                                        console.log(`ALTER TABLE ${table.name} ${modifyListStr}`);
                                        const sqlModify = await this.connection.connection_query(`ALTER TABLE ${table.name} ${modifyListStr}`);
                                        if (sqlModify) {
                                            //
                                        }
                                    }
                                }
                            }
                        } else {
                            let fieldList = table.queryList.map((line) => {
                                return `${line.field} ${line.type} ${line.null}`;
                            });
                            let fieldListStr = fieldList.join(',')
                            let queryFormat = fieldListStr;
                            if (table.query) {
                                queryFormat += `, ${table.query}`;
                            }
                            console.log(`CREATE TABLE ${table.name} (${queryFormat});`);
                            const sqlCreate = await this.connection.connection_query(`CREATE TABLE ${table.name} (${queryFormat});`);
                            if (sqlCreate) {
                                //
                            }
                        }
                    }
                }
            } catch(err) {
                //
            } finally {
                callBack && callBack();
            }
        }
    }

    init(response, callBack) {
        console.log('table');
        return this.refresh(response, callBack);
    }
}

const tb = new table_refresh();
module.exports = tb.init;