import { useCacheSimulator } from './store/useCacheSimulator';
import { ParkingLot } from './components/ParkingLot';
import { Controls } from './components/Controls';
import { Stats } from './components/Stats';
import { Jumbotron } from './components/Jumbotron';
import { AddressBreakdown } from './components/AddressBreakdown';
import { BottomBar } from './components/BottomBar';

function App() {
  const {
    cacheState, lastResult, queue, isPlaying, numIndexes,
    processNext, addToQueue, reset, setType, setIsPlaying, setNumIndexes
  } = useCacheSimulator();

  // Presets
  const loadThrashing = () => {
    addToQueue([1, 9, 1, 9]);
  };

  const loadAssociativityFix = () => {
    addToQueue([1, 9, 1, 9]);
  };

  const loadModuloDemo = () => {
    addToQueue([0, 8, 16, 24, 32]);
  };

  const loadFill = () => {
    addToQueue([0, 1, 2, 3, 4, 5, 6, 7]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-2 px-2 gap-2 overflow-hidden h-screen">
      {/* Header */}
      <div className="text-center space-y-0.5 flex-shrink-0">
        <h1 className="text-2xl font-black bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent text-[48px]">
          The Cache Parking Lot
        </h1>
        <p className="text-gray-500 font-mono text-[16px]">
          Visualizing Cache Evictions & Associativity
        </p>
      </div>

      {/* Main Grid */}
      <div className="w-[80%] max-w-none grid grid-cols-1 lg:grid-cols-4 gap-4 items-stretch flex-1 overflow-hidden pb-2">

        {/* Left Col: Calculation Info */}
        <div className="hidden lg:flex flex-col gap-2 w-full h-full col-span-1">
          <AddressBreakdown lastResult={lastResult} numSets={numIndexes} />
        </div>

        {/* Middle Col: Visuals */}
        <div className="flex flex-col gap-2 items-center w-full justify-start h-full col-span-1 lg:col-span-2">
          <Jumbotron result={lastResult} numSets={numIndexes} />
          <ParkingLot state={cacheState} lastResult={lastResult} />
        </div>

        {/* Right Col: Controls & Stats */}
        <div className="flex flex-col gap-2 w-full h-full col-span-1">
          <Stats hits={cacheState.hits} misses={cacheState.misses} evictions={cacheState.evictions} />

          <Controls
            onProcess={(addr) => addToQueue([addr])}
            onReset={reset}
            onSetType={setType}
            currentType={cacheState.type}
            isPlaying={isPlaying}
            onTogglePlay={() => setIsPlaying(!isPlaying)}
            onStep={processNext}
          />

          {/* Queue Visualization */}
          <div className="bg-gray-800 p-3 rounded-lg border border-gray-700 w-full flex-shrink-0">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-gray-500 font-mono text-[16px] uppercase">Queue</h3>
            </div>

            <div className="flex gap-1 overflow-x-auto pb-2 min-h-[28px] scrollbar-thin scrollbar-thumb-gray-600 mb-2">
              {queue.length === 0 ? (
                <span className="text-gray-700 italic text-[16px]">Empty</span>
              ) : (
                queue.map((addr, i) => (
                  <div key={i} className="flex-shrink-0 bg-gray-700 px-2 py-0.5 rounded text-white font-mono text-[16px] border border-gray-600">
                    {addr}
                  </div>
                ))
              )}
            </div>

            <div className="grid grid-cols-4 gap-1">
              <button onClick={loadFill} className="text-[16px] bg-blue-900/30 hover:bg-blue-900/50 text-blue-300 px-2 py-1 rounded border border-blue-800/30 transition-colors">
                Seq. Fill
              </button>
              <button onClick={loadModuloDemo} className="text-[16px] bg-yellow-900/30 hover:bg-yellow-900/50 text-yellow-300 px-2 py-1 rounded border border-yellow-800/30 transition-colors">
                Modulo %8
              </button>
              <button onClick={loadThrashing} className="text-[16px] bg-red-900/30 hover:bg-red-900/50 text-red-300 px-2 py-1 rounded border border-red-800/30 transition-colors">
                Thrashing
              </button>
              <button onClick={loadAssociativityFix} className="text-[16px] bg-purple-900/30 hover:bg-purple-900/50 text-purple-300 px-2 py-1 rounded border border-purple-800/30 transition-colors">
                2-Way Fix
              </button>
            </div>
          </div>

          {/* History Log - Expands to fill remaining space */}
          <div className="bg-gray-800 p-3 rounded-lg border border-gray-700 flex-1 overflow-hidden flex flex-col min-h-0">
            <h3 className="text-gray-500 font-mono text-[16px] mb-2 uppercase flex-shrink-0">Event Log</h3>
            <div className="flex flex-col gap-0.5 text-[16px] font-mono text-gray-400 overflow-y-auto flex-1 pr-1">
              {cacheState.history.slice().reverse().map((entry, i) => (
                <div key={i} className="border-b border-gray-700/50 pb-0.5 last:border-0">{entry}</div>
              ))}
              {cacheState.history.length === 0 && <span className="text-gray-700 italic">No events yet.</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <BottomBar numIndexes={numIndexes} setNumIndexes={setNumIndexes} />
    </div>
  );
}

export default App;
