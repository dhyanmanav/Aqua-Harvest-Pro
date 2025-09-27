// AquaHarvest Pro PWA - Main Application JavaScript

// Application state
let currentStep = 1;
let assessmentData = {};
let currentLanguage = 'en';
let deferredPrompt;

// Government subsidies data
const governmentSubsidies = {
  central: [
    {
      scheme: "PM Krishi Sinchayee Yojana",
      subsidy: "Up to 50%",
      maxAmount: "₹25,000",
      eligibility: "Farmers and rural households"
    },
    {
      scheme: "Jal Shakti Abhiyan",
      subsidy: "Technical assistance",
      description: "Implementation support and guidelines"
    },
    {
      scheme: "XV Finance Commission",
      subsidy: "Grant funding",
      description: "Tied grants for water conservation"
    }
  ],
  states: {
    "Maharashtra": {subsidy: "₹50,000", scheme: "Jalyukt Shivar Abhiyan"},
    "Karnataka": {subsidy: "₹1,35,000", scheme: "Krishi Bhagya Scheme"},
    "Rajasthan": {subsidy: "₹1,35,000", coverage: "70% government, 30% farmer"},
    "Uttar Pradesh": {subsidy: "₹52,000", scheme: "Per Drop More Crop"},
    "Gujarat": {subsidy: "₹40,000", scheme: "Sujalam Sufalam Jal Sanchay Abhiyan"},
    "Tamil Nadu": {subsidy: "₹30,000", scheme: "Namami Gange"},
    "West Bengal": {subsidy: "₹35,000", scheme: "Jal Dharo Jal Bharo"},
    "Delhi": {subsidy: "₹25,000", scheme: "Rainwater Harvesting Policy"}
  }
};

// Educational modules data
const educationalModules = [
  {
    id: 1,
    title: "Understanding Rainwater Harvesting",
    duration: "5 min",
    topics: ["What is RTRWH", "Benefits", "Global context", "Success stories"]
  },
  {
    id: 2,
    title: "Science Behind Water Collection", 
    duration: "7 min",
    topics: ["Rainfall patterns", "Runoff calculations", "Water quality"]
  },
  {
    id: 3,
    title: "System Components & Design",
    duration: "8 min", 
    topics: ["Catchment systems", "Storage solutions", "Filtration"]
  },
  {
    id: 4,
    title: "Installation & Maintenance",
    duration: "6 min",
    topics: ["DIY installation", "Professional setup", "Maintenance schedules"]
  },
  {
    id: 5,
    title: "Environmental Impact",
    duration: "5 min",
    topics: ["Groundwater recharge", "Flood prevention", "Carbon reduction"]
  },
  {
    id: 6,
    title: "Community & Policy", 
    duration: "4 min",
    topics: ["Government schemes", "Compliance", "Community engagement"]
  }
];

// RTRWH calculation constants
const runoffCoefficients = {
  concrete: 0.85,
  metal: 0.95,
  tile: 0.75,
  thatched: 0.60
};

const rainfallData = {
  "Maharashtra": 1200,
  "Karnataka": 1250,
  "Delhi": 650,
  "Gujarat": 800,
  "Rajasthan": 550,
  "Tamil Nadu": 950,
  "West Bengal": 1400,
  "Uttar Pradesh": 900
};

