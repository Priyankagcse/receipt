const bankdetails = {
    name: 'bankdetails',
    query: `PRIMARY KEY (uuid)`,
    queryList: [
        {field: 'userUuid', type: 'varchar(50)', null: 'DEFAULT NULL'},
        {field: 'uuid', type: 'varchar(50)', null: 'NOT NULL'},
        {field: 'bankName', type: 'varchar(20)', null: 'DEFAULT NULL'},
        {field: 'description', type: 'varchar(45)', null: 'DEFAULT NULL'},
        {field: 'createdOn', type: 'datetime', null: 'DEFAULT NULL'},
        {field: 'lastModifiedOn', type: 'datetime', null: 'DEFAULT NULL'}
    ]
}

const categorytype = {
    name: 'categorytype',
    query: `PRIMARY KEY (uuid)`,
    queryList: [
        {field: 'userUuid', type: 'varchar(50)', null: 'DEFAULT NULL'},
        {field: 'uuid', type: 'varchar(50)', null: 'NOT NULL'},
        {field: 'categoryTypeName', type: 'varchar(15)', null: 'DEFAULT NULL'},
        {field: 'description', type: 'varchar(45)', null: 'DEFAULT NULL'},
        {field: 'createdOn', type: 'datetime', null: 'DEFAULT NULL'},
        {field: 'lastModifiedOn', type: 'datetime', null: 'DEFAULT NULL'}
    ]
}

const menulist = {
    name: 'menulist',
    query: `PRIMARY KEY (uuid)`,
    queryList: [
        {field: 'userUuid', type: 'varchar(50)', null: 'DEFAULT NULL'}, // modify
        {field: 'uuid', type: 'varchar(50)', null: 'NOT NULL'},
        {field: 'menuId', type: 'int', null: 'DEFAULT NULL'},
        {field: 'menuName', type: 'varchar(20)', null: 'DEFAULT NULL'},
        {field: 'orderNo', type: 'int', null: 'DEFAULT NULL'},
        {field: 'displayName', type: 'varchar(20)', null: 'DEFAULT NULL'},
        {field: 'pathName', type: 'varchar(45)', null: 'DEFAULT NULL'},
        {field: 'pathTemplate', type: 'varchar(45)', null: 'DEFAULT NULL'},
        {field: 'isActive', type: 'int', null: 'DEFAULT NULL'}
    ]
}

const monthlyexpense = {
    name: 'monthlyexpense',
    query: `PRIMARY KEY (uuid)`,
    queryList: [
        {field: 'userUuid', type: 'varchar(50)', null: 'DEFAULT NULL'},
        {field: 'uuid', type: 'varchar(50)', null: 'NOT NULL'},
        {field: 'templateName', type: 'varchar(100)', null: 'DEFAULT NULL'},
        {field: 'expenseMonth', type: 'varchar(20)', null: 'DEFAULT NULL'},
        {field: 'totalAmount', type: 'decimal(10,0)', null: 'DEFAULT NULL'},
        {field: 'expenseAmount', type: 'decimal(10,0)', null: 'DEFAULT NULL'},
        {field: 'remainingAmount', type: 'decimal(10,0)', null: 'DEFAULT NULL'},
        {field: 'fromDate', type: 'datetime', null: 'DEFAULT NULL'},
        {field: 'toDate', type: 'datetime', null: 'DEFAULT NULL'},
        {field: 'categoryTypes', type: 'longtext', null: ''},
        {field: 'bankNames', type: 'longtext', null: ''},
        {field: 'createdOn', type: 'datetime', null: 'DEFAULT NULL'},
        {field: 'lastModifiedOn', type: 'datetime', null: 'DEFAULT NULL'}
    ]
}

const receipthistoryheader = {
    name: 'receipthistoryheader',
    query: `PRIMARY KEY (uuid)`,
    queryList: [
        {field: 'userUuid', type: 'varchar(50)', null: 'DEFAULT NULL'},
        {field: 'uuid', type: 'varchar(50)', null: 'NOT NULL'},
        {field: 'createdOn', type: 'datetime', null: 'DEFAULT NULL'},
        {field: 'amount', type: 'decimal(10,0)', null: 'DEFAULT NULL'},
    ]   
}

const receipthistoryline = {
    name: 'receipthistoryline',
    query: `PRIMARY KEY (uuid)`,
    queryList: [
        {field: 'userUuid', type: 'varchar(50)', null: 'DEFAULT NULL'},
        {field: 'hdrUuid', type: 'varchar(50)', null: 'DEFAULT NULL'},
        {field: 'uuid', type: 'varchar(50)', null: 'NOT NULL'},
        {field: 'billDate', type: 'datetime', null: 'DEFAULT NULL'},
        {field: 'monthlyExpenseTemplate', type: 'varchar(50)', null: 'DEFAULT NULL'},
        {field: 'monthlyExpenseTemplateUuid', type: 'varchar(50)', null: 'DEFAULT NULL'},
        {field: 'categoryUuid', type: 'varchar(50)', null: 'DEFAULT NULL'},
        {field: 'categoryTypeName', type: 'varchar(15)', null: 'DEFAULT NULL'},
        {field: 'bankUuid', type: 'varchar(50)', null: 'DEFAULT NULL'},
        {field: 'bankName', type: 'varchar(20)', null: 'DEFAULT NULL'},
        {field: 'spentTypeUuid', type: 'varchar(50)', null: 'DEFAULT NULL'},
        {field: 'spentType', type: 'varchar(15)', null: 'DEFAULT NULL'},
        {field: 'transferTypeUuid', type: 'varchar(50)', null: 'DEFAULT NULL'},
        {field: 'transferType', type: 'varchar(15)', null: 'DEFAULT NULL'},
        {field: 'transferId', type: 'varchar(15)', null: 'DEFAULT NULL'},
        {field: 'amount', type: 'decimal(5,0)', null: 'DEFAULT NULL'},
        {field: 'description', type: 'longtext', null: ''},
        {field: 'image', type: 'longtext', null: ''},
        {field: 'createdOn', type: 'datetime', null: 'DEFAULT NULL'},
        {field: 'lastModifiedOn', type: 'datetime', null: 'DEFAULT NULL'}
    ]
}

