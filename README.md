# Leadmasters.Ai
# Comprehensive Exam Application with Proctoring

A modern, secure exam application built with React, TypeScript, and Supabase featuring real-time proctoring, user authentication, and comprehensive exam management.

## Features

- 🔐 **Secure Authentication** - Email/password login with Supabase Auth
- 📚 **Module-based Exams** - Programming Basics, JavaScript, and React modules
- 👁️ **Real-time Proctoring** - Tab switching detection, fullscreen enforcement, violation tracking
- ⏱️ **Timed Exams** - Automatic submission when time expires
- 📊 **Detailed Results** - Question-by-question review with correct answers
- 🎯 **Progress Tracking** - Dashboard with attempt history and statistics
- 📱 **Responsive Design** - Optimized for desktop exam-taking experience

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Bolt Hosting

## Prerequisites

- Node.js 18+ and npm
- Supabase account
- Modern web browser with fullscreen API support

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd exam-application
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Supabase Setup

#### Option A: Using Supabase Dashboard
1. Create a new Supabase project
2. Go to SQL Editor and run the migration files:
   - `supabase/migrations/create_exam_tables.sql`
   - `supabase/migrations/insert_questions.sql`

#### Option B: Using Supabase CLI (if available)
```bash
supabase init
supabase db reset
```

### 4. Database Schema

The application uses the following tables:

- **modules** - Exam modules (Programming Basics, JavaScript, React)
- **questions** - Multiple choice questions with correct answers
- **user_attempts** - User exam attempts with scores and violations
- **users** - Managed by Supabase Auth

### 5. Run the Application

```bash
npm run dev
```

Visit `http://localhost:5173` to access the application.

## API Testing

### Authentication Endpoints

#### Sign Up
```bash
curl -X POST 'https://your-project.supabase.co/auth/v1/signup' \
  -H 'apikey: YOUR_SUPABASE_ANON_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

#### Sign In
```bash
curl -X POST 'https://your-project.supabase.co/auth/v1/token?grant_type=password' \
  -H 'apikey: YOUR_SUPABASE_ANON_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Database API Endpoints

#### Get All Modules
```bash
curl -X GET 'https://your-project.supabase.co/rest/v1/modules' \
  -H 'apikey: YOUR_SUPABASE_ANON_KEY' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN'
```

#### Get Questions for a Module
```bash
curl -X GET 'https://your-project.supabase.co/rest/v1/questions?module_id=eq.MODULE_ID&order=question_number' \
  -H 'apikey: YOUR_SUPABASE_ANON_KEY' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN'
```

#### Submit Exam Attempt
```bash
curl -X POST 'https://your-project.supabase.co/rest/v1/user_attempts' \
  -H 'apikey: YOUR_SUPABASE_ANON_KEY' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "user_id": "USER_UUID",
    "module_id": "MODULE_UUID",
    "score": 15,
    "total_questions": 20,
    "time_taken_minutes": 25,
    "answers": {"question_id": "a", "question_id_2": "b"},
    "proctoring_violations": 2
  }'
```

#### Get User Attempts
```bash
curl -X GET 'https://your-project.supabase.co/rest/v1/user_attempts?user_id=eq.USER_ID&order=completed_at.desc' \
  -H 'apikey: YOUR_SUPABASE_ANON_KEY' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN'
```

## Postman Collection

### Import the following JSON into Postman:

