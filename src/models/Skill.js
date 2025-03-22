import mongoose from 'mongoose';

const SkillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
    min: 1,
    max: 12,
  },
  order: {
    type: Number,
    required: true,
  },
  isBonus: {
    type: Boolean,
    default: false,
  },
  prerequisites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Skill',
  }],
  demonstrationVideo: String,
  objective: String,
}, { timestamps: true });

export default mongoose.models.Skill || mongoose.model('Skill', SkillSchema);
