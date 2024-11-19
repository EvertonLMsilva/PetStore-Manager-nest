
export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    DB_TYPE: process.env.DB_TYPE,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_SCHEMA: process.env.DB_SCHEMA,
  }
});