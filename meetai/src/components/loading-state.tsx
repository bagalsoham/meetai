import { Loader2Icon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
    title: string;
    description: string;
    className?: string;
}

export const LoadingState = ({
    title,
    description,
    className
}: Props) => {
    return (
        <div className={cn(
            "min-h-[400px] flex flex-1 items-center justify-center p-8",
            className
        )}>
            <div className="relative flex flex-col items-center justify-center gap-y-8 bg-white/80 backdrop-blur-sm rounded-2xl p-12 shadow-lg border border-gray-100 max-w-md w-full">
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-white/50 rounded-2xl animate-pulse" />
                
                {/* Loading spinner with modern styling */}
                <div className="relative z-10 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-ping opacity-20" />
                    <Loader2Icon className="size-8 animate-spin text-gray-700 relative z-10" />
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
                
                {/* Loading dots animation */}
                <div className="relative z-10 flex gap-x-1.5">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className="size-2 bg-gray-400 rounded-full animate-bounce"
                            style={{
                                animationDelay: `${i * 0.2}s`,
                                animationDuration: '1s'
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};