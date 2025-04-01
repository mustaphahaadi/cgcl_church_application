# Church App

A full-stack web application for church management with features for testimonies, user management, and more.

## MVP Features

### User Management
- Custom user authentication system
- JWT-based authentication
- User profile management
- Role-based access control

### Content Management
- Testimony sharing and management
- Blog/News section
- Events calendar
- Service times information

### Frontend Features
- Responsive design
- Protected routes
- User dashboard
- Interactive forms
- Real-time updates

## Prerequisites

- Node.js (v16 or higher)
- Python (v3.8 or higher)
- pip (Python package manager)
- npm (Node package manager)

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - Windows:
     ```bash
     .\venv\Scripts\activate
     ```
   - Unix/MacOS:
     ```bash
     source venv/bin/activate
     ```

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Create a .env file in the backend directory with the following variables:
   ```env
   DJANGO_SECRET_KEY=your_secret_key_here
   DEBUG=True
   ```

6. Run migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

7. Create a superuser:
   ```bash
   python manage.py createsuperuser
   ```

8. Start the development server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. From the root directory, install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

## Testing the System

1. Backend API Testing:
   - Access the Django admin interface at `http://localhost:8000/admin`
   - Use the superuser credentials created earlier to log in
   - Test API endpoints using tools like Postman or curl:
     - Authentication: `POST http://localhost:8000/api/token/`
     - User Registration: `POST http://localhost:8000/api/users/register/`
     - Testimonies: `GET http://localhost:8000/api/testimonies/`

2. Frontend Testing:
   - Access the frontend at `http://localhost:5173`
   - Test user registration and login
   - Navigate through different pages
   - Try creating and viewing testimonies
   - Test protected routes

## Development Workflow

1. Backend Development:
   - Run tests: `python manage.py test`
   - Check API documentation at `http://localhost:8000/api/docs/`
   - Monitor the Django debug toolbar for performance

2. Frontend Development:
   - Run tests: `npm test`
   - Check for linting errors: `npm run lint`
   - Build for production: `npm run build`

## Common Issues and Solutions

1. Database Migrations:
   - If you encounter migration issues, try:
     ```bash
     python manage.py migrate --run-syncdb
     ```

2. Frontend Build Issues:
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall: 
     ```bash
     rm -rf node_modules
     npm install
     ```

3. CORS Issues:
   - Ensure the backend CORS settings match your frontend URL
   - Check if the API endpoints are correctly configured in the frontend

## Additional Resources

- Django Documentation: https://docs.djangoproject.com/
- React Documentation: https://react.dev/
- Vite Documentation: https://vitejs.dev/
- Tailwind CSS Documentation: https://tailwindcss.com/docs
