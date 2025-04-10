import { useEffect } from 'react';
import { useSQLiteContext, type SQLiteDatabase } from 'expo-sqlite';

// Define the Farmer type based on the database schema
type Farmer = {
  id: number;
  name: string;
  address: string;
  location: string;
  taluka: string;
  city: string;
  state: string;
  country: string;
  contactNo: string;
  whatsAppNo: string;
  aadharCardNo: string;
  panCardNo: string;
  emailId: string;
  cropName: string;
  farmArea: string;
  cropType: string;
  season: string;
  previousCropName: string;
};

export const FarmerDB = () => {
  const db = useSQLiteContext();

  // Initialize the database table when the component mounts
  useEffect(() => {
    migrateDbIfNeeded(db);
  }, [db]);

  // Create the farmers table if it doesn't exist
  const migrateDbIfNeeded = async (db: SQLiteDatabase) => {
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      CREATE TABLE IF NOT EXISTS farmers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        address TEXT,
        location TEXT,
        taluka TEXT,
        city TEXT,
        state TEXT,
        country TEXT,
        contactNo TEXT,
        whatsAppNo TEXT,
        aadharCardNo TEXT,
        panCardNo TEXT,
        emailId TEXT,
        cropName TEXT,
        farmArea TEXT,
        cropType TEXT,
        season TEXT,
        previousCropName TEXT
      );
    `);
  };

  // Insert a new farmer
  const createFarmer = async (farmerData: Omit<Farmer, 'id'>): Promise<number> => {
    try {
      const result = await db.runAsync(
        `INSERT INTO farmers (
          name, address, location, taluka, city, state, country, contactNo, whatsAppNo,
          aadharCardNo, panCardNo, emailId, cropName, farmArea, cropType, season, previousCropName
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          farmerData.name,
          farmerData.address,
          farmerData.location,
          farmerData.taluka,
          farmerData.city,
          farmerData.state,
          farmerData.country,
          farmerData.contactNo,
          farmerData.whatsAppNo,
          farmerData.aadharCardNo,
          farmerData.panCardNo,
          farmerData.emailId,
          farmerData.cropName,
          farmerData.farmArea,
          farmerData.cropType,
          farmerData.season,
          farmerData.previousCropName,
        ]
      );
      return result.lastInsertRowId;
    } catch (err) {
      console.error('Create Farmer Error:', err);
      throw err;
    }
  };

  // Read a farmer by ID
  const readFarmer = async (id: number): Promise<Farmer | null> => {
    try {
      return await db.getFirstAsync<Farmer>('SELECT * FROM farmers WHERE id = ?', [id]);
    } catch (err) {
      console.error('Read Farmer Error:', err);
      throw err;
    }
  };

  // Update an existing farmer
  const updateFarmer = async (id: number, farmerData: Partial<Omit<Farmer, 'id'>>) => {
    const updates: string[] = [];
    const params: any[] = [];

    if (farmerData.name) { updates.push('name = ?'); params.push(farmerData.name); }
    if (farmerData.address) { updates.push('address = ?'); params.push(farmerData.address); }
    if (farmerData.location) { updates.push('location = ?'); params.push(farmerData.location); }
    if (farmerData.taluka) { updates.push('taluka = ?'); params.push(farmerData.taluka); }
    if (farmerData.city) { updates.push('city = ?'); params.push(farmerData.city); }
    if (farmerData.state) { updates.push('state = ?'); params.push(farmerData.state); }
    if (farmerData.country) { updates.push('country = ?'); params.push(farmerData.country); }
    if (farmerData.contactNo) { updates.push('contactNo = ?'); params.push(farmerData.contactNo); }
    if (farmerData.whatsAppNo) { updates.push('whatsAppNo = ?'); params.push(farmerData.whatsAppNo); }
    if (farmerData.aadharCardNo) { updates.push('aadharCardNo = ?'); params.push(farmerData.aadharCardNo); }
    if (farmerData.panCardNo) { updates.push('panCardNo = ?'); params.push(farmerData.panCardNo); }
    if (farmerData.emailId) { updates.push('emailId = ?'); params.push(farmerData.emailId); }
    if (farmerData.cropName) { updates.push('cropName = ?'); params.push(farmerData.cropName); }
    if (farmerData.farmArea) { updates.push('farmArea = ?'); params.push(farmerData.farmArea); }
    if (farmerData.cropType) { updates.push('cropType = ?'); params.push(farmerData.cropType); }
    if (farmerData.season) { updates.push('season = ?'); params.push(farmerData.season); }
    if (farmerData.previousCropName) { updates.push('previousCropName = ?'); params.push(farmerData.previousCropName); }

    if (updates.length === 0) return;

    params.push(id);
    try {
      await db.runAsync(`UPDATE farmers SET ${updates.join(', ')} WHERE id = ?`, params);
    } catch (err) {
      console.error('Update Farmer Error:', err);
      throw err;
    }
  };

  // Delete a farmer
  const deleteFarmer = async (id: number) => {
    try {
      await db.runAsync('DELETE FROM farmers WHERE id = ?', [id]);
    } catch (err) {
      console.error('Delete Farmer Error:', err);
      throw err;
    }
  };

  // Get all farmers
  const getAllFarmers = async (): Promise<Farmer[]> => {
    try {
      const farmers = await db.getAllAsync<Farmer>('SELECT * FROM farmers');
      return farmers;
    } catch (err) {
      console.error('Get All Farmers Error:', err);
      throw err;
    }
  };

  // For debugging purposes (do not use in production)
  // const dropTable = async () => {
  //   try {
  //     await db.execAsync('DROP TABLE IF EXISTS farmers');
  //     await migrateDbIfNeeded(db);
  //   } catch (err) {
  //     console.error('Drop Table Error:', err);
  //     throw err;
  //   }
  // };

  return { createFarmer, readFarmer, updateFarmer, deleteFarmer, getAllFarmers };
};