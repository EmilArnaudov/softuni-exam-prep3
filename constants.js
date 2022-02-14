const PORT = 3000;
const DB_STRING = 'mongodb+srv://admin:emileadminnatova@cluster0.jdmek.mongodb.net/Cluster0?retryWrites=true&w=majority';
const SECRET = 'somerandomstring';
const TOKEN_COOKIE_NAME = 'id_token';

module.exports = {
    PORT,
    DB_STRING,
    SECRET,
    TOKEN_COOKIE_NAME,
}