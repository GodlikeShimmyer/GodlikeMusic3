import React from 'react';
import { X } from 'lucide-react';
import { clsx } from 'clsx';

export function Dialog({ children, open, onOpenChange }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/80"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative z-50">{children}</div>
    </div>
  );
}

export function DialogContent({ children, className = '' }) {
  return (
    <div
      className={clsx(
        'bg-gray-900 border border-gray-800 rounded-lg p-6 max-w-md w-full mx-4 shadow-xl',
        className
      )}
    >
      {children}
    </div>
  );
}

export function DialogHeader({ children }) {
  return <div className="mb-4">{children}</div>;
}

export function DialogTitle({ children }) {
  return <h2 className="text-xl font-bold text-white">{children}</h2>;
}

export function DialogFooter({ children }) {
  return <div className="mt-6 flex justify-end gap-3">{children}</div>;
}
