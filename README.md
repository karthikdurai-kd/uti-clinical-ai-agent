# ⚕️ LiveWell UTI (Urinary Tract Infection) Treatment AI Agent
An intelligent AI-powered healthcare agent that specializes in diagnosing and treating urinary tract infections (UTIs) following clinical guidelines.

## 🎯 Overview

This UTI Treatment Agent can:
- Collect patient symptoms and medical history
- Assess eligibility for UTI treatment
- Prescribe appropriate antibiotic treatments
- Provide patient education and follow-up instructions

## 🚀 Features

### **Clinical Assessment**
- Systematic patient data collection
- Evidence-based eligibility criteria
- Risk factor assessment
- Red flag detection

### **Treatment Recommendations**
- First-line antibiotic selection
- Alternative treatment options
- Dosage and duration guidelines
- Patient safety considerations

### **Logging**
- Role-based logging (User/Agent/System)
- Local file storage

## 📋 Prerequisites

- Node.js
- npm or yarn
- OpenAI API key

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:karthikdurai-kd/livewell-ai-uti-agent.git
   cd livewell-ai-uti-agent
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Add your OpenAI API key
   OPENAI_API_KEY=your_api_key_here
   ```

##  Usage

### **Start the Agent**
```bash
npm start
```

## 🏥 Clinical Guidelines

The agent follows evidence-based UTI treatment guidelines from the [Ontario College of Pharmacists Assessment & Prescribing Algorithm for Uncomplicated Urinary Tract Infection (Cystitis)](https://www.ocpinfo.com/wp-content/uploads/2022/12/assessment-prescribing-algorithm-urinary-tract-infection-english.pdf).


### **Eligibility Criteria**
- Adult (≥18 years)
- Female patients only
- Non-pregnant
- No fever/chills or flank pain
- No recurrent UTIs
- No complicating factors


## 📁 Project Structure

```
livewell-ai-uti-agent/
├── src/
│   ├── index.js              # Main application entry point
│   ├── utiAgent.js           # Core UTI agent logic
│   ├── guidelines.js         # Clinical guidelines and algorithms
│   ├── openaiService.js      # OpenAI API integration
│   ├── terminal.js           # Terminal UI and display functions
│   └── utils/
│       └── logger.js         # Winston-based logging system
├── logs/                     # Application logs (not in git)
├── package.json              # Dependencies and scripts
├── .env                      # Environment variables (not in git)
└── README.md                 # This file
```

##  Configuration

### **Environment Variables**
```bash
OPENAI_API_KEY=your_openai_api_key
LOG_LEVEL=info
```

## 📊 Logging

The system generates comprehensive logs for:
- User interactions
- Agent responses
- Clinical decisions
- System events
- Error tracking

### **Log Format**
```json
{
  "timestamp": "2024-01-15 19:30:45",
  "level": "info",
  "message": "User Input",
  "role": "user",
  "content": "I have burning sensation"
}
```

##  Testing

### **Run the Application**
```bash
npm start
```

### **Test Scenarios**
1. **Eligible Patient**: Female, 25, non-pregnant, uncomplicated symptoms
2. **Ineligible Patient**: Male, pregnant, or with red flags
3. **Edge Cases**: Allergies, kidney disease, recurrent UTIs


