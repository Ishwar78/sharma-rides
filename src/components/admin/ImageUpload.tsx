import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Link as LinkIcon, X, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const ImageUpload = ({ value, onChange, className }: ImageUploadProps) => {
  const { toast } = useToast();
  const [mode, setMode] = useState<"upload" | "url">("upload");
  const [urlInput, setUrlInput] = useState(value.startsWith("http") ? value : "");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid File",
        description: "Please upload an image file (JPG, PNG, WEBP)",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Image must be less than 2MB",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onChange(result);
      toast({
        title: "Image Uploaded",
        description: "Image has been added successfully.",
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileChange(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      toast({
        title: "URL Added",
        description: "Image URL has been set successfully.",
      });
    }
  };

  const handleClear = () => {
    onChange("");
    setUrlInput("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={cn("space-y-3", className)}>
      {/* Mode Toggle */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode("upload")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-colors",
            mode === "upload"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          )}
        >
          <Upload className="w-4 h-4" />
          Upload
        </button>
        <button
          type="button"
          onClick={() => setMode("url")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-colors",
            mode === "url"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          )}
        >
          <LinkIcon className="w-4 h-4" />
          URL
        </button>
      </div>

      {/* Upload Mode */}
      {mode === "upload" && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-muted/50"
          )}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileChange(file);
            }}
            className="hidden"
          />
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
              <Upload className="w-6 h-6 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium text-foreground">
                {isDragging ? "Drop image here" : "Click or drag image"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                JPG, PNG, WEBP • Max 2MB
              </p>
            </div>
          </div>
        </div>
      )}

      {/* URL Mode */}
      {mode === "url" && (
        <div className="flex gap-2">
          <Input
            placeholder="Enter image URL..."
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="flex-1"
          />
          <Button type="button" variant="outline" onClick={handleUrlSubmit}>
            Set
          </Button>
        </div>
      )}

      {/* Preview */}
      {value && (
        <div className="relative rounded-xl overflow-hidden border border-border bg-muted/30">
          <img
            src={value}
            alt="Preview"
            className="w-full h-40 object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.svg";
            }}
          />
          <button
            type="button"
            onClick={handleClear}
            className="absolute top-2 right-2 p-1.5 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-2 left-2 px-2 py-1 bg-background/80 backdrop-blur-sm rounded text-xs text-foreground flex items-center gap-1">
            <ImageIcon className="w-3 h-3" />
            {value.startsWith("data:") ? "Uploaded Image" : "URL Image"}
          </div>
        </div>
      )}
    </div>
  );
};
