const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const methodOverride = require('method-override');
const multer = require('multer');
const Product = require('./models/Product'); // Ensure this import is correct

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected successfully');
});
mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected. Attempting to reconnect...');
  connectToDatabase();
});
const connectToDatabase = () => {
  mongoose.connect(process.env.MONGO_URI)
    .catch(err => console.error(`Initial MongoDB connection error: ${err}`));
};
connectToDatabase();

const conn = mongoose.connection;
conn.once('open', () => {
  console.log('MongoDB connected successfully');
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only JPEG is allowed!'), false);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

// Serve static files from 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Fetch all products
app.get('/api/products', async (req, res) => {
  console.log('Received request to fetch products');
  try {
    const products = await Product.find({});
    console.log('Products fetched successfully');
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Serve files using `fs`
app.get('/uploads/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, 'uploads', filename);
  console.log(`Received request to serve file: ${filename} from ${filePath}`);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error(`File not found: ${filename}`);
      return res.status(404).json({ message: 'No file exists' });
    }

    res.sendFile(filePath, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).json({ message: 'Internal Server Error', error: err });
      } else {
        console.log(`File served: ${filename}`);
      }
    });
  });
});

// Upload multiple products
app.post('/api/upload', upload.fields([{ name: 'file0' }, { name: 'file1' }, { name: 'file2' }]), (req, res) => {
  const files = req.files;

  if (!files || Object.keys(files).length === 0) {
    return res.status(400).send('No files uploaded.');
  }

  const products = [];
  Object.keys(files).forEach((fieldName, index) => {
    const file = files[fieldName][0];
    const name = req.body[`name${index}`];
    const price = req.body[`price${index}`];
    
    const imagePath = `/uploads/${file.filename}`;

    console.log(`Saving product - Name: ${name}, Price: ${price}, Image: ${imagePath}`);

    const newProduct = new Product({
      name,
      price,
      image: imagePath
    });

    products.push(newProduct.save());
  });

  Promise.all(products)
    .then(() => {
      console.log('All products saved successfully.');
      res.status(200).send('Files uploaded and products added.');
    })
    .catch(err => {
      console.error('Error saving products:', err);
      res.status(500).send(err);
    });
});

// Simple test route
app.get('/test', (req, res) => {
  res.send('Test route is working');
});

// Root route
app.get('/', (req, res) => {
  res.send('Server is running on root route!');
});

// Start the server
const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

server.timeout = 120000; // 2 minutes timeout for large file downloads

const gracefulShutdown = () => {
  console.log('Received kill signal, shutting down gracefully');
  server.close(() => {
    console.log('Closed out remaining connections');
    process.exit(0);
  });

  // Force close server after 5 seconds
  setTimeout(() => {
    console.error('Forcing server shutdown');
    process.exit(1);
  }, 5000);
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const fs = require('fs');
// const path = require('path');
// const methodOverride = require('method-override');
// const multer = require('multer');
// const Product = require('./models/Product'); // Ensure this import is correct

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride('_method'));

//  mongoose.connection.on('connected', () => { console.log('MongoDB connected successfully'); }); mongoose.connection.on('error', (err) => { console.error(`MongoDB connection error: ${err}`); }); mongoose.connection.on('disconnected', () => { console.log('MongoDB disconnected. Attempting to reconnect...'); connectToDatabase(); }); const connectToDatabase = () => { mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).catch(err => console.error(`Initial MongoDB connection error: ${err}`)); }; connectToDatabase();

// Product.find({}).then(products => { console.log('Products:', products); mongoose.connection.close(); }).catch(err => { console.error('Error fetching products:', err);});

// const conn = mongoose.connection;
// conn.once('open', () => {
//   console.log('MongoDB connected successfully');
// });

// // Configure multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   }
// });
// const upload = multer({ storage: storage });

// // Serve static files from 'uploads' directory
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Fetch all products
// app.get('/api/products', async (req, res) => {
//   console.log('Received request to fetch products');
//   try {
//     const products = await Product.find({});
//     console.log('Products fetched successfully');
//     res.json(products);
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// // Serve files using `fs`
// app.get('/uploads/:filename', (req, res) => {
//   const { filename } = req.params;
//   const filePath = path.join(__dirname, 'uploads', filename);
//   console.log(`Received request to serve file: ${filename} from ${filePath}`);

