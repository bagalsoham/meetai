import React from 'react';
import { Users, Plus } from 'lucide-react';
import Image from 'next/image';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  buttonText?: string;
  onButtonClick?: () => void;
  image?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  buttonText = "Get Started",
  image = "/empty.svg",
  onButtonClick
}) => {
  return (
    <div className="flex items-center justify-center py-16 px-4">
      <div className="text-center max-w-sm mx-auto">
        {/* Image container */}
        <div className="mb-6">
          {image ? (
            <Image
              src={image}
              alt={title}
              width={200}
              height={200}
              className="mx-auto opacity-80"
              priority={false}
            />
          ) : icon ? (
            <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
              {icon}
            </div>
          ) : (
            <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
          )}
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
          {title}
        </h3>
        
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8">
          {description}
        </p>
        
        {onButtonClick && (
          <button 
            onClick={onButtonClick}
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 shadow-md hover:shadow-lg"
          >
            <Plus className="w-4 h-4" />
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;