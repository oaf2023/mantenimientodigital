import { Camera, Video, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface MediaControlsProps {
  onFileUpload: (files: File[]) => void;
}

export function MediaControls({ onFileUpload }: MediaControlsProps) {
  const handleCapture = async (type: 'photo' | 'video') => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: type === 'video'
      });
      
      toast({
        title: `Captura de ${type === 'photo' ? 'foto' : 'video'} iniciada`,
        description: "Esta función estará disponible próximamente",
      });
      
      stream.getTracks().forEach(track => track.stop());
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo acceder a la cámara",
      });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      onFileUpload(Array.from(files));
      toast({
        title: "Archivos añadidos",
        description: `${files.length} archivo(s) añadido(s)`,
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Button onClick={() => handleCapture('photo')}>
          <Camera className="mr-2 h-4 w-4" />
          Tomar Foto
        </Button>
        <Button onClick={() => handleCapture('video')}>
          <Video className="mr-2 h-4 w-4" />
          Grabar Video
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="outline" asChild>
          <label>
            <Upload className="mr-2 h-4 w-4" />
            Subir Archivos
            <input
              type="file"
              accept="image/*,video/*"
              multiple
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
        </Button>
      </div>
    </div>
  );
}