import * as LocalAuthentication from "expo-local-authentication";

export const checkBiometricSupport = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    if (!compatible) return false;

    const enrolled = await LocalAuthentication.isEnrolledAsync();
    if (!enrolled) return false;

    return true;
};

export const handleBiometrics = async () => {
    const biometricAuth = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate",
        cancelLabel: "Cancel",
        disableDeviceFallback: true,
    });
    if (biometricAuth.success) {
        return true;
    }
    return false;
}