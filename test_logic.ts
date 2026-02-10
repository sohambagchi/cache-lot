import { initializeCache, processAddress } from './src/engine/cacheLogic';

console.log("Starting test...");

let state = initializeCache('DIRECT_MAPPED'); // 8 sets, 1 way

// Test 1: Miss
let r = processAddress(state, 1, 100);
state = r.newState;
console.log(`Step 1 (Miss): Hits=${state.hits}, Misses=${state.misses}, Evictions=${state.evictions}`);
if (state.hits !== 0 || state.misses !== 1) console.error("FAIL: Expected 0 hits, 1 miss");

// Test 2: Hit
r = processAddress(state, 1, 200);
state = r.newState;
console.log(`Step 2 (Hit): Hits=${state.hits}, Misses=${state.misses}, Evictions=${state.evictions}`);
if (state.hits !== 1 || state.misses !== 1) console.error("FAIL: Expected 1 hit, 1 miss");

// Test 3: Conflict Miss (Fill)
r = processAddress(state, 9, 300); // 9 % 8 = 1. Conflict!
state = r.newState;
console.log(`Step 3 (Conflict Miss): Hits=${state.hits}, Misses=${state.misses}, Evictions=${state.evictions}`);
if (state.hits !== 1 || state.misses !== 2 || state.evictions !== 1) console.error("FAIL: Expected 1 hit, 2 misses, 1 eviction");

// Test 4: Miss (Set 2)
r = processAddress(state, 2, 400); // 2 % 8 = 2. Empty.
state = r.newState;
console.log(`Step 4 (Miss Set 2): Hits=${state.hits}, Misses=${state.misses}, Evictions=${state.evictions}`);
if (state.hits !== 1 || state.misses !== 3) console.error("FAIL: Expected 1 hit, 3 misses");

console.log("Test complete.");
