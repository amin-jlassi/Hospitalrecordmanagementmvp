import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ArrowLeft, Plus, Calendar, Building2, FileText, User, Hospital, MessageCircle } from 'lucide-react';
import { Patient, MedicalRecord } from '../data/mockData';
import { AddRecordForm } from './AddRecordForm';
import { MedicalAttachments } from './MedicalAttachments';

interface PatientRecordsProps {
  patient: Patient;
  onBack: () => void;
  onUpdateRecords: (records: MedicalRecord[]) => void;
  userRole: 'doctor' | 'patient';
  onNavigateToChatbot?: () => void;
}

export const PatientRecords: React.FC<PatientRecordsProps> = ({
  patient,
  onBack,
  onUpdateRecords,
  userRole,
  onNavigateToChatbot,
}) => {
  const { language, t } = useLanguage();
  const [showAddForm, setShowAddForm] = useState(false);
  const [records, setRecords] = useState<MedicalRecord[]>(patient.records);

  const handleAddRecord = (newRecord: Omit<MedicalRecord, 'id'>) => {
    const recordWithId: MedicalRecord = {
      ...newRecord,
      id: Date.now().toString(),
    };
    const updatedRecords = [recordWithId, ...records];
    setRecords(updatedRecords);
    onUpdateRecords(updatedRecords);
  };

  const sortedRecords = [...records].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 p-4" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto space-y-6">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('backToSearch')}
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              {t('patientInfo')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">{t('name')}</p>
                <p className="mt-1">{patient.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">{t('cin')}</p>
                <p className="mt-1">{patient.cin}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">{t('dateOfBirth')}</p>
                <p className="mt-1">{patient.dateOfBirth}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">{t('gender')}</p>
                <p className="mt-1">{patient.gender === 'M' ? t('male') : t('female')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between gap-2 flex-wrap">
          <h2 className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            {t('medicalRecords')}
            <Badge variant="secondary">{records.length}</Badge>
          </h2>
          <div className="flex gap-2">
            {userRole === 'patient' && onNavigateToChatbot && (
              <Button onClick={onNavigateToChatbot} variant="outline">
                <MessageCircle className="w-4 h-4 mr-2" />
                {t('chatbotButton')}
              </Button>
            )}
            {userRole === 'doctor' && (
              <Button onClick={() => setShowAddForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                {t('addNewRecord')}
              </Button>
            )}
          </div>
        </div>

        {sortedRecords.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-gray-500">
              {t('noRecords')}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {sortedRecords.map((record) => (
              <Card key={record.id}>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(record.date).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'ar-TN')}
                    </CardTitle>
                    <Badge variant="outline" className="w-fit flex items-center gap-1">
                      <Building2 className="w-3 h-3" />
                      {record.department}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center gap-2 mt-2">
                    <Hospital className="w-4 h-4" />
                    {record.hospital}
                  </CardDescription>
                  <CardDescription className="mt-1">{record.diagnosis}</CardDescription>
                </CardHeader>
                <Separator />
                <CardContent className="pt-4 space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{t('notes')}:</p>
                    <p className="text-sm">{record.notes}</p>
                  </div>
                  {record.attachments && record.attachments.length > 0 && (
                    <>
                      <Separator />
                      <MedicalAttachments attachments={record.attachments} />
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {userRole === 'doctor' && (
        <AddRecordForm
          open={showAddForm}
          onClose={() => setShowAddForm(false)}
          onAdd={handleAddRecord}
        />
      )}
    </div>
  );
};