// Translation data
const translations = {
  en: {
    "select-language": "Select Language",
    "language": "Language",
    "install": "Install App",
    "hero-title": "Transform Every Drop into Opportunity",
    "hero-subtitle": "AI-powered rooftop rainwater harvesting assessment with personalized solutions and government subsidy guidance",
    "start-assessment": "Start Free Assessment",
    "stat-assessments": "Assessments Completed",
    "stat-saved": "Water Bills Saved",
    "stat-harvested": "Water Harvested",
    "stat-communities": "Communities",
    "feature-smart": "Smart Assessment",
    "feature-smart-desc": "AI-powered analysis of your property's rainwater harvesting potential",
    "feature-custom": "Custom Solutions",
    "feature-custom-desc": "Personalized RTRWH system recommendations based on your needs",
    "feature-cost": "Cost Analysis",
    "feature-cost-desc": "Detailed cost breakdown with government subsidy information",
    "feature-impact": "Environmental Impact",
    "feature-impact-desc": "Calculate your contribution to groundwater conservation",
    "assessment-title": "Rainwater Harvesting Assessment",
    "step1-title": "Location Details",
    "step2-title": "Property Information",
    "step3-title": "Household Details",
    "step4-title": "Preferences & Budget",
    "address": "Address",
    "enter-address": "Enter your address",
    "pin-code": "PIN Code",
    "enter-pin": "Enter PIN code",
    "state": "State",
    "select-state": "Select State",
    "district": "District",
    "enter-district": "Enter district",
    "roof-area": "Roof Area (sq ft)",
    "storage-space": "Available Storage Space",
    "limited": "Limited (<500 sq ft)",
    "moderate": "Moderate (500-1500 sq ft)",
    "ample": "Ample (>1500 sq ft)",
    "roof-type": "Roof Type",
    "concrete": "Concrete",
    "metal": "Metal Sheet",
    "tile": "Clay Tiles",
    "thatched": "Thatched",
    "building-height": "Building Height",
    "single-story": "Single Story",
    "double-story": "Double Story",
    "multi-story": "Multi Story",
    "residents": "Number of Residents",
    "water-consumption": "Daily Water Consumption (Liters)",
    "consumption-guide": "Guidelines: 150L per person per day",
    "current-source": "Current Water Source",
    "municipal": "Municipal Supply",
    "borewell": "Borewell",
    "tanker": "Water Tanker",
    "budget": "Budget Range (₹)",
    "maintenance": "Maintenance Level",
    "low-maintenance": "Low Maintenance",
    "medium-maintenance": "Medium Maintenance",
    "high-maintenance": "High Performance",
    "primary-use": "Primary Use",
    "domestic": "Domestic Use",
    "irrigation": "Garden/Irrigation",
    "recharge": "Groundwater Recharge",
    "govt-subsidies": "Government Subsidies Available",
    "previous": "Previous",
    "next": "Next",
    "calculate": "Calculate Results",
    "results-title": "Your RTRWH Assessment Results",
    "feasibility": "Feasibility Score",
    "overview": "Overview",
    "structures": "Structures",
    "economics": "Economics",
    "technical": "Technical",
    "impact": "Impact",
    "action-plan": "Action Plan",
    "annual-harvest": "Annual Harvest Potential",
    "cost-savings": "Annual Cost Savings",
    "payback-period": "Payback Period",
    "govt-subsidy": "Government Subsidy",
    "monthly-harvest": "Monthly Harvest Projection",
    "recommended-structures": "Recommended RTRWH Structures",
    "cost-breakdown": "Cost Breakdown",
    "technical-specs": "Technical Specifications",
    "environmental-impact": "Environmental Impact",
    "next-steps": "Next Steps",
    "download-report": "Download Report",
    "share-results": "Share Results",
    "new-assessment": "New Assessment",
    "learn-more": "Learn More About Rainwater Harvesting",
    "community-impact": "Community Impact",
    "villages-covered": "Villages Covered",
    "co2-reduced": "CO2 Reduced",
    "success-stories": "Success Stories",
    "resources": "Resources",
    "documentation": "Documentation",
    "api": "API",
    "support": "Support",
    "rights-reserved": "All rights reserved.",
    "footer-desc": "Empowering communities with smart rainwater harvesting solutions",
    "calculating": "Calculating your results..."
  },
  hi: {
    "select-language": "भाषा चुनें",
    "language": "भाषा",
    "install": "ऐप इंस्टॉल करें",
    "hero-title": "हर बूंद को अवसर में बदलें",
    "hero-subtitle": "व्यक्तिगत समाधान और सरकारी सब्सिडी मार्गदर्शन के साथ AI-संचालित छत वर्षा जल संचयन मूल्यांकन",
    "start-assessment": "निःशुल्क मूल्यांकन शुरू करें",
    "stat-assessments": "पूर्ण मूल्यांकन",
    "stat-saved": "पानी के बिल बचाए गए",
    "stat-harvested": "पानी संचयित",
    "stat-communities": "समुदाय",
    "feature-smart": "स्मार्ट मूल्यांकन",
    "feature-smart-desc": "आपकी संपत्ति की वर्षा जल संचयन क्षमता का AI-संचालित विश्लेषण",
    "feature-custom": "कस्टम समाधान",
    "feature-custom-desc": "आपकी आवश्यकताओं के आधार पर व्यक्तिगत RTRWH सिस्टम सिफारिशें",
    "feature-cost": "लागत विश्लेषण",
    "feature-cost-desc": "सरकारी सब्सिडी जानकारी के साथ विस्तृत लागत विवरण",
    "feature-impact": "पर्यावरणीय प्रभाव",
    "feature-impact-desc": "भूजल संरक्षण में अपने योगदान की गणना करें",
    "calculating": "आपके परिणामों की गणना की जा रही है..."
  }
};

// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    registerServiceWorker();
  });
}

async function registerServiceWorker() {
  try {
    // Create service worker content
    const swContent = `
      const CACHE_NAME = 'aquaharvest-pro-v1';
      const urlsToCache = [
        '/',
        '/style.css',
        '/app.js',
        'https://cdn.jsdelivr.net/npm/chart.js'
      ];

      self.addEventListener('install', event => {
        event.waitUntil(
          caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
        );
      });

      self.addEventListener('fetch', event => {
        event.respondWith(
          caches.match(event.request)
            .then(response => {
              if (response) {
                return response;
              }
              return fetch(event.request);
            }
          )
        );
      });
    `;
    
    const swBlob = new Blob([swContent], { type: 'application/javascript' });
    const swUrl = URL.createObjectURL(swBlob);
    
    const registration = await navigator.serviceWorker.register(swUrl);
    console.log('ServiceWorker registered successfully');
    
    // Check for updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed') {
          if (navigator.serviceWorker.controller) {
            // New update available
            showUpdateAvailable();
          }
        }
      });
    });
  } catch (error) {
    console.log('ServiceWorker registration failed: ', error);
  }
}

// PWA Install prompt
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  
  const installBtn = document.getElementById('installBtn');
  installBtn.style.display = 'inline-flex';
  
  installBtn.addEventListener('click', () => {
    installBtn.style.display = 'none';
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      deferredPrompt = null;
    });
  });
});

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
  setupEventListeners();
  renderEducationalModules();
  renderSuccessStories();
  
  // Load saved language preference
  const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
  setLanguage(savedLanguage);
});

function initializeApp() {
  // Initialize offline storage
  if (!localStorage.getItem('assessmentHistory')) {
    localStorage.setItem('assessmentHistory', JSON.stringify([]));
  }
  
  // Check if returning user
  if (localStorage.getItem('hasCompletedAssessment')) {
    // Show returning user features
    console.log('Welcome back!');
  }
}

function setupEventListeners() {
  // Language selector
  document.getElementById('languageBtn').addEventListener('click', showLanguageModal);
  
  // Start assessment
  document.getElementById('startAssessmentBtn').addEventListener('click', startAssessment);
  
  // Wizard navigation
  document.getElementById('nextBtn').addEventListener('click', nextStep);
  document.getElementById('prevBtn').addEventListener('click', previousStep);
  document.getElementById('calculateBtn').addEventListener('click', calculateResults);
  
  // New assessment
  document.getElementById('newAssessmentBtn').addEventListener('click', startNewAssessment);
  
  // Results actions
  document.getElementById('downloadBtn').addEventListener('click', downloadReport);
  document.getElementById('shareBtn').addEventListener('click', shareResults);
  
  // Tab switching
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => switchTab(e.target.dataset.tab));
  });
  
  // Form input listeners
  setupFormListeners();
}

function setupFormListeners() {
  // Roof area slider
  const roofAreaSlider = document.getElementById('roofArea');
  const roofAreaValue = document.getElementById('roofAreaValue');
  roofAreaSlider.addEventListener('input', (e) => {
    roofAreaValue.textContent = e.target.value;
  });
  
  // Budget slider
  const budgetSlider = document.getElementById('budget');
  const budgetValue = document.getElementById('budgetValue');
  budgetSlider.addEventListener('input', (e) => {
    budgetValue.textContent = `₹${parseInt(e.target.value).toLocaleString()}`;
  });
  
  // State change to update subsidies
  document.getElementById('state').addEventListener('change', updateSubsidyInfo);
  
  // Water consumption auto-calculation
  document.getElementById('residents').addEventListener('change', (e) => {
    const residents = parseInt(e.target.value) || 4;
    document.getElementById('waterConsumption').value = residents * 150;
  });
}

function showLanguageModal() {
  const modal = document.getElementById('languageModal');
  modal.classList.remove('hidden');
  
  // Add language selection listeners
  document.querySelectorAll('.language-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      setLanguage(e.target.dataset.lang);
      modal.classList.add('hidden');
    });
  });
  
  // Close modal on background click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });
}

function setLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem('preferredLanguage', lang);
  
  // Update all translatable elements
  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.dataset.translate;
    if (translations[lang] && translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });
  
  // Update placeholders
  document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
    const key = element.dataset.translatePlaceholder;
    if (translations[lang] && translations[lang][key]) {
      element.placeholder = translations[lang][key];
    }
  });
  
  // Update document language
  document.documentElement.lang = lang;
}

function startAssessment() {
  hideSection('heroSection');
  showSection('assessmentWizard');
  updateProgressBar();
}

function startNewAssessment() {
  currentStep = 1;
  assessmentData = {};
  
  // Reset form
  document.querySelectorAll('.wizard-step').forEach((step, index) => {
    step.classList.toggle('hidden', index !== 0);
    step.classList.toggle('active', index === 0);
  });
  
  // Reset form inputs
  document.getElementById('assessmentWizard').querySelectorAll('input, select').forEach(input => {
    if (input.type === 'range') {
      input.value = input.defaultValue;
      // Trigger change event to update displays
      input.dispatchEvent(new Event('input'));
    } else {
      input.value = '';
    }
  });
  
  hideSection('resultsDashboard');
  showSection('assessmentWizard');
  updateProgressBar();
  updateStepIndicators();
}

function nextStep() {
  if (validateCurrentStep()) {
    saveCurrentStepData();
    
    if (currentStep < 4) {
      currentStep++;
      showStep(currentStep);
      updateProgressBar();
      updateStepIndicators();
    }
  }
}

function previousStep() {
  if (currentStep > 1) {
    currentStep--;
    showStep(currentStep);
    updateProgressBar();
    updateStepIndicators();
  }
}

function showStep(step) {
  document.querySelectorAll('.wizard-step').forEach((stepElement, index) => {
    stepElement.classList.toggle('hidden', index !== step - 1);
    stepElement.classList.toggle('active', index === step - 1);
  });
  
  // Update navigation buttons
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const calculateBtn = document.getElementById('calculateBtn');
  
  prevBtn.style.display = step > 1 ? 'inline-flex' : 'none';
  nextBtn.style.display = step < 4 ? 'inline-flex' : 'none';
  calculateBtn.style.display = step === 4 ? 'inline-flex' : 'none';
}

function updateProgressBar() {
  const progressFill = document.getElementById('progressFill');
  const percentage = (currentStep / 4) * 100;
  progressFill.style.width = `${percentage}%`;
}

function updateStepIndicators() {
  document.querySelectorAll('.step-indicator').forEach((indicator, index) => {
    indicator.classList.toggle('active', index === currentStep - 1);
    indicator.classList.toggle('completed', index < currentStep - 1);
  });
}

function validateCurrentStep() {
  const currentStepElement = document.getElementById(`step${currentStep}`);
  const requiredFields = currentStepElement.querySelectorAll('input[required], select[required]');
  
  for (let field of requiredFields) {
    if (!field.value.trim()) {
      field.focus();
      showError(`Please fill in the ${field.previousElementSibling.textContent}`);
      return false;
    }
  }
  return true;
}

function saveCurrentStepData() {
  const currentStepElement = document.getElementById(`step${currentStep}`);
  const inputs = currentStepElement.querySelectorAll('input, select');
  
  inputs.forEach(input => {
    if (input.type === 'checkbox') {
      if (!assessmentData.currentSource) assessmentData.currentSource = [];
      if (input.checked) {
        assessmentData.currentSource.push(input.value);
      }
    } else {
      assessmentData[input.id] = input.value;
    }
  });
}

function updateSubsidyInfo() {
  const selectedState = document.getElementById('state').value;
  const subsidyDetails = document.getElementById('subsidyDetails');
  
  if (!selectedState) {
    subsidyDetails.innerHTML = '';
    return;
  }
  
  let subsidyHtml = '<h5>Central Government Schemes:</h5>';
  
  governmentSubsidies.central.forEach(scheme => {
    subsidyHtml += `
      <div class="subsidy-item">
        <span>${scheme.scheme}</span>
        <span class="subsidy-amount">${scheme.maxAmount || scheme.subsidy}</span>
      </div>
    `;
  });
  
  if (governmentSubsidies.states[selectedState]) {
    const stateScheme = governmentSubsidies.states[selectedState];
    subsidyHtml += `
      <h5>State Government Scheme:</h5>
      <div class="subsidy-item">
        <span>${stateScheme.scheme || 'State Subsidy'}</span>
        <span class="subsidy-amount">${stateScheme.subsidy}</span>
      </div>
    `;
  }
  
  subsidyDetails.innerHTML = subsidyHtml;
}

