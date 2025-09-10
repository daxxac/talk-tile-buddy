import React, { useState } from 'react';
import { X, Upload, Camera, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useStore } from '@/store/useStore';
import { useToast } from '@/hooks/use-toast';
import { TileType } from '@/types';
import { compressImage, isValidImageFile } from '@/lib/imageUtils';
import { cn } from '@/lib/utils';

interface AddTileModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryId: string;
  categoryName: string;
}

const tileTypes: { value: TileType; label: string; color: string }[] = [
  { value: 'core', label: 'Core Word', color: 'tile-core' },
  { value: 'noun', label: 'Noun (Person/Place/Thing)', color: 'tile-noun' },
  { value: 'verb', label: 'Action/Verb', color: 'tile-verb' },
  { value: 'adjective', label: 'Describing Word', color: 'tile-adjective' },
  { value: 'pronoun', label: 'Pronoun (I, you, etc.)', color: 'tile-pronoun' },
  { value: 'phrase', label: 'Phrase/Sentence', color: 'tile-phrase' },
];

export const AddTileModal: React.FC<AddTileModalProps> = ({
  isOpen,
  onClose,
  categoryId,
  categoryName
}) => {
  const { addTile } = useStore();
  const { toast } = useToast();
  
  const [label, setLabel] = useState('');
  const [tileType, setTileType] = useState<TileType>('noun');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const resetForm = () => {
    setLabel('');
    setTileType('noun');
    setImageFile(null);
    setImagePreview(null);
    setIsProcessing(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleImageSelect = async (file: File) => {
    if (!isValidImageFile(file)) {
      toast({
        title: 'Invalid File',
        description: 'Please select a valid image file (JPEG, PNG, WebP, max 10MB)',
        variant: 'destructive',
      });
      return;
    }

    setIsProcessing(true);
    try {
      const compressedImage = await compressImage(file);
      setImageFile(file);
      setImagePreview(compressedImage);
      
      // Auto-generate label from filename if empty
      if (!label) {
        const filename = file.name.split('.')[0];
        const cleanName = filename.replace(/[_-]/g, ' ').toLowerCase();
        setLabel(cleanName);
      }
    } catch (error) {
      toast({
        title: 'Image Processing Failed',
        description: 'Failed to process the image. Please try another file.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageSelect(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleImageSelect(file);
  };

  const handleCameraCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageSelect(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!label.trim()) {
      toast({
        title: 'Label Required',
        description: 'Please enter a label for the tile',
        variant: 'destructive',
      });
      return;
    }

    setIsProcessing(true);
    try {
      addTile({
        label: label.trim(),
        categoryId,
        type: tileType,
        imageUri: imagePreview || undefined,
      });

      toast({
        title: 'Tile Added!',
        description: `"${label}" has been added to ${categoryName}`,
      });

      handleClose();
    } catch (error) {
      toast({
        title: 'Failed to Add Tile',
        description: 'There was an error adding the tile. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span>Add New Tile</span>
            <span className="text-sm font-normal text-muted-foreground">
              to {categoryName}
            </span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Image Upload Area */}
          <div className="space-y-2">
            <Label>Photo (Optional)</Label>
            <div
              className={cn(
                'border-2 border-dashed rounded-lg p-6 text-center transition-colors',
                dragActive ? 'border-primary bg-primary/5' : 'border-border',
                imagePreview ? 'p-2' : ''
              )}
              onDrop={handleDrop}
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
            >
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview(null);
                    }}
                  >
                    <X className="w-4 h-4 mr-1" />
                    Remove
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <ImageIcon className="w-8 h-8 mx-auto text-muted-foreground" />
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Drop an image here, or choose file
                    </p>
                    <div className="flex gap-2 justify-center">
                      <Button type="button" variant="outline" size="sm" asChild>
                        <label className="cursor-pointer">
                          <Upload className="w-4 h-4 mr-1" />
                          Upload
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileInput}
                            className="sr-only"
                          />
                        </label>
                      </Button>
                      <Button type="button" variant="outline" size="sm" asChild>
                        <label className="cursor-pointer">
                          <Camera className="w-4 h-4 mr-1" />
                          Camera
                          <input
                            type="file"
                            accept="image/*"
                            capture="environment"
                            onChange={handleCameraCapture}
                            className="sr-only"
                          />
                        </label>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Label Input */}
          <div className="space-y-2">
            <Label htmlFor="tile-label">
              Tile Label <span className="text-destructive">*</span>
            </Label>
            <Input
              id="tile-label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Enter the word or phrase..."
              className="text-lg"
              maxLength={50}
            />
          </div>

          {/* Type Selection */}
          <div className="space-y-2">
            <Label>Word Type</Label>
            <Select value={tileType} onValueChange={(value: TileType) => setTileType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {tileTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        'w-3 h-3 rounded',
                        type.value === 'core' && 'bg-tile-core',
                        type.value === 'noun' && 'bg-tile-noun', 
                        type.value === 'verb' && 'bg-tile-verb',
                        type.value === 'adjective' && 'bg-tile-adjective',
                        type.value === 'pronoun' && 'bg-tile-pronoun',
                        type.value === 'phrase' && 'bg-tile-phrase'
                      )} />
                      {type.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1"
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1"
              disabled={isProcessing || !label.trim()}
            >
              {isProcessing ? 'Adding...' : 'Add Tile'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};