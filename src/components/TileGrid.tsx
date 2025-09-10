import React from 'react';
import { ArrowLeft, Settings, Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tile } from '@/components/Tile';
import { AddTileModal } from '@/components/AddTileModal';
import { LanguageSelector } from '@/components/LanguageSelector';
import { Category, Tile as TileType } from '@/types';
import { cn, debounce } from '@/lib/utils';
import { useStore } from '@/store/useStore';
import { useToast } from '@/hooks/use-toast';
import { getCategoryName, getTextDirection, getUIText } from '@/lib/translations';

interface TileGridProps {
  category: Category;
  onBack: () => void;
  onTileClick: (tile: TileType) => void;
  className?: string;
}

export const TileGrid: React.FC<TileGridProps> = ({ 
  category, 
  onBack, 
  onTileClick,
  className 
}) => {
  const { tiles, preferences, toggleCaregiverMode } = useStore();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filteredTiles, setFilteredTiles] = React.useState<TileType[]>([]);
  const [showAddModal, setShowAddModal] = React.useState(false);

  const handleToggleCaregiverMode = () => {
    toggleCaregiverMode();
    toast({
      title: preferences.caregiverMode 
        ? getUIText('caregiverModeOff', preferences.language)
        : getUIText('caregiverModeOn', preferences.language),
      description: preferences.caregiverMode 
        ? getUIText('editingDisabled', preferences.language)
        : getUIText('editingEnabled', preferences.language),
      duration: 2000,
    });
  };

  // Get tiles for this category
  const categoryTiles = React.useMemo(() => {
    return tiles
      .filter(tile => tile.categoryId === category.id)
      .sort((a, b) => a.order - b.order);
  }, [tiles, category.id]);

  // Filter tiles based on search
  const debouncedFilter = React.useMemo(
    () => debounce((query: string) => {
      if (!query.trim()) {
        setFilteredTiles(categoryTiles);
        return;
      }
      
      const filtered = categoryTiles.filter(tile =>
        tile.label.toLowerCase().includes(query.toLowerCase()) ||
        tile.variants?.some(variant => 
          variant.toLowerCase().includes(query.toLowerCase())
        )
      );
      setFilteredTiles(filtered);
    }, 300),
    [categoryTiles]
  );

  React.useEffect(() => {
    debouncedFilter(searchQuery);
  }, [searchQuery, debouncedFilter]);

  React.useEffect(() => {
    setFilteredTiles(categoryTiles);
  }, [categoryTiles]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const gridCols = preferences.gridCols;
  const gridClasses = {
    2: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4',
    3: 'grid-cols-3 sm:grid-cols-4 md:grid-cols-6', 
    4: 'grid-cols-4 sm:grid-cols-5 md:grid-cols-8'
  };

  return (
    <div className={cn('flex flex-col h-full', className)}>
      {/* Header - Mobile Responsive */}
      <div className="border-b border-border">
        {/* Top Row - Always visible */}
        <div className="flex items-center justify-between p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <Button
              variant="ghost"
              size="sm" 
              onClick={onBack}
              className="btn-touch flex-shrink-0 p-2"
              aria-label="Go back to categories"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
            
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <span className="text-lg sm:text-2xl flex-shrink-0">{category.icon || '📁'}</span>
              <h1 
                className="text-base sm:text-xl font-bold text-foreground truncate"
                dir={getTextDirection(preferences.language)}
              >
                {getCategoryName(category, preferences.language)}
              </h1>
            </div>
          </div>
          
          {/* Mobile: Only essential buttons */}
          <div className="flex items-center gap-1 sm:hidden">
            {/* Search toggle - only in caregiver mode */}
            {preferences.caregiverMode && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery(searchQuery ? '' : 'search')}
                className="btn-touch p-2"
              >
                <Search className="w-4 h-4" />
              </Button>
            )}
            
            {/* Compact Language Selector */}
            <LanguageSelector />
            
            {/* Settings button */}
            <Button
              variant={preferences.caregiverMode ? "default" : "ghost"}
              size="sm"
              onClick={handleToggleCaregiverMode}
              className={cn(
                "btn-touch p-2",
                preferences.caregiverMode && "bg-primary text-primary-foreground"
              )}
              aria-label={`${preferences.caregiverMode ? 'Disable' : 'Enable'} caregiver mode`}
            >
              <Settings className="w-4 h-4" />
              {preferences.caregiverMode && (
                <div className="w-2 h-2 bg-success rounded-full absolute -top-1 -right-1" />
              )}
            </Button>
          </div>

          {/* Desktop: All controls */}
          <div className="hidden sm:flex items-center gap-2">
            {/* Language Selector */}
            <LanguageSelector />
            
            {/* Add Tile Button - Only visible in caregiver mode */}
            {preferences.caregiverMode && (
              <Button
                onClick={() => setShowAddModal(true)}
                className="btn-touch bg-success text-success-foreground hover:bg-success/90"
                size="sm"
              >
                <Plus className="w-4 h-4" />
                <span className="ml-1 hidden lg:inline">{getUIText('addTile', preferences.language)}</span>
              </Button>
            )}
            
            {/* Search - Only in caregiver mode */}
            {preferences.caregiverMode && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder={getUIText('searchTiles', preferences.language)}
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="pl-10 w-32 md:w-40 lg:w-48"
                />
              </div>
            )}
            
            {/* Settings - Toggle Caregiver Mode */}
            <Button
              variant={preferences.caregiverMode ? "default" : "ghost"}
              size="sm"
              onClick={handleToggleCaregiverMode}
              className={cn(
                "btn-touch",
                preferences.caregiverMode && "bg-primary text-primary-foreground"
              )}
              aria-label={`${preferences.caregiverMode ? 'Disable' : 'Enable'} caregiver mode`}
            >
              <Settings className="w-5 h-5" />
              {preferences.caregiverMode && (
                <span className="ml-2 text-xs font-medium hidden lg:inline">{getUIText('on', preferences.language)}</span>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile: Second row with expanded controls - Only in caregiver mode */}
        {preferences.caregiverMode && (
          <div className="sm:hidden border-t border-border/50 p-2 space-y-2">
            {/* Search bar - always visible on mobile in caregiver mode */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={getUIText('searchTiles', preferences.language)}
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10 w-full"
              />
            </div>
            
            {/* Add Tile Button */}
            <div className="flex justify-center">
              <Button
                onClick={() => setShowAddModal(true)}
                className="btn-touch bg-success text-success-foreground hover:bg-success/90"
                size="sm"
              >
                <Plus className="w-4 h-4" />
                <span className="ml-1">{getUIText('addTile', preferences.language)}</span>
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Tiles Grid */}
      <div className="flex-1 p-4 overflow-y-auto">
        {filteredTiles.length > 0 ? (
          <div className={cn(
            'grid gap-3 max-w-6xl mx-auto',
            gridClasses[gridCols as keyof typeof gridClasses] || 'grid-cols-3 sm:grid-cols-4 md:grid-cols-6'
          )}>
            {filteredTiles.map((tile) => (
              <Tile
                key={tile.id}
                tile={tile}
                onClick={onTileClick}
                showText={preferences.showText}
                className="aspect-square"
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            {searchQuery ? (
              <>
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {getUIText('noTilesFound', preferences.language)}
                </h3>
                <p className="text-muted-foreground">
                  {getUIText('tryAdjustingSearch', preferences.language)}
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSearchQuery('')}
                  className="mt-4"
                >
                  {getUIText('clearSearch', preferences.language)}
                </Button>
              </>
            ) : (
              <>
                <div className="text-4xl mb-4">📝</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {getUIText('noTilesInCategory', preferences.language)}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {getUIText('tilesWillAppear', preferences.language)}
                </p>
                {preferences.caregiverMode ? (
                  <Button 
                    variant="outline"
                    onClick={() => setShowAddModal(true)}
                    className="btn-touch"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    {getUIText('addFirstTile', preferences.language)}
                  </Button>
                ) : (
                  <p className="text-xs text-muted-foreground mt-2">
                    {getUIText('enableCaregiverMode', preferences.language)}
                  </p>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* Add Tile Modal */}
        <AddTileModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        categoryId={category.id}
        categoryName={getCategoryName(category, preferences.language)}
      />
    </div>
  );
};