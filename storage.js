// src/services/storage.js
import { storage } from '../services/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Tải lên hình ảnh lên Firebase Storage và trả về URL tải về
 * @param {string} uri - Đường dẫn URI của hình ảnh
 * @param {string} userId - ID người dùng để đặt tên tệp
 * @returns {Promise<string>} - URL tải về của hình ảnh
 */
export const uploadAvatar = async (uri, userId) => {
    try {
        // Tạo đường dẫn tệp trong Storage
        const fileExtension = uri.split('.').pop();
        const fileName = `avatars/${userId}.${fileExtension}`;
        const reference = storage().ref(fileName);

        // Tải lên tệp
        await reference.putFile(uri);

        // Lấy URL tải về
        const downloadURL = await reference.getDownloadURL();
        return downloadURL;
    } catch (error) {
        console.error('Error uploading avatar:', error);
        throw error;
    }
};

const STORAGE_KEY = '@remember_me';

export const saveCredentials = async (email, password) => {
    try {
        const credentials = JSON.stringify({ email, password });
        await AsyncStorage.setItem(STORAGE_KEY, credentials);
    } catch (e) {
        console.error('Failed to save credentials', e);
    }
};

export const getCredentials = async () => {
    try {
        const credentials = await AsyncStorage.getItem(STORAGE_KEY);
        return credentials ? JSON.parse(credentials) : null;
    } catch (e) {
        console.error('Failed to fetch credentials', e);
        return null;
    }
};

export const clearCredentials = async () => {
    try {
        await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (e) {
        console.error('Failed to clear credentials', e);
    }
};