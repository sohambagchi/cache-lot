import type { CacheState, CacheType, SimulationResult, CacheEntry } from './types';

const CONFIG = {
    DIRECT_MAPPED: { sets: 8, ways: 1 },
    TWO_WAY: { sets: 4, ways: 2 }
};

export const initializeCache = (type: CacheType): CacheState => {
    const { sets, ways } = CONFIG[type];
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
    const { sets } = CONFIG[state.type];
    const setIndex = address % sets;

    // Clone state to avoid mutation
    const newState = structuredClone(state);
    const targetSet = newState.sets[setIndex];

    // Check for Hit
    const hitIndex = targetSet.slots.findIndex(slot => slot && slot.address === address);

    if (hitIndex !== -1) {
        // HIT
        newState.hits++;
        // Update LRU
        targetSet.slots[hitIndex]!.lastUsed = timestamp;
        newState.history.push(`HIT: Address ${address} in Set ${setIndex}`);

        return {
            newState,
            result: { address, hit: true, setIndex }
        };
    }

    // MISS
    newState.misses++;
    let evicted: CacheEntry | null = null;

    // Find empty slot
    const emptySlotIndex = targetSet.slots.findIndex(slot => slot === null);

    if (emptySlotIndex !== -1) {
        // Fill empty slot
        targetSet.slots[emptySlotIndex] = { address, lastUsed: timestamp };
        newState.history.push(`MISS: Placed Address ${address} in Set ${setIndex}`);
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
        targetSet.slots[lruIndex] = { address, lastUsed: timestamp };
        newState.history.push(`MISS: Evicted Address ${evicted!.address} from Set ${setIndex} for Address ${address}`);
    }

    return {
        newState,
        result: { address, hit: false, setIndex, evicted }
    };
};
