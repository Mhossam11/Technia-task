Technia Task

A React.js front-end application built as part of the Technia ERP system task. This project demonstrates a modern, responsive UI for managing different modules such as Employees, Salaries, and Leave Management with a focus on clarity, usability, and structured design.

🔗 Repository: Technia Task

🚀 Features

Built with React.js for component-based architecture.

Light Mode Only with clean, minimal design.

Tailwind CSS for fast, utility-first styling.

Role-Based Pages: Organized views for HR-related tasks.

Dynamic Routes for Employees and Salaries (Add, Edit, Delete, List).

Dashboard Layout including:

Welcome Section

GPA Section with progress visualization

Reminders Section

Credit Hours Section

Responsive UI that adapts to different screen sizes.

📂 Project Structure
Technia-task/
│── src/
│   ├── components/        # Reusable UI components (Cards, Buttons, etc.)
│   ├── pages/             # Page views (Employees, Salaries, Leave Management)
│   ├── layouts/           # Dashboard and Portal layouts
│   ├── routes/            # Route definitions for navigation
│   ├── assets/            # Icons, images, and static files
│   └── App.js             # Main app entry
│── public/                # Public assets
│── package.json           # Dependencies and scripts
│── tailwind.config.js     # Tailwind configuration
│── README.md              # Documentation

🖼️ Pages & Routes
Employees

List Employees → /hr/employees

Add Employee → /hr/employees/add

Edit Employee → /hr/employees/:id/edit

Delete Employee → Action-based

Salaries

List Salaries → /hr/salaries

Add Salary → /hr/salaries/add

Edit Salary → /hr/salaries/:id/edit

Delete Salary → Action-based

Leave Management

Leave Dashboard → /hr/leave-management

🎨 Styling

Framework: Tailwind CSS

Theme: Light Mode Only

Color Palette:

Primary: Gold (#fbbf24, Tailwind amber-400)

Contrast: White background with subtle shadows

Accent: Blue-gray tones for text and icons

⚙️ Installation & Setup

Clone the repo

git clone https://github.com/Mhossam11/Technia-task.git
cd Technia-task


Install dependencies

npm install


Start the development server

npm run dev


Open in browser
Go to http://localhost:5173/

🛠️ Tech Stack

React.js – Component-based framework

Tailwind CSS – Styling and responsive design

React Router – Routing and navigation

Lucide Icons – Modern icon set

📌 Future Improvements

Add dark mode support.

Enhance form validation for employee and salary entries.

Integrate with backend APIs for real data.

Add authentication & role management.

👨‍💻 Author

Mohamed Hossam Mohamed Ali

 Cairo, Egypt

📧 mhossam572000@gmail.com
