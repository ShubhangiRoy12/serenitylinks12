from flask import Flask, request, jsonify, render_template
import google.generativeai as genai
import json
import random
import os

app = Flask(__name__)

# --- Configure Gemini API ---
API_KEY = os.getenv("GEMINI_API_KEY", "AIzaSyDc_Yb3NKe7RWv_sadKKxnMTAnK7fd3i3w")
genai.configure(api_key=API_KEY)

# --- Load fallback replies ---
fallback_data = {}
try:
    with open("replies.json", "r", encoding="utf-8") as f:
        fallback_data = json.load(f)
except FileNotFoundError:
    fallback_data = {"default": ["I’m here for you ❤️", "Tell me more 🌸"]}


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message", "")
    persona = request.json.get("persona", "friend")

    bot_reply = ""

    # Try Gemini API
    try:
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(
            f"You are acting as a {persona} chatbot. "
            f"Be warm, empathetic, and conversational.\n\n"
            f"User: {user_input}\nBot:"
        )

        if hasattr(response, "text") and response.text:
            bot_reply = response.text.strip()
        else:
            bot_reply = random.choice(fallback_data.get("default", ["I’m here for you ❤️"]))

    except Exception as e:
        print("Gemini API error:", e)
        bot_reply = random.choice(fallback_data.get("default", ["I’m here for you ❤️"]))

    return jsonify({"reply": bot_reply})


if __name__ == "__main__":
    app.run(debug=True)
