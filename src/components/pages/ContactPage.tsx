import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, ArrowLeft, CheckCircle } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { ContactSubmissions } from '@/entities';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    senderName: '',
    senderEmail: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submission: ContactSubmissions = {
      _id: crypto.randomUUID(),
      senderName: formData.senderName,
      senderEmail: formData.senderEmail,
      subject: formData.subject,
      message: formData.message,
      submissionDate: new Date().toISOString()
    };

    await BaseCrudService.create('contactsubmissions', submission);

    setIsSubmitting(false);
    setIsSubmitted(true);

    setTimeout(() => {
      setFormData({ senderName: '', senderEmail: '', subject: '', message: '' });
      setIsSubmitted(false);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
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
              <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/20 rounded-full mb-6">
                <Mail className="w-10 h-10 text-primary" />
              </div>
              <h1 className="font-heading text-4xl lg:text-5xl font-bold mb-4">
                <span className="text-[#79d0ff]">{'<'}</span> Связаться с нами <span className="text-[#79d0ff]">{'/>'}</span>
              </h1>
              <p className="text-icon2 text-lg max-w-2xl mx-auto">
                Есть вопросы или предложения? Заполните форму ниже, и мы свяжемся с вами в ближайшее время.
              </p>
            </div>

            {/* Contact Form */}
            <div className="bg-[#132a36]/60 backdrop-blur-xl border border-[#2e3a44] rounded-lg p-8 lg:p-12">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle className="w-20 h-20 text-[#9be27d] mx-auto mb-6" />
                  <h2 className="font-heading text-2xl font-bold mb-3">Сообщение отправлено!</h2>
                  <p className="text-icon2 text-lg">
                    Спасибо за ваше обращение. Мы свяжемся с вами в ближайшее время.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="senderName" className="text-text font-heading">
                        Ваше имя *
                      </Label>
                      <Input
                        id="senderName"
                        name="senderName"
                        type="text"
                        required
                        value={formData.senderName}
                        onChange={handleChange}
                        className="bg-[#0f1c28]/80 border-[#2e3a44] focus:border-[#79d0ff] text-text"
                        placeholder="Введите ваше имя"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="senderEmail" className="text-text font-heading">
                        Email *
                      </Label>
                      <Input
                        id="senderEmail"
                        name="senderEmail"
                        type="email"
                        required
                        value={formData.senderEmail}
                        onChange={handleChange}
                        className="bg-[#0f1c28]/80 border-[#2e3a44] focus:border-[#79d0ff] text-text"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-text font-heading">
                      Тема *
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="bg-[#0f1c28]/80 border-[#2e3a44] focus:border-[#79d0ff] text-text"
                      placeholder="О чём вы хотите написать?"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-text font-heading">
                      Сообщение *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="bg-[#0f1c28]/80 border-[#2e3a44] focus:border-[#79d0ff] text-text min-h-[200px]"
                      placeholder="Расскажите подробнее..."
                    />
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground font-heading px-8"
                    >
                      {isSubmitting ? (
                        <>Отправка...</>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          {'{ Отправить сообщение }'}
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>

            {/* Additional Info */}
            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="bg-[#132a36]/40 border border-[#2e3a44] rounded-lg p-6 text-center">
                <div className="text-3xl mb-2">⚡</div>
                <h3 className="font-heading font-bold mb-2">Быстрый ответ</h3>
                <p className="text-icon2 text-sm">Обычно отвечаем в течение 24 часов</p>
              </div>

              <div className="bg-[#132a36]/40 border border-[#2e3a44] rounded-lg p-6 text-center">
                <div className="text-3xl mb-2">🔒</div>
                <h3 className="font-heading font-bold mb-2">Конфиденциально</h3>
                <p className="text-icon2 text-sm">Ваши данные защищены и не передаются третьим лицам</p>
              </div>

              <div className="bg-[#132a36]/40 border border-[#2e3a44] rounded-lg p-6 text-center">
                <div className="text-3xl mb-2">💬</div>
                <h3 className="font-heading font-bold mb-2">Поддержка</h3>
                <p className="text-icon2 text-sm">Готовы помочь с любыми вопросами</p>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
