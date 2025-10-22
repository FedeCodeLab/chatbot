const messageInput = document.getElementById("message-input");
const sendMessageButton = document.getElementById("send-message");
const chatBody = document.querySelector(".chat-body");

const userData = {
  message: null,
};

// 3. Recibimos el contenido del mensaje y las clases que tendrá el div que contendrá el mensaje. Creamos el div, le agregamos las clases y le añadimos el contenido.
const createMessageElement = (content, ...classes) => {
  const div = document.createElement("div");
  div.classList.add("message", ...classes);
  div.innerHTML = content;
  return div;
};

// 2. Recibimos el mensaje del usuario y lo colocamos dentro de la etiqueta p. Luego disparamos la función createMessageElement guardando el resultado en una constante.
// 4. Añadimos el div creado al chat body.
const handleOutgoingMessage = (e) => {
  e.preventDefault();

  userData.message = messageInput.value.trim();
  messageInput.value = "";

  const messageContent = `<p class="message-text"></p>`;
  const outgoingMessageDiv = createMessageElement(
    messageContent,
    "user-message"
  );
  outgoingMessageDiv.querySelector(".message-text").textContent =
    userData.message;
  chatBody.appendChild(outgoingMessageDiv);

  setTimeout(() => {
    const messageContent = `<div class="bubble-container">
          <div class="bubble-image-container">
            <img src="chatbot.svg" alt="Chatbot Logo" class="logo" />
          </div>

          <div class="bot-bubble">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
        </div>`;
    const incomingMessageDiv = createMessageElement(
      messageContent,
      "bot-message",
      "thinking"
    );
    chatBody.appendChild(incomingMessageDiv);
  }, 600);
};

// 1. Detectamos que teclas se presionan en el textarea y se dispara la función handleOutgoingMessage con el mensaje del usuario.
messageInput.addEventListener("keydown", (e) => {
  const userMessage = e.target.value.trim();
  if (e.key === "Enter" && userMessage) {
    handleOutgoingMessage(e);
  }
  return userMessage;
});

sendMessageButton.addEventListener("click", (e) => handleOutgoingMessage(e));
