# WheelWorld

WheelWorld is a full-stack car dealership management web application built with Django on the backend, React on the frontend, and is fully mobile-responsive. The complexity of WheelWorld lies in its various features and the technologies used, as detailed below.

## Distinctiveness and Complexity

1. **Distinctiveness:**
   - My final project, WheelWorld, is not only sufficiently distinct from the other projects in this course (being neither a social network nor an e-commerce app) but also more complex than those (see detailed below).
   - It also presents me with a valuable opportunity to rewrite every single line of code of my ongoing personal project, substantially improving its design, implementation, functionality, and appearance.
2. **Complexity:**
   - As required, I designed and implemented a dynamic website of my own, using Django for the backend, SQLite for the database, and JavaScript for the frontend.
   - **Design:**
     - The project (wheelworld) comprises four apps: accounts, inventory, sales, and services.
     - The Django backend includes nine models, which are interconnected with foreign keys when necessary, making the database schema more complex.
     - The React frontend includes 26 component js files. The application uses React Router for navigation and Context API for state management across components.
   - **Frontend:**
     - A Single-Page Application (SPA) using React with its functional components and React hooks (useState, useEffect, useContext, useCallback) for a smoother user experience.
     - Mobile responsive design using Bootstrap and custom CSS is implemented for every single page.
     - The application features a responsive Navbar that displays all functionalities, a digital clock, a dynamic greeting message, and login/logout/register buttons. 
   - **Backend:**
     - Used Django ORM with models and migrations.
     - Used Django REST API, which returns JSON instead of "traditional" HTML template rendering as in all other projects in this course.
     - I utilized Django's model_to_dict function to convert instances of model classes into dictionaries for JSON serialization.
   - **Authentication:**
       - For backend authentication, I used Django's REST API and built-in login, logout, and register functions.
       - Frontend Auth: React custom-built authentication system.
       - Global state management: React useContext hook.
   - **Styling:**
     - Bootstrap classes for a consistent look across the website.
     - Mobile responsive design is implemented for every single page.

## What’s contained in each file you created.

- WheelWorld (Django Project) -- A comprehensive car dealership management App.
   - Accounts App (API)
     - Models.py
     - Views.py
     - Urls.py
   - Inventory App (API)
     - Models.py
     - Views.py
     - Urls.py
   - Service App (API)
     - Models.py
     - Views.py
     - Urls.py
   - Sales App (API)
     - Models.py
     - Views.py
     - Urls.py
   - WheelWorld
     - settings.py
     - urls.py
   - ghi (Frontend) 
      - App.css
      - App.js
      - AppointmentForm.js
      - AppointmentList.js
      - AuthContext.js
      - AutomobileForm.js
      - AutomobileList.js
      - CustomerForm.js
      - CustomerList.js
      - HomePage.css
      - HomePage.js
      - index.css
      - index.js
      - Login.js
      - Logout.js
      - ManufacturerForm.js
      - ManufacturerList.js
      - ModelForm.js
      - ModelList.js
      - Navbar.css
      - Navbar.js
      - Register.js
      - SaleForm.js
      - SalesHistory.js
      - SalesList.js
      - SalespeopleList.js
      - SalespersonForm.js
      - ServiceHistory.js
      - TechnicianForm.js
      - TechnicianList.js
      - package.json
   - manage.py
   - requirements.txt

## How to run your application.
   1. Clone the repository: `git clone <repository_url>`
   2. Navigate to the project directory with `cd <project_directory>`
   3. Install the Python dependencies with `pip install -r requirements.txt`
   4. Apply the Django migrations with `python manage.py migrate`
   5. Start the Django server with `python manage.py runserver`
   6. In a new terminal, navigate to the frontend directory: `cd ghi`
   7. Install the Node.js dependencies with `npm install`
   8. Start the React development server with `npm start`

- Now, your Django backend should be running at http://localhost:8000/ and your React frontend should be running at http://localhost:3000/.

- Please replace <repository_url> and <project_directory> with the actual URL of your GitHub repository and the name of your project directory, respectively.

## Any other additional information the staff should know about your project.

 - How it differs from its previous version:
   - I converted the previous microservices architecture into a monolithic architecture to reduce costs after deployment.
   - I turned the previous three databases into one also to reduce cost (after deployment).
   - I replaced polling between microservices with HTTP requests to realize efficient and immediate data synchronization between apps and to reduce cost (after deployment).
   - I added a whole new authentication system (both frontend Auth and backend Auth) using Django REST API, React, and React hooks (e.g., useContext).
   - I designed and implemented a responsive Navbar with dropdown lists of all functionalities, a digital clock, and login/logout/register buttons.
   - I designed and implemented a HomePage with a visually appealing style.
   - I added mobile responsiveness to every single React page.
   - More importantly, I rewrote and optimized every single line of code to make it a whole new project.
