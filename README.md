# AI Code Review Buddy

An AI-powered code review assistant that provides feedback on code quality, best practices, and potential issues.

## Features

- Code review using OpenAI's GPT-4
- Support for multiple programming languages
- Real-time feedback on code quality
- Best practices suggestions
- Test coverage recommendations

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- OpenAI API key

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-code-review-buddy.git
cd ai-code-review-buddy
```

2. Install dependencies:
```bash
npm install
cd frontend
npm install
cd ..
```

3. Create a `.env` file in the root directory:
```
PORT=3001
OPENAI_API_KEY=your_api_key_here
```

## Running the Application

1. Start the backend server:
```bash
npm run server
```

2. In a new terminal, start the frontend:
```bash
npm run client
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Development

- Backend runs on port 3001
- Frontend runs on port 3000
- API endpoint: `POST /api/review`

## Project Structure

```
ai-code-review-buddy/
├── backend/           # Express server
├── frontend/          # React application
├── prompts/           # AI prompt templates
├── tasks/            # Development tasks
└── scripts/          # Utility scripts
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
