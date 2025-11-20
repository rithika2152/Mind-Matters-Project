# Mind Matters Project

Mind Matters

A mental-health and well-being platform for children and young people

# 🚀 Project Overview

I built Mind Matters to empower kids and young lives through accessible, interactive mental-health support. It’s designed to serve as a friendly chatbot + self-assessment platform with features like mood tracking, symptom checks, personalised recommendations and mental-well-being resources.
I used a modern tech stack (React + Vite + TypeScript) for performance and scalability, and integrated AI models (BERT for emotion detection) and data sources (PsycINFO, Kaggle, Data.gov) to provide meaningful insights and support.

# 🧠 Key Features

Here’s what Mind Matters can do:

Daily mood tracking: Let users check in how they feel and monitor trends over time

Symptom assessment: Kids can answer simple questions and get suggestions for next steps

Emotion detection: I use a BERT-based model to analyse written inputs and detect underlying feelings

Resource library: Curated articles, breathing exercises, mood-boosting activities

Dashboard: Visualisation of tracked moods, assessment history and progress (React + charting)

Responsive and performant: Built with Vite + TypeScript to ensure fast UI and smooth experience

# 🛠️ Tech Stack

Frontend: React, Vite, TypeScript, Tailwind CSS

Backend / API: Supabase (authentication + database + real-time)

AI / ML: BERT model (pre-trained + fine-tuned) for emotion detection

Data Sources: PsycINFO, Kaggle datasets, Data.gov for mental-health research & statistics

Deployment: Deployed on Vercel 


 # 🔍 Architecture & Flow

User signs up / logs in (Supabase authentication)

User submits mood check-in or assessment question set

The input text is processed through the BERT model for emotion detection

The system stores entries in Supabase database and returns personalised recommendations

Dashboard visualises the user’s historical data, mood trends and gives actionable insights

Resource library and activities are accessible via UI

📂 Project Structure

Here’s a simplified breakdown of folder structure (adapt to your actual structure):

/src
  /components       – reusable UI components  
  /pages            – route-based pages (Dashboard, Assessment, Resources, Profile)  
  /services         – API and ML model integration  
  /utils            – helper functions  
  /hooks            – custom React hooks  
/ai
  – BERT-model code, training / fine-tuning scripts  
/public
  – static assets, images  

# ✅ Getting Started (Local Setup)

Clone the repo:

git clone https://github.com/YOUR_USERNAME/mind-matters.git
cd mind-matters


Install dependencies:

npm install


Setup environment variables:
Create a .env.local file with keys such as:

VITE_SUPABASE_URL=your_supabase_url  
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key  
VITE_ML_MODEL_ENDPOINT=your_model_endpoint  


Run the dev server:

npm run dev


Open http://localhost:3000
 (or whichever port Vite uses) in your browser.

# 🎨 Deployment

I deployed the app on Vercel. Simply push to main (or master) branch and Vercel will auto-deploy. Ensure your environment variables are set in the Vercel dashboard.


# 🧑‍🏫 Why This Matters

Mental health among children and young people is a rising concern globally. I built Mind Matters to:

Provide early detection and prevention tools rather than only crisis support

Make mental-health self-assessment and tracking easy, visually engaging and non-intimidating

Leverage AI to personalise support and make resources actionable

📄 License

This project is licensed under the MIT License – feel free to use, modify and contribute!


Thank you for checking out Mind Matters. Together we can empower young lives and build better mental-health awareness.
— Rithika
