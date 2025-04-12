
import { Department, Doctor, TimeSlot } from "../types";
import { addDays, format, addHours, setHours, setMinutes } from "date-fns";

// Helper to generate time slots for the next 7 days
const generateTimeSlots = (doctorId: string): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const today = new Date();
  
  // Generate slots for next 7 days
  for (let day = 0; day < 7; day++) {
    const currentDate = addDays(today, day);
    
    // Morning slots (8 AM - 12 PM)
    const morningStart = setHours(setMinutes(currentDate, 0), 8);
    for (let hour = 0; hour < 4; hour++) {
      const startTime = addHours(morningStart, hour);
      const endTime = addHours(startTime, 1);
      
      slots.push({
        id: `${doctorId}-${format(startTime, "yyyy-MM-dd-HH")}`,
        doctorId,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        available: Math.random() > 0.3, // 70% chance of being available
      });
    }
    
    // Afternoon slots (2 PM - 6 PM)
    const afternoonStart = setHours(setMinutes(currentDate, 0), 14);
    for (let hour = 0; hour < 4; hour++) {
      const startTime = addHours(afternoonStart, hour);
      const endTime = addHours(startTime, 1);
      
      slots.push({
        id: `${doctorId}-${format(startTime, "yyyy-MM-dd-HH")}`,
        doctorId,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        available: Math.random() > 0.3, // 70% chance of being available
      });
    }
  }
  
  return slots;
};

// Departments
export const departments: Department[] = [
  {
    id: "dept1",
    name: "Cardiology",
    icon: "heart-pulse",
    description: "Heart and cardiovascular system specialists"
  },
  {
    id: "dept2",
    name: "Neurology",
    icon: "brain",
    description: "Brain, spinal cord and nervous system specialists"
  },
  {
    id: "dept3",
    name: "Orthopedics",
    icon: "bone",
    description: "Bone, joint and musculoskeletal specialists"
  },
  {
    id: "dept4",
    name: "Pediatrics",
    icon: "baby",
    description: "Medical care for infants, children and adolescents"
  },
  {
    id: "dept5",
    name: "Dermatology",
    icon: "scan-face",
    description: "Skin, hair and nail specialists"
  },
  {
    id: "dept6",
    name: "Ophthalmology",
    icon: "eye",
    description: "Eye and vision specialists"
  }
];

// Doctors
export const doctors: Doctor[] = [
  {
    id: "doc1",
    name: "Dr. John Smith",
    departmentId: "dept1",
    image: "/placeholder.svg",
    specialization: "Interventional Cardiology",
    experience: "15 years"
  },
  {
    id: "doc2",
    name: "Dr. Emily Johnson",
    departmentId: "dept1",
    image: "/placeholder.svg",
    specialization: "Cardiac Electrophysiology",
    experience: "12 years"
  },
  {
    id: "doc3",
    name: "Dr. Michael Chen",
    departmentId: "dept2",
    image: "/placeholder.svg",
    specialization: "Neurological Surgery",
    experience: "20 years"
  },
  {
    id: "doc4",
    name: "Dr. Sarah Williams",
    departmentId: "dept2",
    image: "/placeholder.svg",
    specialization: "Clinical Neurology",
    experience: "10 years"
  },
  {
    id: "doc5",
    name: "Dr. Robert Lee",
    departmentId: "dept3",
    image: "/placeholder.svg",
    specialization: "Joint Replacement",
    experience: "18 years"
  },
  {
    id: "doc6",
    name: "Dr. Linda Davis",
    departmentId: "dept3",
    image: "/placeholder.svg",
    specialization: "Sports Medicine",
    experience: "9 years"
  },
  {
    id: "doc7",
    name: "Dr. David Wilson",
    departmentId: "dept4",
    image: "/placeholder.svg",
    specialization: "General Pediatrics",
    experience: "14 years"
  },
  {
    id: "doc8",
    name: "Dr. Jennifer Thomas",
    departmentId: "dept4",
    image: "/placeholder.svg",
    specialization: "Pediatric Neurology",
    experience: "11 years"
  },
  {
    id: "doc9",
    name: "Dr. James Miller",
    departmentId: "dept5",
    image: "/placeholder.svg",
    specialization: "Clinical Dermatology",
    experience: "16 years"
  },
  {
    id: "doc10",
    name: "Dr. Maria Rodriguez",
    departmentId: "dept5",
    image: "/placeholder.svg",
    specialization: "Cosmetic Dermatology",
    experience: "8 years"
  },
  {
    id: "doc11",
    name: "Dr. Richard Brown",
    departmentId: "dept6",
    image: "/placeholder.svg",
    specialization: "Retina Specialist",
    experience: "22 years"
  },
  {
    id: "doc12",
    name: "Dr. Elizabeth Taylor",
    departmentId: "dept6",
    image: "/placeholder.svg",
    specialization: "Cornea Specialist",
    experience: "13 years"
  }
];

// Generate time slots for each doctor
let allTimeSlots: TimeSlot[] = [];
doctors.forEach(doctor => {
  allTimeSlots = [...allTimeSlots, ...generateTimeSlots(doctor.id)];
});

export const timeSlots: TimeSlot[] = allTimeSlots;
