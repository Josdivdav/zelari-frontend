import { Feather } from '@expo/vector-icons';
import { useAppTheme } from '@/constant/colors';
import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

interface field {
    value: string
    placeholder: string
    type: string
    onChangeText: any
    placeholderTextColor?: string
    error?: boolean
}
function InputField({ value, placeholder, type, onChangeText, error } : field) {

    const [show, setShow] = useState(false);
    const theme = useAppTheme();
    
    return (
        <View style={{
            width: "100%",
            height: "auto",
            borderRadius: 15,
            backgroundColor: theme.isDark ? theme.surfaceMuted : "#fafafa",
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            padding: 8,
            borderColor: error ? theme.negative : theme.borderSoft,
            borderWidth: 1,
            boxShadow: `0 0 2px 1px ${ error ? theme.negative : theme.shadow }`,
            flexDirection: "row"
        }}>
            <TextInput 
                placeholder={placeholder} 
                placeholderTextColor={theme.textFaint} 
                cursorColor={theme.brand} 
                value={value}
                onChangeText={onChangeText}
                autoCapitalize="none"
                secureTextEntry={type === "password" && !show}
                textContentType={type === "password" ? "password" : "nameSuffix"}
                style={{
                    flex: 1,
                    color: theme.text,
                    marginRight: 8
                }}/>
            { type === "password" && <TouchableOpacity style={{
                marginRight: 5
            }} onPress={() => {
                if(!show) {
                    setShow(true);
                } else {
                    setShow(false);
                }
            }} activeOpacity={0.8}>
                <Feather name={ show ? "eye" : "eye-off"} size={20} color={theme.textSoft}/>
            </TouchableOpacity> }
        </View>
    );
}

export default InputField;
