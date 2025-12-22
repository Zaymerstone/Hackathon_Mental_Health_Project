-- Add content columns to training_modules
ALTER TABLE public.training_modules 
ADD COLUMN IF NOT EXISTS video_url text,
ADD COLUMN IF NOT EXISTS reading_content text,
ADD COLUMN IF NOT EXISTS duration_minutes integer DEFAULT 45;

-- Add completion tracking columns to student_trainings
ALTER TABLE public.student_trainings 
ADD COLUMN IF NOT EXISTS video_completed boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS reading_completed boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS video_progress integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS reading_progress integer DEFAULT 0;

-- Update existing training modules with placeholder YouTube videos and reading content
UPDATE public.training_modules SET 
  video_url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  reading_content = '# Active Listening Essentials

Active listening is a fundamental skill for effective communication and support. It involves fully concentrating on what someone is saying rather than just passively hearing their words.

## Key Principles

### 1. Give Full Attention
- Put away distractions (phone, other tasks)
- Make appropriate eye contact
- Face the speaker and use open body language

### 2. Show You''re Listening
- Nod occasionally
- Use small verbal comments like "yes" and "uh-huh"
- Smile and use appropriate facial expressions

### 3. Provide Feedback
- Reflect on what has been said by paraphrasing
- Ask clarifying questions
- Summarize main points periodically

### 4. Defer Judgment
- Allow the speaker to finish each point before responding
- Don''t interrupt with counter-arguments
- Avoid making assumptions

### 5. Respond Appropriately
- Be candid, open, and honest in your response
- Assert your opinions respectfully
- Treat the other person as you would want to be treated

## Practice Exercises

Try practicing these techniques in your daily conversations. Notice how people respond differently when they feel truly heard.',
  duration_minutes = 45
WHERE name = 'Active Listening Essentials';

UPDATE public.training_modules SET 
  video_url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  reading_content = '# Empathy & Validation

Empathy is the ability to understand and share the feelings of another person. Validation acknowledges that someone''s feelings are legitimate and understandable.

## Understanding Empathy

### Cognitive Empathy
Understanding another person''s perspective and mental state. This is about "thinking" what others might be feeling.

### Emotional Empathy
Actually feeling what another person feels. This creates genuine connection but requires emotional regulation.

### Compassionate Empathy
Understanding feelings AND being moved to help. This drives supportive action.

## Validation Techniques

### 1. Acknowledge the Emotion
"It sounds like you''re feeling really frustrated."

### 2. Normalize the Experience
"Anyone in your situation would feel overwhelmed."

### 3. Reflect Understanding
"So what I''m hearing is that you felt dismissed when..."

### 4. Avoid Minimizing
Instead of "It''s not that bad," try "That sounds really difficult."

## Common Mistakes to Avoid

- Jumping to solutions before understanding
- Comparing their experience to yours
- Using phrases like "at least..." or "it could be worse"
- Trying to fix their feelings instead of accepting them',
  duration_minutes = 50
WHERE name = 'Empathy & Validation';

UPDATE public.training_modules SET 
  video_url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  reading_content = '# Cultural Sensitivity

Cultural sensitivity is the awareness and respect for cultural differences. As a peer listener, you''ll interact with people from diverse backgrounds.

## Why It Matters

Different cultures have varying:
- Communication styles (direct vs. indirect)
- Attitudes toward mental health and seeking help
- Family dynamics and expectations
- Concepts of personal space and boundaries

## Core Competencies

### 1. Self-Awareness
- Recognize your own cultural biases
- Understand how your background shapes your perspective
- Be open to learning and growth

### 2. Cultural Knowledge
- Learn about different cultural practices
- Understand cultural context in communication
- Research when needed, but don''t stereotype

### 3. Cross-Cultural Skills
- Adapt your communication style
- Ask respectful questions when uncertain
- Use inclusive language

## Practical Guidelines

### Do:
- Ask how someone prefers to be addressed
- Listen without judgment about cultural practices
- Acknowledge when you don''t understand something

### Don''t:
- Make assumptions based on appearance
- Use stereotypes as shortcuts to understanding
- Impose your cultural values on others',
  duration_minutes = 40
WHERE name = 'Cultural Sensitivity';

