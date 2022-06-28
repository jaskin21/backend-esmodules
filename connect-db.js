import mongoose from 'mongoose';
import debugLib from 'debug';

const debug = debugLib('server:database');

export default async (connection, dbName) => {
  try {
    debug('Database Connected');
    await mongoose.connect(connection, {
      dbName,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });
  } catch (error) {
    debug(error);
  }
};
