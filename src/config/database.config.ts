export default {
    uri: process.env.MONGOURI,
    dbName: process.env.dbName,
    useFindAndModify: false,
    useCreateIndex: true,
};