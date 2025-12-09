from fastapi import FastAPI
from pydantic import BaseModel
import openai

app = FastAPI()

# 👉 Yahan apna OpenAI API key daalna
openai.api_key = "sk-...50sA"
class Query(BaseModel):
    question: str

@app.get("/")
def home():
    return {"message": "AI Search Engine Running ✅"}

@app.post("/ask")
def ask_ai(data: Query):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": data.question}]
    )
    answer = response['choices'][0]['message']['content']
    return {"answer": answer}
