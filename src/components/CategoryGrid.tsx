import React from 'react';
import { Category } from '@/types';
import { cn } from '@/lib/utils';
import { useStore } from '@/store/useStore';

interface CategoryGridProps {
  onCategorySelect: (category: Category) => void;
  className?: string;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ 
  onCategorySelect, 
  className 
}) => {
  const { categories, preferences } = useStore();

  const sortedCategories = [...categories].sort((a, b) => a.order - b.order);

  const gridCols = preferences.gridCols;
  const gridClasses = {
    2: 'grid-cols-2',
    3: 'grid-cols-3', 
    4: 'grid-cols-4'
  };

  return (
    <div className={cn('p-4', className)}>
      <h1 className="text-2xl font-bold text-foreground mb-6 text-center">
        Choose a Category
      </h1>
      
      <div className={cn(
        'grid gap-4 max-w-4xl mx-auto',
        gridClasses[gridCols as keyof typeof gridClasses] || 'grid-cols-3'
      )}>
        {sortedCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category)}
            className={cn(
              'tile-base',
              'h-24 sm:h-32 flex-col gap-2',
              'bg-card text-card-foreground border-border',
              'hover:shadow-lg hover:scale-105',
              'transition-all duration-300',
              'group relative'
            )}
            aria-label={`Open ${category.name} category`}
          >
            {/* Category Icon */}
            <div className="text-2xl sm:text-3xl">
              {category.icon || '📁'}
            </div>
            
            {/* Category Name */}
            <span className="font-semibold text-sm sm:text-base text-center leading-tight">
              {category.name}
            </span>
            
            {/* Ripple effect */}
            <div className="absolute inset-0 bg-primary/10 opacity-0 group-active:opacity-100 transition-opacity duration-150 rounded-xl pointer-events-none" />
          </button>
        ))}
      </div>
      
      {sortedCategories.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">📂</div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No Categories Yet
          </h3>
          <p className="text-muted-foreground">
            Categories will appear here once they're added.
          </p>
        </div>
      )}
    </div>
  );
};