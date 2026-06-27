// ─── Admin Mock Data ────────────────────────────────────────────────────────

export const MOCK_USERS = [
  { id: 1, username: "rahul_sharma", email: "rahul.sharma@gmail.com", location: "Raipur, Chhattisgarh", propertiesListed: 5, status: "Active", avatar: "RS", joinDate: "2024-01-15" },
  { id: 2, username: "priya_verma", email: "priya.verma@gmail.com", location: "Durg, Chhattisgarh", propertiesListed: 3, status: "Active", avatar: "PV", joinDate: "2024-02-20" },
  { id: 3, username: "amit_sahu", email: "amit.sahu@gmail.com", location: "Bhilai, Chhattisgarh", propertiesListed: 8, status: "Active", avatar: "AS", joinDate: "2024-03-05" },
  { id: 4, username: "sneha_patel", email: "sneha.patel@yahoo.com", location: "Raipur, Chhattisgarh", propertiesListed: 2, status: "Blocked", avatar: "SP", joinDate: "2024-03-18" },
  { id: 5, username: "vikram_yadav", email: "vikram.yadav@gmail.com", location: "Bilaspur, Chhattisgarh", propertiesListed: 6, status: "Active", avatar: "VY", joinDate: "2024-04-01" },
  { id: 6, username: "anjali_gupta", email: "anjali.gupta@gmail.com", location: "Korba, Chhattisgarh", propertiesListed: 1, status: "Active", avatar: "AG", joinDate: "2024-04-12" },
  { id: 7, username: "rohit_tiwari", email: "rohit.tiwari@gmail.com", location: "Rajnandgaon, Chhattisgarh", propertiesListed: 4, status: "Active", avatar: "RT", joinDate: "2024-04-25" },
  { id: 8, username: "kavita_dewangan", email: "kavita.d@gmail.com", location: "Jagdalpur, Chhattisgarh", propertiesListed: 0, status: "Blocked", avatar: "KD", joinDate: "2024-05-08" },
  { id: 9, username: "suresh_chandrakar", email: "suresh.c@gmail.com", location: "Raipur, Chhattisgarh", propertiesListed: 7, status: "Active", avatar: "SC", joinDate: "2024-05-20" },
  { id: 10, username: "deepika_kosare", email: "deepika.k@gmail.com", location: "Bhilai, Chhattisgarh", propertiesListed: 3, status: "Active", avatar: "DK", joinDate: "2024-06-01" },
  { id: 11, username: "manish_soni", email: "manish.soni@gmail.com", location: "Durg, Chhattisgarh", propertiesListed: 9, status: "Active", avatar: "MS", joinDate: "2024-06-14" },
  { id: 12, username: "neha_thakur", email: "neha.thakur@gmail.com", location: "Raipur, Chhattisgarh", propertiesListed: 2, status: "Active", avatar: "NT", joinDate: "2024-06-28" },
  { id: 13, username: "dinesh_kurre", email: "dinesh.kurre@gmail.com", location: "Ambikapur, Chhattisgarh", propertiesListed: 5, status: "Active", avatar: "DK2", joinDate: "2024-07-10" },
  { id: 14, username: "pooja_netam", email: "pooja.netam@gmail.com", location: "Raigarh, Chhattisgarh", propertiesListed: 1, status: "Active", avatar: "PN", joinDate: "2024-07-22" },
  { id: 15, username: "ajay_banjare", email: "ajay.banjare@gmail.com", location: "Korba, Chhattisgarh", propertiesListed: 6, status: "Blocked", avatar: "AB", joinDate: "2024-08-05" },
  { id: 16, username: "ritu_markam", email: "ritu.markam@gmail.com", location: "Bilaspur, Chhattisgarh", propertiesListed: 4, status: "Active", avatar: "RM", joinDate: "2024-08-18" },
  { id: 17, username: "sandeep_nishad", email: "sandeep.n@gmail.com", location: "Raipur, Chhattisgarh", propertiesListed: 3, status: "Active", avatar: "SN", joinDate: "2024-09-01" },
  { id: 18, username: "lata_baghel", email: "lata.baghel@gmail.com", location: "Bhilai, Chhattisgarh", propertiesListed: 2, status: "Active", avatar: "LB", joinDate: "2024-09-14" },
  { id: 19, username: "rakesh_mandavi", email: "rakesh.m@gmail.com", location: "Jagdalpur, Chhattisgarh", propertiesListed: 7, status: "Active", avatar: "RM2", joinDate: "2024-09-27" },
  { id: 20, username: "sunita_porte", email: "sunita.porte@gmail.com", location: "Raipur, Chhattisgarh", propertiesListed: 0, status: "Active", avatar: "SP2", joinDate: "2024-10-10" },
  { id: 21, username: "kiran_dhruv", email: "kiran.dhruv@gmail.com", location: "Durg, Chhattisgarh", propertiesListed: 11, status: "Active", avatar: "KD3", joinDate: "2024-10-22" },
  { id: 22, username: "yogesh_sahu", email: "yogesh.sahu@gmail.com", location: "Raipur, Chhattisgarh", propertiesListed: 5, status: "Active", avatar: "YS", joinDate: "2024-11-05" },
];

