import React from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store/useStore';
import { useToast } from '@/hooks/use-toast';

export const DataRefreshButton: React.FC = () => {
  const { forceReloadWithTranslations } = useStore();
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    
    try {
      // Clear all stored data
      localStorage.clear();
      
      // Force reload with fresh seed data
      forceReloadWithTranslations();
      
      toast({
        title: 'Data Refreshed!',
        description: 'All tiles now have updated images and translations',
        duration: 3000,
      });
      
      // Refresh the page to ensure clean state
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      
    } catch (error) {
      toast({
        title: 'Refresh Failed',
        description: 'There was an error refreshing the data',
        variant: 'destructive',
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <Button
      onClick={handleRefresh}
      disabled={isRefreshing}
      variant="outline"
      size="sm"
      className="gap-2"
    >
      <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
      {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
    </Button>
  );
};