const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

async function test() {
  const fd = new FormData();
  fd.append('name', 'Test Broker Image');
  fd.append('phone', '9999999998');
  fd.append('role', 'broker');
  fd.append('city', 'Test City');

  // Create a dummy file
  fs.writeFileSync('dummy.jpg', 'fake image content');
  fd.append('passportPhoto', fs.createReadStream('dummy.jpg'));

  try {
    const res = await axios.post('http://localhost:3000/api/auth/register', fd, {
      headers: fd.getHeaders()
    });
    console.log("Success:", res.data);
  } catch (err) {
    console.error("Error:", err.response ? err.response.data : err.message);
  }
}

test();