function calculateResults() {
  showLoadingSpinner();
  
  // Save final step data
  saveCurrentStepData();
  
  // Perform RTRWH calculations
  setTimeout(() => {
    const results = performRTRWHCalculations();
    displayResults(results);
    hideLoadingSpinner();
    
    // Save assessment to history
    saveAssessmentToHistory();
    
    hideSection('assessmentWizard');
    showSection('resultsDashboard');
  }, 2000);
}

function performRTRWHCalculations() {
  const roofArea = parseFloat(assessmentData.roofArea) || 1000;
  const roofType = assessmentData.roofType || 'concrete';
  const state = assessmentData.state || 'Maharashtra';
  const residents = parseInt(assessmentData.residents) || 4;
  const budget = parseFloat(assessmentData.budget) || 50000;
  const waterConsumption = parseFloat(assessmentData.waterConsumption) || 600;
  
  // Get rainfall data for the state
  const annualRainfall = rainfallData[state] || 1000;
  const runoffCoefficient = runoffCoefficients[roofType] || 0.85;
  
  // Calculate annual harvest potential (in liters)
  // Formula: Area (sq ft) × Rainfall (mm) × Runoff Coefficient × 0.623 (conversion factor)
  const annualHarvestPotential = Math.round(roofArea * annualRainfall * runoffCoefficient * 0.623);
  
  // Calculate cost savings (assuming ₹0.40 per liter water cost)
  const annualCostSavings = Math.round(annualHarvestPotential * 0.4);
  
  // Calculate system cost based on storage requirements
  const systemCost = calculateSystemCost(roofArea, budget);
  
  // Calculate payback period
  const paybackPeriod = (systemCost / annualCostSavings).toFixed(1);
  
  // Calculate feasibility score
  const feasibilityScore = calculateFeasibilityScore({
    roofArea,
    annualRainfall,
    budget,
    systemCost,
    paybackPeriod: parseFloat(paybackPeriod)
  });
  
  // Get government subsidy
  const governmentSubsidy = getGovernmentSubsidy(state, systemCost);
  
  // Generate monthly harvest data
  const monthlyHarvestData = generateMonthlyHarvestData(annualHarvestPotential);
  
  return {
    annualHarvestPotential,
    annualCostSavings,
    systemCost,
    paybackPeriod,
    feasibilityScore,
    governmentSubsidy,
    monthlyHarvestData,
    recommendedStructures: getRecommendedStructures(roofArea, budget),
    technicalSpecs: generateTechnicalSpecs(roofArea, annualHarvestPotential),
    environmentalImpact: calculateEnvironmentalImpact(annualHarvestPotential),
    actionPlan: generateActionPlan(feasibilityScore, budget)
  };
}

function calculateSystemCost(roofArea, budget) {
  // Base cost calculation (₹50 per sq ft for basic system)
  const baseCost = roofArea * 50;
  
  // Add storage cost (₹200 per 1000L capacity)
  const storageCapacity = Math.min(roofArea * 0.5, 5000); // Max 5000L
  const storageCost = (storageCapacity / 1000) * 200 * 100; // ₹20,000 per 1000L tank
  
  // Add filtration and piping (20% of base cost)
  const additionalCost = baseCost * 0.2;
  
  return Math.round(baseCost + storageCost + additionalCost);
}

function calculateFeasibilityScore(params) {
  let score = 0;
  
  // Roof area score (max 25 points)
  if (params.roofArea >= 2000) score += 25;
  else if (params.roofArea >= 1000) score += 20;
  else if (params.roofArea >= 500) score += 15;
  else score += 10;
  
  // Rainfall score (max 25 points)
  if (params.annualRainfall >= 1200) score += 25;
  else if (params.annualRainfall >= 800) score += 20;
  else if (params.annualRainfall >= 600) score += 15;
  else score += 10;
  
  // Budget adequacy score (max 25 points)
  const budgetRatio = params.budget / params.systemCost;
  if (budgetRatio >= 1.2) score += 25;
  else if (budgetRatio >= 1.0) score += 20;
  else if (budgetRatio >= 0.8) score += 15;
  else score += 10;
  
  // Payback period score (max 25 points)
  if (params.paybackPeriod <= 2) score += 25;
  else if (params.paybackPeriod <= 3) score += 20;
  else if (params.paybackPeriod <= 4) score += 15;
  else score += 10;
  
  return Math.round(score);
}

