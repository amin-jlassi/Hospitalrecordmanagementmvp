import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { ArrowLeft, User, AlertCircle } from 'lucide-react';
import { Patient, mockPatients } from '../data/mockData';

interface PatientLoginProps {
  onLogin: (patient: Patient) => void;
  onBack: () => void;
}

export const PatientLogin: React.FC<PatientLoginProps> = ({ onLogin, onBack }) => {
  const { language, t } = useLanguage();
  const [cin, setCin] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const patient = mockPatients.find(p => p.cin === cin);
    
    if (patient) {
      onLogin(patient);
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 flex items-center justify-center p-4" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-md w-full space-y-6">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('backToRoleSelection')}
        </Button>

        <Card>
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle>{t('patientLoginTitle')}</CardTitle>
            <CardDescription>{t('patientLoginSubtitle')}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cin">{t('cinLabel')}</Label>
                <Input
                  id="cin"
                  type="text"
                  placeholder={t('cinPlaceholder')}
                  value={cin}
                  onChange={(e) => {
                    setCin(e.target.value);
                    setError(false);
                  }}
                  className={error ? 'border-red-500' : ''}
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>{t('patientNotFound')}</AlertTitle>
                  <AlertDescription>
                    {t('patientNotFoundDesc')}
                    <div className="mt-2">
                      <p className="text-sm">{t('tryExamples')}</p>
                      <ul className="text-sm mt-1 space-y-1">
                        {mockPatients.map((patient) => (
                          <li key={patient.cin}>
                            <button
                              type="button"
                              onClick={() => {
                                setCin(patient.cin);
                                setError(false);
                              }}
                              className="text-red-200 hover:text-white underline"
                            >
                              {patient.cin} - {patient.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full">
                {t('loginButton')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
