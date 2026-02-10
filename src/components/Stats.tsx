interface StatsProps {
    hits: number;
    misses: number;
    evictions: number;
}

export const Stats = ({ hits, misses, evictions }: StatsProps) => {
    const total = hits + misses;
    const rate = total === 0 ? 0 : Math.round((hits / total) * 100);

    return (
        <div className="grid grid-cols-4 gap-2 w-full max-w-4xl">
            <div className="bg-green-900/30 border border-green-500/30 p-2 rounded-lg flex flex-col items-center">
                <span className="text-green-400 text-xl font-mono uppercase tracking-widest">Hits</span>
                <span className="text-2xl font-bold text-white">{hits}</span>
            </div>
            <div className="bg-red-900/30 border border-red-500/30 p-2 rounded-lg flex flex-col items-center">
                <span className="text-red-400 text-xl font-mono uppercase tracking-widest">Misses</span>
                <span className="text-2xl font-bold text-white">{misses}</span>
            </div>
            <div className="bg-yellow-900/30 border border-yellow-500/30 p-2 rounded-lg flex flex-col items-center">
                <span className="text-yellow-400 text-xl font-mono uppercase tracking-widest">Evictions</span>
                <span className="text-2xl font-bold text-white">{evictions}</span>
            </div>
            <div className="bg-blue-900/30 border border-blue-500/30 p-2 rounded-lg flex flex-col items-center">
                <span className="text-blue-400 text-xl font-mono uppercase tracking-widest">Hit Rate</span>
                <span className="text-2xl font-bold text-white">{rate}%</span>
            </div>
        </div>
    );
};
