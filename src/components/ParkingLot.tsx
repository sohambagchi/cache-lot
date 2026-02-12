import { AnimatePresence } from 'framer-motion';
import type { CacheState, SimulationResult } from '../engine/types';
import { Car } from './Car';

interface ParkingLotProps {
    state: CacheState;
    lastResult?: SimulationResult | null;
}

export const ParkingLot = ({ state, lastResult }: ParkingLotProps) => {
    return (
        <div className="flex flex-col gap-4 w-full mx-auto p-4 bg-gray-800 rounded-xl border border-dashed border-gray-600 h-full overflow-y-auto">
            <h2 className="text-sm font-bold text-center text-white mb-2 uppercase tracking-wider text-shadow flex-shrink-0">
                {state.type === 'DIRECT_MAPPED' ? 'Level 1: Valet (Direct)' : 'Level 2: VIP (2-Way)'}
            </h2>

            <div className="grid grid-cols-1 gap-2 w-full">
                {state.sets.map((set) => {
                    const isTargetSet = lastResult?.setIndex === set.index;

                    return (
                        <div
                            key={set.index}
                            className={`
                                relative p-2 rounded-lg border transition-all duration-300
                                ${isTargetSet ? 'bg-gray-700/80 border-blue-400 ring-2 ring-blue-400/30 z-10 scale-[1.02]' : 'bg-gray-700/30 border-gray-600'}
                                flex items-center gap-2
                            `}
                        >
                            {/* Target Tag Indicator */}
                            {isTargetSet && lastResult && (
                                <div className="absolute -top-3 right-4 bg-purple-600 text-white text-[16px] font-bold px-2 py-0.5 rounded-full shadow-lg z-20 whitespace-nowrap border border-purple-400">
                                    Compare Tag: {lastResult.tag}
                                </div>
                            )}

                            {/* Set Label */}
                            <div className="w-8 flex flex-col items-center justify-center border-r border-gray-500 pr-2">
                                <span className="text-gray-400 text-[10px] font-mono uppercase">Index</span>
                                <span className="text-xl font-bold text-white font-mono">{set.index}</span>
                            </div>

                            {/* Slots */}
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
                                {set.slots.map((slot, slotIndex) => {
                                    const isHit = lastResult?.hit &&
                                        lastResult.setIndex === set.index &&
                                        slot?.address === lastResult.address;

                                    return (
                                        <div
                                            key={slotIndex}
                                            className="h-16 bg-gray-900/50 rounded-md flex items-center justify-center border border-white/10 relative overflow-hidden group"
                                        >
                                            {/* Parking Spot Number */}
                                            <span className="absolute bottom-1 right-1 text-gray-600 font-mono text-[10px]">
                                                {slotIndex}
                                            </span>

                                            <AnimatePresence mode="popLayout">
                                                {slot ? (
                                                    <Car
                                                        key={slot.address}
                                                        address={slot.address}
                                                        tag={slot.tag}
                                                        isHit={!!isHit}
                                                    />
                                                ) : (
                                                    <span className="text-gray-700 text-xs font-mono">EMPTY</span>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
