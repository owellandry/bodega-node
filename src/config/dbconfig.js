import dotenv  from "dotenv";

dotenv.config();

const DB_HOST = process.env.DB_HOST;
const DB_DATABASE = process.env.DB_DATABASE;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

const dbConfig = {
    host: DB_HOST, 
    port: 3306, 
    user: DB_USERNAME, 
    password: DB_PASSWORD,
    database: DB_DATABASE
};

export default dbConfig;
