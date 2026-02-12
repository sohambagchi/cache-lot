interface StatsProps {
    hits: number;
    misses: number;
    evictions: number;
}

export const Stats = ({ hits, misses, evictions }: StatsProps) => {
    const total = hits + misses;
    const rate = total === 0 ? 0 : Math.round((hits / total) * 100);

    return (
        <div className="grid grid-cols-4 gap-4 w-full">
            {/* Hits */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-green-500/20 rounded-xl p-4 flex flex-col items-center justify-center shadow-lg transition-all hover:bg-gray-800/70 group">
                <span className="text-green-400 text-xs font-bold uppercase tracking-wider mb-1 group-hover:text-green-300 transition-colors">
                    Hits
                </span>
                <span className="text-3xl font-bold text-white font-mono">
                    {hits}
                </span>
            </div>

            {/* Misses */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-red-500/20 rounded-xl p-4 flex flex-col items-center justify-center shadow-lg transition-all hover:bg-gray-800/70 group">
                <span className="text-red-400 text-xs font-bold uppercase tracking-wider mb-1 group-hover:text-red-300 transition-colors">
                    Misses
                </span>
                <span className="text-3xl font-bold text-white font-mono">
                    {misses}
                </span>
            </div>

            {/* Evictions */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-yellow-500/20 rounded-xl p-4 flex flex-col items-center justify-center shadow-lg transition-all hover:bg-gray-800/70 group">
                <span className="text-yellow-400 text-xs font-bold uppercase tracking-wider mb-1 group-hover:text-yellow-300 transition-colors">
                    Evictions
                </span>
                <span className="text-3xl font-bold text-white font-mono">
                    {evictions}
                </span>
            </div>

            {/* Hit Rate */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-4 flex flex-col items-center justify-center shadow-lg transition-all hover:bg-gray-800/70 group">
                <span className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-1 group-hover:text-blue-300 transition-colors">
                    Hit Rate
                </span>
                <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-white font-mono">
                        {rate}
                    </span>
                    <span className="text-lg text-blue-400/60 ml-0.5 font-bold">%</span>
                </div>
            </div>
        </div>
    );
};
