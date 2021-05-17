import dbConfig from './database.config';
import * as fs from "fs"
import {join} from "path"
export default () => ({
    port: process.env.PORT,
    database: dbConfig,
});
