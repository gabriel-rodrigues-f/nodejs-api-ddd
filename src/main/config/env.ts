export default {
  MONGO_DB_URL: process.env.MONGO_DB_URL || 'mongodb://mmongo:27017/nodejs-api-ddd',
  MONGO_DB_DATABASE: process.env.MONGO_DB_DADABASE || 'nodejs-api-ddd',
  PORT: process.env.PORT || 5050,
  JWT_SECRET: process.env.JWT_SECRET || ';alksjdfjklajdf'
}
