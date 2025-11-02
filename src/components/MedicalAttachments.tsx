import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  FileImage, 
  FileText, 
  Activity, 
  FlaskConical, 
  Stethoscope, 
  Clipboard,
  ZoomIn
} from 'lucide-react';
import { MedicalAttachment } from '../data/mockData';

interface MedicalAttachmentsProps {
  attachments: MedicalAttachment[];
}

export const MedicalAttachments: React.FC<MedicalAttachmentsProps> = ({ attachments }) => {
  const { language, t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<MedicalAttachment | null>(null);

  const getAttachmentIcon = (type: MedicalAttachment['type']) => {
    switch (type) {
      case 'xray':
        return <FileImage className="w-4 h-4" />;
      case 'scan':
        return <Stethoscope className="w-4 h-4" />;
      case 'lab':
        return <FlaskConical className="w-4 h-4" />;
      case 'ecg':
        return <Activity className="w-4 h-4" />;
      case 'document':
        return <Clipboard className="w-4 h-4" />;
      case 'prescription':
        return <FileText className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getAttachmentLabel = (type: MedicalAttachment['type']) => {
    switch (type) {
      case 'xray':
        return t('xrayLabel');
      case 'scan':
        return t('scanLabel');
      case 'lab':
        return t('labLabel');
      case 'ecg':
        return t('ecgLabel');
      case 'document':
        return t('documentLabel');
      case 'prescription':
        return t('prescriptionLabel');
      default:
        return t('documentLabel');
    }
  };

  const getAttachmentColor = (type: MedicalAttachment['type']) => {
    switch (type) {
      case 'xray':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'scan':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'lab':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'ecg':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'document':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'prescription':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (!attachments || attachments.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="flex items-center gap-2">
        <h4 className="text-sm text-gray-700">{t('attachments')}</h4>
        <Badge variant="secondary">{attachments.length}</Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {attachments.map((attachment) => (
          <div
            key={attachment.id}
            className="group relative bg-white border rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setSelectedImage(attachment)}
          >
            <div className="aspect-video relative bg-gray-100">
              <ImageWithFallback
                src={attachment.url}
                alt={attachment.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
                <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <div className="p-2 space-y-1">
              <Badge 
                variant="outline" 
                className={`text-xs ${getAttachmentColor(attachment.type)}`}
              >
                <span className="mr-1">{getAttachmentIcon(attachment.type)}</span>
                {getAttachmentLabel(attachment.type)}
              </Badge>
              <p className="text-xs text-gray-600 truncate">{attachment.name}</p>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          {selectedImage && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {getAttachmentIcon(selectedImage.type)}
                  {selectedImage.name}
                </DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                <div className="mb-3">
                  <Badge 
                    variant="outline" 
                    className={getAttachmentColor(selectedImage.type)}
                  >
                    {getAttachmentLabel(selectedImage.type)}
                  </Badge>
                </div>
                <div className="bg-gray-100 rounded-lg overflow-hidden">
                  <ImageWithFallback
                    src={selectedImage.url}
                    alt={selectedImage.name}
                    className="w-full h-auto max-h-[70vh] object-contain"
                  />
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
