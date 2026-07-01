const http = require('http');

async function makeRequest(method, url, data) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  
  if (data) {
    options.body = JSON.stringify(data);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2000);
  options.signal = controller.signal;

  let response;
  try {
    response = await fetch(`http://localhost:3000${url}`, options);
    clearTimeout(timeout);
  } catch (e) {
    clearTimeout(timeout);
    return { status: 'Timeout/Error', data: { error: e.message } };
  }
  
  const text = await response.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch (e) {
    json = { error: 'Non-JSON response', body: text };
  }
  
  return { status: response.status, data: json };
}

async function runTests() {
  console.log('=== STARTING API TESTS ===\\n');

  // 1. REGISTER APIs
  console.log('--- Registering Users ---');
  const userPayloads = [
    { name: 'Ramesh Broker', email: 'ramesh.broker@example.com', password: 'pass', role: 'broker', city: 'Raipur', phone: '9876543210' },
    { name: 'Suresh Broker', email: 'suresh.broker@example.com', password: 'pass', role: 'broker', city: 'Bhilai', phone: '9876543211' },
    { name: 'Mahesh Broker', email: 'mahesh.broker@example.com', password: 'pass', role: 'broker', city: 'Bilaspur', phone: '9876543212' },
    
    { name: 'Anita Owner', email: 'anita.owner@example.com', password: 'pass', role: 'owner', city: 'Raipur' },
    { name: 'Sunita Owner', email: 'sunita.owner@example.com', password: 'pass', role: 'owner', city: 'Durg' },
    { name: 'Kavita Owner', email: 'kavita.owner@example.com', password: 'pass', role: 'owner', city: 'Raipur' },
    
    { name: 'Rahul Buyer', email: 'rahul.buyer@example.com', password: 'pass', role: 'buyer', city: 'Raipur' },
    { name: 'Amit Buyer', email: 'amit.buyer@example.com', password: 'pass', role: 'buyer', city: 'Korba' },
    { name: 'Sumit Buyer', email: 'sumit.buyer@example.com', password: 'pass', role: 'buyer', city: 'Raigarh' }
  ];

  for (let payload of userPayloads) {
    const res = await makeRequest('POST', '/api/auth/register', payload);
    console.log(`Registered ${payload.role} (${payload.name}): Status ${res.status}`);
  }

  // 2. PROPERTIES CRUD
  console.log('\\n--- Properties CRUD ---');
  const propertyPayloads = [
    { title: '3 BHK Flat in Shankar Nagar', type: 'Apartment', purpose: 'Sale', city: 'Raipur', locality: 'Shankar Nagar', price: '4500000', area: '1200 sqft' },
    { title: 'Commercial Shop in Pandri', type: 'Shop', purpose: 'Rent', city: 'Raipur', locality: 'Pandri', price: '25000', area: '300 sqft' },
    { title: 'Independent House in VIP Road', type: 'House', purpose: 'Sale', city: 'Raipur', locality: 'VIP Road', price: '12000000', area: '2500 sqft' }
  ];

  let propIds = [];
  // Create
  for (let payload of propertyPayloads) {
    const res = await makeRequest('POST', '/api/properties', payload);
    console.log(`Created Property (${payload.title}): Status ${res.status}`);
    if (res.data && res.data._id) propIds.push(res.data._id);
  }

  // Get All
  const getProps = await makeRequest('GET', '/api/properties');
  console.log(`Fetched ${getProps.data?.length || 0} Properties: Status ${getProps.status}`);

  if (propIds.length > 0) {
    // Edit
    console.log(`Sending PUT to /api/properties/${propIds[0]}`);
    const editPropRes = await makeRequest('PUT', `/api/properties/${propIds[0]}`, { price: '5000000', description: 'Updated price!' });
    console.log(`Edited Property [${propIds[0]}]: Status ${editPropRes.status} (New price: ${editPropRes.data?.price})`);

    // Delete
    console.log(`Sending DELETE to /api/properties/${propIds[propIds.length - 1]}`);
    const delPropRes = await makeRequest('DELETE', `/api/properties/${propIds[propIds.length - 1]}`);
    console.log(`Deleted Property [${propIds[propIds.length - 1]}]: Status ${delPropRes.status}`);
  }

  // 3. ADS CRUD
  console.log('\\n--- Ads CRUD ---');
  const adPayloads = [
    { title: 'Premium Dealer in Raipur', type: 'Banner', budget: 5000, locationTarget: 'Raipur' },
    { title: 'Top Rated Projects 2026', type: 'Sponsored Property', budget: 10000, locationTarget: 'Chhattisgarh' },
    { title: 'Discount on Registry', type: 'Sidebar Ad', budget: 2000, locationTarget: 'Bhilai' }
  ];

  let adIds = [];
  // Create
  for (let payload of adPayloads) {
    const res = await makeRequest('POST', '/api/ads', payload);
    console.log(`Created Ad (${payload.title}): Status ${res.status}`);
    if (res.data && res.data._id) adIds.push(res.data._id);
  }

  // Get All
  const getAds = await makeRequest('GET', '/api/ads');
  console.log(`Fetched ${getAds.data?.length || 0} Ads: Status ${getAds.status}`);

  if (adIds.length > 0) {
    // Edit
    const editAdRes = await makeRequest('PUT', `/api/ads/${adIds[0]}`, { status: 'Paused', impressions: 150 });
    console.log(`Edited Ad [${adIds[0]}]: Status ${editAdRes.status} (Status: ${editAdRes.data?.status})`);

    // Delete
    const delAdRes = await makeRequest('DELETE', `/api/ads/${adIds[adIds.length - 1]}`);
    console.log(`Deleted Ad [${adIds[adIds.length - 1]}]: Status ${delAdRes.status}`);
  }

  console.log('\\n=== TESTS COMPLETED ===');
}

runTests().catch(console.error);
