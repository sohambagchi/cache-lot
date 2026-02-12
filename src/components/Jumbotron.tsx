import type { SimulationResult } from '../engine/types';

interface JumbotronProps {
    result: SimulationResult | null;
    numSets: number;
}

export const Jumbotron = ({ result, numSets }: JumbotronProps) => {
    if (!result) {
        return (
            <div className="w-full bg-gray-900 rounded-xl p-4 text-center border-2 border-gray-800 h-32 flex items-center justify-center">
                <p className="text-gray-500 text-sm font-mono">Waiting for vehicle...</p>
            </div>
        );
    }

    const { address, setIndex, hit, evicted, tag } = result;
    const sets = numSets;

    return (
        <div className={`w-full rounded-2xl p-8 text-center border-4 min-h-[200px] flex flex-col items-center justify-center gap-4 transition-colors duration-500 ${hit ? 'bg-green-900/20 border-green-600' : 'bg-red-900/20 border-red-600'}`}>
            <h1 className="text-5xl font-black text-white font-mono tracking-tighter">
                {hit ? 'HIT!' : 'MISS'}
            </h1>

            <div className="flex flex-col gap-2 text-xl font-mono text-gray-300">
                <p>
                    <span className="text-yellow-400">Address {address}</span> % {sets} = <span className="text-blue-400 font-bold">Index {setIndex}</span>
                </p>
                <p>
                    <span className="text-gray-500">floor({address} / {sets})</span> = <span className="text-purple-400 font-bold">Tag {tag}</span>
                </p>

                {!hit && evicted && (
                    <p className="text-red-400 animate-pulse">
                        ⚠️ Evicting Address {evicted.address} (Tag {evicted.tag})
                    </p>
                )}

                {!hit && !evicted && (
                    <p className="text-green-400">
                        ✨ Parking in empty spot
                    </p>
                )}
            </div>
        </div>
    );
};