function getGovernmentSubsidy(state, systemCost) {
  const centralSubsidy = 25000; // PM Krishi Sinchayee Yojana
  const stateScheme = governmentSubsidies.states[state];
  
  let stateSubsidy = 0;
  if (stateScheme) {
    stateSubsidy = parseInt(stateScheme.subsidy.replace(/[₹,]/g, '')) || 0;
  }
  
  return Math.min(centralSubsidy + stateSubsidy, systemCost * 0.7); // Max 70% subsidy
}

function generateMonthlyHarvestData(annualHarvest) {
  // Distribution based on typical Indian monsoon patterns
  const monthlyDistribution = [0.05, 0.08, 0.12, 0.15, 0.20, 0.25, 0.10, 0.03, 0.01, 0.005, 0.005, 0.01];
  return monthlyDistribution.map(ratio => Math.round(annualHarvest * ratio));
}

function getRecommendedStructures(roofArea, budget) {
  const structures = [];
  
  if (budget >= 30000) {
    structures.push({
      name: "Underground Storage Tank",
      capacity: `${Math.round(roofArea * 0.5)}L`,
      specs: "RCC construction with first flush diverter",
      cost: `₹${(roofArea * 25).toLocaleString()}`
    });
  }
  
  if (budget >= 20000) {
    structures.push({
      name: "Recharge Pit",
      dimensions: "2m × 2m × 3m",
      specs: "Filled with filter media (sand, gravel)",
      cost: "₹15,000"
    });
  }
  
  structures.push({
    name: "Filtration System",
    specs: "Multi-stage filtration with sediment and carbon filters",
    cost: "₹8,000"
  });
  
  return structures;
}

function generateTechnicalSpecs(roofArea, harvestPotential) {
  return {
    catchmentArea: `${roofArea} sq ft`,
    annualYield: `${harvestPotential.toLocaleString()}L`,
    storageRecommended: `${Math.round(roofArea * 0.3)}L`,
    pipeSize: roofArea > 1500 ? "4 inch PVC" : "3 inch PVC",
    gutterSize: "6 inch semi-circular",
    firstFlushVolume: `${Math.round(roofArea * 0.02)}L`
  };
}

function calculateEnvironmentalImpact(harvestPotential) {
  return {
    groundwaterRecharge: `${Math.round(harvestPotential * 0.7).toLocaleString()}L/year`,
    co2Reduction: `${Math.round(harvestPotential * 0.0003)} kg/year`,
    energySaved: `${Math.round(harvestPotential * 0.002)} kWh/year`,
    treesEquivalent: Math.round(harvestPotential * 0.0003 / 22) // 22kg CO2/tree/year
  };
}

function generateActionPlan(feasibilityScore, budget) {
  const steps = [];
  
  if (feasibilityScore >= 80) {
    steps.push("✅ Excellent feasibility - Proceed with full system installation");
    steps.push("📋 Get detailed site survey from certified installer");
    steps.push("💰 Apply for government subsidies immediately");
    steps.push("🔨 Schedule installation during dry season");
  } else if (feasibilityScore >= 60) {
    steps.push("⚡ Good potential - Consider phased implementation");
    steps.push("💡 Start with basic rainwater collection system");
    steps.push("📈 Upgrade to full system based on initial results");
  } else {
    steps.push("⚠️ Limited feasibility - Focus on water conservation first");
    steps.push("💧 Implement water-saving measures");
    steps.push("🔍 Consider community-level harvesting solutions");
  }
  
  steps.push("📚 Complete our educational modules");
  steps.push("👥 Connect with local RTRWH community");
  
  return steps;
}

