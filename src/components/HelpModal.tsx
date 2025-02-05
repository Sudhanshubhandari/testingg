import React from 'react';
import { X } from 'lucide-react';

type HelpModalProps = {
  isOpen: boolean;
  onClose: () => void;
  content: string;
};

export default function HelpModal({ isOpen, onClose, content }: HelpModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">How to Use</h2>
          <div className="prose prose-sm text-gray-600">
            {content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-3">{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}