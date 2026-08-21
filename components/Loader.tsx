import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, View } from 'react-native';

function Loader() {
    const [i, seti] = useState<number>(0);
    
    const [inte, setInte] = useState<any>(null);

    useEffect(() => {
        clearInterval(inte);

        setInte(setInterval(() => {
            if(i < 3) {
    
                seti(i + 1);
            } else {
                seti(0);
            }
        }, 60));
    }, [i]);
    
    return (
        <View style={{
            display: "flex",
            flexDirection: "row",
            gap: 5
        }}>
            <View style={{
                height: 12,
                width: 4,
                borderRadius: 10,
                backgroundColor: i == 0 ? "green" : "white",
            }} />
            <View style={{
                height: 12,
                width: 4,
                borderRadius: 10,
                backgroundColor: i == 1 ? "green" : "white",
            }} />
            <View style={{
                height: 12,
                width: 4,
                borderRadius: 10,
                backgroundColor: i == 2 ? "green" : "white",
            }} />
            <View style={{
                height: 12,
                width: 4,
                borderRadius: 10,
                backgroundColor: i == 3 ? "green" : "white",
            }} />
        </View>
    );
}

export default Loader;