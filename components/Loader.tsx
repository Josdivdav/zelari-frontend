import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useAppTheme } from '@/constant/colors';

function Loader() {
    const [i, seti] = useState<number>(0);
    const theme = useAppTheme();

    useEffect(() => {
        const interval = setInterval(() => {
            seti((value) => (value < 3 ? value + 1 : 0));
        }, 60);

        return () => clearInterval(interval);
    }, []);
    
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
                backgroundColor: i === 0 ? theme.brand : theme.onBrand,
            }} />
            <View style={{
                height: 12,
                width: 4,
                borderRadius: 10,
                backgroundColor: i === 1 ? theme.brand : theme.onBrand,
            }} />
            <View style={{
                height: 12,
                width: 4,
                borderRadius: 10,
                backgroundColor: i === 2 ? theme.brand : theme.onBrand,
            }} />
            <View style={{
                height: 12,
                width: 4,
                borderRadius: 10,
                backgroundColor: i === 3 ? theme.brand : theme.onBrand,
            }} />
        </View>
    );
}

export default Loader;
