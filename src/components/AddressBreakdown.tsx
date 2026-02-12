import type { SimulationResult } from '../engine/types';

interface AddressBreakdownProps {
    lastResult: SimulationResult | null;
    numSets: number;
}

export const AddressBreakdown = ({ lastResult, numSets }: AddressBreakdownProps) => {
    // Constants based on cache type
    const sets = numSets;

    // Derived values
    const address = lastResult?.address ?? null;
    const tag = address !== null ? Math.floor(address / sets) : '—';
    const index = address !== null ? address % sets : '—';

    return (
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 h-full flex flex-col gap-4">
            <h3 className="text-gray-500 font-mono text-[16px] uppercase border-b border-gray-700/50 pb-2">
                Calculation Logic
            </h3>

            {/* General Formula */}
            <div className="space-y-3">
                <div className="bg-gray-900/50 p-3 rounded border border-gray-700/50">
                    <p className="text-gray-400 text-xs uppercase mb-1">Index Formula</p>
                    <code className="text-green-400 font-mono text-sm block">
                        Address % {sets}
                    </code>
                </div>

                <div className="bg-gray-900/50 p-3 rounded border border-gray-700/50">
                    <p className="text-gray-400 text-xs uppercase mb-1">Tag Formula</p>
                    <code className="text-purple-400 font-mono text-sm block">
                        floor(Address / {sets})
                    </code>
                </div>
            </div>

            {/* Current Op Breakdown */}
            <div className="mt-4 flex-1">
                <h4 className="text-gray-400 font-mono text-sm uppercase mb-3 text-center">
                    Current Operation
                </h4>

                {address !== null ? (
                    <div className="flex flex-col gap-2 items-center animate-in fade-in duration-300">
                        {/* Address Input */}
                        <div className="w-full bg-blue-900/20 p-2 rounded border border-blue-500/30 text-center">
                            <span className="text-gray-400 text-xs block">Address</span>
                            <span className="text-2xl font-bold text-white font-mono">{address}</span>
                        </div>

                        {/* Calculations */}
                        <div className="text-gray-500">↓</div>

                        <div className="w-full grid grid-cols-2 gap-2">
                            {/* Index Result */}
                            <div className="bg-green-900/20 p-2 rounded border border-green-500/30 text-center flex flex-col justify-center">
                                <span className="text-gray-400 text-xs block">Index</span>
                                <span className="text-sm text-green-300 font-mono mb-1">{address} % {sets}</span>
                                <span className="text-xl font-bold text-green-400 font-mono">= {index}</span>
                            </div>

                            {/* Tag Result */}
                            <div className="bg-purple-900/20 p-2 rounded border border-purple-500/30 text-center flex flex-col justify-center">
                                <span className="text-gray-400 text-xs block">Tag</span>
                                <span className="text-sm text-purple-300 font-mono mb-1">floor({address} / {sets})</span>
                                <span className="text-xl font-bold text-purple-400 font-mono">= {tag}</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="h-40 flex items-center justify-center text-gray-600 italic text-sm border-2 border-dashed border-gray-800 rounded">
                        Waiting for operation...
                    </div>
                )}
            </div>

            <div className="mt-auto pt-4 text-[18px] text-gray-500 border-t border-gray-700/50">
                <p>
                    The <strong>Index</strong> determines which parking row (set) the car goes to.
                </p>
                <p className="mt-2">
                    The <strong>Tag</strong> is like the license plate - it must match exactly to park or find a car.
                </p>
            </div>
        </div>
    );
};
