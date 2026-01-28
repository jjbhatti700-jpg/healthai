import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export const translations = {
  en: {
    // Navbar
    home: 'Home',
    symptoms: 'Symptoms',
    doctors: 'Doctors',
    reminders: 'Reminders',
    library: 'Library',
    settings: 'Settings',
    emergency: 'Emergency',
    bmi: 'BMI',
    water: 'Water',
    logout: 'Logout',
    login: 'Login',
    getStarted: 'Get Started',

    // Dashboard
    goodMorning: 'Good Morning',
    goodAfternoon: 'Good Afternoon',
    goodEvening: 'Good Evening',
    yourDashboard: 'Your health dashboard',
    total: 'Total',
    thisWeek: 'This Week',
    thisMonth: 'This Month',
    weeklyActivity: 'Weekly Activity',
    categories: 'Categories',
    quickActions: 'Quick Actions',
    recentChats: 'Recent Chats',
    healthTips: 'Health Tips',
    noConversations: 'No conversations yet',
    startChat: 'Start Chat',

    // Symptom Checker
    symptomChecker: 'Symptom Checker',
    aiHealthInsights: 'AI-powered health insights',
    describeSymptoms: 'Describe your symptoms...',
    howFeeling: 'How are you feeling?',
    disclaimer: 'For informational purposes only. Not medical advice.',
    headache: 'Headache',
    fever: 'Fever',
    stomachPain: 'Stomach Pain',
    backPain: 'Back Pain',
    fatigue: 'Fatigue',
    cough: 'Cough',

    // Find Doctors
    findDoctors: 'Find Doctors',
    searchDoctors: 'Search doctors & hospitals in Pakistan',
    city: 'City',
    specialty: 'Specialty',
    allCities: 'All Cities',
    allSpecialties: 'All Specialties',
    search: 'Search',
    doctorsFound: 'doctors found',
    call: 'Call',
    map: 'Map',
    emergencyCall: 'Emergency?',
    callRescue: 'Call Rescue 1122',

    // Medicine Reminder
    medicineReminder: 'Medicine Reminder',
    neverMiss: 'Never miss your medication',
    addMedicine: 'Add Medicine',
    medicineName: 'Medicine Name',
    dosage: 'Dosage',
    frequency: 'Frequency',
    reminderTimes: 'Reminder Times',
    notes: 'Notes',
    daily: 'Daily',
    twiceDay: 'Twice a day',
    threeTimesDay: 'Three times a day',
    weekly: 'Weekly',
    active: 'Active',
    paused: 'Paused',

    // Emergency
    emergencyServices: 'Emergency Services',
    quickAccess: 'Quick access to emergency services',
    callNow: 'Call Now',
    majorHospitals: 'Major Hospitals',
    whileWaiting: 'While Waiting for Help',

    // BMI Calculator
    bmiCalculator: 'BMI Calculator',
    calculateBMI: 'Calculate your Body Mass Index',
    weight: 'Weight',
    height: 'Height',
    calculate: 'Calculate',
    reset: 'Reset',
    yourBMI: 'Your BMI is',
    underweight: 'Underweight',
    normal: 'Normal',
    overweight: 'Overweight',
    obese: 'Obese',

    // Water Tracker
    waterTracker: 'Water Tracker',
    stayHydrated: 'Stay hydrated, stay healthy',
    glasses: 'glasses',
    goalReached: 'Goal reached! Great job!',
    moreToGo: 'more to reach your goal',
    addWater: 'Add Water',
    thisWeekHistory: 'This Week',
    hydrationTips: 'Hydration Tips',

    // Settings
    profile: 'Profile',
    password: 'Password',
    appearance: 'Appearance',
    notifications: 'Notifications',
    language: 'Language',
    dangerZone: 'Danger Zone',
    darkMode: 'Dark Mode',
    deleteAccount: 'Delete Account',
    save: 'Save',
    cancel: 'Cancel',
  },

  ur: {
    // Navbar
    home: 'ہوم',
    symptoms: 'علامات',
    doctors: 'ڈاکٹرز',
    reminders: 'یاد دہانی',
    library: 'لائبریری',
    settings: 'ترتیبات',
    emergency: 'ایمرجنسی',
    bmi: 'بی ایم آئی',
    water: 'پانی',
    logout: 'لاگ آؤٹ',
    login: 'لاگ ان',
    getStarted: 'شروع کریں',

    // Dashboard
    goodMorning: 'صبح بخیر',
    goodAfternoon: 'دوپہر بخیر',
    goodEvening: 'شام بخیر',
    yourDashboard: 'آپ کا ہیلتھ ڈیش بورڈ',
    total: 'کل',
    thisWeek: 'اس ہفتے',
    thisMonth: 'اس مہینے',
    weeklyActivity: 'ہفتہ وار سرگرمی',
    categories: 'زمرے',
    quickActions: 'فوری اقدامات',
    recentChats: 'حالیہ چیٹس',
    healthTips: 'صحت کے مشورے',
    noConversations: 'ابھی کوئی بات چیت نہیں',
    startChat: 'چیٹ شروع کریں',

    // Symptom Checker
    symptomChecker: 'علامات چیکر',
    aiHealthInsights: 'AI سے صحت کے بارے میں معلومات',
    describeSymptoms: 'اپنی علامات بیان کریں...',
    howFeeling: 'آپ کیسا محسوس کر رہے ہیں؟',
    disclaimer: 'صرف معلومات کے لیے۔ طبی مشورہ نہیں۔',
    headache: 'سر درد',
    fever: 'بخار',
    stomachPain: 'پیٹ درد',
    backPain: 'کمر درد',
    fatigue: 'تھکاوٹ',
    cough: 'کھانسی',

    // Find Doctors
    findDoctors: 'ڈاکٹر تلاش کریں',
    searchDoctors: 'پاکستان میں ڈاکٹرز اور ہسپتال تلاش کریں',
    city: 'شہر',
    specialty: 'خصوصیت',
    allCities: 'تمام شہر',
    allSpecialties: 'تمام خصوصیات',
    search: 'تلاش',
    doctorsFound: 'ڈاکٹرز ملے',
    call: 'کال',
    map: 'نقشہ',
    emergencyCall: 'ایمرجنسی؟',
    callRescue: 'ریسکیو 1122 کو کال کریں',

    // Medicine Reminder
    medicineReminder: 'دوائی یاد دہانی',
    neverMiss: 'اپنی دوائی کبھی نہ بھولیں',
    addMedicine: 'دوائی شامل کریں',
    medicineName: 'دوائی کا نام',
    dosage: 'خوراک',
    frequency: 'تعدد',
    reminderTimes: 'یاد دہانی کے اوقات',
    notes: 'نوٹس',
    daily: 'روزانہ',
    twiceDay: 'دن میں دو بار',
    threeTimesDay: 'دن میں تین بار',
    weekly: 'ہفتہ وار',
    active: 'فعال',
    paused: 'رکا ہوا',

    // Emergency
    emergencyServices: 'ایمرجنسی سروسز',
    quickAccess: 'ایمرجنسی سروسز تک فوری رسائی',
    callNow: 'ابھی کال کریں',
    majorHospitals: 'بڑے ہسپتال',
    whileWaiting: 'مدد کا انتظار کرتے وقت',

    // BMI Calculator
    bmiCalculator: 'بی ایم آئی کیلکولیٹر',
    calculateBMI: 'اپنا باڈی ماس انڈیکس حساب کریں',
    weight: 'وزن',
    height: 'قد',
    calculate: 'حساب کریں',
    reset: 'ری سیٹ',
    yourBMI: 'آپ کا BMI ہے',
    underweight: 'کم وزن',
    normal: 'نارمل',
    overweight: 'زیادہ وزن',
    obese: 'موٹاپا',

    // Water Tracker
    waterTracker: 'پانی ٹریکر',
    stayHydrated: 'ہائیڈریٹڈ رہیں، صحت مند رہیں',
    glasses: 'گلاس',
    goalReached: 'ہدف حاصل! شاباش!',
    moreToGo: 'ہدف تک پہنچنے کے لیے',
    addWater: 'پانی شامل کریں',
    thisWeekHistory: 'اس ہفتے',
    hydrationTips: 'ہائیڈریشن ٹپس',

    // Settings
    profile: 'پروفائل',
    password: 'پاس ورڈ',
    appearance: 'ظاہری شکل',
    notifications: 'اطلاعات',
    language: 'زبان',
    dangerZone: 'خطرناک زون',
    darkMode: 'ڈارک موڈ',
    deleteAccount: 'اکاؤنٹ حذف کریں',
    save: 'محفوظ کریں',
    cancel: 'منسوخ',
  }
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en'
  })

  useEffect(() => {
    localStorage.setItem('language', language)
    document.documentElement.dir = language === 'ur' ? 'rtl' : 'ltr'
    document.documentElement.lang = language
  }, [language])

  const t = (key) => translations[language][key] || key

  const toggleLanguage = () => {
    setLanguage(lang => lang === 'en' ? 'ur' : 'en')
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}

export default LanguageContext