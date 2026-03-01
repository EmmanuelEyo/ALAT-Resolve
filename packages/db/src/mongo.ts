import clientPromise from "./clientPromise";

export const getDb = async (dbName = "alat_resolve") => {
  const client = await clientPromise;
  return client.db(dbName);
};

