import React, { useEffect, useRef, useState } from 'react';
import Peer from 'simple-peer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface VideoCallProps {
  onClose: () => void;
}

export function VideoCall({ onClose }: VideoCallProps) {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [receivingCall, setReceivingCall] = useState(false);
  const [callerSignal, setCallerSignal] = useState<any>(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [me, setMe] = useState("");

  const myVideo = useRef<HTMLVideoElement>(null);
  const userVideo = useRef<HTMLVideoElement>(null);
  const connectionRef = useRef<Peer.Instance>();
  const { toast } = useToast();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        if (myVideo.current) {
          myVideo.current.srcObject = stream;
        }
        // En una implementación real, aquí conectaríamos con un servidor de señalización
        setMe("demo-user-id");
      })
      .catch((err) => {
        console.error("Error accessing media devices:", err);
        toast({
          title: "Error",
          description: "No se pudo acceder a la cámara o micrófono",
          variant: "destructive",
        });
      });

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const callUser = (id: string) => {
    // Esta es una demostración simplificada
    toast({
      title: "Demo",
      description: "En una implementación real, esto iniciaría una llamada con el ID: " + id,
    });
  };

  const leaveCall = () => {
    setCallEnded(true);
    if (connectionRef.current) {
      connectionRef.current.destroy();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
      <div className="container flex flex-col items-center justify-center h-full max-w-lg mx-auto">
        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
            <video
              playsInline
              muted
              ref={myVideo}
              autoPlay
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute bottom-2 left-2 text-white text-sm">Tú</div>
          </div>
          
          {callAccepted && !callEnded && (
            <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
              <video
                playsInline
                ref={userVideo}
                autoPlay
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 text-white text-sm">Participante</div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 w-full mt-4">
          <Input
            placeholder="ID para llamar"
            value={idToCall}
            onChange={(e) => setIdToCall(e.target.value)}
          />
          <div className="flex justify-center gap-4">
            {!callAccepted && !callEnded ? (
              <Button onClick={() => callUser(idToCall)}>
                Llamar
              </Button>
            ) : null}
            <Button variant="destructive" onClick={leaveCall}>
              Finalizar Llamada
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}