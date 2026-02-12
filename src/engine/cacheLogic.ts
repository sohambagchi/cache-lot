import type { CacheState, CacheType, SimulationResult, CacheEntry } from './types';

const DEFAULT_CONFIG = {
    DIRECT_MAPPED: { sets: 8, ways: 1 },
    TWO_WAY: { sets: 4, ways: 2 }
};

export const initializeCache = (type: CacheType, numIndexes?: number): CacheState => {
    const defaultConfig = DEFAULT_CONFIG[type];
    // If numIndexes is provided, use it. Otherwise use default.
    const sets = numIndexes ?? defaultConfig.sets;
    const ways = defaultConfig.ways;

    return {
        type,
        sets: Array.from({ length: sets }, (_, i) => ({
            index: i,
            slots: Array(ways).fill(null)
        })),
        hits: 0,
        misses: 0,
        evictions: 0,
        history: []
    };
};

export const processAddress = (
    state: CacheState,
    address: number,
    timestamp: number
): { newState: CacheState; result: SimulationResult } => {
    const sets = state.sets.length;
    const setIndex = address % sets;
    const tag = Math.floor(address / sets);

    // Clone state to avoid mutation
    const newState = structuredClone(state);
    const targetSet = newState.sets[setIndex];

    // Check for Hit
    const hitIndex = targetSet.slots.findIndex(slot => slot && slot.tag === tag);

    if (hitIndex !== -1) {
        // HIT
        newState.hits++;
        // Update LRU
        targetSet.slots[hitIndex]!.lastUsed = timestamp;
        newState.history.push(`HIT: Address ${address} (Tag ${tag}) matches Set ${setIndex} slot`);

        return {
            newState,
            result: { address, tag, hit: true, setIndex }
        };
    }

    // MISS
    newState.misses++;
    let evicted: CacheEntry | null = null;

    // Find empty slot
    const emptySlotIndex = targetSet.slots.findIndex(slot => slot === null);

    if (emptySlotIndex !== -1) {
        // Fill empty slot
        targetSet.slots[emptySlotIndex] = { address, tag, lastUsed: timestamp };
        newState.history.push(`MISS: Address ${address} (Tag ${tag}) -> Set ${setIndex} (Empty Slot)`);
    } else {
        // Eviction needed (LRU)
        // Find slot with smallest lastUsed
        let lruIndex = 0;
        let minLastUsed = targetSet.slots[0]!.lastUsed;

        for (let i = 1; i < targetSet.slots.length; i++) {
            if (targetSet.slots[i]!.lastUsed < minLastUsed) {
                minLastUsed = targetSet.slots[i]!.lastUsed;
                lruIndex = i;
            }
        }

        evicted = targetSet.slots[lruIndex];
        // Eviction happened
        newState.evictions++;
        targetSet.slots[lruIndex] = { address, tag, lastUsed: timestamp };
        newState.history.push(`MISS: Evicted Address ${evicted!.address} (Tag ${evicted!.tag}) from Set ${setIndex} for Address ${address} (Tag ${tag})`);
    }

    return {
        newState,
        result: { address, tag, hit: false, setIndex, evicted }
    };
};
