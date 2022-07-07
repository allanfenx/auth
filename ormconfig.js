const dotenv = require("dotenv");

dotenv.config({
    path: process.env.NODE_ENV === 'dev' ? 'dev.env' : '.env'
});

module.exports = {
    "type": process.env.DB_TYPE,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME_AUTH,
    "logging": false,
    "ssl": true,
    "migrations": [
        process.env.TYPEORM_MIGRATION
    ],
    "entities": [
        process.env.TYPEORM_ENTITIES
    ],
    "cli": {
        "migrationsDir": process.env.TYPEORM_MIGRATION_DIR
    }
}