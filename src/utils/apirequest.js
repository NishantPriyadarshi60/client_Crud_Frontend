import axios from 'axios';

export const apiRequest = async (method, path, data) => {
    try {
        const baseUrl = 'http://localhost:3001';
        const url = `${baseUrl}/${path}`;
        const response = await axios({
            method,
            url,
            data
        });
        return response;
    } catch (error) {
        console.error('Error:', error);
        return error;
    }
}