from openai import OpenAI
client = OpenAI()

str = "Write a haiku about recursion in programming."

completion = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {
            "role": "user",
            "content": str
        }
    ]
)

print(completion.choices[0].message)