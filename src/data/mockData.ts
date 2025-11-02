// Mock data for patients and their medical records

export interface MedicalRecord {
  id: string;
  date: string;
  hospital: string;
  department: string;
  diagnosis: string;
  notes: string;
}

export interface Patient {
  cin: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  records: MedicalRecord[];
}

export const mockPatients: Patient[] = [
  {
    cin: "AB123456",
    name: "Ahmed Ben Salem",
    dateOfBirth: "1985-03-15",
    gender: "M",
    records: [
      {
        id: "1",
        date: "2024-10-15",
        hospital: "Hôpital Habib Thameur",
        department: "Cardiologie",
        diagnosis: "Hypertension artérielle",
        notes: "Tension artérielle : 145/95 mmHg. Prescription de médicaments antihypertenseurs. Suivi dans 3 mois.",
      },
      {
        id: "2",
        date: "2024-08-20",
        hospital: "Clinique La Soukra",
        department: "Médecine générale",
        diagnosis: "Grippe saisonnière",
        notes: "Symptômes grippaux typiques. Repos recommandé. Paracétamol prescrit.",
      },
      {
        id: "3",
        date: "2024-05-10",
        hospital: "Hôpital Charles Nicolle",
        department: "Orthopédie",
        diagnosis: "Entorse de la cheville",
        notes: "Entorse modérée. Bandage compressif. Éviter l'appui pendant 1 semaine.",
      },
    ],
  },
  {
    cin: "CD789012",
    name: "Fatima Gharbi",
    dateOfBirth: "1992-07-22",
    gender: "F",
    records: [
      {
        id: "4",
        date: "2024-09-30",
        hospital: "Clinique Hannibal",
        department: "Gynécologie",
        diagnosis: "Consultation prénatale",
        notes: "Grossesse de 12 semaines. Échographie normale. Vitamines prénatales prescrites.",
      },
      {
        id: "5",
        date: "2024-06-18",
        hospital: "Hôpital Habib Thameur",
        department: "Dermatologie",
        diagnosis: "Eczéma",
        notes: "Plaques eczémateuses sur les bras. Crème corticoïde prescrite. Éviter les allergènes.",
      },
    ],
  },
  {
    cin: "EF345678",
    name: "Mohamed Trabelsi",
    dateOfBirth: "1978-11-30",
    gender: "M",
    records: [
      {
        id: "6",
        date: "2024-10-25",
        hospital: "Hôpital Mongi Slim",
        department: "Endocrinologie",
        diagnosis: "Diabète de type 2",
        notes: "Glycémie à jeun : 180 mg/dL. Régime alimentaire et exercice recommandés. Metformine prescrite.",
      },
    ],
  },
];
