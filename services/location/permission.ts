import * as Location from 'expo-location';
import {LocationPermissionResponse} from 'expo-location';

export async function tryRequestForegroundPermissionsAsync(): Promise<LocationPermissionResponse> {
    try {
        const result = await Location.requestForegroundPermissionsAsync();
        console.log('[Permission]', 'Reqeust foreground permission:');
        console.log(result);
        return result;
    } catch (error) {
        console.error('[Permission]', 'Error requesting foreground permission:', error);
        throw error;
    }
}

export async function tryRequestBackgroundPermissionsAsync(): Promise<LocationPermissionResponse> {
    try {
        const result = await Location.requestBackgroundPermissionsAsync();
        console.log('[Permission]', 'Reqeust background permission:');
        console.log(result);
        return result;
    } catch (error) {
        console.error('[Permission]', 'Error requesting background permission:', error);
        throw error;
    }
}

export async function tryGetForegroundPermissionsAsync(): Promise<LocationPermissionResponse> {
    try {
        const result = await Location.getForegroundPermissionsAsync();
        console.log('[Permission]', 'Get foreground permission:');
        console.log(result);
        return result;
    } catch (error) {
        console.error('[Permission]', 'Error getting foreground permission:', error);
        throw error;
    }
}

export async function tryGetBackgroundPermissionsAsync(): Promise<LocationPermissionResponse> {
    try {
        const result = await Location.getBackgroundPermissionsAsync();
        console.log('[Permission]', 'Get background permissions:');
        console.log(result);
        return result;
    } catch (error) {
        console.error('[Permission]', 'Error getting background permissions:', error);
        throw error;
    }
}
