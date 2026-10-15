import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Report title is required'],
      trim: true
    },
    category: {
      type: String,
      enum: ['Financial', 'Operational', 'Marketing', 'System'],
      default: 'Operational',
      required: true
    },
    status: {
      type: String,
      enum: ['Completed', 'Processing', 'Draft', 'Archived'],
      default: 'Completed'
    },
    summary: {
      type: String,
      trim: true,
      default: ''
    },
    metrics: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      default: {}
    },
    tags: [
      {
        type: String,
        trim: true
      }
    ],
    generatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    authorName: {
      type: String,
      default: 'System Agent'
    },
    downloads: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

const Report = mongoose.model('Report', reportSchema);
export default Report;
