import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

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
    
    return (
        <View style={{
            width: "100%",
            height: "auto",
            borderRadius: 15,
            backgroundColor: "#fafafaff",
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            padding: 8,
            boxShadow: `0 0 2px 1px ${ error ? "red" : "#57575711" }`,
            flexDirection: "row"
        }}>
            <TextInput 
                placeholder={placeholder} 
                placeholderTextColor={"#555"} 
                cursorColor="#090" 
                value={value}
                onChangeText={onChangeText}
                autoCapitalize="none"
                secureTextEntry={type == "password" && !show}
                textContentType={type == "password" ? "password" : "nameSuffix"}
                style={{
                    flex: 1,
                    marginRight: 8
                }}/>
            { type == "password" && <TouchableOpacity style={{
                marginRight: 5
            }} onPress={() => {
                if(!show) {
                    setShow(true);
                } else {
                    setShow(false);
                }
            }} activeOpacity={0.8}>
                <Feather name={ show ? "eye" : "eye-off"} size={20} color={"#555555"}/>
            </TouchableOpacity> }
        </View>
    );
}

export default InputField;