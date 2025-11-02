import React from 'react';
import { useLanguage, Language } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Globe, LogOut } from 'lucide-react';

interface HeaderProps {
  userRole?: 'doctor' | 'patient';
  userName?: string;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ userRole, userName, onLogout }) => {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'ar' : 'fr');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-blue-600" dir={language === 'ar' ? 'rtl' : 'ltr'}>
            {t('appTitle')}
          </h1>
          {userRole && (
            <Badge variant={userRole === 'doctor' ? 'default' : 'secondary'}>
              {userRole === 'doctor' ? t('doctorRole') : t('patientRole')}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-3">
          {userName && (
            <span className="text-sm text-gray-600 hidden md:inline" dir={language === 'ar' ? 'rtl' : 'ltr'}>
              {t('loggedInAs')}: <span className="font-medium">{userName}</span>
            </span>
          )}
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-gray-600" />
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="min-w-24"
            >
              {language === 'fr' ? t('arabic') : t('french')}
            </Button>
          </div>
          {onLogout && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              {t('logout')}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
