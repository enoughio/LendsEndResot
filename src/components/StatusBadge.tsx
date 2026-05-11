import React from 'react';

interface StatusBadgeProps {
  text: string;
  type?: 'closed' | 'warning' | 'success' | 'info';
  icon?: string;
  animated?: boolean;
}

export default function StatusBadge({
  text,
  type = 'closed',
  icon,
  animated = true,
}: StatusBadgeProps) {
  const baseStyles =
    'inline-flex items-center gap-1.5 px-2 py-1 m-1 rounded-full text-xs font-semibold letter-spacing-wide transition-all duration-300';

  const typeStyles = {
    closed:
      'bg-red-50 text-red-700 border border-red-200 shadow-sm hover:bg-red-100 hover:shadow-md',
    warning:
      'bg-amber-50 text-amber-700 border border-amber-200 shadow-sm hover:bg-amber-100 hover:shadow-md',
    success:
      'bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm hover:bg-emerald-100 hover:shadow-md',
    info: 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm hover:bg-blue-100 hover:shadow-md',
  };

  // const pulseClass = animated && type === 'closed' ? 'animate-pulse' : '';

  const iconMap = {
    closed: '🔒',
    warning: '⚠️',
    success: '✓',
    info: 'ℹ️',
  };

  const displayIcon = icon || iconMap[type];

  return (
    <div
      className={`relative ${animated ? 'inline-block' : ''}`}
      style={
        animated && type === 'closed'
          ? {
              animation: 'statusPulse 2s ease-in-out infinite',
            }
          : undefined
      }
    >
      <style>{`
        @keyframes statusPulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.85;
            transform: scale(1.02);
          }
        }
        
        @keyframes statusGlow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.3);
          }
          50% {
            box-shadow: 0 0 0 6px rgba(239, 68, 68, 0);
          }
        }
      `}</style>

      <span className={`${baseStyles} ${typeStyles[type]}`}>
        {displayIcon && <span className="text-sm">{displayIcon}</span>}
        <span className="truncate">{text}</span>
      </span>

      {animated && type === 'closed' && (
        <div
          className="absolute inset-0 rounded-full"
          style={{
            animation: 'statusGlow 2s ease-in-out infinite',
          }}
        />
      )}
    </div>
  );
}
