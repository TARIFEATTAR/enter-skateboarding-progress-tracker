import mongoose from 'mongoose';

const LessonSchema = new mongoose.Schema({
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  studentIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  }],
  locationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  lessonType: {
    type: String,
    enum: ['private', 'group', 'camp'],
    required: true,
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'canceled'],
    default: 'scheduled',
  },
  notes: String,
  skillsWorked: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Skill',
  }],
}, { timestamps: true });

export default mongoose.models.Lesson || mongoose.model('Lesson', LessonSchema);