```json
{
  "info": {
    "name": "Exam Application API",
    "description": "API endpoints for the comprehensive exam application",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "variable": [
    {
      "key": "supabase_url",
      "value": "https://your-project.supabase.co"
    },
    {
      "key": "supabase_anon_key",
      "value": "your_supabase_anon_key"
    },
    {
      "key": "access_token",
      "value": "your_access_token"
    }
  ],
  "item": [
    {
      "name": "Authentication",
      "item": [
        {
          "name": "Sign Up",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "apikey",
                "value": "{{supabase_anon_key}}"
              },
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"test@example.com\",\n  \"password\": \"password123\"\n}"
            },
            "url": {
              "raw": "{{supabase_url}}/auth/v1/signup",
              "host": ["{{supabase_url}}"],
              "path": ["auth", "v1", "signup"]
            }
          }
        },
        {
          "name": "Sign In",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "apikey",
                "value": "{{supabase_anon_key}}"
              },
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"test@example.com\",\n  \"password\": \"password123\"\n}"
            },
            "url": {
              "raw": "{{supabase_url}}/auth/v1/token?grant_type=password",
              "host": ["{{supabase_url}}"],
              "path": ["auth", "v1", "token"],
              "query": [
                {
                  "key": "grant_type",
                  "value": "password"
                }
              ]
            }
          }
        }
      ]
    },
    {
      "name": "Modules",
      "item": [
        {
          "name": "Get All Modules",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "apikey",
                "value": "{{supabase_anon_key}}"
              },
              {
                "key": "Authorization",
                "value": "Bearer {{access_token}}"
              }
            ],
            "url": {
              "raw": "{{supabase_url}}/rest/v1/modules",
              "host": ["{{supabase_url}}"],
              "path": ["rest", "v1", "modules"]
            }
          }
        }
      ]
    },
    {
      "name": "Questions",
      "item": [
        {
          "name": "Get Questions by Module",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "apikey",
                "value": "{{supabase_anon_key}}"
              },
              {
                "key": "Authorization",
                "value": "Bearer {{access_token}}"
              }
            ],
            "url": {
              "raw": "{{supabase_url}}/rest/v1/questions?module_id=eq.MODULE_ID&order=question_number",
              "host": ["{{supabase_url}}"],
              "path": ["rest", "v1", "questions"],
              "query": [
                {
                  "key": "module_id",
                  "value": "eq.MODULE_ID"
                },
                {
                  "key": "order",
                  "value": "question_number"
                }
              ]
            }
          }
        }
      ]
    },
    {
      "name": "User Attempts",
      "item": [
        {
          "name": "Submit Exam Attempt",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "apikey",
                "value": "{{supabase_anon_key}}"
              },
              {
                "key": "Authorization",
                "value": "Bearer {{access_token}}"
              },
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"user_id\": \"USER_UUID\",\n  \"module_id\": \"MODULE_UUID\",\n  \"score\": 15,\n  \"total_questions\": 20,\n  \"time_taken_minutes\": 25,\n  \"answers\": {\"question_id\": \"a\", \"question_id_2\": \"b\"},\n  \"proctoring_violations\": 2\n}"
            },
            "url": {
              "raw": "{{supabase_url}}/rest/v1/user_attempts",
              "host": ["{{supabase_url}}"],
              "path": ["rest", "v1", "user_attempts"]
            }
          }
        },
        {
          "name": "Get User Attempts",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "apikey",
                "value": "{{supabase_anon_key}}"
              },
              {
                "key": "Authorization",
                "value": "Bearer {{access_token}}"
              }
            ],
            "url": {
              "raw": "{{supabase_url}}/rest/v1/user_attempts?user_id=eq.USER_ID&order=completed_at.desc",
              "host": ["{{supabase_url}}"],
              "path": ["rest", "v1", "user_attempts"],
              "query": [
                {
                  "key": "user_id",
                  "value": "eq.USER_ID"
                },
                {
                  "key": "order",
                  "value": "completed_at.desc"
                }
              ]
            }
          }
        }
      ]
    }
  ]
}
```

## Usage

### For Students
1. **Sign Up/Login** - Create an account or sign in
2. **Select Module** - Choose from Programming Basics, JavaScript, or React
3. **Read Instructions** - Review exam rules and proctoring guidelines
4. **Take Exam** - Answer questions in fullscreen mode with proctoring active
5. **View Results** - See detailed results with correct answers

### For Administrators
- Access Supabase dashboard to manage questions and view user attempts
- Monitor proctoring violations through the user_attempts table
- Add new modules or questions through the database interface

## Proctoring Features

- **Fullscreen Enforcement** - Exam must be taken in fullscreen mode
- **Tab Switching Detection** - Violations recorded when switching tabs
- **Right-click Disabled** - Context menu disabled during exam
- **Keyboard Shortcuts Blocked** - Copy/paste and other shortcuts disabled
- **Violation Tracking** - All violations stored with exam attempts

## Security Features

- Row Level Security (RLS) enabled on all tables
- Users can only access their own attempts
- Questions are read-only for authenticated users
- Secure authentication with Supabase Auth

## Deployment

The application is deployed on Bolt Hosting and can be accessed at:
https://comprehensive-exam-a-6190.bolt.host

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues or questions, please create an issue in the repository or contact the development team.
