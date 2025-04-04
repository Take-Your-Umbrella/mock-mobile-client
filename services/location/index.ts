import {useCallback, useEffect, useState} from 'react';

import * as Track from './track';

export function useLocationTracking() {
    const [isTracking, setIsTracking] = useState(false);

    const onStartTracking = useCallback(async () => {
        await Track.startTracking()
        setIsTracking(true);
    }, []);

    const onStopTracking = useCallback(async () => {
        await Track.stopTracking()
        setIsTracking(false);
    }, []);

    useEffect(() => {
        Track.isTracking().then((result) => setIsTracking(result));
    }, [])

    return {
        isTracking,
        startTracking: onStartTracking,
        stopTracking: onStopTracking,
    }
}
