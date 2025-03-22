import mongoose from 'mongoose';

const CurriculumSchema = new mongoose.Schema({
  level: {
    type: Number,
    required: true,
    min: 1,
    max: 12,
    unique: true
  },
  title: {
    type: String,
    required: true,
  },
  objective: {
    type: String,
    required: true,
  },
  skills: [{
    name: {
      type: String,
      required: true,
    },
    description: String,
    isRequired: {
      type: Boolean,
      default: true,
    }
  }],
  bonusTrick: {
    name: String,
    description: String,
  },
}, { timestamps: true });

export default mongoose.models.Curriculum || mongoose.model('Curriculum', CurriculumSchema);
