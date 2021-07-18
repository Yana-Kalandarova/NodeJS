export const config = {
    port: process.env.PORT,
    env: process.env.NODE_ENV,
    dbConnectionString: process.env.CONNECTION_STRING,
    authJwtSecretKey: process.env.JWT_SECRET_KEY
};
