import {MongoClient, Db, MongoClientOptions, ListDatabasesResult} from 'mongodb';
const url: string = process.env.MONGO_URL || "";
const dbName: string = process.env.MONGO_DB || "";
const collectionName = 'users';

async function connect(): Promise<Db> {
  const client = new MongoClient(url, { useUnifiedTopology: true } as MongoClientOptions);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db: Db = client.db(dbName);

    // Check if the database exists, create it if it doesn't
    const dbList: ListDatabasesResult = await client.db().admin().listDatabases();
    const dbExists: boolean = dbList.databases.some(db => db.name === dbName);

    if (!dbExists) {
      await db.createCollection(collectionName);
      console.log(`Created database: ${dbName}`);
      console.log(`Created collection: ${collectionName}`);
    }

    return db;
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }
}

export default connect;
