// Mock database implementation for development and testing
import mongoose from 'mongoose';
import { IUser } from '@/models/User';

// Define interfaces for our mock database models

// In-memory storage
// Define question types for TypeScript
export type QuestionType = 'text' | 'multipleChoice' | 'checkbox' | 'scale' | 'dropdown';

export interface QuestionOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  required: boolean;
  options?: QuestionOption[];
  userAnswer?: string | string[];
}

// Generate sample questions for workbooks
const generateSampleQuestions = (count = 5): Question[] => {
  const questionTypes: QuestionType[] = ['text', 'multipleChoice', 'checkbox', 'scale', 'dropdown'];
  const questions: Question[] = [];
  
  for (let i = 1; i <= count; i++) {
    const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    let question: Question = {
      id: `q${i}`,
      type,
      text: `Question ${i}: ${getQuestionText(type)}`,
      required: Math.random() > 0.3, // 70% chance of being required
    };
    
    // Add options for multiple choice, checkbox, and dropdown questions
    if (['multipleChoice', 'checkbox', 'dropdown'].includes(type)) {
      question.options = [];
      const optionCount = type === 'checkbox' ? 4 : 5;
      for (let j = 1; j <= optionCount; j++) {
        question.options.push({
          id: `opt${j}`,
          text: `Option ${j}`
        });
      }
    }
    
    questions.push(question);
  }
  
  return questions;
};

// Helper function to generate question text based on type
const getQuestionText = (type: QuestionType): string => {
  switch (type) {
    case 'text':
      return 'Please describe your experience in detail.';
    case 'multipleChoice':
      return 'Select the option that best describes your situation.';
    case 'checkbox':
      return 'Select all that apply to your condition.';
    case 'scale':
      return 'On a scale of 1-10, how would you rate your progress?';
    case 'dropdown':
      return 'Choose the most appropriate option from the dropdown.';
    default:
      return 'Please answer the following question.';
  }
};

// Define valid workbook status types for TypeScript
type WorkbookStatus = 'assigned' | 'in_progress' | 'submitted' | 'reviewed';

// Define interfaces for our mock database collections
export interface MockUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  createdAt: Date;
  updatedAt: Date;
  comparePassword?: (candidatePassword: string) => Promise<boolean>;
}

