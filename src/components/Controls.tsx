import { useState } from 'react';
import type { CacheType } from '../engine/types';

interface ControlsProps {
    onProcess: (address: number) => void;
    onReset: () => void;
    onSetType: (type: CacheType) => void;
    currentType: CacheType;
    isPlaying: boolean;
    onTogglePlay: () => void;
    onStep: () => void;
}

export const Controls = ({
    onProcess, onReset, onSetType, currentType,
    isPlaying, onTogglePlay, onStep
}: ControlsProps) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const addr = parseInt(input);
        if (!isNaN(addr)) {
            onProcess(addr);
            setInput('');
        }
    };

    return (
        <div className="bg-gray-800 p-3 rounded-lg border border-gray-700 shadow-md flex flex-col gap-2 w-full">
            <div className="flex flex-wrap items-center gap-2 justify-between">
                {/* Type Switcher */}
                <div className="flex bg-gray-900 rounded p-0.5">
                    <button
                        onClick={() => onSetType('DIRECT_MAPPED')}
                        className={`text-xs px-3 py-1 rounded transition-colors ${currentType === 'DIRECT_MAPPED' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
                    >
                        Level 1
                    </button>
                    <button
                        onClick={() => onSetType('TWO_WAY')}
                        className={`text-xs px-3 py-1 rounded transition-colors ${currentType === 'TWO_WAY' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
                    >
                        Level 2
                    </button>
                </div>

                {/* Playback Controls */}
                <div className="flex gap-1">
                    <button
                        onClick={onStep}
                        className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1 text-white rounded flex items-center gap-1"
                        disabled={isPlaying}
                    >
                        Step
                    </button>
                    <button
                        onClick={onTogglePlay}
                        className={`text-xs px-3 py-1 text-white rounded flex items-center gap-1 ${isPlaying ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
                    >
                        {isPlaying ? 'Pause' : 'Auto'}
                    </button>
                    <button
                        onClick={onReset}
                        className="text-xs bg-red-900/50 hover:bg-red-900 px-3 py-1 text-red-200 rounded"
                    >
                        Reset
                    </button>
                </div>
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex gap-2 w-full">
                <input
                    type="number"
                    min="0"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Addr"
                    className="bg-gray-900 border border-gray-600 text-white px-3 py-1 rounded flex-1 focus:ring-1 focus:ring-blue-500 outline-none w-full text-sm"
                />
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded font-bold text-sm">
                    Park
                </button>
            </form>
        </div>
    );
};
