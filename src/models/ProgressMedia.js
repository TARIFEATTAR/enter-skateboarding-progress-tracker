import mongoose from 'mongoose';

const ProgressMediaSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  skillId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Skill',
  },
  lessonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
  },
  mediaType: {
    type: String,
    enum: ['photo', 'video'],
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  notes: String,
  recordedDate: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

export default mongoose.models.ProgressMedia || mongoose.model('ProgressMedia', ProgressMediaSchema);