const receiptupload = {
    name: 'receiptupload',
    query: `PRIMARY KEY (uuid)`,
    queryList: [
        {field: 'userUuid', type: 'varchar(50)', null: 'DEFAULT NULL'},
        {field: 'uuid', type: 'varchar(50)', null: 'NOT NULL'},
        {field: 'billDate', type: 'datetime', null: 'DEFAULT NULL'},
        {field: 'monthlyExpenseTemplate', type: 'varchar(50)', null: 'DEFAULT NULL'},
        {field: 'monthlyExpenseTemplateUuid', type: 'varchar(50)', null: 'DEFAULT NULL'},
        {field: 'categoryUuid', type: 'varchar(50)', null: 'DEFAULT NULL'},
        {field: 'categoryTypeName', type: 'varchar(15)', null: 'DEFAULT NULL'},
        {field: 'bankUuid', type: 'varchar(50)', null: 'DEFAULT NULL'},
        {field: 'bankName', type: 'varchar(20)', null: 'DEFAULT NULL'},
        {field: 'spentTypeUuid', type: 'varchar(50)', null: 'DEFAULT NULL'},
        {field: 'spentType', type: 'varchar(15)', null: 'DEFAULT NULL'},
        {field: 'transferTypeUuid', type: 'varchar(50)', null: 'DEFAULT NULL'},
        {field: 'transferType', type: 'varchar(15)', null: 'DEFAULT NULL'},
        {field: 'transferId', type: 'varchar(15)', null: 'DEFAULT NULL'},
        {field: 'amount', type: 'decimal(5,0)', null: 'DEFAULT NULL'},
        {field: 'description', type: 'longtext', null: ''},
        {field: 'image', type: 'longtext', null: ''},
        {field: 'createdOn', type: 'datetime', null: 'DEFAULT NULL'},
        {field: 'lastModifiedOn', type: 'datetime', null: 'DEFAULT NULL'}
    ]
}

const spenttype = {
    name: 'spenttype',
    query: `PRIMARY KEY (uuid)`,
    queryList: [
        {field: 'userUuid', type: 'varchar(50)', null: 'DEFAULT NULL'},
        {field: 'uuid', type: 'varchar(50)', null: 'NOT NULL'},
        {field: 'spentType', type: 'varchar(15)', null: 'DEFAULT NULL'},
        {field: 'createdOn', type: 'datetime', null: 'DEFAULT NULL'}
    ]
}

const userlist = {
    name: 'userlist',
    query: `PRIMARY KEY (uuid)`,
    queryList: [
        {field: 'uuid', type: 'varchar(50)', null: 'NOT NULL'},
        {field: 'username', type: 'varchar(15)', null: 'NOT NULL'},
        {field: 'password', type: 'longtext', null: 'NOT NULL'},
        {field: 'phoneNumber', type: 'varchar(15)', null: 'DEFAULT NULL'},
        {field: 'email', type: 'varchar(30)', null: 'DEFAULT NULL'},
        {field: 'createdOn', type: 'datetime', null: 'DEFAULT NULL'},
        {field: 'lastModifiedOn', type: 'datetime', null: 'DEFAULT NULL'}
    ]
}

const versionupdate = {
    name: 'versionupdate',
    query: `PRIMARY KEY (version)`,
    queryList: [
        {field: 'version', type: 'decimal(10,0)', null: 'NOT NULL'},
        {field: 'lastModifiedOn', type: 'datetime', null: 'DEFAULT NULL'}
    ]   
}

const transfertype = {
    name: 'transfertype',
    query: `PRIMARY KEY (uuid)`,
    queryList: [
        {field: 'userUuid', type: 'varchar(50)', null: 'DEFAULT NULL'},
        {field: 'uuid', type: 'varchar(50)', null: 'NOT NULL'},
        {field: 'transferId', type: 'varchar(15)', null: 'DEFAULT NULL'},
        {field: 'transferType', type: 'varchar(15)', null: 'DEFAULT NULL'},
        {field: 'createdOn', type: 'datetime', null: 'DEFAULT NULL'},
        {field: 'createdOn1', type: 'varchar(15)', null: 'DEFAULT NULL'},
        {field: 'createdOn2', type: 'datetime', null: 'DEFAULT NULL'}
    ]   
}

const transfertype1 = {
    name: 'transfertype1',
    query: `PRIMARY KEY (uuids)`,
    queryList: [
        {field: 'userUuid', type: 'varchar(50)', null: 'DEFAULT NULL'},
        {field: 'uuids', type: 'varchar(50)', null: 'NOT NULL'},
        {field: 'transferId', type: 'varchar(15)', null: 'DEFAULT NULL'},
        {field: 'transferType', type: 'varchar(15)', null: 'DEFAULT NULL'},
        {field: 'createdOn', type: 'datetime', null: 'DEFAULT NULL'},
        {field: 'createdOn1', type: 'datetime', null: 'DEFAULT NULL'},
    ]   
}

const all_tables = [
    bankdetails,
    categorytype,
    menulist,
    monthlyexpense,
    receipthistoryheader,
    receipthistoryline,
    receiptupload,
    spenttype,
    userlist,
    versionupdate,
    transfertype,
    transfertype1
]

module.exports = all_tables