// Export this interface so it can be imported by other files
export interface MockWorkbook {
  _id: string;
  title: string;
  description: string;
  content: string;
  questions: Question[];
  status: WorkbookStatus;
  assignedTo: string | null;
  userResponse: string;
  adminFeedback: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MockAppointment {
  _id: string;
  userId: string;
  userName: string;
  userEmail: string;
  date: string;
  time: string;
  consultationType: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

// Generate 40 workbooks with questions
const generateWorkbooks = (count = 40) => {
  const workbooks = [];
  const workbookTypes = [
    'Initial Assessment',
    'Progress Evaluation',
    'Pain Management',
    'Rehabilitation Plan',
    'Mobility Assessment',
    'Strength Training',
    'Flexibility Workbook',
    'Sports Performance'
  ];
  
  for (let i = 1; i <= count; i++) {
    const typeIndex = i % workbookTypes.length;
    const questionCount = 5 + Math.floor(Math.random() * 6); // 5-10 questions
    
    // Determine status based on index
    let status: WorkbookStatus = 'in_progress';
    if (i <= 10) status = 'assigned';
    else if (i > 10 && i <= 20) status = 'in_progress';
    else if (i > 20 && i <= 30) status = 'submitted';
    else status = 'reviewed';
    
    // Assign some workbooks to user with ID 5 (one@gmail.com)
    let assignedTo;
    if (i % 5 === 0) {
      assignedTo = '5'; // Assign to 'one' user
    } else if (i % 3 === 0) {
      assignedTo = '3';
    } else if (i % 2 === 0) {
      assignedTo = '2';
    } else {
      assignedTo = null;
    }
    
    workbooks.push({
      _id: i.toString(),
      title: `${workbookTypes[typeIndex]} Workbook ${Math.ceil(i / workbookTypes.length)}`,
      description: `Complete this ${workbookTypes[typeIndex].toLowerCase()} workbook to track your progress`,
      content: `This workbook contains ${questionCount} questions to help us understand your current status and progress.`,
      questions: generateSampleQuestions(questionCount),
      status,
      assignedTo,
      userResponse: '',
      adminFeedback: '',
      createdAt: new Date(2025, 3, i % 30 + 1),
      updatedAt: new Date(2025, 3, i % 30 + 1),
    });
  }
  
  return workbooks;
};



// Generate sample appointments
const generateAppointments = (count = 20) => {
  const appointments = [];
  const consultationTypes = ['general', 'sports', 'rehabilitation', 'chronic'];
  const statuses = ['pending', 'confirmed', 'completed', 'cancelled'];
  const times = ['09:00', '10:30', '12:00', '14:30', '16:00', '17:30'];
  
  for (let i = 1; i <= count; i++) {
    const userId = i % 5 === 0 ? '1' : (i % 4 === 0 ? '4' : (i % 3 === 0 ? '3' : (i % 2 === 0 ? '2' : '5')));
    const userName = userId === '1' ? 'Admin User' : 
                    (userId === '2' ? 'Regular User' : 
                    (userId === '3' ? 'Test User' : 
                    (userId === '4' ? 'Abdullah Shahbaz' : 'One')));
    const userEmail = userId === '1' ? 'admin@example.com' : 
                     (userId === '2' ? 'user@example.com' : 
                     (userId === '3' ? 'fahadamjad778@gmail.com' : 
                     (userId === '4' ? 'shahbazabdullah72@gmail.com' : 'one@gmail.com')));
    
    // Create date for appointment (future dates)
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + i);
    
    appointments.push({
      _id: i.toString(),
      userId,
      userName,
      userEmail,
      date: futureDate.toISOString().split('T')[0],
      time: times[i % times.length],
      consultationType: consultationTypes[i % consultationTypes.length],
      status: statuses[i % statuses.length],
      notes: `Appointment notes for ${userName}`,
      createdAt: new Date(today),
      updatedAt: new Date(today)
    });
  }
  
  return appointments;
};

// Define the type for the mockDb object
type MockDbType = {
  users: {
    data: MockUser[];
    findByEmail: (email: string) => MockUser | null;
    getAll: () => MockUser[];
    create: (userData: Partial<MockUser>) => MockUser;
  };
  appointments: { data: MockAppointment[] };
  workbooks: { data: MockWorkbook[] };
};

// Mock database with users and methods
export const mockDb: MockDbType = {
  users: {
    data: [
      {
        _id: '1',
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'hashed_password',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        _id: '2',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashed_password',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        _id: '3',
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'hashed_password',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        _id: '4',
        name: 'Bob Johnson',
        email: 'bob@example.com',
        password: 'hashed_password',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        _id: '5',
        name: 'One User',
        email: 'one@gmail.com',
        password: 'hashed_password',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    findByEmail: (email: string): MockUser | null => {
      const user = mockDb.users.data.find((u) => u.email === email);
      return user || null;
    },
    getAll: () => {
      return mockDb.users.data;
    },
    create: (userData: Partial<MockUser>): MockUser => {
      const newUser: MockUser = {
        _id: (mockDb.users.data.length + 1).toString(),
        name: userData.name || 'New User',
        email: userData.email || `user${mockDb.users.data.length + 1}@example.com`,
        password: userData.password || 'hashed_password',
        role: userData.role || 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockDb.users.data.push(newUser);
      return newUser;
    },
  } as {
    data: MockUser[];
    findByEmail: (email: string) => MockUser | null;
    getAll: () => MockUser[];
    create: (userData: Partial<MockUser>) => MockUser;
  },
  appointments: {
    data: [
    {
      _id: '1',
      userId: '2',
      userName: 'Regular User',
      userEmail: 'user@example.com',
      date: '2025-04-15',
      time: '10:00 AM',
      consultationType: 'general',
      status: 'confirmed',
      createdAt: new Date('2025-04-01'),
      updatedAt: new Date('2025-04-01'),
    },
    {
      _id: '2',
      userId: '2',
      userName: 'Regular User',
      userEmail: 'user@example.com',
      date: '2025-04-20',
      time: '2:30 PM',
      consultationType: 'sports',
      status: 'pending',
      createdAt: new Date('2025-04-20'),
      updatedAt: new Date('2025-04-20')
    }
  ],
  } as {
    data: MockAppointment[];
  },
  workbooks: {
    data: generateWorkbooks(40)
  } as {
    data: MockWorkbook[];
  }
};

// Mock User model
export const UserModel = {
  findOne: async ({ email }: { email: string }): Promise<MockUser | null> => {
    console.log(`MockDB: Finding user with email: ${email}`);
    const user = mockDb.users.data.find((u) => u.email === email);
    if (!user) {
      console.log(`MockDB: No user found with email: ${email}`);
      return null;
    }
    
    console.log(`MockDB: Found user: ${user.name}, role: ${user.role}`);
    
    // Create a mongoose-like document with methods
    return {
      ...user,
      comparePassword: async (candidatePassword: string) => {
        console.log(`MockDB: Comparing password for ${user.email}`);
        // Always accept 'password123' for mock users
        const isMatch = candidatePassword === 'password123';
        console.log(`MockDB: Password match: ${isMatch}`);
        return isMatch;
      }
    };
  },
  
  findAll: async () => {
    // Return all users without passwords
    return mockDb.users.data.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  },
  findById: async (id: string) => {
    const user = mockDb.users.data.find((u) => u._id === id);
    if (!user) return null;
    
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },
  create: async (userData: Partial<IUser>) => {
    const newId = (mockDb.users.data.length + 1).toString();
    const newUser = {
      _id: newId,
      ...userData,
      role: userData.role || 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    } as MockUser;
    
    mockDb.users.data.push(newUser as any);
    
    return {
      ...newUser,
      _id: { toString: () => newId }
    };
  },
  find: async () => {
    return mockDb.users.data.map((user: any) => ({
      ...user,
      _id: { toString: () => user._id }
    }));
  }
};

// Mock Appointment model
export const AppointmentModel = {
  findAll: () => {
    return mockDb.appointments.data;
  },
  findById: (id: string) => {
    return mockDb.appointments.data.find(a => a._id === id) || null;
  },
  findByUserId: (userId: string) => {
    return mockDb.appointments.data.filter(a => a.userId === userId);
  },
  create: (appointmentData: Partial<MockAppointment>) => {
    const newId = (mockDb.appointments.data.length + 1).toString();
    const now = new Date();
    const newAppointment = {
      _id: newId,
      ...appointmentData,
      createdAt: now,
      updatedAt: now
    } as MockAppointment;
    mockDb.appointments.data.push(newAppointment);
    return newAppointment;
  },
  findByIdAndUpdate: (id: string, update: Partial<MockAppointment>) => {
    const index = mockDb.appointments.data.findIndex(a => a._id === id);
    if (index === -1) return null;
    
    const updatedAppointment = {
      ...mockDb.appointments.data[index],
      ...update,
      updatedAt: new Date()
    };
    mockDb.appointments.data[index] = updatedAppointment;
    return updatedAppointment;
  },
  findByIdAndDelete: (id: string) => {
    const index = mockDb.appointments.data.findIndex(a => a._id === id);
    if (index === -1) return null;
    
    const deletedAppointment = mockDb.appointments.data[index];
    mockDb.appointments.data.splice(index, 1);
    return deletedAppointment;
  }
};

// Mock Workbook model
export const WorkbookModel = {
  findAll: async () => {
    return mockDb.workbooks.data;
  },
  findById: async (id: string) => {
    return mockDb.workbooks.data.find((w) => w._id === id) || null;
  },
  findByUserId: async (userId: string) => {
    return mockDb.workbooks.data.filter((w) => w.assignedTo === userId);
  },
  create: async (workbookData: Partial<MockWorkbook>) => {
    const newId = (mockDb.workbooks.data.length + 1).toString();
    const newWorkbook = {
      _id: newId,
      ...workbookData,
      status: 'assigned',
      createdAt: new Date(),
      updatedAt: new Date(),
    } as MockWorkbook;
    mockDb.workbooks.data.push(newWorkbook);
    return newWorkbook;
  },
  assignToUser: async (workbookId: string, userId: string) => {
    const workbookIndex = mockDb.workbooks.data.findIndex((w) => w._id === workbookId);
    if (workbookIndex === -1) return null;
    
    mockDb.workbooks.data[workbookIndex] = {
      ...mockDb.workbooks.data[workbookIndex],
      assignedTo: userId,
      status: 'assigned',
      updatedAt: new Date()
    };
    
    return mockDb.workbooks.data[workbookIndex];
  },
  findByIdAndUpdate: async (id: string, update: Partial<MockWorkbook>) => {
    const workbookIndex = mockDb.workbooks.data.findIndex((w) => w._id === id);
    if (workbookIndex === -1) return null;
    
    mockDb.workbooks.data[workbookIndex] = {
      ...mockDb.workbooks.data[workbookIndex],
      ...update,
      updatedAt: new Date()
    };
    
    return mockDb.workbooks.data[workbookIndex];
  },
  findByIdAndDelete: async (id: string) => {
    const workbookIndex = mockDb.workbooks.data.findIndex((w) => w._id === id);
    if (workbookIndex === -1) return null;
    
    const deletedWorkbook = mockDb.workbooks.data[workbookIndex];
    mockDb.workbooks.data.splice(workbookIndex, 1);
    
    return deletedWorkbook;
  }
};

// Mock database connection function
export const connectMockDB = async () => {
  console.log('Connected to mock database');
  // Return a mock mongoose-like object that satisfies the type requirements
  return mongoose;
};

// Export models and connection function
export default {
  User: UserModel,
  Appointment: AppointmentModel,
  Workbook: WorkbookModel,
  connectDB: connectMockDB
};
