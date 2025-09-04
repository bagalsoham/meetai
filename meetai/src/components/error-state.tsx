import { AlertCircleIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
    title: string;
    description: string;
    className?: string;
    onRetry?: () => void;
}

export const ErrorState = ({
    title,
    description,
    className,
    onRetry
}: Props) => {
    return (
        <div className={cn(
            "min-h-[400px] flex flex-1 items-center justify-center p-8",
            className
        )}>
            <div className="relative flex flex-col items-center justify-center gap-y-8 bg-white/80 backdrop-blur-sm rounded-2xl p-12 shadow-lg border border-red-100 max-w-md w-full">
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-white/50 rounded-2xl animate-pulse" />
                
                {/* Error icon with modern styling */}
                <div className="relative z-10 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-200 to-red-300 rounded-full animate-ping opacity-20" />
                    <div className="absolute inset-0 bg-red-100 rounded-full animate-pulse opacity-40" />
                    <AlertCircleIcon className="size-8 text-red-600 relative z-10" />
                </div>
                
                {/* Content with modern typography */}
                <div className="relative z-10 flex flex-col gap-y-3 text-center">
                    <h3 className="text-xl font-semibold text-gray-900 tracking-tight">
                        {title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
                        {description}
                    </p>
                </div>
                
                {/* Retry button if onRetry is provided */}
                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="relative z-10 px-6 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                    >
                        Try Again
                    </button>
                )}
                
                {/* Error indicator dots */}
                <div className="relative z-10 flex gap-x-1.5">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className="size-2 bg-red-400 rounded-full animate-pulse"
                            style={{
                                animationDelay: `${i * 0.3}s`,
                                animationDuration: '1.5s'
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};