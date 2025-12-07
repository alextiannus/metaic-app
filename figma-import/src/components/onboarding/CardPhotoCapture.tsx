import { useState, useRef } from 'react';
import { Camera, Upload, Sparkles, X, Check, RotateCcw } from 'lucide-react';

interface CardPhotoCaptureProps {
  onPhotoCapture: (imageData: string) => void;
  onSkip: () => void;
}

export function CardPhotoCapture({ onPhotoCapture, onSkip }: CardPhotoCaptureProps) {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCapturedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirm = () => {
    if (capturedImage) {
      setIsProcessing(true);
      // Simulate AI processing
      setTimeout(() => {
        onPhotoCapture(capturedImage);
      }, 2000);
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#FACC15] to-[#38BDF8] mb-4">
            <Camera className="w-8 h-8 text-[#020617]" strokeWidth={1.5} />
          </div>
          <h1 className="text-white text-2xl mb-2">Capture Business Card</h1>
          <p className="text-white/60 text-sm">
            Take a photo of your business card or upload from gallery
          </p>
        </div>

        {/* Main Card */}
        <div className="rounded-[24px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-6 shadow-2xl">
          {!capturedImage ? (
            <>
              {/* Upload Area */}
              <div className="mb-6">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="relative aspect-[1.6/1] rounded-2xl border-2 border-dashed border-white/20 bg-white/5 flex flex-col items-center justify-center cursor-pointer hover:border-[#FACC15]/50 hover:bg-white/10 transition-all"
                >
                  <Upload className="w-12 h-12 text-white/40 mb-3" strokeWidth={1.5} />
                  <p className="text-white/60 text-sm mb-1">Click to upload photo</p>
                  <p className="text-white/40 text-xs">or drag and drop</p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>

              {/* Camera Button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FACC15] to-[#38BDF8] text-[#020617] hover:opacity-90 transition-all shadow-lg flex items-center justify-center gap-2 mb-3"
              >
                <Camera className="w-5 h-5" strokeWidth={1.5} />
                <span className="font-medium">Take Photo</span>
              </button>

              {/* Upload Button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2 mb-4"
              >
                <Upload className="w-5 h-5" strokeWidth={1.5} />
                <span className="font-medium">Upload from Gallery</span>
              </button>

              {/* Tips */}
              <div className="rounded-xl bg-[#38BDF8]/10 border border-[#38BDF8]/20 p-4 mb-4">
                <p className="text-[#38BDF8] text-xs mb-2">📸 Tips for best results:</p>
                <ul className="text-white/60 text-xs space-y-1 list-disc list-inside">
                  <li>Ensure good lighting</li>
                  <li>Keep the card flat and in focus</li>
                  <li>Capture all text clearly</li>
                  <li>Avoid shadows and glare</li>
                </ul>
              </div>

              {/* Skip Button */}
              <button
                onClick={onSkip}
                className="w-full py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all"
              >
                <span className="text-sm">Skip - Enter Manually</span>
              </button>
            </>
          ) : (
            <>
              {/* Preview */}
              <div className="mb-6">
                <div className="relative aspect-[1.6/1] rounded-2xl overflow-hidden bg-black/50">
                  <img
                    src={capturedImage}
                    alt="Business card preview"
                    className="w-full h-full object-contain"
                  />
                  {isProcessing && (
                    <div className="absolute inset-0 bg-[#020617]/80 backdrop-blur-sm flex flex-col items-center justify-center">
                      <div className="relative w-16 h-16 mb-4">
                        <div className="absolute inset-0 border-4 border-[#FACC15]/30 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-[#FACC15] border-t-transparent rounded-full animate-spin"></div>
                      </div>
                      <div className="flex items-center gap-2 text-[#FACC15]">
                        <Sparkles className="w-5 h-5 animate-pulse" strokeWidth={1.5} />
                        <span className="text-sm">AI Processing...</span>
                      </div>
                      <p className="text-white/40 text-xs mt-2">Extracting information from card</p>
                    </div>
                  )}
                </div>
              </div>

              {!isProcessing && (
                <>
                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <button
                      onClick={handleRetake}
                      className="py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                    >
                      <RotateCcw className="w-5 h-5" strokeWidth={1.5} />
                      <span className="text-sm">Retake</span>
                    </button>
                    <button
                      onClick={handleConfirm}
                      className="py-3 px-4 rounded-xl bg-gradient-to-r from-[#FACC15] to-[#38BDF8] text-[#020617] hover:opacity-90 transition-all flex items-center justify-center gap-2"
                    >
                      <Check className="w-5 h-5" strokeWidth={1.5} />
                      <span className="text-sm font-medium">Confirm</span>
                    </button>
                  </div>

                  {/* Cancel */}
                  <button
                    onClick={onSkip}
                    className="w-full py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all"
                  >
                    <span className="text-sm">Cancel - Enter Manually</span>
                  </button>
                </>
              )}
            </>
          )}
        </div>

        {/* AI Feature Badge */}
        <div className="mt-6 flex items-center justify-center gap-2 text-white/40">
          <Sparkles className="w-4 h-4" strokeWidth={1.5} />
          <span className="text-xs">Powered by AI Recognition</span>
        </div>
      </div>
    </div>
  );
}
