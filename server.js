const { initialRefresh } = require('./common');
const { app, db, uuidv4, envType } = require('./config');

// app.get("/", (req, res) => {
//     res.send('Welcome');
// });

let userUuid = '';

// function tableSpRefresh() {
//     const spRefresh = require('./sp-index');
//     spRefresh(null, () => {
//         const tableRefresh = require('./table-index');
//         tableRefresh(null);
//     });
// }
// tableSpRefresh();

function isNullOrUndefinedOrEmpty(value) {
    return value === undefined || value === null || value === '';
}

app.get("/versionRefresh/:version/:userUuid", (parentReq, parentRes) => {
    const parentInsert = `SELECT * FROM versionupdate`;
    db.query(parentInsert, (parentErr, parentResult) => {
        if (parentErr) {
            parentRes.status(400).send({ message: parentErr.sqlMessage });
        } else {
            if (isNullOrUndefinedOrEmpty(parentResult[0])) {
                const bodyData = { version: parentReq.params.version, lastModifiedOn: new Date() };
                const sqlInsert = "INSERT INTO versionupdate SET ?";
                db.query(sqlInsert, bodyData, (err, result) => { 
                    if (err) {
                        res.status(400).send({ message: err.sqlMessage });
                    } else {
                        initialRefresh(parentRes, parentReq.params.userUuid);
                    }
                });
            } else if (parentResult[0] && (+parentResult[0]['version'] !== +parentReq.params.version)) {
                const sqlUpdate = "UPDATE versionupdate SET version = ?, lastModifiedOn = NOW()";
                db.query(sqlUpdate, [parentReq.params.version], (updateErr, updateResult) => {
                    if (updateErr) {
                        parentRes.status(400).send({ message: updateErr.sqlMessage });
                    } else {
                        initialRefresh(parentRes, parentReq.params.userUuid);
                    }
                });
            } else {
                initialRefresh(parentRes, parentReq.params.userUuid);
            }
        }
    });
});

app.post("/user", (req, res) => {
    const uuid = uuidv4();
    const bodyData = {...req.body, uuid: uuid};
    const sqlInsert = "INSERT INTO userlist SET ?";
    db.query(sqlInsert, bodyData, (err, result) => { 
        if (err) {
            res.status(400).send({ message: err.sqlMessage });
        } else {
            res.send({ data: bodyData });
        }
    });
});

app.delete("/user", (req, res) => {
    const username = req.body.uuid;
    const sqlInsert = "DELETE FROM userlist where username = ?";
    db.query(sqlInsert, [username], (err, result) => {
        if (err) {
            res.status(400).send({ message: err.sqlMessage });
        } else {
            res.send({ data: req.body });
        }
    });
});

app.put("/user", (req, res) => {
    const uuid = req.body.uuid;
    const password = req.body.password;
    const lastModifiedOn = req.body.lastModifiedOn;
    const sqlInsert = "UPDATE userlist SET password = ?, lastModifiedOn = ? WHERE uuid = ?";
    db.query(sqlInsert, [password, lastModifiedOn, uuid], (err, result) => {
        if (err) {
            res.status(400).send({ message: err.sqlMessage });
        } else {
            res.send({ data: req.body });
        }
    });
});

app.get("/getUser/:userUuid", (req, res) => {
    // const uuid = uuidv4();
    // userUuid = req.params.userUuid;
    // const sqlInsert = `CALL receipthistory('${userUuid}', '${uuid}')`;
    // db.query(sqlInsert, (err, result) => {
    //     if (err) {
    //         res.status(400).send({ message: err.sqlMessage });
    //     } else {
    //         res.send({ data: result[0][0], spentType: result[1], transferType: result[2] });
    //     }
    // });
    const sqlInsert = `SELECT * FROM userlist WHERE uuid = '${req.params.userUuid}'` ;
    db.query(sqlInsert, (err, result) => {
        if (err) {
            res.status(400).send({ message: err.sqlMessage });
        } else {
            res.send({ data: result });
        }
    });
    // res.send({ data: req.params.userUuid, DBHost: process.env.DBHost, DBUser: process.env.DBUser, DBPassword: process.env.DBPassword, DBName: process.env.DBName });
});

