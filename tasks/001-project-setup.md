# Task 001: Project Setup and Architecture

## Objective
Set up the initial project structure for AI Code Review Buddy with a working "hello world" that connects to OpenAI.

## Requirements
1. Basic web interface to paste code
2. Backend endpoint that receives code
3. Integration with OpenAI API
4. Simple response display

## Success Criteria
- [x] Can paste code into a text area
- [x] Backend receives the code
- [x] OpenAI API is called successfully
- [x] Response is displayed on frontend

## Technical Notes
- Start with a simple Express backend
- Use React for frontend (Create React App is fine)
- Store API keys in .env file
- Focus on the pipeline first, enhance later 

## Environment Variables
- PORT: 3001
- OPENAI_API_KEY: your_api_key_here 