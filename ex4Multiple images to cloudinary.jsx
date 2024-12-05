//npm install dotenv cloudinary formidable

require('dotenv').config();
const http = require('http');
const cloudinary = require('cloudinary').v2;
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dqdl7sugb',
  api_key: '281571532867932',
  api_secret: 'Hrxv6UfwJokArW_cgf8ZViIu5S4',
  secure: true,
});

// Create HTTP server
const server = http.createServer((req, res) => {
  if (req.method.toLowerCase() === 'post') {
    const form = new formidable.IncomingForm({ multiples: true });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Formidable Error:', err);
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Error parsing the files.');
        return;
      }

      // Ensure files are uploaded
      const uploadedFiles = Array.isArray(files.image) ? files.image : [files.image];
      if (!uploadedFiles || uploadedFiles.length === 0) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('No files were uploaded.');
        return;
      }

      try {
        // Upload files to Cloudinary
        const uploadPromises = uploadedFiles.map((file) => {
          const mimeType = file.mimetype || file.type;
          if (!mimeType.startsWith('image/')) {
            throw new Error('Only image files are allowed.');
          }
          return cloudinary.uploader.upload(file.filepath, {
            resource_type: 'image',
            folder: 'uploads',
          });
        });

        const results = await Promise.all(uploadPromises);
        const urls = results.map((result) => result.secure_url);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          message: 'Images uploaded successfully!',
          urls: urls,
        }));
      } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error uploading to Cloudinary. ' + error.message);
      }
    });
  } else {
    // Render upload form
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Upload Image(s)</title>
      </head>
      <body>
        <h2>Upload Single or Multiple Images to Cloudinary</h2>
        <form action="/" enctype="multipart/form-data" method="post">
          <input type="file" name="image" multiple><br><br>
          <button type="submit">Upload Image(s)</button>
        </form>
      </body>
      </html>
    `);
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
