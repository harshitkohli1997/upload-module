const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');
const app = express()

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req,res) => {
    res.render('index');
})

app.use(fileUpload());
 
app.post('/upload', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;
 
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(`uploads/filename.pdf`, function(err) {
    if (err)
      return res.status(500).send(err);
 
    res.send('File uploaded!');
  });
});
app.listen(2000,() => {
    console.log('server started');
})