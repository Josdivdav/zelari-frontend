import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import type { ComponentProps } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';


interface props {
    name: ComponentProps<typeof MaterialIcons>["name"]
    size: number
    color: string
    label?: string
    onPress?: any
}
function MainAction({ name, size, color, label, onPress } : props) {
    return (
        <TouchableOpacity activeOpacity={0.5} style={styles.pillBud} onPress={onPress}>
            <MaterialIcons name={name} size={size}  color={color}/>
            <Text style={{
                fontSize: 10,
                color: "darkgreen"
            }}>{ label }</Text>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    pillBud: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        width: "auto",
        gap: 3,
        justifyContent: "space-between",
        padding: 8,
        borderRadius: 10
    }
})

export default MainAction;
