import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface props {
    label: string
    provider: string
}
function EntryDataProvider({ label, provider }: props) {
    return (
        <TouchableOpacity activeOpacity={0.8} style={{
            width: 60,
            display: "flex",
            alignItems: "center",
            borderRadius: 10,
            justifyContent: "center",
            gap: 4,
            backgroundColor: "#ecffec8f",
            padding: 5,
            borderWidth: 1,
            borderColor: "#0099006e"
        }}>{
            provider == "airtel" ? (
                <Image source={require(`../assets/providers/airtel.png`)} resizeMode='contain' style={{
                    height: 25,
                    width: 25
                 }}/>
            ) : provider == "mtn" ? (
                <Image source={require(`../assets/providers/mtn.png`)} resizeMode='contain' style={{
                    height: 25,
                    width: 25
                }}/>
            ) : provider == "9mobile" ? (
                <Image source={require(`../assets/providers/9mobile.png`)} resizeMode='contain' style={{
                    height: 25,
                    width: 25
                }}/>
            ) : (
                <Image source={require(`../assets/providers/glo.png`)} resizeMode='contain' style={{
                    height: 25,
                    width: 25
                }}/>
            )
        }
            <Text style={{
                fontSize: 13,
            }}>{label}</Text>
        </TouchableOpacity>
    );
}

export default EntryDataProvider;