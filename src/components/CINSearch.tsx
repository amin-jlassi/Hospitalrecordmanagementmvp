import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Search, AlertCircle } from 'lucide-react';
import { Patient } from '../data/mockData';

interface CINSearchProps {
  onPatientFound: (patient: Patient) => void;
  patients: Patient[];
}

export const CINSearch: React.FC<CINSearchProps> = ({ onPatientFound, patients }) => {
  const { language, t } = useLanguage();
  const [cin, setCin] = useState('');
  const [showError, setShowError] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const patient = patients.find(p => p.cin.toUpperCase() === cin.toUpperCase());
    
    if (patient) {
      setShowError(false);
      onPatientFound(patient);
    } else {
      setShowError(true);
    }
  };

  const exampleCINs = patients.map(p => p.cin);

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <Search className="w-8 h-8 text-blue-600" />
          </div>
          <CardTitle>{t('searchTitle')}</CardTitle>
          <CardDescription>{t('cinLabel')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cin">{t('cinLabel')}</Label>
              <Input
                id="cin"
                type="text"
                value={cin}
                onChange={(e) => setCin(e.target.value)}
                placeholder={t('cinPlaceholder')}
                className="text-center tracking-wider"
                required
              />
            </div>

            <Button type="submit" className="w-full">
              <Search className="w-4 h-4 mr-2" />
              {t('searchButton')}
            </Button>

            {showError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>{t('patientNotFound')}</AlertTitle>
                <AlertDescription>{t('patientNotFoundDesc')}</AlertDescription>
              </Alert>
            )}

            <div className="pt-4 border-t">
              <p className="text-sm text-gray-600 mb-2">{t('tryExamples')}</p>
              <div className="flex flex-wrap gap-2">
                {exampleCINs.map((exampleCIN) => (
                  <Button
                    key={exampleCIN}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setCin(exampleCIN)}
                    className="text-xs"
                  >
                    {exampleCIN}
                  </Button>
                ))}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
