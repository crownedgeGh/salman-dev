const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

async function test() {
  const fd = new FormData();
  fd.append('name', 'Salman');
  fd.append('firmName', 'Boss Real Estate');
  fd.append('phone', '8888888888');
  fd.append('city', 'Raipur');
  fd.append('areasOfOperation', 'Devendra Nagar');
  fd.append('reraNumber', 'RERA12345');
  fd.append('yearsOfExperience', '5');
  fd.append('bio', 'Best broker in town');
  fd.append('role', 'broker');

  // Dummy image
  fs.writeFileSync('dummy.jpg', 'fake image content');
  fd.append('passportPhoto', fs.createReadStream('dummy.jpg'));
  
  // Dummy pdf
  fs.writeFileSync('dummy.pdf', 'fake pdf content');
  fd.append('aadhar', fs.createReadStream('dummy.pdf'));

  try {
    const res = await axios.post('http://localhost:3000/api/auth/register', fd, {
      headers: fd.getHeaders()
    });
    console.log("Success:", res.data);
  } catch (err) {
    console.error("Error Status:", err.response ? err.response.status : 'No response');
    console.error("Error Data:", err.response ? err.response.data : err.message);
  }
}

test();
