import mongoose, { Schema, Document } from 'mongoose';
import { MockAppointment } from '@/lib/mockDb';
import mockDbModels from '@/lib/mockDb';

export interface IAppointment extends Document {
  userId: mongoose.Types.ObjectId | string;
  name: string;
  email: string;
  phone: string;
  date: Date | string;
  time: string;
  consultationType: 'general' | 'sports' | 'rehabilitation' | 'chronic';
  message: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

const AppointmentSchema = new Schema<IAppointment>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Please provide your name'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email',
      ],
    },
    phone: {
      type: String,
      required: [true, 'Please provide your phone number'],
    },
    date: {
      type: Date,
      required: [true, 'Please provide appointment date'],
    },
    time: {
      type: String,
      required: [true, 'Please provide appointment time'],
    },
    consultationType: {
      type: String,
      enum: ['general', 'sports', 'rehabilitation', 'chronic'],
      required: [true, 'Please select consultation type'],
    },
    message: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

// Check if we're using the mock database
const isUsingMockDb = process.env.NODE_ENV === 'development' || !process.env.MONGODB_URI;

// Create a unified model that works with both mock and real database
let Appointment: any;

if (isUsingMockDb) {
  // For mock database, create a wrapper that mimics mongoose model methods
  Appointment = {
    ...mockDbModels.Appointment,
    // Add mongoose-compatible methods
    find: function(query?: any) {
      return {
        sort: () => ({
          exec: async () => {
            const allAppointments = await mockDbModels.Appointment.findAll();
            if (!query) return allAppointments;
            
            // Filter by userId if provided
            if (query.userId) {
              return allAppointments.filter((a: any) => a.userId === query.userId);
            }
            return allAppointments;
          }
        })
      };
    }
  };
} else {
  // For real database
  Appointment = mongoose.models.Appointment || mongoose.model<IAppointment>('Appointment', AppointmentSchema);
}

export default Appointment;
