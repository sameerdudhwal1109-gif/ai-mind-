const inputField = document.getElementById("question");
const sendBtn = document.getElementById("send-btn");
const chatBox = document.getElementById("chat-box");

async function sendMessage() {
    const userMessage = inputField.value.trim();
    if (userMessage === "") return;

    addMessage("You", userMessage);
    inputField.value = "";

    addMessage("AI", "Thinking...");

    try {
        const response = await fetch("https://ai-search-4x2n.onrender.com/ask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question: userMessage })
        });

        const data = await response.json();

        document.querySelectorAll(".msg").forEach((msg) => {
            if (msg.innerText === "AI:\nThinking...") msg.remove();
        });

        addMessage("AI", data.answer || "No response received");

    } catch (error) {
        addMessage("AI", "⚠ Server error");
    }
}

function addMessage(sender, message) {
    const msg = document.createElement("div");
    msg.classList.add("msg");
    msg.innerHTML = `<b>${sender}:</b><br>${message}`;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

sendBtn.addEventListener("click", sendMessage);

inputField.addEventListener("keypress", function (e) {
    if (e.key === "Enter") sendMessage();
});
