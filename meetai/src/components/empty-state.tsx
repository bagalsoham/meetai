import React from 'react';
import { Users, Plus } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  buttonText?: string;
  onButtonClick?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  buttonText = "Get Started",
  onButtonClick
}) => {
  return (
    <div className="flex items-center justify-center py-16 px-4">
      <div className="text-center max-w-sm mx-auto">
        {/* Purple folder icon container */}
        <div className="mx-auto w-24 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center mb-6 relative shadow-lg">
          <div className="absolute -top-2 left-4 w-8 h-4 bg-gradient-to-br from-purple-300 to-purple-500 rounded-t-md"></div>
          {icon || <Users className="w-8 h-8 text-white" />}
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