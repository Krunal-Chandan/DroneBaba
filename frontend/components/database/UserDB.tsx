import { useEffect } from 'react';
import { useSQLiteContext, type SQLiteDatabase } from 'expo-sqlite';
import * as Crypto from 'expo-crypto';

// Define the User type based on the database schema
type User = {
  id: number;
  name: string;
  email: string;
  pass: string;
  city: string;
  role: 'Farmer' | 'DroneOwner' | 'Pilot';
};

export const UserDB = () => {
  const db = useSQLiteContext();

  useEffect(() => {
    migrateDbIfNeeded(db);
  }, [db]);

  const migrateDbIfNeeded = async (db: SQLiteDatabase) => {
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        pass TEXT NOT NULL,
        city TEXT,
        role TEXT CHECK (role IN ('Farmer', 'DroneOwner', 'Pilot')) NOT NULL
      );
    `);
  };

  const createUser = async (userData: { name: string; email: string; pass: string; city: string; role: string }) => {
    try {
      const hashedPass = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA384, userData.pass);
      const result = await db.runAsync(
        'INSERT INTO Users (name, email, pass, city, role) VALUES (?, ?, ?, ?, ?)',
        [userData.name, userData.email, hashedPass, userData.city, userData.role]
      );
      return result.lastInsertRowId;
    } catch (err) {
      console.error('Create User Error:', err);
      throw err;
    }
  };

  const readUser = async (email: string, pass: string): Promise<User | null> => {
    const hashedPass = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA384, pass);
    return await db.getFirstAsync<User>('SELECT * FROM Users WHERE email = ? AND pass = ?', [email, hashedPass]);
  };

  const updateUser = async (id: number, userData: { name?: string; email?: string; pass?: string; city?: string; role?: string }) => {
    const updates = [];
    const params = [];
    if (userData.name) { updates.push('name = ?'); params.push(userData.name); }
    if (userData.email) { updates.push('email = ?'); params.push(userData.email); }
    if (userData.pass) {
      const hashedPass = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA384, userData.pass);
      updates.push('pass = ?');
      params.push(hashedPass);
    }
    if (userData.city) { updates.push('city = ?'); params.push(userData.city); }
    if (userData.role) { updates.push('role = ?'); params.push(userData.role); }
    if (updates.length === 0) return;
    params.push(id);
    await db.runAsync(`UPDATE Users SET ${updates.join(', ')} WHERE id = ?`, params);
  };

  const deleteUser = async (id: number) => {
    await db.runAsync('DELETE FROM Users WHERE id = ?', [id]);
  };

  const getAllUsers = async (): Promise<User[]> => {
    try {
      const users = await db.getAllAsync<User>('SELECT * FROM Users');
      return users;
    } catch (err) {
      console.error('Get All Users Error:', err);
      throw err;
    }
  };

  // please do not use this in any condition.
  const dropTable = async () => {
    await db.execAsync('DROP TABLE IF EXISTS Users');
    await migrateDbIfNeeded(db);
  };

  return { createUser, readUser, updateUser, deleteUser, getAllUsers, dropTable };

};