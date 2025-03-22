import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
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
    enum: ['admin', 'instructor', 'parent', 'student'],
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  profilePicture: String,
  contactInfo: {
    phone: String,
    address: String,
    city: String,
    state: String,
    zipCode: String,
  },
  socialLogin: {
    google: { id: String, token: String },
    apple: { id: String, token: String },
    facebook: { id: String, token: String },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
