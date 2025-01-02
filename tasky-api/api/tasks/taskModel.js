import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  deadline: {
    type: Date,
    validate: {
      validator: (date) => date > new Date(),
      message: 'Deadline must be a future date.',
    },
  },
  done: Boolean,
  priority: { type: String, enum: ["Low", "Medium", "High"], required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.model('Task', TaskSchema);
