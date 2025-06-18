import React, { createContext, useState, useContext, useEffect } from 'react';

type Language = 'en' | 'vi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: Record<string, any>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations = {
  en: {
    nav: {
      home: "Home",
      appointments: "My Appointments",
      profile: "Profile",
      help: "Help",
      bookAppointment: "Book Appointment"
    },
    branding: {
      medicalCenter: "Nam Can Tho Medical Center",
      shortName: "Medical Center"
    },
    booking: {
      title: "Book an Appointment",
      subtitle: "Follow these simple steps to schedule your visit",
      steps: {
        department: "Department",
        doctor: "Doctor",
        time: "Time",
        confirm: "Confirm"
      },
      selectDate: "Select Date",
      selectTime: "Select Time",
      noTimeSlots: "No available time slots for this date",
      pleaseSelectDate: "Please select a date first",
      selectedTime: "Selected Time",
      chooseDepartment: "Choose Department",
      chooseDoctor: "Choose Doctor",
      selectTimeSlot: "Select Time Slot",
      confirmAppointment: "Confirm Appointment"
    },
    confirmation: {
      title: "Confirm Appointment",
      doctor: "Doctor",
      department: "Department",
      date: "Date",
      time: "Time",
      scanQR: "Scan this code at the hospital",
      arriveEarly: "Please arrive 15 minutes before your appointment time",
      bringDocuments: "Please bring your ID card and insurance card (if applicable)",
      confirmButton: "Confirm Booking"
    },
    common: {
      next: "Next",
      back: "Back",
      cancel: "Cancel",
      confirm: "Confirm",
      save: "Save",
      edit: "Edit",
      delete: "Delete",
      close: "Close",
      yes: "Yes",
      no: "No",
      loading: "Loading...",
      error: "Error",
      success: "Success",
      warning: "Warning",
      info: "Info",
      experience: "experience"
    },
    home: {
      hero: {
        title: "Healthcare Made Easy",
        subtitle: "Book your medical appointment with just a few clicks",
        bookButton: "Book Appointment",
        learnMore: "Learn How It Works",
        waitingTitle: "No Need To Wait"
      },
      waitingMessage: "Without The Wait",
      features: {
        title: "Why Choose Us",
        onlineBooking: {
          title: "Online Booking",
          description: "Schedule appointments anytime, anywhere"
        },
        quickAccess: {
          title: "Quick Access",
          description: "No waiting in long queues"
        },
        qualityService: {
          title: "Quality Service",
          description: "Professional healthcare service"
        },
        modernFacility: {
          title: "Modern Facility",
          description: "State-of-the-art medical equipment"
        }
      },
      services: {
        title: "Our Services",
        general: "General Medicine",
        cardiology: "Cardiology",
        pediatrics: "Pediatrics",
        neurology: "Neurology",
        orthopedics: "Orthopedics",
        dermatology: "Dermatology"
      },
      steps: {
        title: "How to Book an Appointment",
        step1: {
          title: "Select Department",
          description: "Choose the medical department you need"
        },
        step2: {
          title: "Choose Doctor",
          description: "Select from our experienced doctors"
        },
        step3: {
          title: "Pick Time",
          description: "Select your preferred date and time"
        },
        step4: {
          title: "Confirm Booking",
          description: "Review and confirm your appointment"
        }
      },
      contact: {
        title: "Need Help?",
        description: "Contact our support team",
        phone: "Emergency Hotline",
        email: "Email Support",
        address: "Location"
      },
      benefits: {
        title: "Without The Wait",
        subtitle: "Why Use Our Online Booking",
        features: {
          easyBooking: {
            title: "Easy Booking",
            description: "Book appointments with just a few taps, no complex forms"
          },
          saveTime: {
            title: "Save Time",
            description: "No need to wait in long queues, book from anywhere"
          },
          reminders: {
            title: "Appointment Reminders",
            description: "Get SMS and email reminders before your appointment"
          },
          doctorChoice: {
            title: "Doctor Selection",
            description: "Choose your preferred doctor from our specialists"
          }
        }
      },
      howItWorks: {
        title: "How It Works",
        steps: {
          step1: {
            title: "Choose Department & Doctor",
            description: "Select your medical department and preferred doctor from our specialists"
          },
          step2: {
            title: "Select Date & Time",
            description: "Pick an available time slot that works best for your schedule"
          },
          step3: {
            title: "Confirm & Get QR Code",
            description: "Receive your appointment QR code to skip the queue when you arrive"
          }
        },
        cta: "Book Your Appointment Now →"
      },
      testimonials: {
        title: "Patient Experiences",
        patients: {
          patient1: {
            quote: "This system made it so easy to book my appointment. No more waiting in long lines!",
            name: "Maria G.",
            age: "67"
          },
          patient2: {
            quote: "The large text and simple steps helped me book appointments without asking my grandchildren for help.",
            name: "Robert T.",
            age: "72"
          },
          patient3: {
            quote: "I love the reminder feature. I never miss my appointments now. Very convenient!",
            name: "Susan L.",
            age: "58"
          }
        }
      },
      support: {
        title: "Need Help Booking?",
        description: "Our support team is just a call away",
        phone: "1-800-123-4567"
      }
    },
    help: {
      title: "Help & Support",
      subtitle: "We're here to help you with any questions or issues",
      howCanWeHelp: "How Can We Help You?",
      supportOptions: {
        call: {
          title: "Call Support",
          description: "Talk to our support team directly",
          action: "Call 1-800-123-4567"
        },
        video: {
          title: "Video Guide",
          description: "Watch our step-by-step video guide",
          action: "Watch Video"
        },
        email: {
          title: "Email Support",
          description: "Send us an email with your questions",
          action: "Send Email"
        }
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          {
            question: "How do I book an appointment?",
            answer: `To book an appointment:
            1. Click on 'Book Appointment' on the home page
            2. Choose your preferred department
            3. Select a doctor
            4. Pick an available time slot
            5. Confirm your booking details`
          },
          {
            question: "Can I cancel or reschedule my appointment?",
            answer: `Yes, you can cancel or reschedule your appointment by:
            1. Going to 'My Appointments' section
            2. Find the appointment you want to change
            3. Click 'Cancel' or 'Reschedule' button
            4. Follow the on-screen instructions`
          },
          {
            question: "What should I bring to my appointment?",
            answer: `Please bring the following to your appointment:
            1. Your ID or passport
            2. Health insurance card (if applicable)
            3. Any relevant medical records
            4. List of current medications
            5. Your appointment QR code or reference number`
          },
          {
            question: "How early should I arrive for my appointment?",
            answer: "We recommend arriving 15 minutes before your scheduled appointment time to complete any necessary paperwork and check-in procedures."
          },
          {
            question: "What if I'm running late for my appointment?",
            answer: "If you're running late, please call our support line as soon as possible. We'll try to accommodate you, but if you're more than 15 minutes late, we may need to reschedule your appointment."
          }
        ]
      },
      stillHaveQuestions: {
        title: "Still Have Questions?",
        availability: "Our support team is available Monday to Friday, 8:00 AM - 6:00 PM",
        phone: "1-800-123-4567",
        email: "support@medicalcenter.com"
      }
    },
    appointments: {
      title: "My Appointments",
      noAppointments: "No appointments found.",
      bookFirstAppointment: "Book First Appointment",
      bookNewAppointment: "Book New Appointment",
      appointmentNumber: "Appointment #",
      department: "Department",
      doctor: "Doctor",
      date: "Date",
      time: "Time",
      status: {
        scheduled: "Scheduled",
        completed: "Completed",
        cancelled: "Cancelled"
      },
      actions: {
        reschedule: "Reschedule",
        cancel: "Cancel",
        view: "View Details"
      },
      cancelDialog: {
        title: "Confirm Appointment Cancellation",
        message: "Are you sure you want to cancel this appointment?",
        confirm: "Cancel Appointment",
        cancel: "No"
      }
    },
    profile: {
      title: "Personal Information",
      personalInfo: "Personal Information",
      name: "Name",
      email: "Email",
      phone: "Phone",
      address: "Address",
      edit: "Edit",
      save: "Save",
      cancel: "Cancel"
    },
    notifications: {
      appointmentBooked: "Appointment booked successfully!",
      appointmentRescheduled: "Appointment rescheduled successfully!",
      appointmentCancelled: "Appointment cancelled successfully",
      error: "An error occurred. Please try again.",
      completeInfo: "Please complete all required fields",
      processingError: "Unable to process appointment. Please try again.",
      rescheduleSuccess: "Appointment updated successfully",
      rescheduleError: "An error occurred when updating appointment"
    },
    notFound: {
      title: "404",
      message: "Oops! Page not found",
      backToHome: "Back to Home"
    }
  },
  vi: {
    nav: {
      home: "Trang chủ",
      appointments: "Lịch hẹn của tôi",
      profile: "Hồ sơ",
      help: "Trợ giúp",
      bookAppointment: "Đặt lịch hẹn"
    },
    branding: {
      medicalCenter: "Trung Tâm Y Tế Nam Cần Thơ",
      shortName: "Trung Tâm Y Tế"
    },
    booking: {
      title: "Đặt lịch hẹn",
      subtitle: "Làm theo các bước đơn giản để đặt lịch khám",
      steps: {
        department: "Khoa",
        doctor: "Bác sĩ",
        time: "Thời gian",
        confirm: "Xác nhận"
      },
      selectDate: "Chọn ngày",
      selectTime: "Chọn giờ",
      noTimeSlots: "Không có giờ trống cho ngày này",
      pleaseSelectDate: "Vui lòng chọn ngày trước",
      selectedTime: "Thời gian đã chọn",
      chooseDepartment: "Chọn Khoa",
      chooseDoctor: "Chọn Bác Sĩ",
      selectTimeSlot: "Chọn Thời Gian",
      confirmAppointment: "Xác Nhận Lịch Hẹn"
    },
    confirmation: {
      title: "Xác nhận lịch hẹn",
      doctor: "Bác sĩ",
      department: "Khoa",
      date: "Ngày",
      time: "Giờ",
      scanQR: "Quét mã này tại bệnh viện",
      arriveEarly: "Vui lòng đến trước giờ hẹn 15 phút",
      bringDocuments: "Mang theo CMND/CCCD và thẻ BHYT (nếu có)",
      confirmButton: "Xác nhận đặt lịch"
    },
    common: {
      next: "Tiếp theo",
      back: "Quay lại",
      cancel: "Hủy",
      confirm: "Xác nhận",
      save: "Lưu",
      edit: "Chỉnh sửa",
      delete: "Xóa",
      close: "Đóng",
      yes: "Có",
      no: "Không",
      loading: "Đang tải...",
      error: "Lỗi",
      success: "Thành công",
      warning: "Cảnh báo",
      info: "Thông tin",
      experience: "kinh nghiệm"
    },
    home: {
      hero: {
        title: "Chăm Sóc Sức Khỏe Dễ Dàng",
        subtitle: "Đặt lịch khám chỉ với vài cú nhấp chuột",
        bookButton: "Đặt Lịch Khám",
        learnMore: "Tìm Hiểu Thêm",
        waitingTitle: "Không cần chờ đợi"
      },
      waitingMessage: "Không Cần Chờ Đợi",
      features: {
        title: "Tại Sao Chọn Chúng Tôi",
        onlineBooking: {
          title: "Đặt Lịch Trực Tuyến",
          description: "Đặt lịch mọi lúc, mọi nơi"
        },
        quickAccess: {
          title: "Truy Cập Nhanh",
          description: "Không phải chờ đợi xếp hàng"
        },
        qualityService: {
          title: "Dịch Vụ Chất Lượng",
          description: "Dịch vụ y tế chuyên nghiệp"
        },
        modernFacility: {
          title: "Cơ Sở Hiện Đại",
          description: "Trang thiết bị y tế tiên tiến"
        }
      },
      services: {
        title: "Dịch Vụ Của Chúng Tôi",
        general: "Khoa Nội Tổng Quát",
        cardiology: "Khoa Tim Mạch",
        pediatrics: "Khoa Nhi",
        neurology: "Khoa Thần Kinh",
        orthopedics: "Khoa Chỉnh Hình",
        dermatology: "Khoa Da Liễu"
      },
      steps: {
        title: "Cách Đặt Lịch Khám",
        step1: {
          title: "Chọn Khoa",
          description: "Chọn khoa phù hợp với nhu cầu"
        },
        step2: {
          title: "Chọn Bác Sĩ",
          description: "Lựa chọn bác sĩ có kinh nghiệm"
        },
        step3: {
          title: "Chọn Thời Gian",
          description: "Chọn ngày và giờ phù hợp"
        },
        step4: {
          title: "Xác Nhận Đặt Lịch",
          description: "Xem lại và xác nhận lịch hẹn"
        }
      },
      contact: {
        title: "Cần Hỗ Trợ?",
        description: "Liên hệ đội ngũ hỗ trợ",
        phone: "Đường Dây Nóng",
        email: "Email Hỗ Trợ",
        address: "Địa Chỉ"
      },
      benefits: {
        title: "Không Cần Chờ Đợi",
        subtitle: "Tại Sao Nên Sử Dụng Đặt Lịch Trực Tuyến",
        features: {
          easyBooking: {
            title: "Đặt Lịch Dễ Dàng",
            description: "Đặt lịch chỉ với vài thao tác, không cần form phức tạp"
          },
          saveTime: {
            title: "Tiết Kiệm Thời Gian",
            description: "Không cần xếp hàng chờ đợi, đặt lịch từ mọi nơi"
          },
          reminders: {
            title: "Nhắc Nhở Lịch Hẹn",
            description: "Nhận thông báo qua SMS và email trước giờ hẹn"
          },
          doctorChoice: {
            title: "Lựa Chọn Bác Sĩ",
            description: "Tự do chọn bác sĩ chuyên khoa phù hợp"
          }
        }
      },
      howItWorks: {
        title: "Cách Thức Hoạt Động",
        steps: {
          step1: {
            title: "Chọn Khoa & Bác Sĩ",
            description: "Chọn khoa và bác sĩ chuyên môn phù hợp với nhu cầu"
          },
          step2: {
            title: "Chọn Ngày & Giờ",
            description: "Chọn thời gian phù hợp với lịch trình của bạn"
          },
          step3: {
            title: "Xác Nhận & Nhận Mã QR",
            description: "Nhận mã QR để ưu tiên khi đến khám"
          }
        },
        cta: "Đặt Lịch Khám Ngay →"
      },
      testimonials: {
        title: "Trải Nghiệm Của Bệnh Nhân",
        patients: {
          patient1: {
            quote: "Hệ thống giúp tôi đặt lịch rất dễ dàng. Không còn phải xếp hàng chờ đợi nữa!",
            name: "Bà Mai",
            age: "67"
          },
          patient2: {
            quote: "Giao diện dễ nhìn và các bước đơn giản giúp tôi tự đặt lịch mà không cần nhờ con cháu.",
            name: "Ông Tuấn",
            age: "72"
          },
          patient3: {
            quote: "Tôi rất thích tính năng nhắc nhở. Giờ không bao giờ quên lịch hẹn nữa. Rất tiện lợi!",
            name: "Chị Lan",
            age: "58"
          }
        }
      },
      support: {
        title: "Cần Hỗ Trợ Đặt Lịch?",
        description: "Đội ngũ hỗ trợ luôn sẵn sàng giúp đỡ bạn",
        phone: "1800-1234"
      }
    },
    help: {
      title: "Trợ Giúp & Hỗ Trợ",
      subtitle: "Chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn",
      howCanWeHelp: "Chúng Tôi Có Thể Giúp Gì?",
      supportOptions: {
        call: {
          title: "Gọi Hỗ Trợ",
          description: "Trao đổi trực tiếp với đội ngũ hỗ trợ",
          action: "Gọi 1800-1234"
        },
        video: {
          title: "Hướng Dẫn Video",
          description: "Xem video hướng dẫn từng bước",
          action: "Xem Video"
        },
        email: {
          title: "Hỗ Trợ Email",
          description: "Gửi email câu hỏi cho chúng tôi",
          action: "Gửi Email"
        }
      },
      faq: {
        title: "Câu Hỏi Thường Gặp",
        items: [
          {
            question: "Làm thế nào để đặt lịch khám?",
            answer: `Để đặt lịch khám:
            1. Nhấp vào 'Đặt Lịch Khám' trên trang chủ
            2. Chọn khoa phù hợp
            3. Chọn bác sĩ
            4. Chọn thời gian còn trống
            5. Xác nhận thông tin đặt lịch`
          },
          {
            question: "Tôi có thể hủy hoặc đổi lịch khám không?",
            answer: `Có, bạn có thể hủy hoặc đổi lịch khám bằng cách:
            1. Vào mục 'Lịch Hẹn Của Tôi'
            2. Tìm lịch hẹn cần thay đổi
            3. Nhấp vào nút 'Hủy' hoặc 'Đổi Lịch'
            4. Làm theo hướng dẫn trên màn hình`
          },
          {
            question: "Tôi cần mang theo những gì khi đến khám?",
            answer: `Vui lòng mang theo:
            1. CMND/CCCD
            2. Thẻ bảo hiểm y tế (nếu có)
            3. Hồ sơ bệnh án liên quan
            4. Danh sách thuốc đang sử dụng
            5. Mã QR hoặc mã số lịch hẹn`
          },
          {
            question: "Tôi nên đến trước giờ hẹn bao lâu?",
            answer: "Chúng tôi khuyến nghị bạn đến trước 15 phút so với giờ hẹn để hoàn thành thủ tục đăng ký và kiểm tra."
          },
          {
            question: "Nếu tôi đến trễ thì sao?",
            answer: "Nếu bạn đến trễ, vui lòng gọi ngay cho đường dây hỗ trợ. Chúng tôi sẽ cố gắng sắp xếp, nhưng nếu bạn đến trễ hơn 15 phút, có thể bạn sẽ cần đặt lại lịch khám."
          }
        ]
      },
      stillHaveQuestions: {
        title: "Vẫn Còn Thắc Mắc?",
        availability: "Đội ngũ hỗ trợ làm việc từ Thứ Hai đến Thứ Sáu, 8:00 - 18:00",
        phone: "1800-1234",
        email: "hotro@medicalcenter.com"
      }
    },
    appointments: {
      title: "Lịch Hẹn Của Tôi",
      noAppointments: "Không tìm thấy lịch hẹn nào.",
      bookFirstAppointment: "Đặt Lịch Hẹn Đầu Tiên",
      bookNewAppointment: "Đặt Lịch Hẹn Mới",
      appointmentNumber: "Lịch hẹn #",
      department: "Khoa",
      doctor: "Bác sĩ",
      date: "Ngày",
      time: "Giờ",
      status: {
        scheduled: "Đã lên lịch",
        completed: "Đã hoàn thành",
        cancelled: "Đã hủy"
      },
      actions: {
        reschedule: "Đổi lịch",
        cancel: "Hủy lịch",
        view: "Xem chi tiết"
      },
      cancelDialog: {
        title: "Xác nhận hủy lịch hẹn",
        message: "Bạn có chắc chắn muốn hủy lịch hẹn này không?",
        confirm: "Hủy lịch hẹn",
        cancel: "Không"
      }
    },
    profile: {
      title: "Hồ Sơ Cá Nhân",
      personalInfo: "Thông Tin Cá Nhân",
      name: "Họ và tên",
      email: "Email",
      phone: "Số điện thoại",
      address: "Địa chỉ",
      edit: "Chỉnh sửa",
      save: "Lưu",
      cancel: "Hủy"
    },
    notifications: {
      appointmentBooked: "Đặt lịch hẹn thành công!",
      appointmentRescheduled: "Đổi lịch hẹn thành công!",
      appointmentCancelled: "Hủy lịch hẹn thành công",
      error: "Đã có lỗi xảy ra. Vui lòng thử lại.",
      completeInfo: "Vui lòng hoàn thành tất cả thông tin bắt buộc",
      processingError: "Không thể xử lý lịch hẹn. Vui lòng thử lại.",
      rescheduleSuccess: "Lịch hẹn đã được cập nhật thành công",
      rescheduleError: "Đã có lỗi xảy ra khi cập nhật lịch hẹn"
    },
    notFound: {
      title: "404",
      message: "Oops! Trang không tìm thấy",
      backToHome: "Quay về trang chủ"
    }
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      translations: translations[language] 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 