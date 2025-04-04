import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';

type LocationTaskData = {
    locations: Location.LocationObject[];
}

/**
 * The unique name of the background location task.
 */
export const locationTaskName = 'Take Your Umbrella';

/**
 * Check if the background location is started and running.
 * This is a wrapper around `Location.hasStartedLocationUpdatesAsync` with the task name prefilled.
 */
export async function isTracking(): Promise<boolean> {
    return await Location.hasStartedLocationUpdatesAsync(locationTaskName);
}

/**
 * Start the background location monitoring and add new locations to the storage.
 * This is a wrapper around `Location.startLocationUpdatesAsync` with the task name prefilled.
 */
export async function startTracking() {
    try {
        await Location.startLocationUpdatesAsync(locationTaskName, {
            accuracy: Location.Accuracy.BestForNavigation,
            timeInterval: 5 * 1000,
            // android behavior
            foregroundService: {
                notificationTitle: 'Take Your Umbrella is active',
                notificationBody: 'Monitoring your location',
                notificationColor: '#333333',
            },
            // ios behavior
            activityType: Location.ActivityType.Fitness,
            showsBackgroundLocationIndicator: true,
        });
        console.log('[tracking]', 'started background location task');
    } catch (error) {
        console.error('[tracking]', 'failed to start background location task', error);
    }
}

/**
 * Stop the background location monitoring.
 * This is a wrapper around `Location.stopLocationUpdatesAsync` with the task name prefilled.
 */
export async function stopTracking() {
    await Location.stopLocationUpdatesAsync(locationTaskName);
    console.log('[tracking]', 'stopped background location task');
}


/**
 * Define the background task
 */
TaskManager.defineTask(locationTaskName, async (task) => {
    if (task.error) {
        console.error('[tracking]', 'Something went wrong within the background location task...', task.error);
        return;
    }

    const locations = (task.data as LocationTaskData).locations;
    console.log('[tracking]', 'Received new locations', locations);
});
