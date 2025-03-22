import mongoose from 'mongoose';

const InstructorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  specializations: [String],
  bio: String,
  experience: Number,
  certifications: [String],
  locationIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
  }],
  availability: [{
    dayOfWeek: {
      type: Number,
      min: 0,
      max: 6,
    },
    startTime: String,
    endTime: String,
  }],
}, { timestamps: true });

export default mongoose.models.Instructor || mongoose.model('Instructor', InstructorSchema);
