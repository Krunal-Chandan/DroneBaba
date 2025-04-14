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
      enum: ["user", "pilot", "drone_owner"],
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
  pan_number: Number,
  location: String,
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

const droneInfoSchema = new mongoose.Schema({
  drone_name: String,
  drone_type: String,
  drone_capacity: String,
  battery_durability: String,
  purchased_date: Date,
  IsNGO: {
    type: String,
    enum: ["yes", "no"],
  },
  ngo_name: String,
});

const DroneInfoModel = mongoose.model("DroneInfo", droneInfoSchema);
