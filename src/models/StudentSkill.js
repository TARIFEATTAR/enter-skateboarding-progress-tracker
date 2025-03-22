import mongoose from 'mongoose';

const StudentSkillSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  skillId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Skill',
    required: true,
  },
  status: {
    type: String,
    enum: ['not_started', 'in_progress', 'mastered'],
    default: 'not_started',
  },
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  instructorNotes: String,
  completionDate: Date,
  progressMediaIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProgressMedia',
  }],
}, { timestamps: true });

export default mongoose.models.StudentSkill || mongoose.model('StudentSkill', StudentSkillSchema);
