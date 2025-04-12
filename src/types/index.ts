
// Department Types
export interface Department {
  id: string;
  name: string;
  icon: string;
  description: string;
}

// Doctor Types
export interface Doctor {
  id: string;
  name: string;
  departmentId: string;
  image: string;
  specialization: string;
  experience: string;
}

// TimeSlot Types
export interface TimeSlot {
  id: string;
  doctorId: string;
  startTime: string; // ISO string
  endTime: string;   // ISO string
  available: boolean;
}

// Appointment Types
export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  departmentId: string;
  timeSlotId: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  appointmentDate: string; // ISO string
  createdAt: string;       // ISO string
}

// User Types
export interface User {
  id: string;
  name: string;
  phoneNumber: string;
  email?: string;
}
