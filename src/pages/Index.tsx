import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

type MaterialType = {
  name: string;
  pricePerCubic: number;
  unit: string;
};

const materials: MaterialType[] = [
  { name: 'Доска обрезная', pricePerCubic: 8500, unit: 'м³' },
  { name: 'Брус строительный', pricePerCubic: 9200, unit: 'м³' },
  { name: 'Вагонка', pricePerCubic: 12000, unit: 'м³' },
  { name: 'Блок-хаус', pricePerCubic: 14500, unit: 'м³' },
  { name: 'Имитация бруса', pricePerCubic: 13000, unit: 'м³' },
  { name: 'Половая доска', pricePerCubic: 11000, unit: 'м³' },
];

export default function Index() {
  const [selectedMaterial, setSelectedMaterial] = useState<string>('');
  const [volume, setVolume] = useState<string>('');
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);

  const calculatePrice = () => {
    const material = materials.find(m => m.name === selectedMaterial);
    if (material && volume) {
      const total = material.pricePerCubic * parseFloat(volume);
      setCalculatedPrice(total);
    }
  };

  const scrollToSection = (section: string) => {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="TreePine" size={28} className="text-secondary" />
              <span className="text-xl font-bold text-primary">ЛесПром</span>
            </div>
            
            <nav className="hidden md:flex gap-6">
              {['Главная', 'Каталог', 'Калькулятор', 'О компании', 'Услуги', 'Блог', 'Контакты'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {item}
                </button>
              ))}
            </nav>
            
            <Button className="bg-secondary hover:bg-secondary/90">
              <Icon name="Phone" size={16} className="mr-2" />
              Заказать звонок
            </Button>
          </div>
        </div>
      </header>

      <section id="главная" className="relative py-20 lg:py-32 bg-gradient-to-br from-primary via-primary/95 to-primary/90">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white animate-fade-in">
              <Badge className="mb-4 bg-secondary text-white border-secondary">Производство пиломатериалов с 1998 года</Badge>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Качественные пиломатериалы для вашего строительства
              </h1>
              <p className="text-lg text-white/90 mb-8">
                Собственное производство, доставка по России, гарантия качества и конкурентные цены
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90" onClick={() => scrollToSection('каталог')}>
                  <Icon name="ShoppingCart" size={20} className="mr-2" />
                  Перейти в каталог
                </Button>
                <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90" onClick={() => scrollToSection('калькулятор')}>
                  <Icon name="Calculator" size={20} className="mr-2" />
                  Рассчитать стоимость
                </Button>
              </div>
            </div>
            
            <div className="relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden animate-slide-up">
              <img 
                src="https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=800&h=600&fit=crop" 
                alt="Пиломатериалы" 
                className="w-full h-full object-cover rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: 'CheckCircle2', title: 'Гарантия качества', desc: 'Сертификаты соответствия' },
              { icon: 'Truck', title: 'Доставка', desc: 'По всей России' },
              { icon: 'Shield', title: 'Надёжность', desc: '25+ лет на рынке' },
              { icon: 'Percent', title: 'Лучшие цены', desc: 'Прямые поставки' },
            ].map((item, idx) => (
              <Card key={idx} className="border-none shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-3">
                    <Icon name={item.icon as any} size={24} className="text-secondary" />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription>{item.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="каталог" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">Каталог пиломатериалов</h2>
            <p className="text-muted-foreground text-lg">Широкий ассортимент продукции для любых строительных задач</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {materials.map((material, idx) => (
              <Card key={idx} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="h-48 bg-gradient-to-br from-secondary/20 to-secondary/5 flex items-center justify-center">
                  <Icon name="Box" size={64} className="text-secondary/40" />
                </div>
                <CardHeader>
                  <CardTitle>{material.name}</CardTitle>
                  <CardDescription>От {material.pricePerCubic.toLocaleString()} ₽/{material.unit}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-secondary hover:bg-secondary/90">
                    <Icon name="Info" size={16} className="mr-2" />
                    Подробнее
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="калькулятор" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">Калькулятор стоимости</h2>
            <p className="text-muted-foreground text-lg">Рассчитайте количество и стоимость пиломатериалов онлайн</p>
          </div>
          
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Calculator" size={24} />
                Расчёт стоимости пиломатериалов
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="material">Выберите тип материала</Label>
                <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите материал" />
                  </SelectTrigger>
                  <SelectContent>
                    {materials.map((material) => (
                      <SelectItem key={material.name} value={material.name}>
                        {material.name} - {material.pricePerCubic.toLocaleString()} ₽/м³
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="volume">Объём (м³)</Label>
                <Input
                  id="volume"
                  type="number"
                  placeholder="Введите объём"
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                  step="0.1"
                  min="0"
                />
              </div>
              
              <Button 
                onClick={calculatePrice} 
                className="w-full bg-secondary hover:bg-secondary/90"
                disabled={!selectedMaterial || !volume}
              >
                <Icon name="Calculator" size={20} className="mr-2" />
                Рассчитать стоимость
              </Button>
              
              {calculatedPrice !== null && (
                <div className="mt-6 p-6 bg-primary/5 rounded-lg border-2 border-primary/20 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium">Итоговая стоимость:</span>
                    <span className="text-3xl font-bold text-secondary">
                      {calculatedPrice.toLocaleString()} ₽
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {selectedMaterial} • {volume} м³
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="о-компании" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-5xl font-bold mb-6">О компании ЛесПром</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Более 25 лет мы занимаемся производством и поставкой высококачественных пиломатериалов. 
                Собственное производство позволяет нам контролировать качество на всех этапах и предлагать 
                конкурентные цены.
              </p>
              <div className="space-y-4">
                {[
                  'Современное деревообрабатывающее оборудование',
                  'Квалифицированный персонал с многолетним опытом',
                  'Строгий контроль качества на всех этапах',
                  'Экологичное производство и ответственный подход',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Icon name="Check" className="text-secondary mt-1 flex-shrink-0" size={20} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop" 
                alt="О компании" 
                className="w-full h-full object-cover rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="услуги" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">Наши услуги</h2>
            <p className="text-muted-foreground text-lg">Полный спектр услуг для вашего удобства</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: 'Truck',
                title: 'Доставка',
                desc: 'Организуем доставку пиломатериалов по всей России собственным и привлечённым транспортом',
              },
              {
                icon: 'Hammer',
                title: 'Обработка',
                desc: 'Предлагаем услуги по дополнительной обработке: строгание, торцовка, пропитка антисептиками',
              },
              {
                icon: 'MessageCircle',
                title: 'Консультация',
                desc: 'Наши специалисты помогут подобрать материалы и рассчитать необходимое количество',
              },
            ].map((service, idx) => (
              <Card key={idx} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon name={service.icon as any} size={32} className="text-secondary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="блог" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">Полезные статьи</h2>
            <p className="text-muted-foreground text-lg">Всё о пиломатериалах и их применении</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Как выбрать доску для строительства дома',
                category: 'Материалы',
                date: '15 января 2024',
              },
              {
                title: 'Виды бруса и их применение в строительстве',
                category: 'Советы',
                date: '10 января 2024',
              },
              {
                title: 'Правильное хранение пиломатериалов',
                category: 'Эксплуатация',
                date: '5 января 2024',
              },
            ].map((post, idx) => (
              <Card key={idx} className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <Icon name="FileText" size={64} className="text-primary/40" />
                </div>
                <CardHeader>
                  <Badge className="w-fit mb-2">{post.category}</Badge>
                  <CardTitle className="text-lg hover:text-secondary transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Icon name="Calendar" size={14} />
                    {post.date}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="контакты" className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl lg:text-5xl font-bold mb-6">Свяжитесь с нами</h2>
              <p className="text-white/90 text-lg mb-8">
                Готовы ответить на все вопросы и помочь с выбором пиломатериалов
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: 'Phone', title: 'Телефон', value: '+7 (495) 123-45-67' },
                  { icon: 'Mail', title: 'Email', value: 'info@lesprom.ru' },
                  { icon: 'MapPin', title: 'Адрес', value: 'г. Москва, ул. Лесная, д. 10' },
                  { icon: 'Clock', title: 'Режим работы', value: 'Пн-Пт: 8:00-18:00, Сб: 9:00-15:00' },
                ].map((contact, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Icon name={contact.icon as any} size={20} />
                    </div>
                    <div>
                      <div className="font-medium mb-1">{contact.title}</div>
                      <div className="text-white/80">{contact.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-primary">Заказать обратный звонок</CardTitle>
                <CardDescription>Оставьте заявку и мы свяжемся с вами в ближайшее время</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Имя</Label>
                  <Input id="name" placeholder="Ваше имя" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input id="phone" placeholder="+7 (___) ___-__-__" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Комментарий</Label>
                  <Input id="message" placeholder="Ваш вопрос или комментарий" />
                </div>
                <Button className="w-full bg-secondary hover:bg-secondary/90">
                  <Icon name="Send" size={16} className="mr-2" />
                  Отправить заявку
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="py-8 bg-primary/95 text-white/80 text-center">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Icon name="TreePine" size={24} className="text-secondary" />
            <span className="text-xl font-bold text-white">ЛесПром</span>
          </div>
          <p className="text-sm">© 2024 ЛесПром. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}