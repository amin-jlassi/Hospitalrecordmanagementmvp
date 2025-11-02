import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Alert, AlertDescription } from './ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Bot, Send, User, AlertCircle } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatBotProps {
  open: boolean;
  onClose: () => void;
  patientName: string;
}

// Mock AI response generator based on keywords
const generateAIResponse = (userMessage: string, language: 'fr' | 'ar'): string => {
  const messageLower = userMessage.toLowerCase();
  
  // French responses
  const frenchResponses = {
    // Symptoms - Cardiovascular
    'coeur|cardiaque|palpitation|poitrine|thoracique': 
      "D'après vos symptômes cardiovasculaires, voici quelques conseils :\n\n• Surveillez votre tension artérielle régulièrement\n• Réduisez la consommation de sel et de graisses saturées\n• Pratiquez une activité physique modérée (marche, natation)\n• Évitez le stress excessif\n\n⚠️ Si vous ressentez une douleur thoracique intense, consultez immédiatement un médecin.",
    
    // Symptoms - Respiratory
    'toux|respiration|poumon|asthme|bronch':
      "Pour les problèmes respiratoires, je recommande :\n\n• Évitez les irritants (fumée, poussière, pollution)\n• Maintenez une bonne hydratation\n• Utilisez un humidificateur si l'air est sec\n• Pratiquez des exercices de respiration profonde\n\n⚠️ En cas de difficultés respiratoires sévères, consultez d'urgence.",
    
    // Symptoms - Digestive
    'estomac|ventre|douleur abdominale|digestion|nausée|diarrhée':
      "Pour les troubles digestifs :\n\n• Adoptez une alimentation légère et équilibrée\n• Évitez les aliments gras et épicés\n• Buvez beaucoup d'eau\n• Mangez lentement et en petites portions\n• Limitez le café et l'alcool\n\n⚠️ Si les symptômes persistent plus de 48h, consultez un médecin.",
    
    // Symptoms - Musculoskeletal
    'mal|douleur|dos|articulation|muscle|entorse|fracture':
      "Pour les douleurs musculosquelettiques :\n\n• Appliquez de la glace les premières 48h\n• Reposez la zone affectée\n• Évitez les mouvements brusques\n• Pratiquez des étirements doux après 48h\n• Maintenez une bonne posture\n\n⚠️ Si la douleur est intense ou persiste, consultez un orthopédiste.",
    
    // Symptoms - Neurological
    'tête|migraine|vertige|étourdissement|fatigue':
      "Pour les symptômes neurologiques :\n\n• Assurez-vous de dormir suffisamment (7-8h)\n• Réduisez le temps d'écran\n• Restez bien hydraté\n• Évitez les déclencheurs (stress, alcool, certains aliments)\n• Pratiquez la relaxation et la méditation\n\n⚠️ En cas de maux de tête sévères ou persistants, consultez un neurologue.",
    
    // Symptoms - Dermatological
    'peau|éruption|démangeaison|allergie|eczéma':
      "Pour les problèmes de peau :\n\n• Évitez les allergènes connus\n• Utilisez des produits hypoallergéniques\n• Maintenez une bonne hydratation cutanée\n• Évitez les bains trop chauds\n• Portez des vêtements en coton\n\n⚠️ Si l'éruption s'aggrave ou s'étend, consultez un dermatologue.",
    
    // Symptoms - Diabetes
    'diabète|sucre|glycémie':
      "Pour la gestion du diabète :\n\n• Surveillez régulièrement votre glycémie\n• Suivez un régime alimentaire équilibré\n• Limitez les sucres rapides\n• Pratiquez une activité physique régulière\n• Prenez vos médicaments selon prescription\n\n⚠️ Consultez régulièrement votre endocrinologue pour le suivi.",
    
    // General health
    'santé|prévention|conseil':
      "Conseils généraux de santé :\n\n• Alimentation équilibrée (fruits, légumes, protéines)\n• Activité physique régulière (30 min/jour)\n• Sommeil suffisant (7-8h par nuit)\n• Hydratation adéquate (1.5-2L d'eau/jour)\n• Gestion du stress\n• Consultations médicales régulières\n\n✓ La prévention est la meilleure médecine!",
  };

  // Arabic responses
  const arabicResponses = {
    // Symptoms - Cardiovascular
    'قلب|صدر|خفقان|ألم الصدر':
      "بناءً على أعراض القلب والأوعية الدموية، إليك بعض النصائح:\n\n• راقب ضغط الدم بانتظام\n• قلل من استهلاك الملح والدهون المشبعة\n• مارس نشاطاً بدنياً معتدلاً (المشي، السباحة)\n• تجنب الإجهاد المفرط\n\n⚠️ إذا شعرت بألم شديد في الصدر، استشر الطبيب فوراً.",
    
    // Symptoms - Respiratory
    'سعال|تنفس|رئة|ربو|شعب':
      "لمشاكل الجهاز التنفسي، أوصي بما يلي:\n\n• تجنب المهيجات (الدخان، الغبار، التلوث)\n• حافظ على ترطيب جيد\n• استخدم جهاز ترطيب إذا كان الهواء جافاً\n• مارس تمارين التنفس العميق\n\n⚠️ في حالة صعوبات التنفس الشديدة، استشر طبيباً فوراً.",
    
    // Symptoms - Digestive
    'معدة|بطن|ألم البطن|هضم|غثيان|إسهال':
      "لاضطرابات الجهاز الهضمي:\n\n• اتبع نظاماً غذائياً خفيفاً ومتوازناً\n• تجنب الأطعمة الدهنية والحارة\n• اشرب الكثير من الماء\n• تناول الطعام ببطء وبكميات صغيرة\n• قلل من القهوة والكحول\n\n⚠️ إذا استمرت الأعراض أكثر من 48 ساعة، استشر طبيباً.",
    
    // Symptoms - Musculoskeletal
    'ألم|ظهر|مفصل|عضلة|التواء|كسر':
      "لآلام العضلات والعظام:\n\n• ضع الثلج في أول 48 ساعة\n• أرح المنطقة المصابة\n• تجنب الحركات المفاجئة\n• مارس تمارين التمدد اللطيفة بعد 48 ساعة\n• حافظ على وضعية جيدة\n\n⚠️ إذا كان الألم شديداً أو مستمراً، استشر أخصائي عظام.",
    
    // Symptoms - Neurological
    'رأس|صداع|دوخة|دوار|تعب':
      "للأعراض العصبية:\n\n• تأكد من النوم الكافي (7-8 ساعات)\n• قلل من وقت الشاشة\n• حافظ على ترطيب جيد\n• تجنب المحفزات (الإجهاد، الكحول، بعض الأطعمة)\n• مارس الاسترخاء والتأمل\n\n⚠️ في حالة الصداع الشديد أو المستمر، استشر طبيب أعصاب.",
    
    // Symptoms - Dermatological
    'جلد|طفح|حكة|حساسية|أكزيما':
      "لمشاكل الجلد:\n\n• تجنب مسببات الحساسية المعروفة\n• استخدم منتجات مضادة للحساسية\n• حافظ على ترطيب الجلد\n• تجنب الحمامات الساخنة جداً\n• ارتدِ ملابس قطنية\n\n⚠️ إذا ساء الطفح أو انتشر، استشر طبيب جلدية.",
    
    // Symptoms - Diabetes
    'سكري|سكر|جلوكوز':
      "لإدارة مرض السكري:\n\n• راقب مستوى السكر في الدم بانتظام\n• اتبع نظاماً غذائياً متوازناً\n• قلل من السكريات السريعة\n• مارس نشاطاً بدنياً منتظماً\n• تناول أدويتك حسب الوصفة\n\n⚠️ استشر أخصائي الغدد الصماء بانتظام للمتابعة.",
    
    // General health
    'صحة|وقاية|نصيحة|نصائح':
      "نصائح صحية عامة:\n\n• نظام غذائي متوازن (فواكه، خضروات، بروتينات)\n• نشاط بدني منتظم (30 دقيقة/يوم)\n• نوم كافٍ (7-8 ساعات في الليلة)\n• ترطيب كافٍ (1.5-2 لتر ماء/يوم)\n• إدارة الإجهاد\n• استشارات طبية منتظمة\n\n✓ الوقاية هي أفضل علاج!",
  };

  const responses = language === 'fr' ? frenchResponses : arabicResponses;
  
  // Find matching response
  for (const [keywords, response] of Object.entries(responses)) {
    const keywordList = keywords.split('|');
    if (keywordList.some(keyword => messageLower.includes(keyword))) {
      return response;
    }
  }
  
  // Default response
  if (language === 'fr') {
    return "Je comprends votre préoccupation. Pourriez-vous me donner plus de détails sur vos symptômes ? Par exemple :\n\n• Quels symptômes ressentez-vous exactement ?\n• Depuis combien de temps ?\n• Y a-t-il des facteurs déclencheurs ?\n\nCela m'aidera à vous fournir des conseils plus personnalisés.";
  } else {
    return "أفهم قلقك. هل يمكنك إعطائي المزيد من التفاصيل حول أعراضك؟ على سبيل المثال:\n\n• ما هي الأعراض التي تشعر بها بالضبط؟\n• منذ متى وأنت تعاني منها؟\n• هل هناك عوامل محفزة؟\n\nسيساعدني هذا في تقديم نصائح أكثر تخصيصاً لك.";
  }
};

export const ChatBot: React.FC<ChatBotProps> = ({ open, onClose, patientName }) => {
  const { language, t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize with welcome message
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          id: '1',
          text: t('chatbotWelcome'),
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    }
  }, [open, t, messages.length]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue, language);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[600px] flex flex-col p-0" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-blue-600" />
            {t('chatbotTitle')}
          </DialogTitle>
        </DialogHeader>

        <Alert className="mx-6 mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-xs">
            {t('chatbotDisclaimer')}
          </AlertDescription>
        </Alert>

        <ScrollArea className="flex-1 px-6" ref={scrollRef}>
          <div className="space-y-4 py-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-blue-600" />
                  </div>
                )}
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-2 ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString(language === 'fr' ? 'fr-FR' : 'ar-TN', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                {message.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-green-600" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-blue-600" />
                </div>
                <div className="bg-gray-100 rounded-lg px-4 py-2">
                  <p className="text-sm text-gray-600">{t('chatbotTyping')}</p>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="px-6 py-4 border-t">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t('chatbotPlaceholder')}
              className="flex-1"
              disabled={isTyping}
            />
            <Button onClick={handleSend} disabled={!inputValue.trim() || isTyping}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
