import Database from 'better-sqlite3';
const path = require('path');
export const db = new Database(path.resolve('people.db'), {fileMustExist: true});