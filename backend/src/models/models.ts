import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Farmer", "Pilot", "Drone Owner"],
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const userModel = mongoose.model("User", userSchema);

const locationAndOtherDetailSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  address: String,
  taluka: String,
  whatsapp_number: Number,
  contact_number: Number,
  aadhar_number: Number,
  pan_number: String,
  pinCode: Number,
  State: String,
});

export const OtherDetailModel = mongoose.model(
  "OtherDetail",
  locationAndOtherDetailSchema
);

const cropSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  crop_name: String,
  farm_area: String,
  crop_type: String,
  season: String,
  prev_crop_name: String,
});

export const cropModel = mongoose.model("Crop", cropSchema);

const licenseDetailSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  license_number: String,
  valid_upto: String,
  flying_exp: String,
  license_type: String,
  flying_drone_type: String,
  FIR: {
    type: String,
    enum: ["yes", "no"],
  },
});

export const licenseDetailModel = mongoose.model(
  "LicenseDetail",
  licenseDetailSchema
);

const ScheduleSchema = new mongoose.Schema({
  date: Date,
  timeSlot: String,
});

export const ScheduleModel = mongoose.model("Schedule", ScheduleSchema);

const droneInfoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  name: String,
  type: String,
  capacity: String,
  durability: String,
  purchasedDate: Date,
  isNGO: {
    type: String,
    enum: ["yes", "no"],
  },
  ngoName: String,
  schedule: [{ type: mongoose.Types.ObjectId, ref: "Schedule" }],
});

export const DroneInfoModel = mongoose.model("DroneInfo", droneInfoSchema);

const droneOwnerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  drones: [{ type: mongoose.Types.ObjectId, ref: "DroneInfo" }],
});

export const droneOwnerModel = mongoose.model("DroneOwner", droneOwnerSchema);
