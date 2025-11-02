// Mock data for patients and their medical records

export interface MedicalAttachment {
  id: string;
  type: 'xray' | 'scan' | 'lab' | 'ecg' | 'document' | 'prescription';
  name: string;
  url: string;
}

export interface MedicalRecord {
  id: string;
  date: string;
  hospital: string;
  department: string;
  diagnosis: string;
  notes: string;
  attachments?: MedicalAttachment[];
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
        attachments: [
          {
            id: "att1",
            type: "ecg",
            name: "ECG - Électrocardiogramme",
            url: "https://images.unsplash.com/photo-1682706841289-9d7ddf5eb999?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY2clMjBoZWFydCUyMG1vbml0b3J8ZW58MXx8fHwxNzYyMTE4OTc5fDA&ixlib=rb-4.1.0&q=80&w=1080"
          },
          {
            id: "att2",
            type: "lab",
            name: "Résultats d'analyses sanguines",
            url: "https://images.unsplash.com/photo-1672566954988-d62513f9c198?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwYmxvb2QlMjB0ZXN0JTIwcmVzdWx0c3xlbnwxfHx8fDE3NjIxMTg5ODB8MA&ixlib=rb-4.1.0&q=80&w=1080"
          },
          {
            id: "att3",
            type: "prescription",
            name: "Ordonnance médicale",
            url: "https://images.unsplash.com/photo-1550572017-54b7f54d1f75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwcHJlc2NyaXB0aW9uJTIwcGFwZXJ8ZW58MXx8fHwxNzYyMTE4OTgwfDA&ixlib=rb-4.1.0&q=80&w=1080"
          }
        ]
      },
      {
        id: "2",
        date: "2024-08-20",
        hospital: "Clinique La Soukra",
        department: "Médecine générale",
        diagnosis: "Grippe saisonnière",
        notes: "Symptômes grippaux typiques. Repos recommandé. Paracétamol prescrit.",
        attachments: [
          {
            id: "att4",
            type: "prescription",
            name: "Ordonnance - Paracétamol",
            url: "https://images.unsplash.com/photo-1550572017-54b7f54d1f75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwcHJlc2NyaXB0aW9uJTIwcGFwZXJ8ZW58MXx8fHwxNzYyMTE4OTgwfDA&ixlib=rb-4.1.0&q=80&w=1080"
          }
        ]
      },
      {
        id: "3",
        date: "2024-05-10",
        hospital: "Hôpital Charles Nicolle",
        department: "Orthopédie",
        diagnosis: "Entorse de la cheville",
        notes: "Entorse modérée. Bandage compressif. Éviter l'appui pendant 1 semaine.",
        attachments: [
          {
            id: "att5",
            type: "xray",
            name: "Radiographie - Cheville",
            url: "https://images.unsplash.com/photo-1758691461957-13aff0c37c6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIweC1yYXklMjBzY2FufGVufDF8fHx8MTc2MjExODk3OHww&ixlib=rb-4.1.0&q=80&w=1080"
          },
          {
            id: "att6",
            type: "document",
            name: "Rapport médical",
            url: "https://images.unsplash.com/photo-1620933967796-53cc2b175b6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZG9jdW1lbnRzJTIwcmVwb3J0fGVufDF8fHx8MTc2MjExODk3OXww&ixlib=rb-4.1.0&q=80&w=1080"
          }
        ]
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
        attachments: [
          {
            id: "att7",
            type: "scan",
            name: "Échographie prénatale",
            url: "https://images.unsplash.com/photo-1698913464331-b71a8d32b4da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdWx0cmFzb3VuZCUyMHNjcmVlbnxlbnwxfHx8fDE3NjIwNzM1NjB8MA&ixlib=rb-4.1.0&q=80&w=1080"
          },
          {
            id: "att8",
            type: "lab",
            name: "Analyses sanguines",
            url: "https://images.unsplash.com/photo-1672566954988-d62513f9c198?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwYmxvb2QlMjB0ZXN0JTIwcmVzdWx0c3xlbnwxfHx8fDE3NjIxMTg5ODB8MA&ixlib=rb-4.1.0&q=80&w=1080"
          }
        ]
      },
      {
        id: "5",
        date: "2024-06-18",
        hospital: "Hôpital Habib Thameur",
        department: "Dermatologie",
        diagnosis: "Eczéma",
        notes: "Plaques eczémateuses sur les bras. Crème corticoïde prescrite. Éviter les allergènes.",
        attachments: [
          {
            id: "att9",
            type: "document",
            name: "Rapport dermatologique",
            url: "https://images.unsplash.com/photo-1620933967796-53cc2b175b6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZG9jdW1lbnRzJTIwcmVwb3J0fGVufDF8fHx8MTc2MjExODk3OXww&ixlib=rb-4.1.0&q=80&w=1080"
          }
        ]
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
        attachments: [
          {
            id: "att10",
            type: "lab",
            name: "Test de glycémie",
            url: "https://images.unsplash.com/photo-1672566954988-d62513f9c198?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwYmxvb2QlMjB0ZXN0JTIwcmVzdWx0c3xlbnwxfHx8fDE3NjIxMTg5ODB8MA&ixlib=rb-4.1.0&q=80&w=1080"
          },
          {
            id: "att11",
            type: "prescription",
            name: "Ordonnance - Metformine",
            url: "https://images.unsplash.com/photo-1550572017-54b7f54d1f75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwcHJlc2NyaXB0aW9uJTIwcGFwZXJ8ZW58MXx8fHwxNzYyMTE4OTgwfDA&ixlib=rb-4.1.0&q=80&w=1080"
          },
          {
            id: "att12",
            type: "document",
            name: "Rapport endocrinologique",
            url: "https://images.unsplash.com/photo-1620933967796-53cc2b175b6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZG9jdW1lbnRzJTIwcmVwb3J0fGVufDF8fHx8MTc2MjExODk3OXww&ixlib=rb-4.1.0&q=80&w=1080"
          }
        ]
      },
    ],
  },
];
