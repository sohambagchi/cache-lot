import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { useMemo } from 'react';

interface CarProps {
    address: number;
    tag: number;
    isHit?: boolean;
    isEvicting?: boolean;
}

export const Car = ({ address, tag, isHit }: CarProps) => {
    // Generate a consistent color based on address
    const carColor = useMemo(() => {
        const colors = [
            'bg-blue-500', 'bg-red-500', 'bg-green-500', 'bg-yellow-500',
            'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-orange-500'
        ];
        return colors[address % colors.length];
    }, [address]);

    return (
        <motion.div
            layoutId={`car-${address}`} // For smooth transfers if we move slots (optional)
            initial={{ y: -50, opacity: 0, scale: 0.8 }}
            animate={{
                y: 0,
                opacity: 1,
                scale: isHit ? 1.1 : 1,
                rotate: isHit ? [0, -5, 5, 0] : 0
            }}
            exit={{
                x: [0, -5, 5, -5, 5, 0], // Shake
                y: 50,
                opacity: 0,
                transition: { duration: 0.5 }
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={clsx(
                "w-[90%] h-14 rounded-md shadow-sm flex flex-col items-center justify-center px-1 relative border border-black/10 gap-0.5",
                isHit ? "bg-green-400 ring-2 ring-green-300" : carColor
            )}
        >
            {/* Design: Simplified "Top Down" view */}
            {/* Hood/Roof */}
            <div className="flex-1 flex flex-col items-center justify-center z-10 w-full">
                <span className="font-mono text-[18px] text-white/80 bg-black/20 px-1 rounded leading-tight">
                    TAG:{tag} ADDR:{address}
                </span>
            </div>

            {/* Headlights (Right side as front) */}
            <div className="absolute right-0 top-0 bottom-0 w-1 bg-yellow-200/50 rounded-r-md" />
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-900/20 rounded-l-md" />
        </motion.div>
    );
};
