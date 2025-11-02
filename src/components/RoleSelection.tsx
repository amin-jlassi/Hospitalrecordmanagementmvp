import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Stethoscope, User } from 'lucide-react';

interface RoleSelectionProps {
  onSelectRole: (role: 'doctor' | 'patient') => void;
}

export const RoleSelection: React.FC<RoleSelectionProps> = ({ onSelectRole }) => {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 flex items-center justify-center p-4" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl w-full space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-gray-900">{t('roleSelectionTitle')}</h1>
          <p className="text-gray-600">{t('roleSelectionSubtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onSelectRole('doctor')}>
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle>{t('doctorRole')}</CardTitle>
              <CardDescription>{t('doctorDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => onSelectRole('doctor')}>
                {t('doctorRole')}
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onSelectRole('patient')}>
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle>{t('patientRole')}</CardTitle>
              <CardDescription>{t('patientDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline" onClick={() => onSelectRole('patient')}>
                {t('patientRole')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