function displayResults(results) {
  // Update overview tab
  document.getElementById('annualHarvest').textContent = `${results.annualHarvestPotential.toLocaleString()} L`;
  document.getElementById('costSavings').textContent = `₹${results.annualCostSavings.toLocaleString()}`;
  document.getElementById('paybackPeriod').textContent = `${results.paybackPeriod} years`;
  document.getElementById('govtSubsidy').textContent = `₹${results.governmentSubsidy.toLocaleString()}`;
  
  // Update feasibility score
  document.getElementById('feasibilityScore').textContent = `${results.feasibilityScore}%`;
  document.querySelector('.meter-fill').style.width = `${results.feasibilityScore}%`;
  
  // Create harvest chart
  createHarvestChart(results.monthlyHarvestData);
  
  // Create cost chart
  createCostChart(results.systemCost, results.governmentSubsidy);
  
  // Update structures tab
  updateStructuresTab(results.recommendedStructures);
  
  // Update technical tab
  updateTechnicalTab(results.technicalSpecs);
  
  // Update impact tab
  updateImpactTab(results.environmentalImpact);
  
  // Update action plan tab
  updateActionPlanTab(results.actionPlan);
}

function createHarvestChart(monthlyData) {
  const ctx = document.getElementById('harvestChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [{
        label: 'Water Harvest (Liters)',
        data: monthlyData,
        backgroundColor: '#1FB8CD',
        borderColor: '#1FB8CD',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

function createCostChart(systemCost, subsidy) {
  const ctx = document.getElementById('costChart').getContext('2d');
  const netCost = systemCost - subsidy;
  
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Your Cost', 'Government Subsidy'],
      datasets: [{
        data: [netCost, subsidy],
        backgroundColor: ['#FFC185', '#1FB8CD'],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });
}

function updateStructuresTab(structures) {
  const structuresList = document.getElementById('structuresList');
  structuresList.innerHTML = structures.map(structure => `
    <div class="structure-item">
      <div class="structure-name">${structure.name}</div>
      <div class="structure-specs">
        ${structure.capacity ? `Capacity: ${structure.capacity}<br>` : ''}
        ${structure.dimensions ? `Dimensions: ${structure.dimensions}<br>` : ''}
        Specifications: ${structure.specs}<br>
        Cost: ${structure.cost}
      </div>
    </div>
  `).join('');
}

function updateTechnicalTab(specs) {
  const technicalSpecs = document.getElementById('technicalSpecs');
  technicalSpecs.innerHTML = Object.entries(specs).map(([key, value]) => `
    <div class="result-card">
      <h5>${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</h5>
      <div class="result-value">${value}</div>
    </div>
  `).join('');
}

function updateImpactTab(impact) {
  const impactDetails = document.getElementById('impactDetails');
  impactDetails.innerHTML = `
    <div class="results-grid">
      <div class="result-card">
        <h4>Groundwater Recharge</h4>
        <div class="result-value">${impact.groundwaterRecharge}</div>
      </div>
      <div class="result-card">
        <h4>CO2 Reduction</h4>
        <div class="result-value">${impact.co2Reduction} kg</div>
      </div>
      <div class="result-card">
        <h4>Energy Saved</h4>
        <div class="result-value">${impact.energySaved} kWh</div>
      </div>
      <div class="result-card">
        <h4>Tree Equivalent</h4>
        <div class="result-value">${impact.treesEquivalent} trees</div>
      </div>
    </div>
  `;
}

function updateActionPlanTab(actionPlan) {
  const actionPlanElement = document.getElementById('actionPlan');
  actionPlanElement.innerHTML = `
    <div class="action-steps">
      ${actionPlan.map(step => `<div class="action-step">${step}</div>`).join('')}
    </div>
  `;
}

function saveAssessmentToHistory() {
  const history = JSON.parse(localStorage.getItem('assessmentHistory') || '[]');
  const assessment = {
    id: Date.now(),
    date: new Date().toISOString(),
    data: assessmentData,
    timestamp: Date.now()
  };
  
  history.unshift(assessment);
  if (history.length > 10) history.pop(); // Keep only last 10 assessments
  
  localStorage.setItem('assessmentHistory', JSON.stringify(history));
  localStorage.setItem('hasCompletedAssessment', 'true');
}

function switchTab(tabName) {
  // Update tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });
  
  // Update tab content
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.toggle('hidden', !content.id.includes(tabName));
    content.classList.toggle('active', content.id.includes(tabName));
  });
}

function downloadReport() {
  // Generate PDF report
  const reportData = {
    assessment: assessmentData,
    timestamp: new Date().toISOString(),
    language: currentLanguage
  };
  
  const reportContent = generateReportContent(reportData);
  downloadFile(reportContent, `RTRWH-Assessment-${Date.now()}.txt`, 'text/plain');
}

