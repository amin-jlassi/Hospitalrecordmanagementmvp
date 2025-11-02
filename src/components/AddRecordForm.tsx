import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { MedicalRecord } from '../data/mockData';
import { toast } from 'sonner@2.0.3';

interface AddRecordFormProps {
  open: boolean;
  onClose: () => void;
  onAdd: (record: Omit<MedicalRecord, 'id'>) => void;
}

export const AddRecordForm: React.FC<AddRecordFormProps> = ({ open, onClose, onAdd }) => {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    hospital: '',
    department: '',
    diagnosis: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    toast.success(t('recordAdded'), {
      description: t('recordAddedDesc'),
    });
    setFormData({
      date: new Date().toISOString().split('T')[0],
      hospital: '',
      department: '',
      diagnosis: '',
      notes: '',
    });
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <DialogHeader>
          <DialogTitle>{t('addRecordTitle')}</DialogTitle>
          <DialogDescription>{t('patientInfo')}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">{t('date')}</Label>
            <Input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hospital">{t('hospital')}</Label>
            <Input
              id="hospital"
              name="hospital"
              type="text"
              value={formData.hospital}
              onChange={handleChange}
              placeholder={t('hospitalPlaceholder')}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="department">{t('department')}</Label>
            <Input
              id="department"
              name="department"
              type="text"
              value={formData.department}
              onChange={handleChange}
              placeholder={t('departmentPlaceholder')}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="diagnosis">{t('diagnosis')}</Label>
            <Input
              id="diagnosis"
              name="diagnosis"
              type="text"
              value={formData.diagnosis}
              onChange={handleChange}
              placeholder={t('diagnosisPlaceholder')}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">{t('notes')}</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder={t('notesPlaceholder')}
              rows={4}
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              {t('cancel')}
            </Button>
            <Button type="submit" className="flex-1">
              {t('save')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
