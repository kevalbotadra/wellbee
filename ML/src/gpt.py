import openai

openai.api_key = "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"

completion = openai.Completion()

chat_log_beginning = """Human: Hey, I am looking for some advice. Any chance you can help?
AI: Yes, I can definitely help you. What's on your mind? 
"""

def ask(question, chatlog=None):
  if chatlog is None:
    chatlog = chat_log_beginning
  prompt = f"{chatlog}Human: {question}\nAI:"
  response = completion.create(prompt=prompt, engine="davinci", stop=["\nHuman"], temperature=0.9, top_p=1, frequency_penalty=0, presence_penalty=0.6, best_of=1, max_tokens=150)
  answer = response.choices[0].text.strip()
  return answer
