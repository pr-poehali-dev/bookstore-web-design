import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useState } from 'react';

interface BookCardProps {
  id: number;
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  onAddToCart: () => void;
}

export const BookCard = ({ 
  title, 
  author, 
  price, 
  originalPrice, 
  rating, 
  reviews, 
  image, 
  badge,
  onAddToCart 
}: BookCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 animate-fade-in">
      <CardContent className="p-0">
        <div className="relative overflow-hidden bg-muted aspect-[3/4]">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {badge && (
            <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
              {badge}
            </Badge>
          )}
          <button 
            onClick={() => setIsFavorite(!isFavorite)}
            className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
          >
            <Icon 
              name={isFavorite ? "Heart" : "Heart"} 
              size={20} 
              className={isFavorite ? "fill-red-500 text-red-500" : "text-foreground"}
            />
          </button>
        </div>
        
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-base line-clamp-2 mb-1 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground">{author}</p>
          </div>
          
          <div className="flex items-center gap-1 text-sm">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Icon 
                  key={i}
                  name="Star" 
                  size={14} 
                  className={i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                />
              ))}
            </div>
            <span className="text-muted-foreground ml-1">({reviews})</span>
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold">{price} ₽</span>
              {originalPrice && (
                <span className="text-sm text-muted-foreground line-through">{originalPrice} ₽</span>
              )}
            </div>
            
            <Button 
              size="icon" 
              onClick={onAddToCart}
              className="rounded-full w-10 h-10 transition-all hover:scale-110"
            >
              <Icon name="ShoppingCart" size={18} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
