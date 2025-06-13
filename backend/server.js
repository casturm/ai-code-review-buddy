require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
const port = process.env.PORT || 3001;

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post('/api/review', async (req, res) => {
  try {
    const { code, language } = req.body;
    
    const prompt = `You are an expert code reviewer focusing on:
- Code quality and maintainability
- Best practices for ${language}
- Potential bugs and edge cases
- Performance considerations
- Test coverage suggestions

Review the following code and provide:
1. Overall assessment (1-2 sentences)
2. Top 3-5 specific improvements
3. Any critical issues
4. Suggested tests

Code to review:
${code}`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4",
    });

    res.json({ review: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to generate code review' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 