import React from 'react';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useStore } from '@/store/useStore';
import { useToast } from '@/hooks/use-toast';
import { Language } from '@/types';
import { LANGUAGE_NAMES, LANGUAGE_FLAGS } from '@/lib/translations';

export const LanguageSelector: React.FC = () => {
  const { preferences, updatePreferences } = useStore();
  const { toast } = useToast();

  const handleLanguageChange = (language: Language) => {
    updatePreferences({ language });
    toast({
      title: 'Language Changed',
      description: `Interface changed to ${LANGUAGE_NAMES[language]}`,
      duration: 2000,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm"
          className="btn-touch gap-2"
          aria-label="Select language"
        >
          <Globe className="w-4 h-4" />
          <span className="text-sm">
            {LANGUAGE_FLAGS[preferences.language]} {LANGUAGE_NAMES[preferences.language]}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-48 bg-popover border border-border shadow-lg z-50"
      >
        {Object.entries(LANGUAGE_NAMES).map(([lang, name]) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => handleLanguageChange(lang as Language)}
            className={`cursor-pointer gap-3 ${
              preferences.language === lang ? 'bg-accent' : ''
            }`}
          >
            <span className="text-lg">{LANGUAGE_FLAGS[lang as Language]}</span>
            <span>{name}</span>
            {preferences.language === lang && (
              <span className="ml-auto text-primary">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};