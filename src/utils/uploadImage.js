import { API_PATHS } from './apiPaths';
import axiosInstance from './axiosInstance'; 

// Asynchronous function to handle image upload to the server
const uploadImage = async (imageFile) => {
  const formData = new FormData(); // Create a new FormData object to hold the file
  formData.append('image', imageFile); // Append the image file with the key 'image'

  try {
    // Send a POST request to the upload image API endpoint
    const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Set the correct content type for file uploads
      },
    });
    return response.data; // Return the server response (e.g., uploaded image URL)
  } catch (error) {
    // Log and rethrow error so it can be handled by the calling function
    console.error('Error uploading the image:', error); 
    throw error;
  }
};


export default uploadImage;