function shareResults() {
  if (navigator.share) {
    navigator.share({
      title: 'My RTRWH Assessment Results',
      text: 'Check out my rainwater harvesting assessment results!',
      url: window.location.href
    });
  } else {
    // Fallback for browsers without Web Share API
    const shareUrl = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      showSuccess('Link copied to clipboard!');
    }
  }
}

function generateReportContent(data) {
  return `
AQUAHARVEST PRO - RTRWH ASSESSMENT REPORT
Generated on: ${new Date().toLocaleDateString()}

LOCATION DETAILS:
Address: ${data.assessment.address || 'Not provided'}
PIN Code: ${data.assessment.pinCode || 'Not provided'}
State: ${data.assessment.state || 'Not provided'}
District: ${data.assessment.district || 'Not provided'}

PROPERTY INFORMATION:
Roof Area: ${data.assessment.roofArea || 'Not provided'} sq ft
Roof Type: ${data.assessment.roofType || 'Not provided'}
Storage Space: ${data.assessment.storageSpace || 'Not provided'}
Building Height: ${data.assessment.buildingHeight || 'Not provided'}

HOUSEHOLD DETAILS:
Residents: ${data.assessment.residents || 'Not provided'}
Water Consumption: ${data.assessment.waterConsumption || 'Not provided'} L/day

PREFERENCES:
Budget: ₹${parseInt(data.assessment.budget || 0).toLocaleString()}
Maintenance Level: ${data.assessment.maintenance || 'Not provided'}
Primary Use: ${data.assessment.primaryUse || 'Not provided'}

This report was generated by AquaHarvest Pro - Transform Every Drop into Opportunity
Visit https://aquaharvest.pro for more information.
  `;
}

function renderEducationalModules() {
  const modulesGrid = document.getElementById('modulesGrid');
  modulesGrid.innerHTML = educationalModules.map(module => `
    <div class="module-card" onclick="openModule(${module.id})">
      <div class="module-header">
        <div class="module-title">${module.title}</div>
        <div class="module-duration">${module.duration}</div>
      </div>
      <div class="module-topics">
        ${module.topics.map(topic => `<span class="topic-tag">${topic}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

function renderSuccessStories() {
  const stories = [
    {
      author: "Rajesh Kumar",
      location: "Mumbai, Maharashtra",
      content: "Saved ₹25,000 annually on water bills after implementing RTRWH system. The assessment was spot-on!"
    },
    {
      author: "Priya Sharma",
      location: "Bangalore, Karnataka",
      content: "The government subsidy information helped us get ₹1.35 lakh support. Highly recommended!"
    }
  ];
  
  const storiesGrid = document.getElementById('storiesGrid');
  storiesGrid.innerHTML = stories.map(story => `
    <div class="story-card">
      <div class="story-header">
        <div class="story-author">${story.author}</div>
        <div class="story-location">${story.location}</div>
      </div>
      <div class="story-content">${story.content}</div>
    </div>
  `).join('');
}

// Utility functions
function hideSection(sectionId) {
  document.getElementById(sectionId).classList.add('hidden');
}

function showSection(sectionId) {
  document.getElementById(sectionId).classList.remove('hidden');
}

function showLoadingSpinner() {
  document.getElementById('loadingSpinner').classList.remove('hidden');
}

function hideLoadingSpinner() {
  document.getElementById('loadingSpinner').classList.add('hidden');
}

function showError(message) {
  // Simple error display - could be enhanced with a toast notification
  alert(message);
}

function showSuccess(message) {
  // Simple success display - could be enhanced with a toast notification
  alert(message);
}

function showUpdateAvailable() {
  if (confirm('A new version is available. Reload to update?')) {
    window.location.reload();
  }
}

function downloadFile(content, filename, contentType) {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function openModule(moduleId) {
  const module = educationalModules.find(m => m.id === moduleId);
  alert(`Opening module: ${module.title}\n\nTopics covered:\n${module.topics.join('\n')}`);
}

// Offline functionality
window.addEventListener('online', () => {
  console.log('Back online');
  showSuccess('Connection restored');
});

window.addEventListener('offline', () => {
  console.log('Gone offline');
  showSuccess('App is now in offline mode');
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    performRTRWHCalculations,
    calculateFeasibilityScore,
    generateMonthlyHarvestData
  };
}

if ("serviceWorker" in navigator) {
window.addEventListener("load", () => {
navigator.serviceWorker.register("/sw.js");
});
}
