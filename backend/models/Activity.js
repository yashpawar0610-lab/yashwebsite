import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    userName: {
      type: String,
      default: 'System'
    },
    action: {
      type: String,
      required: true
    },
    details: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      enum: ['info', 'success', 'warning', 'danger'],
      default: 'info'
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

const Activity = mongoose.model('Activity', activitySchema);
export default Activity;
