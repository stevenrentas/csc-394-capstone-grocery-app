const config =
  process.env.NODE_ENV === "production"
    ? "/api/v1/"
    : "http://localhost:3001/api/v1/";

export default config;
