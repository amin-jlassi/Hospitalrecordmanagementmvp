import React, { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { Header } from './components/Header';
import { RoleSelection } from './components/RoleSelection';
import { PatientLogin } from './components/PatientLogin';
import { CINSearch } from './components/CINSearch';
import { PatientRecords } from './components/PatientRecords';
import { ChatBot } from './components/ChatBot';
import { mockPatients, Patient, MedicalRecord } from './data/mockData';
import { Toaster } from './components/ui/sonner';

type UserRole = 'doctor' | 'patient' | null;
type AppView = 'roleSelection' | 'patientLogin' | 'doctorSearch' | 'patientRecords' | 'chatbot';

export default function App() {
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [currentView, setCurrentView] = useState<AppView>('roleSelection');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const handleRoleSelection = (role: 'doctor' | 'patient') => {
    setUserRole(role);
    if (role === 'doctor') {
      setCurrentView('doctorSearch');
    } else {
      setCurrentView('patientLogin');
    }
  };

  const handlePatientLogin = (patient: Patient) => {
    setSelectedPatient(patient);
    setCurrentView('patientRecords');
  };

  const handleDoctorPatientFound = (patient: Patient) => {
    setSelectedPatient(patient);
    setCurrentView('patientRecords');
  };

  const handleBack = () => {
    setSelectedPatient(null);
    if (userRole === 'doctor') {
      setCurrentView('doctorSearch');
    } else {
      setCurrentView('patientLogin');
    }
  };

  const handleLogout = () => {
    setUserRole(null);
    setSelectedPatient(null);
    setCurrentView('roleSelection');
  };

  const handleUpdateRecords = (records: MedicalRecord[]) => {
    if (selectedPatient) {
      const updatedPatients = patients.map(p =>
        p.cin === selectedPatient.cin ? { ...p, records } : p
      );
      setPatients(updatedPatients);
      setSelectedPatient({ ...selectedPatient, records });
    }
  };

  const handleNavigateToChatbot = () => {
    setCurrentView('chatbot');
  };

  const handleBackFromChatbot = () => {
    setCurrentView('patientRecords');
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-50">
        <Header 
          userRole={userRole || undefined}
          userName={selectedPatient?.name}
          onLogout={userRole ? handleLogout : undefined}
        />
        
        {currentView === 'roleSelection' && (
          <RoleSelection onSelectRole={handleRoleSelection} />
        )}

        {currentView === 'patientLogin' && (
          <PatientLogin 
            onLogin={handlePatientLogin}
            onBack={handleLogout}
          />
        )}

        {currentView === 'doctorSearch' && (
          <CINSearch 
            onPatientFound={handleDoctorPatientFound} 
            patients={patients} 
          />
        )}

        {currentView === 'patientRecords' && selectedPatient && userRole && (
          <PatientRecords
            patient={selectedPatient}
            onBack={handleBack}
            onUpdateRecords={handleUpdateRecords}
            userRole={userRole}
            onNavigateToChatbot={handleNavigateToChatbot}
          />
        )}

        {currentView === 'chatbot' && selectedPatient && (
          <ChatBot
            patientName={selectedPatient.name}
            onBack={handleBackFromChatbot}
          />
        )}

        <Toaster />
      </div>
    </LanguageProvider>
  );
}
