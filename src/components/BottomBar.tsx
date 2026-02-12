import { motion } from 'framer-motion';

interface BottomBarProps {
    numIndexes: number;
    setNumIndexes: (n: number) => void;
}

export const BottomBar = ({ numIndexes, setNumIndexes }: BottomBarProps) => {
    const options = [2, 4, 8, 16, 32];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-[80%] max-w-none bg-gray-800 p-3 rounded-lg border border-gray-700 shadow-md flex items-center justify-between gap-4"
        >
            <div className="flex items-center gap-2">
                <div className="bg-blue-900/30 p-2 rounded-lg border border-blue-800/30">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                </div>
                <div>
                    <h3 className="text-white font-bold text-sm uppercase tracking-wide">Cache Parameters</h3>
                    <p className="text-gray-500 text-xs">Configure the physical structure of the cache</p>
                </div>
            </div>

            <div className="flex items-center gap-4 bg-gray-900/50 p-2 rounded-lg border border-gray-700/50">
                <span className="text-gray-400 text-xs font-mono uppercase tracking-wider">Number of Indexes (Sets)</span>

                <div className="flex gap-1">
                    {options.map((opt) => (
                        <button
                            key={opt}
                            onClick={() => setNumIndexes(opt)}
                            className={`
                                relative px-3 py-1.5 rounded text-sm font-mono font-bold transition-all duration-200 min-w-[36px]
                                ${numIndexes === opt
                                    ? 'bg-blue-600 text-white shadow-lg scale-105 ring-2 ring-blue-400/30 ring-offset-2 ring-offset-gray-900 z-10'
                                    : 'bg-gray-800 text-gray-500 hover:text-gray-300 hover:bg-gray-700 border border-gray-600'
                                }
                            `}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};
