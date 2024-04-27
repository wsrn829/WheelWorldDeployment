# WheelWorld

- Under its own header within the README called Distinctiveness and Complexity: Why you believe your project satisfies the distinctiveness and complexity requirements, mentioned above.
- Your web application must be sufficiently distinct from the other projects in this course (and, in addition, may not be based on the old CS50W Pizza project), and more complex than those. 
- A project that appears to be a social network is a priori deemed by the staff to be indistinct from Project 4, and should not be submitted; it will be rejected.
- A project that appears to be an e-commerce site is strongly suspected to be indistinct from Project 2, and your README.md file should be very clear as to why it’s not. Failing that, it should not be submitted; it will be rejected.
- Your web application must utilize Django (including at least one model) on the back-end and JavaScript on the front-end.
- Your web application must be mobile-responsive."

## Distinctiveness and Complexity

1. Distinctiveness:
   - My final project, WheelWorld, is not only sufficiently distinct from the other projects in this course (being neither a social network nor an e-commerce app) but also more complex than those (see detailed below).
   - It also presents me with a valuable opportunity to rewrite every single line of code of my ongoing personal project, substantially improving its design, implementation, and appearance.
2. Complexity:
   As required, I designed and implemented a dynamic website of my own, using Django for the backend, SQLite for the database, and JavaScript for the frontend.
   - Design:
     - The project (wheelworld) comprises four apps: accounts, inventory, sales, and services.
     - Nine models with Foreign Keys to connect database tables when necessary.
     - 26 React component .js files.
   - Frontend:
     - A Single-Page Application (SPA) using React with its functional components and React hooks (useState, useEffect, useContext, useCallback) for a smoother user experience.
     - Mobile responsive design using Bootstrap and custom CSS classes is implemented for every single page.
     - The application features a responsive Navbar that displays all functionalities, a digital clock, a dynamic greeting message, and login/logout/register buttons. 
   - Backend:
     - Used Django ORM with models and migrations.
     - Used Django REST API, which returns JSON instead of "traditional" HTML template rendering as in all other projects in this course.
     - I utilized Django's model_to_dict function to convert instances of model classes into dictionaries for JSON serialization.
   - Authentication:
       - For backend authentication, I used Django's REST API and built-in login, logout, and register functions.
       - Frontend Auth: React custom components.
       - Global state management: React useContext hook.
   - Styling:
     - Bootstrap classes for a consistent look across the website.
     - Mobile responsive design is implemented for every single page.

## What’s contained in each file you created.

- WheelWorld (Django Project) - A comprehensive car dealership management App.
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

## How to run your application.
- `git clone <repository_url>`
- `cd <project_directory>`
- `pip install -r requirements.txt`
- `python manage.py migrate`
- `python manage.py runserver`
- Open a new terminal window or tab and navigate into the frontend directory (where your React application is located):
- `cd ghi`
- `npm install`
- `npm start`

- Now, your Django backend should be running at http://localhost:8000/ and your React frontend should be running at http://localhost:3000/.

- Please replace <repository_url> and <project_directory> with the actual URL of your GitHub repository and the name of your project directory, respectively.

## Any other additional information the staff should know about your project.

 - How it differs from its previous version:
   - I converted the previous microservices architecture into a monolithic architecture to reduce costs after deployment.
   - I turned the previous three databases into one also to reduce cost (after deployment).
   - I replaced polling between microservices with HTTP requests to realize efficient and immediate data synchronization between apps and to reduce cost (after deployment).
   - I added a whole new authentication system (both frontend Auth and backend Auth) using Django REST API, React, and React hooks (e.g., useContext).
   - I added mobile responsiveness to every single React page.
   - More importantly, I rewrote and optimized every single line of code.
