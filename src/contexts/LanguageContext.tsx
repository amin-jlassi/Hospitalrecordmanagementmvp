import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'fr' | 'ar';

interface Translations {
  [key: string]: {
    fr: string;
    ar: string;
  };
}

export const translations: Translations = {
  // Header
  appTitle: {
    fr: "Gestion des Dossiers Médicaux",
    ar: "إدارة السجلات الطبية",
  },
  language: {
    fr: "Langue",
    ar: "اللغة",
  },
  french: {
    fr: "Français",
    ar: "فرنسي",
  },
  arabic: {
    fr: "Arabe",
    ar: "عربي",
  },
  
  // CIN Search
  searchTitle: {
    fr: "Rechercher un Patient",
    ar: "البحث عن مريض",
  },
  cinLabel: {
    fr: "Numéro CIN",
    ar: "رقم بطاقة التعريف الوطنية",
  },
  cinPlaceholder: {
    fr: "Entrez le numéro CIN",
    ar: "أدخل رقم بطاقة التعريف",
  },
  searchButton: {
    fr: "Rechercher",
    ar: "بحث",
  },
  patientNotFound: {
    fr: "Patient non trouvé",
    ar: "لم يتم العثور على المريض",
  },
  patientNotFoundDesc: {
    fr: "Aucun patient trouvé avec ce numéro CIN. Veuillez vérifier et réessayer.",
    ar: "لم يتم العثور على مريض بهذا الرقم. يرجى التحقق والمحاولة مرة أخرى.",
  },
  tryExamples: {
    fr: "Essayez ces CIN d'exemple :",
    ar: "جرب هذه الأرقام التجريبية:",
  },
  
  // Patient Info
  patientInfo: {
    fr: "Informations du Patient",
    ar: "معلومات المريض",
  },
  name: {
    fr: "Nom",
    ar: "الاسم",
  },
  cin: {
    fr: "CIN",
    ar: "رقم البطاقة",
  },
  dateOfBirth: {
    fr: "Date de naissance",
    ar: "تاريخ الميلاد",
  },
  gender: {
    fr: "Sexe",
    ar: "الجنس",
  },
  male: {
    fr: "Masculin",
    ar: "ذكر",
  },
  female: {
    fr: "Féminin",
    ar: "أنثى",
  },
  backToSearch: {
    fr: "Retour à la recherche",
    ar: "العودة للبحث",
  },
  
  // Medical Records
  medicalRecords: {
    fr: "Dossiers Médicaux",
    ar: "السجلات الطبية",
  },
  addNewRecord: {
    fr: "Ajouter un Dossier",
    ar: "إضافة سجل",
  },
  noRecords: {
    fr: "Aucun dossier médical disponible",
    ar: "لا توجد سجلات طبية",
  },
  date: {
    fr: "Date",
    ar: "التاريخ",
  },
  hospital: {
    fr: "Hôpital",
    ar: "المستشفى",
  },
  department: {
    fr: "Département",
    ar: "القسم",
  },
  diagnosis: {
    fr: "Diagnostic",
    ar: "التشخيص",
  },
  notes: {
    fr: "Notes",
    ar: "ملاحظات",
  },
  
  // Add Record Form
  addRecordTitle: {
    fr: "Ajouter un Nouveau Dossier Médical",
    ar: "إضافة سجل طبي جديد",
  },
  datePlaceholder: {
    fr: "Sélectionnez la date",
    ar: "اختر التاريخ",
  },
  hospitalPlaceholder: {
    fr: "Ex: Hôpital Habib Thameur...",
    ar: "مثال: مستشفى الحبيب ثامر...",
  },
  departmentPlaceholder: {
    fr: "Ex: Cardiologie, Orthopédie...",
    ar: "مثال: أمراض القلب، جراحة العظام...",
  },
  diagnosisPlaceholder: {
    fr: "Entrez le diagnostic",
    ar: "أدخل التشخيص",
  },
  notesPlaceholder: {
    fr: "Entrez les notes et observations...",
    ar: "أدخل الملاحظات والتفاصيل...",
  },
  cancel: {
    fr: "Annuler",
    ar: "إلغاء",
  },
  save: {
    fr: "Enregistrer",
    ar: "حفظ",
  },
  recordAdded: {
    fr: "Dossier ajouté avec succès",
    ar: "تم إضافة السجل بنجاح",
  },
  recordAddedDesc: {
    fr: "Le nouveau dossier médical a été enregistré.",
    ar: "تم حفظ السجل الطبي الجديد.",
  },
  
  // Chatbot
  chatbotTitle: {
    fr: "Assistant Médical IA",
    ar: "المساعد الطبي الذكي",
  },
  chatbotButton: {
    fr: "Consulter l'Assistant IA",
    ar: "استشر المساعد الذكي",
  },
  chatbotWelcome: {
    fr: "Bonjour! Je suis votre assistant médical virtuel. Comment puis-je vous aider aujourd'hui?",
    ar: "مرحباً! أنا مساعدك الطبي الافتراضي. كيف يمكنني مساعدتك اليوم؟",
  },
  chatbotPlaceholder: {
    fr: "Décrivez vos symptômes...",
    ar: "صف أعراضك...",
  },
  chatbotSend: {
    fr: "Envoyer",
    ar: "إرسال",
  },
  chatbotDisclaimer: {
    fr: "Remarque : Ceci est un assistant virtuel à titre informatif uniquement. Consultez toujours un professionnel de la santé pour un diagnostic médical.",
    ar: "ملاحظة: هذا مساعد افتراضي لأغراض إعلامية فقط. استشر دائماً أخصائي صحة للحصول على تشخيص طبي.",
  },
  chatbotTyping: {
    fr: "En train d'écrire...",
    ar: "يكتب...",
  },
  
  // Role Selection
  roleSelectionTitle: {
    fr: "Bienvenue",
    ar: "مرحباً",
  },
  roleSelectionSubtitle: {
    fr: "Veuillez sélectionner votre rôle",
    ar: "يرجى اختيار دورك",
  },
  doctorRole: {
    fr: "Médecin",
    ar: "طبيب",
  },
  patientRole: {
    fr: "Patient",
    ar: "مريض",
  },
  doctorDescription: {
    fr: "Accès complet aux dossiers des patients",
    ar: "وصول كامل لسجلات المرضى",
  },
  patientDescription: {
    fr: "Consulter vos dossiers et l'assistant IA",
    ar: "استعرض سجلاتك واستشر المساعد الذكي",
  },
  
  // Patient Login
  patientLoginTitle: {
    fr: "Connexion Patient",
    ar: "تسجيل دخول المريض",
  },
  patientLoginSubtitle: {
    fr: "Entrez votre numéro CIN pour accéder à vos dossiers",
    ar: "أدخل رقم بطاقة التعريف للوصول إلى سجلاتك",
  },
  loginButton: {
    fr: "Se connecter",
    ar: "تسجيل الدخول",
  },
  backToRoleSelection: {
    fr: "Retour au choix du rôle",
    ar: "العودة لاختيار الدور",
  },
  
  // User Info
  loggedInAs: {
    fr: "Connecté en tant que",
    ar: "متصل كـ",
  },
  logout: {
    fr: "Déconnexion",
    ar: "تسجيل خروج",
  },
  
  // Attachments
  attachments: {
    fr: "Pièces jointes",
    ar: "المرفقات",
  },
  viewAttachment: {
    fr: "Voir",
    ar: "عرض",
  },
  downloadAttachment: {
    fr: "Télécharger",
    ar: "تحميل",
  },
  noAttachments: {
    fr: "Aucune pièce jointe",
    ar: "لا توجد مرفقات",
  },
  attachmentTypes: {
    fr: "Types de fichiers",
    ar: "أنواع الملفات",
  },
  xrayLabel: {
    fr: "Radiographie",
    ar: "أشعة سينية",
  },
  scanLabel: {
    fr: "Échographie",
    ar: "تصوير بالموجات فوق الصوتية",
  },
  labLabel: {
    fr: "Analyses",
    ar: "تحليلات",
  },
  ecgLabel: {
    fr: "ECG",
    ar: "تخطيط القلب",
  },
  documentLabel: {
    fr: "Document",
    ar: "مستند",
  },
  prescriptionLabel: {
    fr: "Ordonnance",
    ar: "وصفة طبية",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
