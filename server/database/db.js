const DB_LINK = process.env.DB_LINK;
const DB_PASSWORD = process.env.DB_PASSWORD;

module.exports = {
    database: DB_LINK,
    secret: DB_PASSWORD
}