app.post("/receiptUpload", (req, res) => {
    const uuid = uuidv4();
    const bodyData = { ...req.body, userUuid: userUuid, uuid: uuid };
    const sqlInsert = "INSERT INTO receiptUpload SET ?";
    db.query(sqlInsert, bodyData, (err, result) => { 
        if (err) {
            res.status(400).send({ message: err.sqlMessage });
        } else {
            res.send({ data: bodyData });
        }
    });
});

app.post("/categoryType", (req, res) => {
    const uuid = uuidv4();
    const bodyData = { ...req.body, userUuid: userUuid, uuid: uuid };
    const sqlInsert = "INSERT INTO categoryType SET ?";
    db.query(sqlInsert, bodyData, (err, result) => { 
        if (err) {
            res.status(400).send({ message: err.sqlMessage });
        } else {
            res.send({ data: bodyData });
        }
    });
});

app.post("/bankDetails", (req, res) => {
    const uuid = uuidv4();
    const bodyData = { ...req.body, userUuid: userUuid, uuid: uuid };
    const sqlInsert = "INSERT INTO bankDetails SET ?";
    db.query(sqlInsert, bodyData, (err, result) => { 
        if (err) {
            res.status(400).send({ message: err.sqlMessage });
        } else {
            res.send({ data: bodyData });
        }
    });
});

app.get("/receiptHistoryHeader", (req, res) => {
    const sqlInsert = `SELECT * FROM receiptHistoryHeader WHERE userUuid = '${userUuid}'` ;
    db.query(sqlInsert, (err, result) => {
        if (err) {
            res.status(400).send({ message: err.sqlMessage });
        } else {
            res.send({ data: result });
        }
    });
});

app.get("/monthlyExpense", (req, res) => {
    const sqlInsert = `SELECT * FROM monthlyExpense WHERE userUuid = '${userUuid}' order by expenseMonth asc` ;
    db.query(sqlInsert, (err, result) => {
        if (err) {
            res.status(400).send({ message: err.sqlMessage });
        } else {
            res.send({ data: result });
        }
    });
});

app.post("/monthlyExpense", (req, res) => {
    const uuid = uuidv4();
    const bodyData = { ...req.body, userUuid: userUuid, uuid: uuid };
    const sqlInsert = "INSERT INTO monthlyExpense SET ?";
    db.query(sqlInsert, bodyData, (err, result) => { 
        if (err) {
            res.status(400).send({ message: err.sqlMessage });
        } else {
            res.send({ data: bodyData });
        }
    });
});

app.get("/getReceiptRelatedMaster/:entity/:hdrUuid", (req, res) => {
    const sqlInsert = `CALL getReceiptRelatedMaster('${userUuid}', '${req.params.entity}', '${req.params.hdrUuid}')`;
    db.query(sqlInsert, (err, result) => {
        if (err) {
            res.status(400).send({ message: err.sqlMessage });
        } else {
            if (req.params.entity === 'home') {
                res.send({ receiptData: [], monthlyExpenseData: result[0], sumOfCategory: result[1], sumOfBank: result[2], sumOfSpent: result[3] });
            } else if (req.params.entity === 'monthlyExpense') {
                res.send({ categoryData: result[0], bankData: result[1] });
            } else if (req.params.entity === 'receiptUpload') {
                res.send({ receiptData: result[0], categoryData: result[1], bankData: result[2], monthlyExpenseData: result[3] });
            } else if (req.params.entity === 'history') {
                res.send({  receiptData: result[0], monthlyExpenseData: result[1],
                    sumOfCategory: result[2], sumOfBank: result[3], sumOfSpent: result[4] });
            }
        }
    });
});

app.listen(process.env.PORT, () => {
    console.log('Running on port 3002');
});
