import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Loader from './Loader';
import { FontAwesome6 } from '@expo/vector-icons';
import { useAppTheme } from '@/constant/colors';

interface button {
    disabled?: boolean
    onClick?: any
    label: string
    style?: any
    icon?: boolean
}

function Button({disabled, onClick, label, style, icon}: button) {
    const theme = useAppTheme();

    return (
        <TouchableOpacity style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.brandButton,
            borderRadius: 15,
            height: 55,
            ...style
        }} onPress={onClick} disabled={disabled} activeOpacity={0.8}>
            { disabled ? <Loader/> : <Text style={{color: theme.onBrand, fontWeight: 500, fontSize: 15}}>{ label } { icon && <FontAwesome6 name="arrow-right" color={theme.onBrand} size={13}/> } </Text> }
        </TouchableOpacity>
    );
}

export default Button;
