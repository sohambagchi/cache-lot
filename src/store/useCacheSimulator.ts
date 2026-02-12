import { useState, useEffect, useCallback, useRef } from 'react';
import type { CacheState, CacheType, SimulationResult } from '../engine/types';
import { initializeCache, processAddress } from '../engine/cacheLogic';

export const useCacheSimulator = () => {
    const [cacheState, setCacheState] = useState<CacheState>(initializeCache('DIRECT_MAPPED'));
    const [lastResult, setLastResult] = useState<SimulationResult | null>(null);
    const [queue, setQueue] = useState<number[]>([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const reset = useCallback(() => {
        setCacheState(prevState => initializeCache(prevState.type, prevState.sets.length));
        setLastResult(null);
        setQueue([]);
        setIsPlaying(false);
    }, []);

    const setType = useCallback((type: CacheType) => {
        setCacheState(prevState => initializeCache(type, prevState.sets.length));
        setLastResult(null);
        // Don't clear queue when switching types, allowing user to run same workload
        setIsPlaying(false);
    }, []);

    const setNumIndexes = useCallback((count: number) => {
        setCacheState(prevState => initializeCache(prevState.type, count));
        setLastResult(null);
        setIsPlaying(false);
    }, []);

    const processNext = useCallback(() => {
        if (queue.length === 0) {
            setIsPlaying(false);
            return;
        }

        const [nextAddr, ...rest] = queue;

        // Calculate new state based on CURRENT cacheState
        const { newState, result } = processAddress(cacheState, nextAddr, Date.now());

        // Update all states
        setLastResult(result);
        setCacheState(newState);
        setQueue(rest);
    }, [queue, cacheState]);

    const addToQueue = useCallback((addresses: number[]) => {
        setQueue(prev => [...prev, ...addresses]);
    }, []);

    // Auto-play effect
    useEffect(() => {
        if (isPlaying && queue.length > 0) {
            timerRef.current = setInterval(() => {
                processNext();
            }, 1000); // 1.5s delay for animations
        } else if (queue.length === 0) {
            setIsPlaying(false);
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isPlaying, queue.length, processNext]);

    return {
        cacheState,
        lastResult,
        queue,
        isPlaying,
        processNext,
        addToQueue,
        reset,
        setType,
        setIsPlaying,
        numIndexes: cacheState.sets.length,
        setNumIndexes
    };
};