UPDATE public.training_modules SET 
  video_url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  reading_content = '# De-escalation Basics

De-escalation involves using verbal and non-verbal techniques to calm tense situations and help someone move from a heightened emotional state to a calmer one.

## Recognizing Escalation Signs

### Verbal Cues
- Raised voice or rapid speech
- Threats or aggressive language
- Repetitive demands

### Non-Verbal Cues
- Tense posture or clenched fists
- Pacing or inability to sit still
- Intense eye contact or avoiding eye contact

## Core De-escalation Techniques

### 1. Stay Calm
Your calm presence can help regulate their emotions. Take slow breaths and speak in a measured tone.

### 2. Listen Actively
Let them express their feelings without interruption. Sometimes people just need to be heard.

### 3. Validate Emotions
"I can see you''re really upset about this." Validation doesn''t mean agreement.

### 4. Use Empathetic Statements
- "That sounds incredibly frustrating."
- "I understand why you''d feel that way."

### 5. Offer Choices
Give them a sense of control by offering options rather than demands.

## Important Boundaries

- Never put yourself in physical danger
- Know when to involve professional support
- It''s okay to take a break if you need one',
  duration_minutes = 55
WHERE name = 'De-escalation Basics';

UPDATE public.training_modules SET 
  video_url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  reading_content = '# Ethical Boundaries

Maintaining appropriate boundaries protects both you and the people you support. Clear boundaries create a safe, professional helping relationship.

## Types of Boundaries

### Professional Boundaries
- Your role as a peer listener (not therapist, not friend)
- Time limits for sessions
- Appropriate communication channels

### Personal Boundaries
- What you''re comfortable discussing
- Emotional limits
- Your own privacy

### Physical Boundaries
- Appropriate physical space
- Touch (generally avoided in peer support)

## Common Boundary Challenges

### Dual Relationships
If you know someone personally, it may not be appropriate to also be their peer listener.

### Gift Giving
Politely decline gifts to maintain the professional nature of the relationship.

### Personal Disclosure
Share only what''s relevant and helpful; this isn''t about you.

### Outside Contact
Keep interactions within the program structure.

## Maintaining Boundaries

### Language to Use:
- "As a peer listener, I''m here to support you during our sessions."
- "I''m not qualified to give advice on that, but I can listen."
- "Let''s keep our conversations within the program."

## Self-Care

Boundaries also protect your wellbeing:
- Take breaks between sessions
- Process your feelings with supervisors
- Know your limits and respect them',
  duration_minutes = 45
WHERE name = 'Ethical Boundaries';

UPDATE public.training_modules SET 
  video_url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  reading_content = '# Crisis Awareness (Non-clinical)

As a peer listener, you may encounter someone in crisis. While you''re not a crisis counselor, knowing how to recognize and respond appropriately is essential.

## What Constitutes a Crisis?

A crisis is a situation where someone feels:
- Overwhelmed and unable to cope
- In immediate danger (themselves or others)
- Suicidal or having thoughts of self-harm

## Warning Signs

### Direct Signs
- Talking about wanting to die or harm themselves
- Looking for ways to hurt themselves
- Giving away possessions
- Saying goodbye or writing farewell notes

### Indirect Signs
- Extreme mood swings
- Withdrawal from friends and activities
- Increased substance use
- Expressing hopelessness

## Your Role

### What TO Do:
1. **Stay Calm** - Your calm presence helps
2. **Take It Seriously** - Never dismiss concerns
3. **Listen Without Judgment** - Let them talk
4. **Ask Directly** - "Are you thinking about hurting yourself?"
5. **Connect to Help** - Provide crisis resources
6. **Report** - Follow program protocols

### What NOT To Do:
- Don''t promise to keep it secret
- Don''t try to be their therapist
- Don''t leave them alone if immediate risk
- Don''t argue about whether they should feel this way

## Emergency Resources

- National Suicide Prevention Lifeline: 988
- Crisis Text Line: Text HOME to 741741
- Emergency Services: 911

## After a Crisis Conversation

Take care of yourself:
- Debrief with a supervisor
- Use self-care strategies
- Seek support if needed',
  duration_minutes = 50
WHERE name = 'Crisis Awareness (Non-clinical)';