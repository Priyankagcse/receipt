const TABLECHECK = {
    name: 'TABLECHECK',
    query: `CREATE PROCEDURE tableCheck(dbName varchar(50), tableName varchar(50))
            BEGIN
                SET @ext = (SELECT EXISTS (SELECT * FROM information_schema.TABLES WHERE TABLE_SCHEMA LIKE dbName AND TABLE_NAME = tableName));
                IF @ext = 1 THEN
                    select 'ALTER';
                ELSE
                    select 'CREATE';
                END IF;
            END`
}

const INITIALREFRESH = {
    name: 'INITIALREFRESH',
    query: `CREATE PROCEDURE initialRefresh(userUuid varchar(50))
            BEGIN
                SET @topHistoryHeader = (SELECT rh.createdOn FROM receipthistoryheader rh order by createdOn desc limit 1);
                SELECT *, @topHistoryHeader as historyMovedDate FROM userlist;
                SELECT * FROM menulist WHERE isActive = 1 order by orderNo asc;
                SELECT * from spenttype st;
                SELECT * from transfertype ty;
            END`
    }

const GETRECEIPTRELATEDMASTER = {
    name: 'GETRECEIPTRELATEDMASTER',
    query: `CREATE PROCEDURE getReceiptRelatedMaster(userUuid varchar(50), entity varchar(45), hdrUuid varchar(50))
            BEGIN
                IF entity = 'home' THEN
                    select * from monthlyexpense me where me.userUuid = userUuid;
                    select categoryTypeName as name, sum(amount) as value, transferId from receiptupload ru where ru.useruuid = useruuid group by categoryUuid;
                    select bankName as name, sum(amount) as value, transferId from receiptupload ru where ru.useruuid = useruuid group by bankUuid;
                    select spentType as name, sum(amount) as value, transferId from receiptupload ru where ru.useruuid = useruuid group by spentTypeUuid;
                ELSEIF entity = 'monthlyExpense' THEN
                    select * from categorytype ct where ct.userUuid = userUuid;
                    select * from bankdetails bd where bd.userUuid = userUuid;
                ELSEIF entity = 'receiptUpload' THEN
                    select * from receiptupload ru where ru.userUuid = userUuid;
                    select * from categorytype ct where ct.userUuid = userUuid;
                    select * from bankdetails bd where bd.userUuid = userUuid;
                    select * from monthlyexpense me where me.userUuid = userUuid;
                ELSEIF entity = 'history' THEN
                    select * from receipthistoryline rh where rh.userUuid = userUuid and rh.hdrUuid = hdrUuid;
                    select * from monthlyexpense me where me.userUuid = userUuid;
                    select categoryTypeName as name, sum(amount) as value, transferId from receipthistoryline rh where rh.useruuid = useruuid and rh.hdrUuid = hdrUuid group by categoryUuid;
                    select bankName as name, sum(amount) as value, transferId from receipthistoryline rh where rh.useruuid = useruuid and rh.hdrUuid = hdrUuid group by bankUuid;
                    select spentType as name, sum(amount) as value, transferId from receipthistoryline rh where rh.useruuid = useruuid and rh.hdrUuid = hdrUuid group by spentTypeUuid;
                ELSEIF entity = 'history1' THEN
                    select * from monthlyexpense me where me.userUuid = userUuid;
                ELSEIF entity = 'history2' THEN
                    select * from monthlyexpense me where me.userUuid = userUuid;
                END IF;
            END`
}

const RECEIPTHISTORY = {
    name: 'RECEIPTHISTORY',
    query: `CREATE PROCEDURE receipthistory(userUuid varchar(50), uuid varchar(50))
            BEGIN
                SET @historyList = (SELECT ru.uuid FROM receiptupload ru where ((MONTH(createdOn) < MONTH(CURRENT_DATE())) OR ((MONTH(createdOn) > MONTH(CURRENT_DATE())) AND (YEAR(createdOn) < YEAR(CURRENT_DATE())))) order by createdOn desc limit 1);
                IF NOT @historyList IS NULL THEN
                    SET @hdrUuid = uuid;
                    SET @createdOn = NOW();
                    INSERT INTO receipthistoryheader (userUuid, uuid, createdOn)  values (userUuid, uuid, NOW());
                    INSERT INTO receipthistoryline select userUuid, @hdrUuid as hdrUuid, ru.uuid, billDate, monthlyExpenseTemplate, monthlyExpenseTemplateUuid, categoryUuid, categoryTypeName, bankUuid, bankName, spentTypeUuid, spentType, amount, description, image, createdOn, transferType, transferTypeUuid, transferId, lastModifiedOn from receiptupload as ru where ((MONTH(createdOn) < MONTH(CURRENT_DATE())) OR ((MONTH(createdOn) > MONTH(CURRENT_DATE())) AND (YEAR(createdOn) < YEAR(CURRENT_DATE()))));
                    DELETE FROM receiptupload where ((MONTH(createdOn) < MONTH(CURRENT_DATE())) OR ((MONTH(createdOn) > MONTH(CURRENT_DATE())) AND (YEAR(createdOn) < YEAR(CURRENT_DATE()))));
                    SET @sumAmount = (select sum(rl.amount) from receipthistoryheader rh join receipthistoryline rl on uuid = rl.hdrUuid group by uuid);
                    update receipthistoryheader rh set amount = @sumAmount where rh.uuid = uuid;
                    SELECT *, @createdOn as historyMovedDate from userlist u where u.uuid = userUuid;
                    SELECT * from spenttype st;
                    SELECT * from transfertype ty;
                ELSE
                    SET @topHistoryHeader = (SELECT rh.createdOn FROM receipthistoryheader rh order by createdOn desc limit 1);
                    SELECT *, @topHistoryHeader as historyMovedDate from userlist u where u.uuid = userUuid;
                    SELECT * from spenttype st;
                    SELECT * from transfertype ty;
                END IF;
            END`
}

const all_store_procedure = [
    TABLECHECK,
    INITIALREFRESH,
    GETRECEIPTRELATEDMASTER,
    RECEIPTHISTORY
]

module.exports = all_store_procedure

/*
    You can only achieve some fast performance with stored procedure just because it is cached in sql server in binary form and only function call with para goes to sql every time

    Real performance you can achieve with efficient query 

    1. Sql partitioning of searching huge data **
    2. Instead of update use case
    3. Use temperory table for joins and delete them after use
    4. Avoid joins instead use sub query if possible **
    5. Avoid cursor,triggers
    6. Select exact amount of data needed
    7. Use stored procedures **
    8. Avoid distinct instead use group by self join **
    9. Use EXISTS instead of where IN
    10. Avoid subquery use CTE
*/