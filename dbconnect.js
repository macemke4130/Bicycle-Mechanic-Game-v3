import * as mysql from 'mysql';
import config from './config.js';
import { createPool } from 'mysql';

const pool = createPool(config.mysql);

export const query = (query, values) => {
    return new Promise((resolve, reject) => {
        const sql = mysql.format(query, values);
        console.log("SQL: " + sql);
        pool.query(sql, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

export default {
    query
}