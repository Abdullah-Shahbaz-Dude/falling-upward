import mongoose, { Schema, Document } from 'mongoose';
import { MockWorkbook, Question, QuestionOption, QuestionType } from '@/lib/mockDb';
import mockDbModels from '@/lib/mockDb';

// Re-export the types for use elsewhere in the application
export type { Question, QuestionOption, QuestionType };

export interface IWorkbook extends Document {
  title: string;
  description: string;
  content: string;
  questions: Question[];
  assignedTo: mongoose.Types.ObjectId | string;
  status: 'assigned' | 'in_progress' | 'submitted' | 'reviewed';
  userResponse: string;
  adminFeedback: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define schema for question options
const QuestionOptionSchema = new Schema({
  id: String,
  text: String,
});

// Define schema for questions
const QuestionSchema = new Schema({
  id: String,
  type: {
    type: String,
    enum: ['text', 'multipleChoice', 'checkbox', 'scale', 'dropdown'],
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  required: {
    type: Boolean,
    default: false,
  },
  options: [QuestionOptionSchema],
  userAnswer: Schema.Types.Mixed,
});

const WorkbookSchema = new Schema<IWorkbook>(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
    },
    content: {
      type: String,
      required: [true, 'Please provide workbook content'],
    },
    questions: {
      type: [QuestionSchema],
      default: [],
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide a user to assign this workbook to'],
    },
    status: {
      type: String,
      enum: ['assigned', 'in_progress', 'submitted', 'reviewed'],
      default: 'assigned',
    },
    userResponse: {
      type: String,
      default: '',
    },
    adminFeedback: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

// Check if we're using the mock database
const isUsingMockDb = process.env.NODE_ENV === 'development' || !process.env.MONGODB_URI;

// Create a unified model that works with both mock and real database
let Workbook: any;

if (isUsingMockDb) {
  // For mock database, create a wrapper that mimics mongoose model methods
  Workbook = {
    ...mockDbModels.Workbook,
    // Add mongoose-compatible methods
    find: function(query?: any) {
      return {
        sort: () => ({
          exec: async () => {
            const allWorkbooks = await mockDbModels.Workbook.findAll();
            if (!query) return allWorkbooks;
            
            // Filter by assignedTo if provided
            if (query.assignedTo) {
              return allWorkbooks.filter((w: any) => w.assignedTo === query.assignedTo);
            }
            return allWorkbooks;
          }
        })
      };
    }
  };
} else {
  // For real database
  Workbook = mongoose.models.Workbook || mongoose.model<IWorkbook>('Workbook', WorkbookSchema);
}

export default Workbook;
