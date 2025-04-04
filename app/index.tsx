import {useState, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";

import {Link} from "expo-router";

import {
    tryGetBackgroundPermissionsAsync,
    tryGetForegroundPermissionsAsync,
    tryRequestBackgroundPermissionsAsync,
    tryRequestForegroundPermissionsAsync,
} from "@/services/location/permission";
import {LocationPermissionResponse} from "expo-location";

/**
 * Landing Screen
 * It requests permission
 */
export default function Index() {
    const [foregroundPermission, setForegroundPermission] = useState<LocationPermissionResponse>();
    const [backgroundPermission, setBackgroundPermission] = useState<LocationPermissionResponse>();

    // 컴포넌트가 마운트될 때 현재 권한 상태를 확인
    const checkPermission = useCallback(async () => {
        try {
            const fg = await tryGetForegroundPermissionsAsync();
            setForegroundPermission(fg);
            const bg = await tryGetBackgroundPermissionsAsync();
            setBackgroundPermission(bg);
        } catch (e) {
            console.error(e);
        }
    }, []);

    // checkPermission 함수가 변하지 않기 때문에 컴포넌트가 마운트될 때 checkPermission 한 번 호출
    useEffect(() => {
        void checkPermission();
    }, [checkPermission]);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>권한이 필요함</Text>

            <TouchableOpacity
                style={[
                    styles.button,
                    {backgroundColor: foregroundPermission?.granted ? 'blue' : 'red'},
                ]}
                onPress={() => tryRequestForegroundPermissionsAsync()}
            >
                <Text style={styles.buttonText}>
                    {foregroundPermission?.granted ? "포그라운드 권한 허용 됨" : "포그라운드 권한 요청하기"}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    styles.button,
                    {backgroundColor: backgroundPermission?.granted ? 'blue' : 'red'},
                ]}
                onPress={() => tryRequestBackgroundPermissionsAsync()}
            >
                <Text style={styles.buttonText}>
                    {backgroundPermission?.granted ? "백그라운드 권한 허용 됨" : "백그라운드 권한 요청하기"}
                </Text>
            </TouchableOpacity>

            <Link href="/location-screen" style={styles.button}>
                Go to 위치 조작 스크린
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    header: {
        fontSize: 20,
        marginBottom: 12,
    },
    button: {
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    link: {
        marginTop: 20,
    },
    linkText: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
});
