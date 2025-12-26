// Global Salary Data 2025
// Data compiled from industry reports, BLS, Glassdoor, PayScale, Levels.fyi, and market research
// All figures are annual salaries in USD

export interface SalaryRange {
  min: number;
  median: number;
  max: number;
}

export interface JobSalaryData {
  title: string;
  category: string;
  salaryUSD: SalaryRange;
  experienceMultipliers: {
    entry: number; // 0-2 years
    mid: number; // 3-5 years
    senior: number; // 6-10 years
    lead: number; // 10+ years
  };
}

// Regional cost-of-living multipliers relative to US average
export const regionMultipliers: Record<string, number> = {
  // North America
  "United States": 1.0,
  "Canada": 0.85,
  "Mexico": 0.35,
  
  // Europe - Western
  "United Kingdom": 0.90,
  "Germany": 0.88,
  "France": 0.82,
  "Netherlands": 0.85,
  "Switzerland": 1.25,
  "Ireland": 0.88,
  "Belgium": 0.80,
  "Austria": 0.78,
  "Denmark": 0.95,
  "Sweden": 0.82,
  "Norway": 0.95,
  "Finland": 0.78,
  "Luxembourg": 0.90,
  
  // Europe - Southern
  "Spain": 0.55,
  "Italy": 0.60,
  "Portugal": 0.45,
  "Greece": 0.40,
  
  // Europe - Eastern
  "Poland": 0.40,
  "Czech Republic": 0.45,
  "Romania": 0.35,
  "Hungary": 0.38,
  "Ukraine": 0.25,
  "Russia": 0.35,
  
  // Asia - East
  "Japan": 0.70,
  "South Korea": 0.65,
  "China": 0.45,
  "Hong Kong": 0.85,
  "Taiwan": 0.50,
  
  // Asia - Southeast
  "Singapore": 0.80,
  "Malaysia": 0.35,
  "Thailand": 0.30,
  "Vietnam": 0.20,
  "Philippines": 0.22,
  "Indonesia": 0.25,
  
  // Asia - South
  "India": 0.25,
  "Pakistan": 0.15,
  "Bangladesh": 0.12,
  "Sri Lanka": 0.15,
  
  // Middle East
  "United Arab Emirates": 0.85,
  "Saudi Arabia": 0.75,
  "Qatar": 0.80,
  "Israel": 0.80,
  "Turkey": 0.30,
  "Egypt": 0.18,
  
  // Africa
  "South Africa": 0.35,
  "Nigeria": 0.20,
  "Kenya": 0.18,
  "Ghana": 0.15,
  "Morocco": 0.22,
  "Ethiopia": 0.12,
  "Tanzania": 0.12,
  "Rwanda": 0.14,
  "Uganda": 0.12,
  "Senegal": 0.15,
  "Ivory Coast": 0.16,
  
  // Oceania
  "Australia": 0.90,
  "New Zealand": 0.75,
  
  // South America
  "Brazil": 0.35,
  "Argentina": 0.30,
  "Chile": 0.40,
  "Colombia": 0.28,
  "Peru": 0.25,
  "Ecuador": 0.22,
  
  // Central America & Caribbean
  "Costa Rica": 0.35,
  "Panama": 0.38,
  "Jamaica": 0.25,
  "Trinidad and Tobago": 0.35,
};

