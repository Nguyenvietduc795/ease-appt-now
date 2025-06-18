export interface Department {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Doctor {
  id: string;
  name: string;
  departmentId: string;
  specialization: string;
  experience: string;
  image?: string;
  availability: {
    [key: string]: string[];
  };
}

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  label: string;
  isAvailable: boolean;
}

export interface BookingState {
  department: Department | null;
  doctor: Doctor | null;
  timeSlot: TimeSlot | null;
} 