//   fs.access(filePath, fs.constants.F_OK, (err) => {
//     if (err) {
//       console.error(`File not found: ${filename}`);
//       return res.status(404).json({ message: 'No file exists' });
//     }

//     res.sendFile(filePath, (err) => {
//       if (err) {
//         console.error('Error sending file:', err);
//         res.status(500).json({ message: 'Internal Server Error', error: err });
//       } else {
//         console.log(`File served: ${filename}`);
//       }
//     });
//   });
// });

// // Upload multiple products
// app.post('/api/upload', upload.fields([{ name: 'file0' }, { name: 'file1' }, { name: 'file2' }]), (req, res) => {
//   const files = req.files;

//   if (!files || Object.keys(files).length === 0) {
//     return res.status(400).send('No files uploaded.');
//   }

//   const products = [];
//   Object.keys(files).forEach((fieldName, index) => {
//     const file = files[fieldName][0];
//     const name = req.body[`name${index}`];
//     const price = req.body[`price${index}`];
//    const mimeType = file.mimetype;
//     console.log(`Processing file: ${file.originalname}, MIME type: ${mimeType}`);
//     if (mimeType === 'model/gltf-binary' || mimeType === 'application/octet-stream' || mimeType === 'model/gltf+json') { console.log(`File ${file.originalname} is identified as a model`); } else { console.log(`File ${file.originalname} is identified as an image`); } const isModel = mimeType === 'model/gltf-binary' || mimeType === 'application/octet-stream' || mimeType === 'model/gltf+json'

//     const imagePath = !isModel ? `/uploads/${file.filename}` : null;
//     const modelPath = isModel ? `/uploads/${file.filename}` : null;

//     console.log(`Saving product - Name: ${name}, Price: ${price}, Image: ${imagePath}, Model: ${modelPath}`);

//     const newProduct = new Product({
//       name,
//       price,
//       image: imagePath,
//       modelSrc: modelPath
//     });

//     products.push(newProduct.save());
//   });

//   Promise.all(products)
//     .then(() => {
//       console.log('All products saved successfully.');
//       res.status(200).send('Files uploaded and products added.');
//     })
//     .catch(err => {
//       console.error('Error saving products:', err);
//       res.status(500).send(err);
//     });
// });

// // app.post('/api/upload', upload.fields([{ name: 'file0' }, { name: 'file1' }, { name: 'file2' }]), (req, res) => { const files = req.files; if (!files || Object.keys(files).length === 0) { return res.status(400).send('No files uploaded.'); } const products = []; Object.keys(files).forEach((fieldName, index) => { const file = files[fieldName][0]; const name = req.body[`name${index}`]; const price = req.body[`price${index}`]; const isModel = file.mimetype === 'model/gltf-binary'; console.log(`Processing product: ${name}, ${price}, ${file.filename}`); const newProduct = new Product({ name, price, image: !isModel ? `/uploads/${file.filename}` : null, modelSrc: isModel ? `/uploads/${file.filename}` : null }); products.push(newProduct.save()); }); Promise.all(products) .then(() => { console.log('All products saved successfully.'); res.status(200).send('Files uploaded and products added.'); }) .catch(err => { console.error('Error saving products:', err); res.status(500).send(err); }); });

// // Simple test route
// app.get('/test', (req, res) => {
//   res.send('Test route is working');
// });

// // Root route
// app.get('/', (req, res) => {
//   res.send('Server is running on root route!');
// });

// // Start the server
// const port = process.env.PORT || 3001;
// const server = app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

// server.timeout = 120000; // 2 minutes timeout for large file downloads

// const gracefulShutdown = () => {
//   console.log('Received kill signal, shutting down gracefully');
//   server.close(() => {
//     console.log('Closed out remaining connections');
//     process.exit(0);
//   });

//   // Force close server after 5 seconds
//   setTimeout(() => {
//     console.error('Forcing server shutdown');
//     process.exit(1);
//   }, 5000);
// };

// process.on('SIGTERM', gracefulShutdown);
// process.on('SIGINT', gracefulShutdown);

