# Recovery Journal App

This is a small prototype of a journaling app built as part of my hiring task.

The goal was to explore how a simple journaling interface could be combined with an AI layer to generate supportive insights for users going through stressful situations.

---

## What I built

- A basic journaling screen where a user can:
  - enter a title
  - write their thoughts
  - select an emotion

- A backend endpoint (`/api/journal`) that:
  - receives the journal entry
  - sends it to an LLM (OpenAI)
  - returns a short insight

- A simple UI that displays the response back to the user

---

## How it works

1. User submits a journal entry from the frontend  
2. The request goes to the backend  
3. Backend constructs a prompt using:
   - the selected emotion
   - the journal text  
4. This is sent to the OpenAI API  
5. The response is returned and shown in the UI  

---

## About the AI part

The AI integration is implemented using the OpenAI Chat API.

However, I did not have active API credits during development, so live responses may not always work.

To handle this, I added basic error handling on the backend.

Even though the API call may fail, the full structure (prompt design, request flow, response parsing) is in place.

---
## Project Structure is 
backend/
  server.js
  package.json

frontend/
  HomeScreen.js

## About the AI integration

The backend is set up to call the OpenAI API and generate insights based on the journal entry.

I wasn’t able to fully test live responses because I didn’t have active API credits, so the request may fail when running locally.

That said, the full flow is implemented:
- prompt structure
- API call
- response parsing

So it should work once a valid API key is added.

---

## What I would improve

- Store journal entries (right now they are not persisted)
- Improve the prompt to make responses more personalized
- Add a simple history view or dashboard
- Handle API errors more gracefully on the UI

---

## Notes

This project is more focused on:
- structuring the frontend → backend → AI flow
- designing the prompt and API interaction
- handling real-world limitations (like missing API access)

rather than building a fully polished app

## Part 3 D – Custom Feature: Pattern Aware Insight System

For the bonus part, I explored how this journaling system could evolve beyond single-entry AI responses into something more meaningful over time.

Instead of treating each journal entry independently, I designed a simple pattern-aware system that considers the user’s emotional trends and recurring themes. The idea is that stress during legal processes is not isolated — it builds over time and often follows patterns.

At a basic level, this system uses:
- the selected emotion
- the content of the journal entry
- simple keyword-based signals

to influence the generated insight. This allows the response to feel more grounded and context-aware rather than generic.

I also explored the idea of incorporating structured knowledge from well-being and stress management literature (such as mindfulness and legal stress recovery resources). While I did not fully implement a RAG pipeline, the design reflects how relevant guidance could be injected into the prompt to improve the quality of responses.

The long-term direction of this feature would be to:
- track emotional trends across multiple entries
- identify recurring stress triggers
- provide more personalized and proactive suggestions

- This approach shifts the system from a simple journaling tool to something that can actually help users understand their emotional patterns during difficult legal situations.

