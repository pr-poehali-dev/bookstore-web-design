import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onNavigate: (page: string) => void;
}

export const Header = ({ cartCount, onCartClick, onNavigate }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const navItems = [
    { label: 'Бестселлеры', value: 'bestsellers' },
    { label: 'Новинки', value: 'new' },
    { label: 'Акции', value: 'sales' },
    { label: 'О магазине', value: 'about' },
    { label: 'Контакты', value: 'contacts' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <button 
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Icon name="BookOpen" size={24} className="text-primary-foreground" />
              </div>
              <span className="text-xl font-bold hidden sm:block group-hover:text-primary transition-colors">
                BookStore
              </span>
            </button>
            
            <nav className="hidden lg:flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => onNavigate(item.value)}
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Icon name="Search" size={20} />
            </Button>
            
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Icon name="Heart" size={20} />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={onCartClick}
            >
              <Icon name="ShoppingCart" size={20} />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs">
                  {cartCount}
                </Badge>
              )}
            </Button>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Icon name="Menu" size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <nav className="flex flex-col gap-4 mt-8">
                  {navItems.map((item) => (
                    <button
                      key={item.value}
                      onClick={() => {
                        onNavigate(item.value);
                        setIsOpen(false);
                      }}
                      className="text-left text-lg font-medium text-foreground/80 hover:text-primary transition-colors py-2"
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
