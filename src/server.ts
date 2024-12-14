import express, { Request, Response } from "express";
import multer from "multer";
import sharp from "sharp"; // Keep sharp for initial image processing (resize)
import pngToIco from "png-to-ico"; // Import png-to-ico
import cors from "cors";
import path from "path";

const app = express();
// Ensure the app listens on the correct port, defaulting to 3000 for production.
const port = parseInt(process.env.PORT || "3000", 10); // Use process.env.PORT if available

app.use(cors());

// Set up Multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to handle the file upload and conversion
app.post(
    "/convert",
    upload.single("image"),
    async (req: Request, res: Response): Promise<void> => {
        if (!req.file) {
            console.error("No file uploaded.");
            res.status(400).send("No file uploaded.");
            return;
        }

        try {
            // Resize the image to fit within a 256x256 square canvas, but force it to exactly 256x256
            const resizedBuffer = await sharp(req.file.buffer)
                .resize(256, 256, {
                    fit: "fill", // Ensures that the image is stretched/cropped to fill the 256x256 canvas
                })
                .toFormat("png") // Convert the image to PNG format first
                .toBuffer();

            // Convert the PNG buffer to ICO format using png-to-ico
            const icoBuffer = await pngToIco(resizedBuffer);

            // Set response headers for file download
            res.set("Content-Type", "image/x-icon");
            res.set("Content-Disposition", "attachment; filename=converted.ico");

            // Send converted ICO file as response
            res.send(icoBuffer);
        } catch (error) {
            console.error("Error during image conversion:", error); // Only log if an error occurs
            res.status(500).send("Error during file conversion.");
        }
    }
);

// Start the server and listen on the dynamic port
app.listen(port, '0.0.0.0', () => {
    console.log(`Backend server is running on http://localhost:${port}`);
});
