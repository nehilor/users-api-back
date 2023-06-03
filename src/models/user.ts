import { ObjectId, Collection } from "mongodb";
import bcrypt from "bcrypt";
import connect from "../../config/db";
import { User } from "../interfaces/interfaces";
const saltRounds = 10;

async function createUser(user: User): Promise<User> {
  try {
    const db = await connect();
    const collection: Collection<User> = db.collection("users");
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;
    const result = await collection.insertOne(user);
    const insertedId = result.insertedId;
    user._id = insertedId;
    return user;
  } catch (error) {
    throw new Error("Failed to create user");
  }
}

async function getUsers(): Promise<User[]> {
  try {
    const db = await connect();
    const collection: Collection<User> = db.collection("users");
    const users = await collection.find().toArray();
    return users;
  } catch (error) {
    throw new Error("Failed to get users");
  }
}

async function getUserById(id: string): Promise<User | null> {
  try {
    const db = await connect();
    const collection: Collection<User> = db.collection("users");
    const user = await collection.findOne({ _id: new ObjectId(id) });
    return user;
  } catch (error) {
    throw new Error("Failed to get user by ID");
  }
}

async function updateUser(id: string, updatedUser: Partial<User>): Promise<number> {
  try {
    const db = await connect();
    const collection: Collection<User> = db.collection("users");
    const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedUser }
    );
    return result.modifiedCount ?? 0;
  } catch (error) {
    throw new Error("Failed to update user");
  }
}

async function deleteUser(id: string): Promise<number> {
  try {
    const db = await connect();
    const collection: Collection<User> = db.collection("users");
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount ?? 0;
  } catch (error) {
    throw new Error("Failed to delete user");
  }
}

async function findOne(query: object): Promise<User | null> {
  const db = await connect();
  const collection: Collection<User> = db.collection("users");
  return collection.findOne(query);
}

export {
  User,
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  findOne
};
