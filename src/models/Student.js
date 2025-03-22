import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  parentIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dateOfBirth: Date,
  age: Number,
  currentLevel: {
    type: Number,
    default: 1,
    min: 1,
    max: 12,
  },
  emergencyContact: {
    name: String,
    relationship: String,
    phone: String,
  },
  medicalNotes: String,
  joinedDate: {
    type: Date,
    default: Date.now,
  },
  homeLocationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
  },
}, { timestamps: true });

export default mongoose.models.Student || mongoose.model('Student', StudentSchema);
