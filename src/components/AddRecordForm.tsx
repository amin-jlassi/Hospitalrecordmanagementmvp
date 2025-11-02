import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';
import { MedicalRecord, MedicalAttachment } from '../data/mockData';
import { toast } from 'sonner@2.0.3';
import { Plus, X } from 'lucide-react';

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
  const [attachments, setAttachments] = useState<Omit<MedicalAttachment, 'id'>[]>([]);
  const [newAttachment, setNewAttachment] = useState({
    type: 'document' as MedicalAttachment['type'],
    name: '',
    url: '',
  });

  // Predefined medical images for demo purposes
  const demoImages = {
    xray: 'https://images.unsplash.com/photo-1758691461957-13aff0c37c6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIweC1yYXklMjBzY2FufGVufDF8fHx8MTc2MjExODk3OHww&ixlib=rb-4.1.0&q=80&w=1080',
    scan: 'https://images.unsplash.com/photo-1698913464331-b71a8d32b4da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdWx0cmFzb3VuZCUyMHNjcmVlbnxlbnwxfHx8fDE3NjIwNzM1NjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    lab: 'https://images.unsplash.com/photo-1672566954988-d62513f9c198?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwYmxvb2QlMjB0ZXN0JTIwcmVzdWx0c3xlbnwxfHx8fDE3NjIxMTg5ODB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ecg: 'https://images.unsplash.com/photo-1682706841289-9d7ddf5eb999?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY2clMjBoZWFydCUyMG1vbml0b3J8ZW58MXx8fHwxNzYyMTE4OTc5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    document: 'https://images.unsplash.com/photo-1620933967796-53cc2b175b6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZG9jdW1lbnRzJTIwcmVwb3J0fGVufDF8fHx8MTc2MjExODk3OXww&ixlib=rb-4.1.0&q=80&w=1080',
    prescription: 'https://images.unsplash.com/photo-1550572017-54b7f54d1f75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwcHJlc2NyaXB0aW9uJTIwcGFwZXJ8ZW58MXx8fHwxNzYyMTE4OTgwfDA&ixlib=rb-4.1.0&q=80&w=1080',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const recordWithAttachments = {
      ...formData,
      attachments: attachments.map((att, index) => ({
        ...att,
        id: `att_${Date.now()}_${index}`,
      })),
    };
    onAdd(recordWithAttachments);
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
    setAttachments([]);
    setNewAttachment({ type: 'document', name: '', url: '' });
    onClose();
  };

  const handleAddAttachment = () => {
    if (newAttachment.name) {
      const url = newAttachment.url || demoImages[newAttachment.type];
      setAttachments([...attachments, { ...newAttachment, url }]);
      setNewAttachment({ type: 'document', name: '', url: '' });
    }
  };

  const handleRemoveAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
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

          <div className="space-y-3 pt-2 border-t">
            <Label>{t('attachments')} ({attachments.length})</Label>
            
            {attachments.length > 0 && (
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {attachments.map((att, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <Badge variant="outline" className="text-xs">
                        {t(`${att.type}Label`)}
                      </Badge>
                      <span className="text-sm truncate">{att.name}</span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveAttachment(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 gap-2">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="attachmentType" className="text-xs">{t('attachmentTypes')}</Label>
                  <Select
                    value={newAttachment.type}
                    onValueChange={(value) => setNewAttachment({ ...newAttachment, type: value as MedicalAttachment['type'] })}
                  >
                    <SelectTrigger id="attachmentType" className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="xray">{t('xrayLabel')}</SelectItem>
                      <SelectItem value="scan">{t('scanLabel')}</SelectItem>
                      <SelectItem value="lab">{t('labLabel')}</SelectItem>
                      <SelectItem value="ecg">{t('ecgLabel')}</SelectItem>
                      <SelectItem value="document">{t('documentLabel')}</SelectItem>
                      <SelectItem value="prescription">{t('prescriptionLabel')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="attachmentName" className="text-xs">{t('name')}</Label>
                  <Input
                    id="attachmentName"
                    type="text"
                    value={newAttachment.name}
                    onChange={(e) => setNewAttachment({ ...newAttachment, name: e.target.value })}
                    placeholder={t('documentLabel')}
                    className="h-9"
                  />
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddAttachment}
                disabled={!newAttachment.name}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                {t('attachments')}
              </Button>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
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
