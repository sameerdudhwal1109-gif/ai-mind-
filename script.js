
// CHANGE THIS to your deployed backend when ready.
// For local testing keep: http://127.0.0.1:8000
const BACKEND_URL = "https://tumhara-render-url.onrender.com/ask";

const chatEl = document.getElementById("chat");
const typingEl = document.getElementById("typing");
const inputEl = document.getElementById("question");
const sendBtn = document.getElementById("sendBtn");
const form = document.getElementById("form");

// helper: add message bubble
function addBubble(text, who="ai"){
  const div = document.createElement("div");
  div.className = "bubble " + (who === "user" ? "user" : "ai");
  div.innerText = text;
  chatEl.appendChild(div);
  chatEl.scrollTop = chatEl.scrollHeight;
}

// set typing indicator
function setTyping(on){
  typingEl.innerText = on ? "AI Mind is typing..." : "";
}

// send request to backend
async function askAI(){
  const q = inputEl.value.trim();
  if(!q) return;
  // show user message
  addBubble(q, "user");
  inputEl.value = "";
  setTyping(true);
  try{
    const res = await fetch(BACKEND_URL + "/ask", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ question: q })
    });
    if(!res.ok){
      setTyping(false);
      addBubble("Server error: " + res.status, "ai");
      return;
    }
    const data = await res.json();
    setTyping(false);
    if(data && data.answer){
      addBubble(data.answer, "ai");
    } else {
      addBubble("No answer returned from server.", "ai");
    }
  } catch (err){
    setTyping(false);
    addBubble("Network error — backend not reachable.", "ai");
    console.error(err);
  }
}

sendBtn.addEventListener("click", askAI);
inputEl.addEventListener("keypress", function(e){
  if(e.key === "Enter") askAI();
});
