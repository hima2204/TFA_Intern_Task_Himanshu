## What i built - 
I built a simple UI interface using React which focuses on clarity and ease of use, with minimal friction so users can quickly express their thoughts.The frontend communicates with the backend via a REST API, sending the journal entry and selected emotion, and displaying the generated insight returned by the server
I developed a Node.js backend using Express to handle API requests and process journal entries

## Architecture decisions - 
The system follows a simple client-server architecture with a clear separation between the frontend (React Native) and backend (Node.js/Express). The frontend is responsible only for user interaction and state management, while all processing logic (AI) is handled on the backend. This ensures that the UI remains lightweight and that the logic layer can be modified independently.
For the Part 3 extension, I introduced a separate processing layer for pattern analysis. Instead of handling a single request, this logic aggregates multiple entries and extracts features.

## What you'd do differently (If i had more time) - 
If I had more time, I would have spent more effort understanding the end users and stakeholders in detail. I believe that for a product like this, deeply understanding user behavior and emotional context is critical to building truly useful solutions, especially when dealing with sensitive areas like stress and mental health.

## Trafe offs -
I initially wanted to integrate an LLM API for generating insights, but due to API credit limitations, I introduced a rule-based fallback system.

## How you would scale this - 
To scale this system, I would first introduce persistent storage using a large database
I would deploy the backend on a scalable infrastructure (e.g cloud platform with auto-scaling).
For the Part 3 feature, I would build a separate analytics pipeline that periodically processes stored journal entries to detect emotional trends and recurring stress patterns. This could be done using scheduled jobs rather than real-time computation to improve efficiency.

## Some other points - 
While I was not able to fully complete the AI integration due to API credit limitations, I was still able to design and implement the overall LLM interaction flow, including prompt structuring, API handling, and response processing. This task significantly improved my understanding of how LLM-based systems are actually built and integrated into applications.
I also want to be transparent that I used AI tools during development. I see them as productivity tools rather than shortcuts especially for repetitive tasks or exploring different approaches quickly. What matters, in my view, is how effectively you can guide these systems and apply them meaningfully.
One area I’ve developed confidence in is prompt design. I’ve found that clearly defining the role, context, and constraints for the model has a major impact on the quality of responses. Treating the model as a system that can be guided with structured instructions rather than just asking generic questions makes a significant difference.
