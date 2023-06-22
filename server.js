const { app } = require('./config');

app.get("/", (req, res) => {
    res.send('Welcome');
});

app.get("/getUser", (req, res) => {
    console.log('api-end');
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
    res.send({ data: 'success' });
});

app.listen(3002, () => {
    console.log('Running on port 3002');
});
