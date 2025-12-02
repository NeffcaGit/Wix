import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bug, Send, ArrowLeft, CheckCircle, Upload } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { BugReports } from '@/entities';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from 'react-router-dom';

export default function BugReportPage() {
  const [formData, setFormData] = useState({
    reporterName: '',
    reporterContact: '',
    reportType: '',
    title: '',
    description: '',
    screenshot: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const report: BugReports = {
      _id: crypto.randomUUID(),
      reporterName: formData.reporterName,
      reporterContact: formData.reporterContact,
      reportType: formData.reportType,
      title: formData.title,
      description: formData.description,
      screenshot: formData.screenshot,
      submissionDate: new Date().toISOString()
    };

    await BaseCrudService.create('bugreports', report);

    setIsSubmitting(false);
    setIsSubmitted(true);

    setTimeout(() => {
      setFormData({
        reporterName: '',
        reporterContact: '',
        reportType: '',
        title: '',
        description: '',
        screenshot: ''
      });
      setIsSubmitted(false);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      reportType: value
    }));
  };

  return (
    <div className="min-h-screen bg-[#0f1c28] text-text font-paragraph">
      {/* Background */}
      <div className="fixed inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#132a36] via-[#0f1c28] to-[#1a3a40]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-[#2e3a44] bg-[#132a36]/90 backdrop-blur-md">
          <div className="max-w-[120rem] mx-auto px-6 lg:px-12 py-6">
            <Link to="/" className="inline-flex items-center gap-2 text-[#79d0ff] hover:text-[#79d0ff]/80 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-heading font-bold">Вернуться на главную</span>
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-[120rem] mx-auto px-6 lg:px-12 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            {/* Title */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#e85d4a]/20 rounded-full mb-6">
                <Bug className="w-10 h-10 text-[#e85d4a]" />
              </div>
              <h1 className="font-heading text-4xl lg:text-5xl font-bold mb-4">
                <span className="text-[#e85d4a]">{'<'}</span> Сообщить о баге/нарушении <span className="text-[#e85d4a]">{'/>'}</span>
              </h1>
              <p className="text-icon2 text-lg max-w-2xl mx-auto">
                Помогите нам улучшить сервер. Сообщите о технических проблемах или нарушениях правил.
              </p>
            </div>

            {/* Bug Report Form */}
            <div className="bg-[#132a36]/60 backdrop-blur-xl border border-[#2e3a44] rounded-lg p-8 lg:p-12">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle className="w-20 h-20 text-[#9be27d] mx-auto mb-6" />
                  <h2 className="font-heading text-2xl font-bold mb-3">Отчёт отправлен!</h2>
                  <p className="text-icon2 text-lg">
                    Спасибо за ваш вклад в улучшение сервера. Мы рассмотрим ваш отчёт в ближайшее время.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="reporterName" className="text-text font-heading">
                        Ваше имя *
                      </Label>
                      <Input
                        id="reporterName"
                        name="reporterName"
                        type="text"
                        required
                        value={formData.reporterName}
                        onChange={handleChange}
                        className="bg-[#0f1c28]/80 border-[#2e3a44] focus:border-[#e85d4a] text-text"
                        placeholder="Введите ваше имя"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reporterContact" className="text-text font-heading">
                        Контакт (Discord/Email) *
                      </Label>
                      <Input
                        id="reporterContact"
                        name="reporterContact"
                        type="text"
                        required
                        value={formData.reporterContact}
                        onChange={handleChange}
                        className="bg-[#0f1c28]/80 border-[#2e3a44] focus:border-[#e85d4a] text-text"
                        placeholder="username#1234 или email"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reportType" className="text-text font-heading">
                      Тип отчёта *
                    </Label>
                    <Select value={formData.reportType} onValueChange={handleSelectChange} required>
                      <SelectTrigger className="bg-[#0f1c28]/80 border-[#2e3a44] focus:border-[#e85d4a] text-text">
                        <SelectValue placeholder="Выберите тип отчёта" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#132a36] border-[#2e3a44] text-text">
                        <SelectItem value="bug">Технический баг</SelectItem>
                        <SelectItem value="gameplay">Игровая проблема</SelectItem>
                        <SelectItem value="violation">Нарушение правил</SelectItem>
                        <SelectItem value="exploit">Эксплойт/Читы</SelectItem>
                        <SelectItem value="other">Другое</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-text font-heading">
                      Краткое описание *
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      type="text"
                      required
                      value={formData.title}
                      onChange={handleChange}
                      className="bg-[#0f1c28]/80 border-[#2e3a44] focus:border-[#e85d4a] text-text"
                      placeholder="Опишите проблему одной строкой"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-text font-heading">
                      Подробное описание *
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      required
                      value={formData.description}
                      onChange={handleChange}
                      className="bg-[#0f1c28]/80 border-[#2e3a44] focus:border-[#e85d4a] text-text min-h-[200px]"
                      placeholder="Опишите проблему максимально подробно: что произошло, как воспроизвести, какие действия предшествовали..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="screenshot" className="text-text font-heading">
                      Ссылка на скриншот (опционально)
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="screenshot"
                        name="screenshot"
                        type="url"
                        value={formData.screenshot}
                        onChange={handleChange}
                        className="bg-[#0f1c28]/80 border-[#2e3a44] focus:border-[#e85d4a] text-text"
                        placeholder="https://example.com/screenshot.png"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="border-[#2e3a44] text-icon2 hover:bg-[#2e3a44]/20"
                      >
                        <Upload className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-icon2">
                      Загрузите скриншот на любой хостинг (imgur, discord и т.д.) и вставьте ссылку
                    </p>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="bg-[#e85d4a] hover:bg-[#e85d4a]/90 text-white font-heading px-8"
                    >
                      {isSubmitting ? (
                        <>Отправка...</>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          {'{ Отправить отчёт }'}
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>

            {/* Guidelines */}
            <div className="mt-12 bg-[#132a36]/40 border border-[#2e3a44] rounded-lg p-8">
              <h2 className="font-heading text-xl font-bold mb-4 text-[#79d0ff]">Рекомендации по заполнению</h2>
              <ul className="space-y-3 text-icon2">
                <li className="flex items-start gap-3">
                  <span className="text-[#9be27d] mt-1">✓</span>
                  <span>Будьте максимально конкретны в описании проблемы</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#9be27d] mt-1">✓</span>
                  <span>Укажите шаги для воспроизведения бага, если это возможно</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#9be27d] mt-1">✓</span>
                  <span>Приложите скриншоты или видео, если они помогут понять проблему</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#9be27d] mt-1">✓</span>
                  <span>При сообщении о нарушении укажите ник нарушителя и время инцидента</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#e85d4a] mt-1">✗</span>
                  <span>Не используйте эту форму для общих вопросов — для этого есть страница контактов</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
