import * as SecureStore from 'expo-secure-store';

// Save
export async function saveToken(token : string) {
  await SecureStore.setItemAsync('jwt_token', token);
  return true;
}

// Read
export async function getToken() {
  return await SecureStore.getItemAsync('jwt_token');
}

// Delete (on logout)
export async function deleteToken() {
  await SecureStore.deleteItemAsync('jwt_token');
}