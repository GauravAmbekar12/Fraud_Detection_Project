# Real-Time Credit Card Fraud Detection System

A full-stack enterprise-grade application designed to detect fraudulent transactions in real-time. This project integrates a Machine Learning pipeline with a robust .NET backend and a modern Angular frontend.

## 🚀 System Architecture

-   **Machine Learning:** Python (Scikit-Learn) using the **Random Forest** algorithm for high-accuracy classification.
-   **API Layer:** **FastAPI** (Python) serving the model for low-latency real-time predictions.
-   **Backend:** **.NET Core Web API** managing user authentication, registration, and business logic.
-   **Security:** **JWT (JSON Web Tokens)** for secure user sessions and API authorization.
-   **Database:** Stores user profiles (SQL Server).
-   **Frontend:** **Angular** dashboard for visualizing fraud alerts.
-   **Processing:** Supports both **Real-Time Inference** and **Batch Processing** of transaction logs.

---

## ✨ Features

* **Secure Authentication:** User login and registration system with encrypted passwords and JWT-protected routes.
* **Real-Time Detection:** Immediate fraud scoring as soon as a transaction is submitted.
* **Batch Processing:** Ability to upload and analyze large datasets of historical transactions for fraud patterns.
* **Scalable Backend:** Decoupled architecture where .NET handles the heavy business logic while FastAPI focuses on ML inference.

---

## 🛠️ Tech Stack

### AI/ML (Model)
* Python
* Random Forest Classifier
* Pandas / Scikit-Learn

### Backend
* FastAPI (Python) - ML Serving
* .NET Core (C#) - Core Logic & Auth
* Entity Framework Core
* JWT Authentication

### Frontend
* Angular
* Components 
---

## 📁 Project Structure

* `/Backend`: .NET Core source code for Auth and User Management.
* `/Model`: Python scripts, FastAPI implementation, and the saved Random Forest model.
* `/UI`: Angular project files for the user interface.
* `/.github`: CI/CD workflows and automation.

---
<img width="1920" height="1080" alt="HLD2 O" src="https://github.com/user-attachments/assets/815548bb-ddf9-422a-a0b3-ea3ab5799b44" />


