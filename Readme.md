# Climate Action AI

A comprehensive climate dashboard that combines real-time climate metrics monitoring with AI-powered insights for carbon footprint management and policy recommendations.
This full-stack Agentic AI web application is designed to help organizations and individuals make data-driven climate action decisions.

---

### Key Features

* **Climate Dashboard**: Displays real-time climate metrics with interactive charts.
* **Carbon Calculator**: A multi-factor tool to calculate carbon footprints.
* **Credit Optimization**: Provides AI-powered recommendations for carbon credit allocation.
* **Policy Assistant**: An evidence-based engine for generating policy suggestions.
* **AI Chat**: A conversational AI assistant for climate-related queries.

---

### System Architecture

#### Frontend
* **Framework**: React with TypeScript (Vite)
* **UI**: Shadcn/ui components built on Radix UI, styled with **Tailwind CSS**.
* **State Management**: TanStack Query for data fetching.
* **Routing**: Wouter.
* **Charts**: Chart.js for data visualization.

#### Backend
* **Framework**: Express.js with TypeScript (Node.js)
* **Database ORM**: Drizzle ORM for PostgreSQL.
* **API**: RESTful endpoints for all core features.
* **Data Storage**: Uses in-memory storage with an interface for future database integration.

---

### Database Schema

* **Climate Metrics**: Real-time environmental data (CO2 levels, temperature, etc.).
* **Carbon Calculations**: User-submitted carbon footprint data.
* **Carbon Credits**: Projects with pricing and impact levels.
* **Policy Recommendations**: AI-generated policy suggestions.
* **Chat Messages**: History of conversational AI interactions.

---

### External Dependencies

* **Database**: Neon Database (PostgreSQL).
* **AI Services**: OpenAI API (GPT-4o model).
* **UI/Visualization**: Radix UI, Chart.js, Tailwind CSS.
* **Dev Tools**: Vite, TypeScript, ESBuild.
* **Forms**: React Hook Form with Zod for validation.

---
### Output 

* Output 1 -
<img width="1361" height="787" alt="1" src="https://github.com/user-attachments/assets/4b80508f-8867-49de-8e9b-f30c7f297c00" />

* Output 2 -
<img width="1307" height="765" alt="2" src="https://github.com/user-attachments/assets/d849c54a-d33c-4038-9969-e251d698b9f6" />`

* Output 3-
<img width="1258" height="607" alt="3" src="https://github.com/user-attachments/assets/0d22847d-1783-4609-8bc0-869777a625e1" />

---

### How to Use This Project:

Follow these steps to get the project up and running on your local machine.
### Prerequisites-
* **Node.js** (v18 or higher recommended) and **npm**

```bash
git clone https://github.com/kanishk-2/climate-action-ai.git
cd climate-action-ai
npm run build # Build the entire project 
npm run dev # Start the development server
