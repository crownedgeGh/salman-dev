const axios = require('axios');
const FormData = require('form-data');

async function test() {
  const fd = new FormData();
  fd.append('name', 'Test Broker');
  fd.append('phone', '9999999999');
  fd.append('role', 'broker');
  fd.append('city', 'Test City');

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