export const salaryData2025: JobSalaryData[] = [
  // ============ TECHNOLOGY & SOFTWARE ============
  {
    title: "Software Engineer",
    category: "Technology",
    salaryUSD: { min: 75000, median: 120000, max: 180000 },
    experienceMultipliers: { entry: 0.65, mid: 1.0, senior: 1.35, lead: 1.65 }
  },
  {
    title: "Senior Software Engineer",
    category: "Technology",
    salaryUSD: { min: 120000, median: 165000, max: 220000 },
    experienceMultipliers: { entry: 0.85, mid: 1.0, senior: 1.2, lead: 1.4 }
  },
  {
    title: "Staff Software Engineer",
    category: "Technology",
    salaryUSD: { min: 180000, median: 240000, max: 350000 },
    experienceMultipliers: { entry: 0.9, mid: 1.0, senior: 1.15, lead: 1.3 }
  },
  {
    title: "Principal Software Engineer",
    category: "Technology",
    salaryUSD: { min: 220000, median: 300000, max: 450000 },
    experienceMultipliers: { entry: 0.9, mid: 1.0, senior: 1.1, lead: 1.25 }
  },
  {
    title: "Frontend Developer",
    category: "Technology",
    salaryUSD: { min: 65000, median: 105000, max: 160000 },
    experienceMultipliers: { entry: 0.65, mid: 1.0, senior: 1.35, lead: 1.6 }
  },
  {
    title: "Backend Developer",
    category: "Technology",
    salaryUSD: { min: 70000, median: 115000, max: 175000 },
    experienceMultipliers: { entry: 0.65, mid: 1.0, senior: 1.35, lead: 1.6 }
  },
  {
    title: "Full Stack Developer",
    category: "Technology",
    salaryUSD: { min: 70000, median: 115000, max: 175000 },
    experienceMultipliers: { entry: 0.65, mid: 1.0, senior: 1.35, lead: 1.6 }
  },
  {
    title: "Mobile Developer",
    category: "Technology",
    salaryUSD: { min: 70000, median: 120000, max: 180000 },
    experienceMultipliers: { entry: 0.65, mid: 1.0, senior: 1.35, lead: 1.6 }
  },
  {
    title: "iOS Developer",
    category: "Technology",
    salaryUSD: { min: 75000, median: 125000, max: 185000 },
    experienceMultipliers: { entry: 0.65, mid: 1.0, senior: 1.35, lead: 1.6 }
  },
  {
    title: "Android Developer",
    category: "Technology",
    salaryUSD: { min: 72000, median: 120000, max: 180000 },
    experienceMultipliers: { entry: 0.65, mid: 1.0, senior: 1.35, lead: 1.6 }
  },
  {
    title: "DevOps Engineer",
    category: "Technology",
    salaryUSD: { min: 85000, median: 135000, max: 195000 },
    experienceMultipliers: { entry: 0.65, mid: 1.0, senior: 1.35, lead: 1.55 }
  },
  {
    title: "Site Reliability Engineer",
    category: "Technology",
    salaryUSD: { min: 100000, median: 160000, max: 240000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Platform Engineer",
    category: "Technology",
    salaryUSD: { min: 95000, median: 150000, max: 220000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Cloud Engineer",
    category: "Technology",
    salaryUSD: { min: 85000, median: 140000, max: 200000 },
    experienceMultipliers: { entry: 0.65, mid: 1.0, senior: 1.35, lead: 1.55 }
  },
  {
    title: "Cloud Architect",
    category: "Technology",
    salaryUSD: { min: 140000, median: 185000, max: 280000 },
    experienceMultipliers: { entry: 0.8, mid: 1.0, senior: 1.2, lead: 1.4 }
  },
  {
    title: "Solutions Architect",
    category: "Technology",
    salaryUSD: { min: 130000, median: 175000, max: 260000 },
    experienceMultipliers: { entry: 0.8, mid: 1.0, senior: 1.2, lead: 1.4 }
  },
  {
    title: "Enterprise Architect",
    category: "Technology",
    salaryUSD: { min: 150000, median: 200000, max: 300000 },
    experienceMultipliers: { entry: 0.85, mid: 1.0, senior: 1.15, lead: 1.35 }
  },
  {
    title: "QA Engineer",
    category: "Technology",
    salaryUSD: { min: 55000, median: 85000, max: 130000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "QA Automation Engineer",
    category: "Technology",
    salaryUSD: { min: 70000, median: 105000, max: 155000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "SDET",
    category: "Technology",
    salaryUSD: { min: 80000, median: 120000, max: 175000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Technical Writer",
    category: "Technology",
    salaryUSD: { min: 55000, median: 80000, max: 120000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.25, lead: 1.45 }
  },
  {
    title: "Engineering Manager",
    category: "Technology",
    salaryUSD: { min: 150000, median: 200000, max: 300000 },
    experienceMultipliers: { entry: 0.85, mid: 1.0, senior: 1.15, lead: 1.35 }
  },
  {
    title: "VP of Engineering",
    category: "Technology",
    salaryUSD: { min: 250000, median: 350000, max: 550000 },
    experienceMultipliers: { entry: 0.9, mid: 1.0, senior: 1.1, lead: 1.25 }
  },
  {
    title: "CTO",
    category: "Technology",
    salaryUSD: { min: 200000, median: 320000, max: 600000 },
    experienceMultipliers: { entry: 0.85, mid: 1.0, senior: 1.15, lead: 1.4 }
  },

  // ============ AI & DATA ============
  {
    title: "AI Engineer",
    category: "AI & Data",
    salaryUSD: { min: 130000, median: 200000, max: 350000 },
    experienceMultipliers: { entry: 0.6, mid: 1.0, senior: 1.4, lead: 1.75 }
  },
  {
    title: "Machine Learning Engineer",
    category: "AI & Data",
    salaryUSD: { min: 120000, median: 185000, max: 320000 },
    experienceMultipliers: { entry: 0.6, mid: 1.0, senior: 1.4, lead: 1.7 }
  },
  {
    title: "Deep Learning Engineer",
    category: "AI & Data",
    salaryUSD: { min: 130000, median: 200000, max: 350000 },
    experienceMultipliers: { entry: 0.6, mid: 1.0, senior: 1.4, lead: 1.75 }
  },
  {
    title: "MLOps Engineer",
    category: "AI & Data",
    salaryUSD: { min: 110000, median: 165000, max: 250000 },
    experienceMultipliers: { entry: 0.65, mid: 1.0, senior: 1.35, lead: 1.6 }
  },
  {
    title: "Data Scientist",
    category: "AI & Data",
    salaryUSD: { min: 90000, median: 145000, max: 220000 },
    experienceMultipliers: { entry: 0.6, mid: 1.0, senior: 1.4, lead: 1.65 }
  },
  {
    title: "Senior Data Scientist",
    category: "AI & Data",
    salaryUSD: { min: 140000, median: 185000, max: 280000 },
    experienceMultipliers: { entry: 0.85, mid: 1.0, senior: 1.2, lead: 1.4 }
  },
  {
    title: "Data Engineer",
    category: "AI & Data",
    salaryUSD: { min: 85000, median: 135000, max: 200000 },
    experienceMultipliers: { entry: 0.65, mid: 1.0, senior: 1.35, lead: 1.55 }
  },
  {
    title: "Data Analyst",
    category: "AI & Data",
    salaryUSD: { min: 55000, median: 80000, max: 120000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Business Intelligence Analyst",
    category: "AI & Data",
    salaryUSD: { min: 60000, median: 90000, max: 135000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Data Architect",
    category: "AI & Data",
    salaryUSD: { min: 120000, median: 165000, max: 240000 },
    experienceMultipliers: { entry: 0.8, mid: 1.0, senior: 1.2, lead: 1.4 }
  },
  {
    title: "Research Scientist",
    category: "AI & Data",
    salaryUSD: { min: 140000, median: 220000, max: 400000 },
    experienceMultipliers: { entry: 0.6, mid: 1.0, senior: 1.4, lead: 1.8 }
  },
  {
    title: "NLP Engineer",
    category: "AI & Data",
    salaryUSD: { min: 120000, median: 180000, max: 280000 },
    experienceMultipliers: { entry: 0.65, mid: 1.0, senior: 1.35, lead: 1.6 }
  },
  {
    title: "Computer Vision Engineer",
    category: "AI & Data",
    salaryUSD: { min: 120000, median: 180000, max: 280000 },
    experienceMultipliers: { entry: 0.65, mid: 1.0, senior: 1.35, lead: 1.6 }
  },

  // ============ CYBERSECURITY ============
  {
    title: "Security Engineer",
    category: "Cybersecurity",
    salaryUSD: { min: 90000, median: 140000, max: 200000 },
    experienceMultipliers: { entry: 0.65, mid: 1.0, senior: 1.35, lead: 1.55 }
  },
  {
    title: "Security Analyst",
    category: "Cybersecurity",
    salaryUSD: { min: 65000, median: 95000, max: 140000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Penetration Tester",
    category: "Cybersecurity",
    salaryUSD: { min: 80000, median: 120000, max: 180000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Security Architect",
    category: "Cybersecurity",
    salaryUSD: { min: 140000, median: 185000, max: 270000 },
    experienceMultipliers: { entry: 0.8, mid: 1.0, senior: 1.2, lead: 1.4 }
  },
  {
    title: "CISO",
    category: "Cybersecurity",
    salaryUSD: { min: 200000, median: 320000, max: 500000 },
    experienceMultipliers: { entry: 0.85, mid: 1.0, senior: 1.15, lead: 1.35 }
  },
  {
    title: "SOC Analyst",
    category: "Cybersecurity",
    salaryUSD: { min: 55000, median: 80000, max: 120000 },
    experienceMultipliers: { entry: 0.75, mid: 1.0, senior: 1.25, lead: 1.45 }
  },
  {
    title: "Threat Intelligence Analyst",
    category: "Cybersecurity",
    salaryUSD: { min: 75000, median: 110000, max: 160000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Application Security Engineer",
    category: "Cybersecurity",
    salaryUSD: { min: 100000, median: 150000, max: 220000 },
    experienceMultipliers: { entry: 0.65, mid: 1.0, senior: 1.35, lead: 1.55 }
  },
  {
    title: "Cloud Security Engineer",
    category: "Cybersecurity",
    salaryUSD: { min: 110000, median: 160000, max: 230000 },
    experienceMultipliers: { entry: 0.65, mid: 1.0, senior: 1.35, lead: 1.55 }
  },

  // ============ PRODUCT & DESIGN ============
  {
    title: "Product Manager",
    category: "Product & Design",
    salaryUSD: { min: 100000, median: 150000, max: 220000 },
    experienceMultipliers: { entry: 0.65, mid: 1.0, senior: 1.35, lead: 1.6 }
  },
  {
    title: "Senior Product Manager",
    category: "Product & Design",
    salaryUSD: { min: 140000, median: 190000, max: 280000 },
    experienceMultipliers: { entry: 0.85, mid: 1.0, senior: 1.2, lead: 1.4 }
  },
  {
    title: "Director of Product",
    category: "Product & Design",
    salaryUSD: { min: 180000, median: 250000, max: 380000 },
    experienceMultipliers: { entry: 0.9, mid: 1.0, senior: 1.1, lead: 1.25 }
  },
  {
    title: "VP of Product",
    category: "Product & Design",
    salaryUSD: { min: 220000, median: 320000, max: 480000 },
    experienceMultipliers: { entry: 0.9, mid: 1.0, senior: 1.1, lead: 1.25 }
  },
  {
    title: "Chief Product Officer",
    category: "Product & Design",
    salaryUSD: { min: 280000, median: 400000, max: 650000 },
    experienceMultipliers: { entry: 0.9, mid: 1.0, senior: 1.1, lead: 1.2 }
  },
  {
    title: "Product Designer",
    category: "Product & Design",
    salaryUSD: { min: 75000, median: 115000, max: 170000 },
    experienceMultipliers: { entry: 0.65, mid: 1.0, senior: 1.35, lead: 1.55 }
  },
  {
    title: "Senior Product Designer",
    category: "Product & Design",
    salaryUSD: { min: 120000, median: 160000, max: 220000 },
    experienceMultipliers: { entry: 0.85, mid: 1.0, senior: 1.2, lead: 1.35 }
  },
  {
    title: "UX Designer",
    category: "Product & Design",
    salaryUSD: { min: 65000, median: 100000, max: 150000 },
    experienceMultipliers: { entry: 0.65, mid: 1.0, senior: 1.35, lead: 1.55 }
  },
  {
    title: "UI Designer",
    category: "Product & Design",
    salaryUSD: { min: 60000, median: 90000, max: 140000 },
    experienceMultipliers: { entry: 0.65, mid: 1.0, senior: 1.35, lead: 1.55 }
  },
  {
    title: "UX Researcher",
    category: "Product & Design",
    salaryUSD: { min: 70000, median: 110000, max: 165000 },
    experienceMultipliers: { entry: 0.65, mid: 1.0, senior: 1.35, lead: 1.55 }
  },
  {
    title: "Design Lead",
    category: "Product & Design",
    salaryUSD: { min: 130000, median: 175000, max: 250000 },
    experienceMultipliers: { entry: 0.85, mid: 1.0, senior: 1.15, lead: 1.35 }
  },
  {
    title: "Head of Design",
    category: "Product & Design",
    salaryUSD: { min: 180000, median: 250000, max: 380000 },
    experienceMultipliers: { entry: 0.9, mid: 1.0, senior: 1.1, lead: 1.25 }
  },
  {
    title: "Graphic Designer",
    category: "Product & Design",
    salaryUSD: { min: 40000, median: 58000, max: 85000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Motion Designer",
    category: "Product & Design",
    salaryUSD: { min: 55000, median: 85000, max: 130000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Brand Designer",
    category: "Product & Design",
    salaryUSD: { min: 55000, median: 80000, max: 120000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },

  // ============ MARKETING ============
  {
    title: "Marketing Manager",
    category: "Marketing",
    salaryUSD: { min: 65000, median: 100000, max: 150000 },
    experienceMultipliers: { entry: 0.65, mid: 1.0, senior: 1.35, lead: 1.55 }
  },
  {
    title: "Marketing Director",
    category: "Marketing",
    salaryUSD: { min: 120000, median: 170000, max: 250000 },
    experienceMultipliers: { entry: 0.85, mid: 1.0, senior: 1.15, lead: 1.35 }
  },
  {
    title: "CMO",
    category: "Marketing",
    salaryUSD: { min: 200000, median: 320000, max: 550000 },
    experienceMultipliers: { entry: 0.85, mid: 1.0, senior: 1.15, lead: 1.35 }
  },
  {
    title: "Digital Marketing Manager",
    category: "Marketing",
    salaryUSD: { min: 55000, median: 85000, max: 130000 },
    experienceMultipliers: { entry: 0.65, mid: 1.0, senior: 1.35, lead: 1.55 }
  },
  {
    title: "Content Marketing Manager",
    category: "Marketing",
    salaryUSD: { min: 55000, median: 85000, max: 125000 },
    experienceMultipliers: { entry: 0.65, mid: 1.0, senior: 1.35, lead: 1.55 }
  },
  {
    title: "SEO Specialist",
    category: "Marketing",
    salaryUSD: { min: 45000, median: 70000, max: 110000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "SEO Manager",
    category: "Marketing",
    salaryUSD: { min: 65000, median: 95000, max: 140000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "PPC Specialist",
    category: "Marketing",
    salaryUSD: { min: 45000, median: 65000, max: 100000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Social Media Manager",
    category: "Marketing",
    salaryUSD: { min: 42000, median: 62000, max: 95000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Brand Manager",
    category: "Marketing",
    salaryUSD: { min: 70000, median: 105000, max: 160000 },
    experienceMultipliers: { entry: 0.65, mid: 1.0, senior: 1.35, lead: 1.55 }
  },
  {
    title: "Growth Marketing Manager",
    category: "Marketing",
    salaryUSD: { min: 80000, median: 120000, max: 180000 },
    experienceMultipliers: { entry: 0.65, mid: 1.0, senior: 1.35, lead: 1.55 }
  },
  {
    title: "Product Marketing Manager",
    category: "Marketing",
    salaryUSD: { min: 90000, median: 135000, max: 200000 },
    experienceMultipliers: { entry: 0.65, mid: 1.0, senior: 1.35, lead: 1.55 }
  },
  {
    title: "Marketing Analyst",
    category: "Marketing",
    salaryUSD: { min: 50000, median: 72000, max: 105000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Email Marketing Specialist",
    category: "Marketing",
    salaryUSD: { min: 45000, median: 65000, max: 95000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Copywriter",
    category: "Marketing",
    salaryUSD: { min: 45000, median: 65000, max: 100000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Content Strategist",
    category: "Marketing",
    salaryUSD: { min: 60000, median: 90000, max: 135000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Communications Manager",
    category: "Marketing",
    salaryUSD: { min: 60000, median: 90000, max: 135000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Public Relations Manager",
    category: "Marketing",
    salaryUSD: { min: 65000, median: 95000, max: 145000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },

  // ============ SALES ============
  {
    title: "Sales Representative",
    category: "Sales",
    salaryUSD: { min: 40000, median: 60000, max: 95000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Account Executive",
    category: "Sales",
    salaryUSD: { min: 55000, median: 90000, max: 150000 },
    experienceMultipliers: { entry: 0.65, mid: 1.0, senior: 1.4, lead: 1.65 }
  },
  {
    title: "Senior Account Executive",
    category: "Sales",
    salaryUSD: { min: 85000, median: 130000, max: 200000 },
    experienceMultipliers: { entry: 0.8, mid: 1.0, senior: 1.25, lead: 1.45 }
  },
  {
    title: "Account Manager",
    category: "Sales",
    salaryUSD: { min: 50000, median: 75000, max: 115000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Sales Manager",
    category: "Sales",
    salaryUSD: { min: 75000, median: 115000, max: 175000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Sales Director",
    category: "Sales",
    salaryUSD: { min: 120000, median: 180000, max: 280000 },
    experienceMultipliers: { entry: 0.85, mid: 1.0, senior: 1.15, lead: 1.35 }
  },
  {
    title: "VP of Sales",
    category: "Sales",
    salaryUSD: { min: 180000, median: 280000, max: 450000 },
    experienceMultipliers: { entry: 0.9, mid: 1.0, senior: 1.1, lead: 1.25 }
  },
  {
    title: "Chief Revenue Officer",
    category: "Sales",
    salaryUSD: { min: 250000, median: 380000, max: 600000 },
    experienceMultipliers: { entry: 0.9, mid: 1.0, senior: 1.1, lead: 1.2 }
  },
  {
    title: "Business Development Manager",
    category: "Sales",
    salaryUSD: { min: 65000, median: 100000, max: 155000 },
    experienceMultipliers: { entry: 0.65, mid: 1.0, senior: 1.35, lead: 1.55 }
  },
  {
    title: "Business Development Representative",
    category: "Sales",
    salaryUSD: { min: 40000, median: 58000, max: 85000 },
    experienceMultipliers: { entry: 0.75, mid: 1.0, senior: 1.25, lead: 1.45 }
  },
  {
    title: "Sales Engineer",
    category: "Sales",
    salaryUSD: { min: 85000, median: 130000, max: 200000 },
    experienceMultipliers: { entry: 0.65, mid: 1.0, senior: 1.35, lead: 1.55 }
  },
  {
    title: "Solutions Consultant",
    category: "Sales",
    salaryUSD: { min: 80000, median: 120000, max: 180000 },
    experienceMultipliers: { entry: 0.65, mid: 1.0, senior: 1.35, lead: 1.55 }
  },
  {
    title: "Customer Success Manager",
    category: "Sales",
    salaryUSD: { min: 55000, median: 85000, max: 130000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Inside Sales Representative",
    category: "Sales",
    salaryUSD: { min: 38000, median: 55000, max: 85000 },
    experienceMultipliers: { entry: 0.75, mid: 1.0, senior: 1.25, lead: 1.45 }
  },
  {
    title: "Regional Sales Manager",
    category: "Sales",
    salaryUSD: { min: 90000, median: 140000, max: 220000 },
    experienceMultipliers: { entry: 0.8, mid: 1.0, senior: 1.2, lead: 1.4 }
  },

  // ============ FINANCE & ACCOUNTING ============
  {
    title: "Accountant",
    category: "Finance",
    salaryUSD: { min: 48000, median: 68000, max: 95000 },
    experienceMultipliers: { entry: 0.75, mid: 1.0, senior: 1.25, lead: 1.45 }
  },
  {
    title: "Senior Accountant",
    category: "Finance",
    salaryUSD: { min: 65000, median: 85000, max: 115000 },
    experienceMultipliers: { entry: 0.85, mid: 1.0, senior: 1.15, lead: 1.35 }
  },
  {
    title: "Staff Accountant",
    category: "Finance",
    salaryUSD: { min: 45000, median: 58000, max: 78000 },
    experienceMultipliers: { entry: 0.85, mid: 1.0, senior: 1.15, lead: 1.3 }
  },
  {
    title: "CPA",
    category: "Finance",
    salaryUSD: { min: 60000, median: 85000, max: 130000 },
    experienceMultipliers: { entry: 0.75, mid: 1.0, senior: 1.3, lead: 1.55 }
  },
  {
    title: "Controller",
    category: "Finance",
    salaryUSD: { min: 100000, median: 150000, max: 220000 },
    experienceMultipliers: { entry: 0.8, mid: 1.0, senior: 1.2, lead: 1.4 }
  },
  {
    title: "CFO",
    category: "Finance",
    salaryUSD: { min: 200000, median: 350000, max: 600000 },
    experienceMultipliers: { entry: 0.85, mid: 1.0, senior: 1.15, lead: 1.35 }
  },
  {
    title: "Financial Analyst",
    category: "Finance",
    salaryUSD: { min: 55000, median: 78000, max: 110000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Senior Financial Analyst",
    category: "Finance",
    salaryUSD: { min: 80000, median: 105000, max: 145000 },
    experienceMultipliers: { entry: 0.85, mid: 1.0, senior: 1.15, lead: 1.35 }
  },
  {
    title: "Finance Manager",
    category: "Finance",
    salaryUSD: { min: 90000, median: 130000, max: 185000 },
    experienceMultipliers: { entry: 0.8, mid: 1.0, senior: 1.2, lead: 1.4 }
  },
  {
    title: "FP&A Manager",
    category: "Finance",
    salaryUSD: { min: 100000, median: 145000, max: 200000 },
    experienceMultipliers: { entry: 0.8, mid: 1.0, senior: 1.2, lead: 1.4 }
  },
  {
    title: "Treasury Analyst",
    category: "Finance",
    salaryUSD: { min: 60000, median: 85000, max: 120000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Investment Analyst",
    category: "Finance",
    salaryUSD: { min: 70000, median: 100000, max: 150000 },
    experienceMultipliers: { entry: 0.65, mid: 1.0, senior: 1.35, lead: 1.6 }
  },
  {
    title: "Investment Banker",
    category: "Finance",
    salaryUSD: { min: 100000, median: 175000, max: 350000 },
    experienceMultipliers: { entry: 0.6, mid: 1.0, senior: 1.5, lead: 2.0 }
  },
  {
    title: "Private Equity Associate",
    category: "Finance",
    salaryUSD: { min: 120000, median: 200000, max: 350000 },
    experienceMultipliers: { entry: 0.65, mid: 1.0, senior: 1.4, lead: 1.8 }
  },
  {
    title: "Venture Capital Associate",
    category: "Finance",
    salaryUSD: { min: 100000, median: 165000, max: 280000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.35, lead: 1.65 }
  },
  {
    title: "Portfolio Manager",
    category: "Finance",
    salaryUSD: { min: 100000, median: 180000, max: 350000 },
    experienceMultipliers: { entry: 0.65, mid: 1.0, senior: 1.4, lead: 1.85 }
  },
  {
    title: "Risk Analyst",
    category: "Finance",
    salaryUSD: { min: 60000, median: 90000, max: 135000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Quantitative Analyst",
    category: "Finance",
    salaryUSD: { min: 100000, median: 175000, max: 300000 },
    experienceMultipliers: { entry: 0.6, mid: 1.0, senior: 1.45, lead: 1.8 }
  },
  {
    title: "Actuary",
    category: "Finance",
    salaryUSD: { min: 75000, median: 120000, max: 200000 },
    experienceMultipliers: { entry: 0.6, mid: 1.0, senior: 1.4, lead: 1.7 }
  },
  {
    title: "Tax Manager",
    category: "Finance",
    salaryUSD: { min: 85000, median: 120000, max: 170000 },
    experienceMultipliers: { entry: 0.75, mid: 1.0, senior: 1.25, lead: 1.45 }
  },
  {
    title: "Auditor",
    category: "Finance",
    salaryUSD: { min: 50000, median: 72000, max: 105000 },
    experienceMultipliers: { entry: 0.75, mid: 1.0, senior: 1.25, lead: 1.45 }
  },
  {
    title: "Internal Auditor",
    category: "Finance",
    salaryUSD: { min: 55000, median: 78000, max: 115000 },
    experienceMultipliers: { entry: 0.75, mid: 1.0, senior: 1.25, lead: 1.45 }
  },
  {
    title: "Bookkeeper",
    category: "Finance",
    salaryUSD: { min: 35000, median: 48000, max: 65000 },
    experienceMultipliers: { entry: 0.8, mid: 1.0, senior: 1.2, lead: 1.35 }
  },
  {
    title: "Payroll Specialist",
    category: "Finance",
    salaryUSD: { min: 40000, median: 55000, max: 75000 },
    experienceMultipliers: { entry: 0.8, mid: 1.0, senior: 1.2, lead: 1.35 }
  },

  // ============ HUMAN RESOURCES ============
  {
    title: "HR Coordinator",
    category: "Human Resources",
    salaryUSD: { min: 38000, median: 52000, max: 70000 },
    experienceMultipliers: { entry: 0.8, mid: 1.0, senior: 1.2, lead: 1.35 }
  },
  {
    title: "HR Generalist",
    category: "Human Resources",
    salaryUSD: { min: 48000, median: 65000, max: 90000 },
    experienceMultipliers: { entry: 0.75, mid: 1.0, senior: 1.25, lead: 1.45 }
  },
  {
    title: "HR Manager",
    category: "Human Resources",
    salaryUSD: { min: 70000, median: 100000, max: 145000 },
    experienceMultipliers: { entry: 0.75, mid: 1.0, senior: 1.25, lead: 1.45 }
  },
  {
    title: "HR Director",
    category: "Human Resources",
    salaryUSD: { min: 110000, median: 155000, max: 220000 },
    experienceMultipliers: { entry: 0.85, mid: 1.0, senior: 1.15, lead: 1.35 }
  },
  {
    title: "VP of HR",
    category: "Human Resources",
    salaryUSD: { min: 160000, median: 230000, max: 350000 },
    experienceMultipliers: { entry: 0.9, mid: 1.0, senior: 1.1, lead: 1.25 }
  },
  {
    title: "CHRO",
    category: "Human Resources",
    salaryUSD: { min: 220000, median: 350000, max: 550000 },
    experienceMultipliers: { entry: 0.9, mid: 1.0, senior: 1.1, lead: 1.2 }
  },
  {
    title: "Recruiter",
    category: "Human Resources",
    salaryUSD: { min: 45000, median: 65000, max: 95000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Senior Recruiter",
    category: "Human Resources",
    salaryUSD: { min: 65000, median: 90000, max: 130000 },
    experienceMultipliers: { entry: 0.85, mid: 1.0, senior: 1.15, lead: 1.35 }
  },
  {
    title: "Technical Recruiter",
    category: "Human Resources",
    salaryUSD: { min: 55000, median: 80000, max: 120000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Talent Acquisition Manager",
    category: "Human Resources",
    salaryUSD: { min: 80000, median: 115000, max: 165000 },
    experienceMultipliers: { entry: 0.8, mid: 1.0, senior: 1.2, lead: 1.4 }
  },
  {
    title: "Compensation Analyst",
    category: "Human Resources",
    salaryUSD: { min: 55000, median: 78000, max: 110000 },
    experienceMultipliers: { entry: 0.75, mid: 1.0, senior: 1.25, lead: 1.45 }
  },
  {
    title: "Benefits Specialist",
    category: "Human Resources",
    salaryUSD: { min: 48000, median: 65000, max: 90000 },
    experienceMultipliers: { entry: 0.8, mid: 1.0, senior: 1.2, lead: 1.4 }
  },
  {
    title: "Learning & Development Manager",
    category: "Human Resources",
    salaryUSD: { min: 75000, median: 105000, max: 150000 },
    experienceMultipliers: { entry: 0.75, mid: 1.0, senior: 1.25, lead: 1.45 }
  },
  {
    title: "HR Business Partner",
    category: "Human Resources",
    salaryUSD: { min: 70000, median: 100000, max: 145000 },
    experienceMultipliers: { entry: 0.75, mid: 1.0, senior: 1.25, lead: 1.45 }
  },
  {
    title: "People Operations Manager",
    category: "Human Resources",
    salaryUSD: { min: 75000, median: 105000, max: 150000 },
    experienceMultipliers: { entry: 0.75, mid: 1.0, senior: 1.25, lead: 1.45 }
  },

  // ============ OPERATIONS & LOGISTICS ============
  {
    title: "Operations Manager",
    category: "Operations",
    salaryUSD: { min: 60000, median: 90000, max: 135000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Operations Director",
    category: "Operations",
    salaryUSD: { min: 110000, median: 160000, max: 230000 },
    experienceMultipliers: { entry: 0.85, mid: 1.0, senior: 1.15, lead: 1.35 }
  },
  {
    title: "COO",
    category: "Operations",
    salaryUSD: { min: 200000, median: 330000, max: 550000 },
    experienceMultipliers: { entry: 0.85, mid: 1.0, senior: 1.15, lead: 1.35 }
  },
  {
    title: "Project Manager",
    category: "Operations",
    salaryUSD: { min: 65000, median: 95000, max: 140000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Senior Project Manager",
    category: "Operations",
    salaryUSD: { min: 95000, median: 130000, max: 180000 },
    experienceMultipliers: { entry: 0.85, mid: 1.0, senior: 1.15, lead: 1.35 }
  },
  {
    title: "Program Manager",
    category: "Operations",
    salaryUSD: { min: 90000, median: 130000, max: 190000 },
    experienceMultipliers: { entry: 0.75, mid: 1.0, senior: 1.25, lead: 1.45 }
  },
  {
    title: "Technical Program Manager",
    category: "Operations",
    salaryUSD: { min: 120000, median: 170000, max: 250000 },
    experienceMultipliers: { entry: 0.75, mid: 1.0, senior: 1.25, lead: 1.45 }
  },
  {
    title: "Supply Chain Manager",
    category: "Operations",
    salaryUSD: { min: 75000, median: 110000, max: 160000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Supply Chain Analyst",
    category: "Operations",
    salaryUSD: { min: 52000, median: 72000, max: 100000 },
    experienceMultipliers: { entry: 0.75, mid: 1.0, senior: 1.25, lead: 1.45 }
  },
  {
    title: "Logistics Manager",
    category: "Operations",
    salaryUSD: { min: 60000, median: 85000, max: 125000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Procurement Manager",
    category: "Operations",
    salaryUSD: { min: 70000, median: 100000, max: 145000 },
    experienceMultipliers: { entry: 0.75, mid: 1.0, senior: 1.25, lead: 1.45 }
  },
  {
    title: "Warehouse Manager",
    category: "Operations",
    salaryUSD: { min: 50000, median: 70000, max: 100000 },
    experienceMultipliers: { entry: 0.75, mid: 1.0, senior: 1.25, lead: 1.45 }
  },
  {
    title: "Inventory Manager",
    category: "Operations",
    salaryUSD: { min: 48000, median: 68000, max: 95000 },
    experienceMultipliers: { entry: 0.75, mid: 1.0, senior: 1.25, lead: 1.45 }
  },
  {
    title: "Facilities Manager",
    category: "Operations",
    salaryUSD: { min: 55000, median: 80000, max: 115000 },
    experienceMultipliers: { entry: 0.75, mid: 1.0, senior: 1.25, lead: 1.45 }
  },
  {
    title: "Business Analyst",
    category: "Operations",
    salaryUSD: { min: 60000, median: 85000, max: 125000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Business Operations Manager",
    category: "Operations",
    salaryUSD: { min: 70000, median: 100000, max: 145000 },
    experienceMultipliers: { entry: 0.75, mid: 1.0, senior: 1.25, lead: 1.45 }
  },

  // ============ LEGAL ============
  {
    title: "Paralegal",
    category: "Legal",
    salaryUSD: { min: 42000, median: 58000, max: 80000 },
    experienceMultipliers: { entry: 0.8, mid: 1.0, senior: 1.2, lead: 1.4 }
  },
  {
    title: "Legal Assistant",
    category: "Legal",
    salaryUSD: { min: 38000, median: 50000, max: 68000 },
    experienceMultipliers: { entry: 0.8, mid: 1.0, senior: 1.2, lead: 1.35 }
  },
  {
    title: "Associate Attorney",
    category: "Legal",
    salaryUSD: { min: 80000, median: 130000, max: 220000 },
    experienceMultipliers: { entry: 0.65, mid: 1.0, senior: 1.4, lead: 1.7 }
  },
  {
    title: "Senior Attorney",
    category: "Legal",
    salaryUSD: { min: 140000, median: 200000, max: 320000 },
    experienceMultipliers: { entry: 0.85, mid: 1.0, senior: 1.2, lead: 1.4 }
  },
  {
    title: "Partner (Law Firm)",
    category: "Legal",
    salaryUSD: { min: 250000, median: 450000, max: 1200000 },
    experienceMultipliers: { entry: 0.8, mid: 1.0, senior: 1.3, lead: 1.8 }
  },
  {
    title: "Corporate Counsel",
    category: "Legal",
    salaryUSD: { min: 120000, median: 175000, max: 280000 },
    experienceMultipliers: { entry: 0.75, mid: 1.0, senior: 1.25, lead: 1.5 }
  },
  {
    title: "General Counsel",
    category: "Legal",
    salaryUSD: { min: 200000, median: 320000, max: 550000 },
    experienceMultipliers: { entry: 0.85, mid: 1.0, senior: 1.15, lead: 1.35 }
  },
  {
    title: "Compliance Officer",
    category: "Legal",
    salaryUSD: { min: 70000, median: 105000, max: 160000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Compliance Manager",
    category: "Legal",
    salaryUSD: { min: 90000, median: 130000, max: 185000 },
    experienceMultipliers: { entry: 0.8, mid: 1.0, senior: 1.2, lead: 1.4 }
  },
  {
    title: "Contract Manager",
    category: "Legal",
    salaryUSD: { min: 70000, median: 100000, max: 145000 },
    experienceMultipliers: { entry: 0.75, mid: 1.0, senior: 1.25, lead: 1.45 }
  },
  {
    title: "Intellectual Property Attorney",
    category: "Legal",
    salaryUSD: { min: 120000, median: 180000, max: 300000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.35, lead: 1.6 }
  },

  // ============ HEALTHCARE ============
  {
    title: "Registered Nurse",
    category: "Healthcare",
    salaryUSD: { min: 55000, median: 82000, max: 115000 },
    experienceMultipliers: { entry: 0.8, mid: 1.0, senior: 1.2, lead: 1.4 }
  },
  {
    title: "Nurse Practitioner",
    category: "Healthcare",
    salaryUSD: { min: 95000, median: 125000, max: 165000 },
    experienceMultipliers: { entry: 0.85, mid: 1.0, senior: 1.15, lead: 1.3 }
  },
  {
    title: "Physician Assistant",
    category: "Healthcare",
    salaryUSD: { min: 100000, median: 130000, max: 175000 },
    experienceMultipliers: { entry: 0.85, mid: 1.0, senior: 1.15, lead: 1.3 }
  },
  {
    title: "Physician",
    category: "Healthcare",
    salaryUSD: { min: 180000, median: 280000, max: 450000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.25, lead: 1.5 }
  },
  {
    title: "Surgeon",
    category: "Healthcare",
    salaryUSD: { min: 300000, median: 450000, max: 700000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.2, lead: 1.45 }
  },
  {
    title: "Dentist",
    category: "Healthcare",
    salaryUSD: { min: 120000, median: 180000, max: 280000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.25, lead: 1.5 }
  },
  {
    title: "Pharmacist",
    category: "Healthcare",
    salaryUSD: { min: 110000, median: 135000, max: 165000 },
    experienceMultipliers: { entry: 0.9, mid: 1.0, senior: 1.1, lead: 1.2 }
  },
  {
    title: "Physical Therapist",
    category: "Healthcare",
    salaryUSD: { min: 70000, median: 95000, max: 125000 },
    experienceMultipliers: { entry: 0.85, mid: 1.0, senior: 1.15, lead: 1.3 }
  },
  {
    title: "Occupational Therapist",
    category: "Healthcare",
    salaryUSD: { min: 68000, median: 92000, max: 120000 },
    experienceMultipliers: { entry: 0.85, mid: 1.0, senior: 1.15, lead: 1.3 }
  },
  {
    title: "Medical Assistant",
    category: "Healthcare",
    salaryUSD: { min: 32000, median: 42000, max: 55000 },
    experienceMultipliers: { entry: 0.85, mid: 1.0, senior: 1.15, lead: 1.3 }
  },
  {
    title: "Healthcare Administrator",
    category: "Healthcare",
    salaryUSD: { min: 70000, median: 105000, max: 160000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Hospital Administrator",
    category: "Healthcare",
    salaryUSD: { min: 90000, median: 140000, max: 220000 },
    experienceMultipliers: { entry: 0.75, mid: 1.0, senior: 1.25, lead: 1.5 }
  },
  {
    title: "Clinical Research Coordinator",
    category: "Healthcare",
    salaryUSD: { min: 48000, median: 65000, max: 90000 },
    experienceMultipliers: { entry: 0.8, mid: 1.0, senior: 1.2, lead: 1.4 }
  },
  {
    title: "Medical Scientist",
    category: "Healthcare",
    salaryUSD: { min: 70000, median: 100000, max: 150000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Radiologic Technologist",
    category: "Healthcare",
    salaryUSD: { min: 50000, median: 68000, max: 90000 },
    experienceMultipliers: { entry: 0.85, mid: 1.0, senior: 1.15, lead: 1.3 }
  },
  {
    title: "Lab Technician",
    category: "Healthcare",
    salaryUSD: { min: 35000, median: 50000, max: 70000 },
    experienceMultipliers: { entry: 0.85, mid: 1.0, senior: 1.15, lead: 1.3 }
  },

  // ============ EDUCATION ============
  {
    title: "Teacher",
    category: "Education",
    salaryUSD: { min: 38000, median: 58000, max: 85000 },
    experienceMultipliers: { entry: 0.8, mid: 1.0, senior: 1.2, lead: 1.4 }
  },
  {
    title: "High School Teacher",
    category: "Education",
    salaryUSD: { min: 40000, median: 62000, max: 90000 },
    experienceMultipliers: { entry: 0.8, mid: 1.0, senior: 1.2, lead: 1.4 }
  },
  {
    title: "Elementary School Teacher",
    category: "Education",
    salaryUSD: { min: 38000, median: 56000, max: 80000 },
    experienceMultipliers: { entry: 0.8, mid: 1.0, senior: 1.2, lead: 1.4 }
  },
  {
    title: "Special Education Teacher",
    category: "Education",
    salaryUSD: { min: 40000, median: 62000, max: 88000 },
    experienceMultipliers: { entry: 0.8, mid: 1.0, senior: 1.2, lead: 1.4 }
  },
  {
    title: "Professor",
    category: "Education",
    salaryUSD: { min: 70000, median: 105000, max: 180000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.6 }
  },
  {
    title: "Assistant Professor",
    category: "Education",
    salaryUSD: { min: 60000, median: 82000, max: 120000 },
    experienceMultipliers: { entry: 0.85, mid: 1.0, senior: 1.15, lead: 1.35 }
  },
  {
    title: "School Principal",
    category: "Education",
    salaryUSD: { min: 75000, median: 110000, max: 160000 },
    experienceMultipliers: { entry: 0.8, mid: 1.0, senior: 1.2, lead: 1.4 }
  },
  {
    title: "School Counselor",
    category: "Education",
    salaryUSD: { min: 45000, median: 65000, max: 90000 },
    experienceMultipliers: { entry: 0.8, mid: 1.0, senior: 1.2, lead: 1.4 }
  },
  {
    title: "Instructional Designer",
    category: "Education",
    salaryUSD: { min: 55000, median: 78000, max: 110000 },
    experienceMultipliers: { entry: 0.75, mid: 1.0, senior: 1.25, lead: 1.45 }
  },
  {
    title: "Corporate Trainer",
    category: "Education",
    salaryUSD: { min: 50000, median: 72000, max: 105000 },
    experienceMultipliers: { entry: 0.75, mid: 1.0, senior: 1.25, lead: 1.45 }
  },
  {
    title: "Education Administrator",
    category: "Education",
    salaryUSD: { min: 65000, median: 95000, max: 140000 },
    experienceMultipliers: { entry: 0.75, mid: 1.0, senior: 1.25, lead: 1.45 }
  },

  // ============ CONSULTING ============
  {
    title: "Management Consultant",
    category: "Consulting",
    salaryUSD: { min: 85000, median: 140000, max: 220000 },
    experienceMultipliers: { entry: 0.6, mid: 1.0, senior: 1.45, lead: 1.85 }
  },
  {
    title: "Senior Consultant",
    category: "Consulting",
    salaryUSD: { min: 120000, median: 175000, max: 280000 },
    experienceMultipliers: { entry: 0.8, mid: 1.0, senior: 1.25, lead: 1.5 }
  },
  {
    title: "Principal Consultant",
    category: "Consulting",
    salaryUSD: { min: 180000, median: 280000, max: 450000 },
    experienceMultipliers: { entry: 0.85, mid: 1.0, senior: 1.2, lead: 1.4 }
  },
  {
    title: "Strategy Consultant",
    category: "Consulting",
    salaryUSD: { min: 90000, median: 150000, max: 250000 },
    experienceMultipliers: { entry: 0.6, mid: 1.0, senior: 1.45, lead: 1.85 }
  },
  {
    title: "IT Consultant",
    category: "Consulting",
    salaryUSD: { min: 75000, median: 115000, max: 175000 },
    experienceMultipliers: { entry: 0.65, mid: 1.0, senior: 1.35, lead: 1.6 }
  },
  {
    title: "Business Consultant",
    category: "Consulting",
    salaryUSD: { min: 70000, median: 110000, max: 170000 },
    experienceMultipliers: { entry: 0.65, mid: 1.0, senior: 1.35, lead: 1.6 }
  },
  {
    title: "Financial Consultant",
    category: "Consulting",
    salaryUSD: { min: 75000, median: 120000, max: 190000 },
    experienceMultipliers: { entry: 0.65, mid: 1.0, senior: 1.35, lead: 1.6 }
  },
  {
    title: "HR Consultant",
    category: "Consulting",
    salaryUSD: { min: 60000, median: 95000, max: 150000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.55 }
  },

  // ============ CUSTOMER SUPPORT ============
  {
    title: "Customer Service Representative",
    category: "Customer Support",
    salaryUSD: { min: 28000, median: 38000, max: 52000 },
    experienceMultipliers: { entry: 0.85, mid: 1.0, senior: 1.15, lead: 1.3 }
  },
  {
    title: "Customer Support Specialist",
    category: "Customer Support",
    salaryUSD: { min: 35000, median: 48000, max: 65000 },
    experienceMultipliers: { entry: 0.8, mid: 1.0, senior: 1.2, lead: 1.35 }
  },
  {
    title: "Customer Support Manager",
    category: "Customer Support",
    salaryUSD: { min: 55000, median: 78000, max: 110000 },
    experienceMultipliers: { entry: 0.75, mid: 1.0, senior: 1.25, lead: 1.45 }
  },
  {
    title: "Technical Support Specialist",
    category: "Customer Support",
    salaryUSD: { min: 40000, median: 58000, max: 82000 },
    experienceMultipliers: { entry: 0.8, mid: 1.0, senior: 1.2, lead: 1.4 }
  },
  {
    title: "Technical Support Engineer",
    category: "Customer Support",
    salaryUSD: { min: 55000, median: 78000, max: 110000 },
    experienceMultipliers: { entry: 0.75, mid: 1.0, senior: 1.25, lead: 1.45 }
  },
  {
    title: "Help Desk Technician",
    category: "Customer Support",
    salaryUSD: { min: 35000, median: 48000, max: 68000 },
    experienceMultipliers: { entry: 0.8, mid: 1.0, senior: 1.2, lead: 1.4 }
  },
  {
    title: "Call Center Manager",
    category: "Customer Support",
    salaryUSD: { min: 50000, median: 72000, max: 105000 },
    experienceMultipliers: { entry: 0.75, mid: 1.0, senior: 1.25, lead: 1.45 }
  },

  // ============ CONSTRUCTION & ENGINEERING ============
  {
    title: "Civil Engineer",
    category: "Engineering",
    salaryUSD: { min: 60000, median: 88000, max: 130000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Mechanical Engineer",
    category: "Engineering",
    salaryUSD: { min: 62000, median: 92000, max: 135000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Electrical Engineer",
    category: "Engineering",
    salaryUSD: { min: 65000, median: 98000, max: 145000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Chemical Engineer",
    category: "Engineering",
    salaryUSD: { min: 70000, median: 105000, max: 155000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Aerospace Engineer",
    category: "Engineering",
    salaryUSD: { min: 75000, median: 115000, max: 170000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Structural Engineer",
    category: "Engineering",
    salaryUSD: { min: 62000, median: 90000, max: 135000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Environmental Engineer",
    category: "Engineering",
    salaryUSD: { min: 58000, median: 85000, max: 125000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Industrial Engineer",
    category: "Engineering",
    salaryUSD: { min: 60000, median: 90000, max: 130000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Construction Manager",
    category: "Engineering",
    salaryUSD: { min: 70000, median: 105000, max: 155000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Construction Project Manager",
    category: "Engineering",
    salaryUSD: { min: 75000, median: 110000, max: 165000 },
    experienceMultipliers: { entry: 0.75, mid: 1.0, senior: 1.25, lead: 1.45 }
  },
  {
    title: "Site Engineer",
    category: "Engineering",
    salaryUSD: { min: 55000, median: 78000, max: 110000 },
    experienceMultipliers: { entry: 0.75, mid: 1.0, senior: 1.25, lead: 1.45 }
  },
  {
    title: "Architect",
    category: "Engineering",
    salaryUSD: { min: 55000, median: 85000, max: 130000 },
    experienceMultipliers: { entry: 0.65, mid: 1.0, senior: 1.35, lead: 1.6 }
  },
  {
    title: "Senior Architect",
    category: "Engineering",
    salaryUSD: { min: 90000, median: 125000, max: 180000 },
    experienceMultipliers: { entry: 0.85, mid: 1.0, senior: 1.15, lead: 1.35 }
  },
  {
    title: "CAD Designer",
    category: "Engineering",
    salaryUSD: { min: 42000, median: 58000, max: 82000 },
    experienceMultipliers: { entry: 0.8, mid: 1.0, senior: 1.2, lead: 1.4 }
  },

  // ============ MEDIA & ENTERTAINMENT ============
  {
    title: "Video Editor",
    category: "Media",
    salaryUSD: { min: 40000, median: 60000, max: 95000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Video Producer",
    category: "Media",
    salaryUSD: { min: 50000, median: 78000, max: 120000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Photographer",
    category: "Media",
    salaryUSD: { min: 32000, median: 50000, max: 85000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.6 }
  },
  {
    title: "Journalist",
    category: "Media",
    salaryUSD: { min: 35000, median: 55000, max: 90000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.35, lead: 1.6 }
  },
  {
    title: "Editor",
    category: "Media",
    salaryUSD: { min: 45000, median: 68000, max: 105000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Content Creator",
    category: "Media",
    salaryUSD: { min: 35000, median: 55000, max: 95000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.35, lead: 1.7 }
  },
  {
    title: "Animator",
    category: "Media",
    salaryUSD: { min: 45000, median: 72000, max: 115000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.55 }
  },
  {
    title: "Game Designer",
    category: "Media",
    salaryUSD: { min: 55000, median: 85000, max: 135000 },
    experienceMultipliers: { entry: 0.65, mid: 1.0, senior: 1.35, lead: 1.6 }
  },
  {
    title: "Game Developer",
    category: "Media",
    salaryUSD: { min: 60000, median: 95000, max: 150000 },
    experienceMultipliers: { entry: 0.65, mid: 1.0, senior: 1.35, lead: 1.6 }
  },
  {
    title: "Audio Engineer",
    category: "Media",
    salaryUSD: { min: 40000, median: 62000, max: 100000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.55 }
  },

  // ============ REAL ESTATE ============
  {
    title: "Real Estate Agent",
    category: "Real Estate",
    salaryUSD: { min: 30000, median: 55000, max: 120000 },
    experienceMultipliers: { entry: 0.6, mid: 1.0, senior: 1.5, lead: 2.2 }
  },
  {
    title: "Real Estate Broker",
    category: "Real Estate",
    salaryUSD: { min: 50000, median: 90000, max: 200000 },
    experienceMultipliers: { entry: 0.65, mid: 1.0, senior: 1.45, lead: 2.0 }
  },
  {
    title: "Property Manager",
    category: "Real Estate",
    salaryUSD: { min: 45000, median: 65000, max: 95000 },
    experienceMultipliers: { entry: 0.75, mid: 1.0, senior: 1.25, lead: 1.45 }
  },
  {
    title: "Real Estate Analyst",
    category: "Real Estate",
    salaryUSD: { min: 55000, median: 80000, max: 120000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Leasing Consultant",
    category: "Real Estate",
    salaryUSD: { min: 32000, median: 45000, max: 65000 },
    experienceMultipliers: { entry: 0.8, mid: 1.0, senior: 1.2, lead: 1.4 }
  },
  {
    title: "Commercial Real Estate Agent",
    category: "Real Estate",
    salaryUSD: { min: 45000, median: 85000, max: 180000 },
    experienceMultipliers: { entry: 0.55, mid: 1.0, senior: 1.55, lead: 2.2 }
  },

  // ============ EXECUTIVE ============
  {
    title: "CEO",
    category: "Executive",
    salaryUSD: { min: 150000, median: 350000, max: 1000000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 2.0 }
  },
  {
    title: "President",
    category: "Executive",
    salaryUSD: { min: 180000, median: 320000, max: 800000 },
    experienceMultipliers: { entry: 0.8, mid: 1.0, senior: 1.2, lead: 1.6 }
  },
  {
    title: "Executive Director",
    category: "Executive",
    salaryUSD: { min: 120000, median: 200000, max: 400000 },
    experienceMultipliers: { entry: 0.8, mid: 1.0, senior: 1.2, lead: 1.5 }
  },
  {
    title: "Managing Director",
    category: "Executive",
    salaryUSD: { min: 150000, median: 280000, max: 550000 },
    experienceMultipliers: { entry: 0.8, mid: 1.0, senior: 1.2, lead: 1.5 }
  },
  {
    title: "General Manager",
    category: "Executive",
    salaryUSD: { min: 80000, median: 130000, max: 220000 },
    experienceMultipliers: { entry: 0.75, mid: 1.0, senior: 1.25, lead: 1.5 }
  },
  {
    title: "Chief of Staff",
    category: "Executive",
    salaryUSD: { min: 100000, median: 160000, max: 280000 },
    experienceMultipliers: { entry: 0.75, mid: 1.0, senior: 1.25, lead: 1.5 }
  },

  // ============ ADMINISTRATIVE ============
  {
    title: "Administrative Assistant",
    category: "Administrative",
    salaryUSD: { min: 32000, median: 45000, max: 62000 },
    experienceMultipliers: { entry: 0.85, mid: 1.0, senior: 1.15, lead: 1.3 }
  },
  {
    title: "Executive Assistant",
    category: "Administrative",
    salaryUSD: { min: 50000, median: 72000, max: 100000 },
    experienceMultipliers: { entry: 0.8, mid: 1.0, senior: 1.2, lead: 1.4 }
  },
  {
    title: "Office Manager",
    category: "Administrative",
    salaryUSD: { min: 42000, median: 58000, max: 82000 },
    experienceMultipliers: { entry: 0.8, mid: 1.0, senior: 1.2, lead: 1.4 }
  },
  {
    title: "Receptionist",
    category: "Administrative",
    salaryUSD: { min: 28000, median: 36000, max: 48000 },
    experienceMultipliers: { entry: 0.9, mid: 1.0, senior: 1.1, lead: 1.25 }
  },
  {
    title: "Data Entry Clerk",
    category: "Administrative",
    salaryUSD: { min: 28000, median: 38000, max: 52000 },
    experienceMultipliers: { entry: 0.85, mid: 1.0, senior: 1.15, lead: 1.3 }
  },
  {
    title: "Virtual Assistant",
    category: "Administrative",
    salaryUSD: { min: 30000, median: 45000, max: 65000 },
    experienceMultipliers: { entry: 0.8, mid: 1.0, senior: 1.2, lead: 1.4 }
  },

  // ============ IT SUPPORT ============
  {
    title: "IT Support Specialist",
    category: "IT Support",
    salaryUSD: { min: 42000, median: 58000, max: 82000 },
    experienceMultipliers: { entry: 0.75, mid: 1.0, senior: 1.25, lead: 1.45 }
  },
  {
    title: "IT Manager",
    category: "IT Support",
    salaryUSD: { min: 85000, median: 125000, max: 180000 },
    experienceMultipliers: { entry: 0.75, mid: 1.0, senior: 1.25, lead: 1.45 }
  },
  {
    title: "IT Director",
    category: "IT Support",
    salaryUSD: { min: 130000, median: 180000, max: 260000 },
    experienceMultipliers: { entry: 0.85, mid: 1.0, senior: 1.15, lead: 1.35 }
  },
  {
    title: "CIO",
    category: "IT Support",
    salaryUSD: { min: 180000, median: 290000, max: 480000 },
    experienceMultipliers: { entry: 0.85, mid: 1.0, senior: 1.15, lead: 1.35 }
  },
  {
    title: "Systems Administrator",
    category: "IT Support",
    salaryUSD: { min: 55000, median: 82000, max: 120000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Network Administrator",
    category: "IT Support",
    salaryUSD: { min: 55000, median: 78000, max: 110000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Network Engineer",
    category: "IT Support",
    salaryUSD: { min: 70000, median: 100000, max: 145000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Database Administrator",
    category: "IT Support",
    salaryUSD: { min: 65000, median: 95000, max: 140000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Desktop Support Technician",
    category: "IT Support",
    salaryUSD: { min: 38000, median: 52000, max: 72000 },
    experienceMultipliers: { entry: 0.8, mid: 1.0, senior: 1.2, lead: 1.4 }
  },

  // ============ RESEARCH & SCIENCE ============
  {
    title: "Research Scientist",
    category: "Research",
    salaryUSD: { min: 65000, median: 95000, max: 145000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.55 }
  },
  {
    title: "Senior Research Scientist",
    category: "Research",
    salaryUSD: { min: 100000, median: 140000, max: 200000 },
    experienceMultipliers: { entry: 0.85, mid: 1.0, senior: 1.15, lead: 1.35 }
  },
  {
    title: "Lab Manager",
    category: "Research",
    salaryUSD: { min: 55000, median: 78000, max: 110000 },
    experienceMultipliers: { entry: 0.75, mid: 1.0, senior: 1.25, lead: 1.45 }
  },
  {
    title: "Biologist",
    category: "Research",
    salaryUSD: { min: 48000, median: 72000, max: 105000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Chemist",
    category: "Research",
    salaryUSD: { min: 52000, median: 78000, max: 115000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Physicist",
    category: "Research",
    salaryUSD: { min: 70000, median: 105000, max: 160000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.55 }
  },
  {
    title: "Statistician",
    category: "Research",
    salaryUSD: { min: 65000, median: 95000, max: 140000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Research Associate",
    category: "Research",
    salaryUSD: { min: 45000, median: 62000, max: 85000 },
    experienceMultipliers: { entry: 0.8, mid: 1.0, senior: 1.2, lead: 1.4 }
  },

  // ============ MANUFACTURING ============
  {
    title: "Manufacturing Engineer",
    category: "Manufacturing",
    salaryUSD: { min: 60000, median: 85000, max: 125000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Production Manager",
    category: "Manufacturing",
    salaryUSD: { min: 65000, median: 95000, max: 140000 },
    experienceMultipliers: { entry: 0.75, mid: 1.0, senior: 1.25, lead: 1.45 }
  },
  {
    title: "Quality Engineer",
    category: "Manufacturing",
    salaryUSD: { min: 58000, median: 82000, max: 120000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Quality Manager",
    category: "Manufacturing",
    salaryUSD: { min: 75000, median: 105000, max: 150000 },
    experienceMultipliers: { entry: 0.8, mid: 1.0, senior: 1.2, lead: 1.4 }
  },
  {
    title: "Plant Manager",
    category: "Manufacturing",
    salaryUSD: { min: 90000, median: 135000, max: 200000 },
    experienceMultipliers: { entry: 0.8, mid: 1.0, senior: 1.2, lead: 1.4 }
  },
  {
    title: "Process Engineer",
    category: "Manufacturing",
    salaryUSD: { min: 60000, median: 88000, max: 125000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Maintenance Technician",
    category: "Manufacturing",
    salaryUSD: { min: 38000, median: 55000, max: 78000 },
    experienceMultipliers: { entry: 0.8, mid: 1.0, senior: 1.2, lead: 1.4 }
  },
  {
    title: "Machine Operator",
    category: "Manufacturing",
    salaryUSD: { min: 32000, median: 45000, max: 62000 },
    experienceMultipliers: { entry: 0.85, mid: 1.0, senior: 1.15, lead: 1.3 }
  },

  // ============ BLOCKCHAIN & WEB3 ============
  {
    title: "Blockchain Developer",
    category: "Web3",
    salaryUSD: { min: 100000, median: 160000, max: 250000 },
    experienceMultipliers: { entry: 0.6, mid: 1.0, senior: 1.4, lead: 1.7 }
  },
  {
    title: "Smart Contract Developer",
    category: "Web3",
    salaryUSD: { min: 110000, median: 175000, max: 280000 },
    experienceMultipliers: { entry: 0.6, mid: 1.0, senior: 1.4, lead: 1.7 }
  },
  {
    title: "Web3 Developer",
    category: "Web3",
    salaryUSD: { min: 95000, median: 150000, max: 240000 },
    experienceMultipliers: { entry: 0.6, mid: 1.0, senior: 1.4, lead: 1.7 }
  },
  {
    title: "Crypto Analyst",
    category: "Web3",
    salaryUSD: { min: 70000, median: 110000, max: 180000 },
    experienceMultipliers: { entry: 0.65, mid: 1.0, senior: 1.35, lead: 1.6 }
  },

  // ============ ADDITIONAL COMMON ROLES ============
  {
    title: "Scrum Master",
    category: "Technology",
    salaryUSD: { min: 85000, median: 120000, max: 170000 },
    experienceMultipliers: { entry: 0.75, mid: 1.0, senior: 1.25, lead: 1.45 }
  },
  {
    title: "Agile Coach",
    category: "Technology",
    salaryUSD: { min: 100000, median: 145000, max: 200000 },
    experienceMultipliers: { entry: 0.8, mid: 1.0, senior: 1.2, lead: 1.4 }
  },
  {
    title: "Release Manager",
    category: "Technology",
    salaryUSD: { min: 90000, median: 125000, max: 175000 },
    experienceMultipliers: { entry: 0.75, mid: 1.0, senior: 1.25, lead: 1.45 }
  },
  {
    title: "Embedded Systems Engineer",
    category: "Technology",
    salaryUSD: { min: 80000, median: 115000, max: 165000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Firmware Engineer",
    category: "Technology",
    salaryUSD: { min: 80000, median: 115000, max: 165000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Hardware Engineer",
    category: "Technology",
    salaryUSD: { min: 85000, median: 120000, max: 175000 },
    experienceMultipliers: { entry: 0.7, mid: 1.0, senior: 1.3, lead: 1.5 }
  },
  {
    title: "Robotics Engineer",
    category: "Technology",
    salaryUSD: { min: 85000, median: 125000, max: 185000 },
    experienceMultipliers: { entry: 0.65, mid: 1.0, senior: 1.35, lead: 1.6 }
  },
];

// Helper function to get all unique job titles
export const getAllJobTitles = (): string[] => {
  return salaryData2025.map(job => job.title).sort();
};

// Helper function to get jobs by category
export const getJobsByCategory = (category: string): JobSalaryData[] => {
  return salaryData2025.filter(job => job.category === category);
};

// Helper function to get all categories
export const getAllCategories = (): string[] => {
  return [...new Set(salaryData2025.map(job => job.category))].sort();
};

// Helper function to find salary data by job title (fuzzy match)
export const findSalaryByTitle = (searchTitle: string): JobSalaryData | undefined => {
  const normalizedSearch = searchTitle.toLowerCase().trim();
  
  // Exact match first
  const exactMatch = salaryData2025.find(
    job => job.title.toLowerCase() === normalizedSearch
  );
  if (exactMatch) return exactMatch;
  
  // Partial match
  const partialMatch = salaryData2025.find(
    job => job.title.toLowerCase().includes(normalizedSearch) ||
           normalizedSearch.includes(job.title.toLowerCase())
  );
  if (partialMatch) return partialMatch;
  
  // Word-based match
  const searchWords = normalizedSearch.split(/\s+/);
  const wordMatch = salaryData2025.find(job => {
    const titleWords = job.title.toLowerCase().split(/\s+/);
    return searchWords.some(sw => titleWords.some(tw => tw.includes(sw) || sw.includes(tw)));
  });
  
  return wordMatch;
};

// Calculate adjusted salary based on region and experience
export const calculateAdjustedSalary = (
  baseSalary: SalaryRange,
  region: string,
  experienceLevel: 'entry' | 'mid' | 'senior' | 'lead',
  experienceMultipliers: JobSalaryData['experienceMultipliers']
): SalaryRange => {
  const regionMultiplier = regionMultipliers[region] || 0.5; // Default to 0.5 if region not found
  const expMultiplier = experienceMultipliers[experienceLevel];
  
  return {
    min: Math.round(baseSalary.min * regionMultiplier * expMultiplier),
    median: Math.round(baseSalary.median * regionMultiplier * expMultiplier),
    max: Math.round(baseSalary.max * regionMultiplier * expMultiplier)
  };
};