export const MOCK_PROPERTIES = [
  { id: 1, title: "3 BHK Flat in Shankar Nagar", type: "Apartment", location: "Shankar Nagar, Raipur", price: "₹68 Lac", status: "Active", owner: "rahul_sharma", dateListed: "2024-11-01", thumbnail: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=80&h=60&fit=crop" },
  { id: 2, title: "Independent House in Telibandha", type: "House", location: "Telibandha, Raipur", price: "₹1.2 Cr", status: "Active", owner: "amit_sahu", dateListed: "2024-11-03", thumbnail: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=80&h=60&fit=crop" },
  { id: 3, title: "Commercial Plot in GE Road", type: "Plot", location: "GE Road, Raipur", price: "₹95 Lac", status: "Sold", owner: "vikram_yadav", dateListed: "2024-10-15", thumbnail: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=80&h=60&fit=crop" },
  { id: 4, title: "Villa in Avanti Vihar", type: "Villa", location: "Avanti Vihar, Raipur", price: "₹2.5 Cr", status: "Active", owner: "suresh_chandrakar", dateListed: "2024-11-08", thumbnail: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=80&h=60&fit=crop" },
  { id: 5, title: "2 BHK in Kota Raipur", type: "Apartment", location: "Kota, Raipur", price: "₹42 Lac", status: "Pending", owner: "deepika_kosare", dateListed: "2024-11-10", thumbnail: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=80&h=60&fit=crop" },
  { id: 6, title: "Duplex in Tatibandh", type: "House", location: "Tatibandh, Raipur", price: "₹85 Lac", status: "Active", owner: "manish_soni", dateListed: "2024-11-12", thumbnail: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=80&h=60&fit=crop" },
  { id: 7, title: "Residential Plot in Mowa", type: "Plot", location: "Mowa, Raipur", price: "₹38 Lac", status: "Active", owner: "dinesh_kurre", dateListed: "2024-11-14", thumbnail: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=80&h=60&fit=crop" },
  { id: 8, title: "4 BHK House in Civil Lines", type: "House", location: "Civil Lines, Raipur", price: "₹1.8 Cr", status: "Sold", owner: "kiran_dhruv", dateListed: "2024-10-28", thumbnail: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=80&h=60&fit=crop" },
  { id: 9, title: "Flat in Pandri Raipur", type: "Apartment", location: "Pandri, Raipur", price: "₹55 Lac", status: "Active", owner: "yogesh_sahu", dateListed: "2024-11-16", thumbnail: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=80&h=60&fit=crop" },
  { id: 10, title: "House in Supela Bhilai", type: "House", location: "Supela, Bhilai", price: "₹72 Lac", status: "Pending", owner: "sandeep_nishad", dateListed: "2024-11-18", thumbnail: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=80&h=60&fit=crop" },
  { id: 11, title: "Office Space in Magneto Mall Area", type: "Commercial", location: "VIP Road, Raipur", price: "₹1.1 Cr", status: "Active", owner: "priya_verma", dateListed: "2024-11-20", thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=80&h=60&fit=crop" },
  { id: 12, title: "Row House in Sector 29 Bhilai", type: "House", location: "Sector 29, Bhilai", price: "₹62 Lac", status: "Active", owner: "sneha_patel", dateListed: "2024-11-22", thumbnail: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=80&h=60&fit=crop" },
  { id: 13, title: "1 BHK in Amanaka Raipur", type: "Apartment", location: "Amanaka, Raipur", price: "₹28 Lac", status: "Active", owner: "anjali_gupta", dateListed: "2024-11-24", thumbnail: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=80&h=60&fit=crop" },
  { id: 14, title: "Warehouse in Urla Industrial Area", type: "Industrial", location: "Urla, Raipur", price: "₹3.2 Cr", status: "Sold", owner: "rohit_tiwari", dateListed: "2024-10-20", thumbnail: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=80&h=60&fit=crop" },
  { id: 15, title: "Bungalow in Pachpedi Naka", type: "House", location: "Pachpedi Naka, Raipur", price: "₹1.45 Cr", status: "Pending", owner: "ritu_markam", dateListed: "2024-11-26", thumbnail: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=80&h=60&fit=crop" },
  { id: 16, title: "Luxury Flat in New Rajendra Nagar", type: "Apartment", location: "Rajendra Nagar, Raipur", price: "₹88 Lac", status: "Active", owner: "pooja_netam", dateListed: "2024-11-28", thumbnail: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=80&h=60&fit=crop" },
  { id: 17, title: "Farmhouse near Naya Raipur", type: "Farmhouse", location: "Naya Raipur, Chhattisgarh", price: "₹4.5 Cr", status: "Active", owner: "ajay_banjare", dateListed: "2024-11-30", thumbnail: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=80&h=60&fit=crop" },
  { id: 18, title: "Shop in Shastri Bazaar", type: "Commercial", location: "Shastri Bazaar, Raipur", price: "₹35 Lac", status: "Sold", owner: "lata_baghel", dateListed: "2024-11-05", thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=80&h=60&fit=crop" },
  { id: 19, title: "3 BHK in Sunder Nagar Bilaspur", type: "Apartment", location: "Sunder Nagar, Bilaspur", price: "₹58 Lac", status: "Active", owner: "rakesh_mandavi", dateListed: "2024-12-02", thumbnail: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=80&h=60&fit=crop" },
  { id: 20, title: "Corner Plot in Devendra Nagar", type: "Plot", location: "Devendra Nagar, Raipur", price: "₹52 Lac", status: "Active", owner: "sunita_porte", dateListed: "2024-12-04", thumbnail: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=80&h=60&fit=crop" },
  { id: 21, title: "Premium Flat in Katora Talab Area", type: "Apartment", location: "Katora Talab, Raipur", price: "₹75 Lac", status: "Active", owner: "neha_thakur", dateListed: "2024-12-06", thumbnail: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=80&h=60&fit=crop" },
];

export const MOCK_ADS = [
  { id: 1, title: "Raipur Property Fair 2025", format: "Banner", status: "Active", impressions: 12400, clicks: 842, owner: "manish_soni", expiryDate: "2025-02-28" },
  { id: 2, title: "Naya Raipur Plots Launch", format: "Story", status: "Active", impressions: 8750, clicks: 632, owner: "amit_sahu", expiryDate: "2025-01-31" },
  { id: 3, title: "Bhilai Housing Scheme", format: "Banner", status: "Paused", impressions: 5200, clicks: 318, owner: "suresh_chandrakar", expiryDate: "2025-03-15" },
  { id: 4, title: "Tatibandh Apartments", format: "Story", status: "Active", impressions: 9800, clicks: 741, owner: "rahul_sharma", expiryDate: "2025-02-14" },
  { id: 5, title: "Civil Lines Luxury Homes", format: "Banner", status: "Active", impressions: 15600, clicks: 1120, owner: "dinesh_kurre", expiryDate: "2025-01-20" },
  { id: 6, title: "Urla Industrial Spaces", format: "Story", status: "Expired", impressions: 4100, clicks: 198, owner: "priya_verma", expiryDate: "2024-12-01" },
  { id: 7, title: "Avanti Vihar Villas", format: "Banner", status: "Active", impressions: 6700, clicks: 445, owner: "kiran_dhruv", expiryDate: "2025-04-30" },
  { id: 8, title: "Mowa Plots for Sale", format: "Story", status: "Paused", impressions: 3200, clicks: 187, owner: "vikram_yadav", expiryDate: "2025-03-01" },
  { id: 9, title: "New Year Raipur Deals", format: "Banner", status: "Active", impressions: 18900, clicks: 1540, owner: "deepika_kosare", expiryDate: "2025-01-10" },
  { id: 10, title: "Shankar Nagar Flats", format: "Story", status: "Active", impressions: 7400, clicks: 580, owner: "yogesh_sahu", expiryDate: "2025-02-20" },
  { id: 11, title: "Affordable Homes Durg", format: "Banner", status: "Expired", impressions: 2900, clicks: 145, owner: "anjali_gupta", expiryDate: "2024-11-30" },
];

// ─── Activity Feed ─────────────────────────────────────────────────────────

export const MOCK_ACTIVITY = [
  { id: 1, type: "user", icon: "UserPlus", message: "New user registered: sunita_porte", time: "2 minutes ago" },
  { id: 2, type: "property", icon: "Home", message: "Property listed: Premium Flat in Katora Talab, Raipur", time: "18 minutes ago" },
  { id: 3, type: "ad", icon: "Megaphone", message: "Ad approved: New Year Raipur Deals by deepika_kosare", time: "45 minutes ago" },
  { id: 4, type: "user", icon: "UserX", message: "User blocked: ajay_banjare (policy violation)", time: "1 hour ago" },
  { id: 5, type: "property", icon: "CheckCircle", message: "Property marked Sold: 4 BHK House in Civil Lines, Raipur", time: "2 hours ago" },
  { id: 6, type: "ad", icon: "PauseCircle", message: "Ad paused: Mowa Plots for Sale by vikram_yadav", time: "3 hours ago" },
  { id: 7, type: "property", icon: "Home", message: "Property listed: Corner Plot in Devendra Nagar, Raipur", time: "4 hours ago" },
  { id: 8, type: "user", icon: "UserPlus", message: "New user registered: rakesh_mandavi", time: "5 hours ago" },
];

// ─── Chart Data ────────────────────────────────────────────────────────────

const generateDateSeries = () => {
  const data = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const label = date.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
    data.push({
      date: label,
      users: Math.floor(Math.random() * 8) + 2,
      properties: Math.floor(Math.random() * 5) + 1,
    });
  }
  return data;
};

export const CHART_ACTIVITY = generateDateSeries();

export const CHART_ADS = [
  { name: "New Year Deals", impressions: 18900, clicks: 1540 },
  { name: "Civil Lines Homes", impressions: 15600, clicks: 1120 },
  { name: "Raipur Property Fair", impressions: 12400, clicks: 842 },
  { name: "Tatibandh Apts", impressions: 9800, clicks: 741 },
  { name: "Naya Raipur Plots", impressions: 8750, clicks: 632 },
];

// ─── KPI Stats ─────────────────────────────────────────────────────────────

export const MOCK_STATS = {
  totalUsers: { value: 22, change: +12.5, label: "Total Users" },
  propertiesListed: { value: 21, change: +8.3, label: "Properties Listed" },
  activeAds: { value: 7, change: -4.2, label: "Active Ads" },
  revenue: { value: "₹4.8L", change: +22.1, label: "Total Revenue" },
};
