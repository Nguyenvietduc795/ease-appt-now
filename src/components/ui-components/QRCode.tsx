
import React, { useEffect, useRef } from 'react';

interface QRCodeProps {
  value: string;
  size?: number;
  bgColor?: string;
  fgColor?: string;
}

// A simple placeholder QR code component that renders a basic representation
// In a real app, you would use a library like 'react-qr-code' or 'qrcode.react'
const QRCode: React.FC<QRCodeProps> = ({
  value,
  size = 128,
  bgColor = "#FFFFFF",
  fgColor = "#000000"
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // This is just a simple representation - not an actual QR code
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, size, size);
    
    // Draw border
    ctx.strokeStyle = fgColor;
    ctx.lineWidth = 4;
    ctx.strokeRect(10, 10, size - 20, size - 20);
    
    // Draw positioning squares
    ctx.fillStyle = fgColor;
    // Top-left
    ctx.fillRect(20, 20, 30, 30);
    // Top-right
    ctx.fillRect(size - 50, 20, 30, 30);
    // Bottom-left
    ctx.fillRect(20, size - 50, 30, 30);
    
    // Draw some "data" squares
    const blockSize = 8;
    const gridSize = Math.floor((size - 60) / blockSize);
    const startX = 60;
    const startY = 60;
    
    // Use the value string to generate a deterministic pattern
    const valueSum = value.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if ((i * j + valueSum) % 3 === 0) {
          ctx.fillRect(startX + i * blockSize, startY + j * blockSize, blockSize - 1, blockSize - 1);
        }
      }
    }
  }, [value, size, bgColor, fgColor]);

  return (
    <div className="border-2 border-gray-200 rounded">
      <canvas 
        ref={canvasRef} 
        width={size} 
        height={size} 
        className="rounded"
        aria-label="QR Code for your appointment"
      />
    </div>
  );
};

export default QRCode;
