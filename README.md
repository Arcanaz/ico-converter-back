# Image to ICO Converter Backend

This is the backend API for a web-based tool that allows users to upload an image (PNG, JPG, etc.) and convert it into an ICO file, which is commonly used for website favicons.

## Features

- **Image Conversion**: Converts uploaded image files (PNG, JPG, etc.) into a `.ico` file.
- **Image Resizing**: Resizes images to the ideal size for favicons (256x256).
- **File Download**: Once converted, the ICO file is made available for download.

## How It Works

1. The user uploads an image file (e.g., PNG, JPG) via a POST request to the `/convert` endpoint.
2. The backend resizes the image to a 256x256 canvas, ensuring it fits well for use as a favicon.
3. The image is then converted from PNG to ICO format.
4. The converted ICO file is returned as a downloadable file.

## Technical Stack

- **Express**: A web framework for building the API endpoints and handling HTTP requests.
- **Multer**: Middleware for handling file uploads.
- **Sharp**: Image processing library used to resize and format images.
- **png-to-ico**: Converts resized PNG images to the ICO format.
- **CORS**: Cross-Origin Resource Sharing to handle cross-origin requests.

