export type CacheType = 'DIRECT_MAPPED' | 'TWO_WAY';

export interface CacheEntry {
    address: number;
    tag: number;
    lastUsed: number; // Helper for LRU
}

export interface CacheSet {
    index: number;
    slots: (CacheEntry | null)[];
}

export interface SimulationResult {
    address: number;
    tag: number;
    hit: boolean;
    setIndex: number;
    evicted?: CacheEntry | null; // The entry that was evicted, if any
}

export interface CacheState {
    type: CacheType;
    sets: CacheSet[];
    hits: number;
    misses: number;
    evictions: number;
    history: string[]; // Log of actions
}
