export const config = {
  port: Number(process.env.PORT || 3000),
  adminToken: process.env.ADMIN_TOKEN || "dev-admin-token",
  databaseUrl: process.env.DATABASE_URL || "",
  dataDir: process.env.CARLAB_DATA_DIR || "",
  nodeEnv: process.env.NODE_ENV || "development",
};
