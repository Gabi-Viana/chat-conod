const sendMessage = document.getElementById("send-message")
const sectionMessage = document.getElementById("messages")
const inputMessage = document.getElementById("message")
const main = document.querySelector("main")
const formMessage = document.querySelector("form")

const BASE_URL = "https://rag-eproc-gemini-api-416883630013.us-central1.run.app/query"

formMessage.addEventListener("submit", (e) => e.preventDefault())
sendMessage.addEventListener("click", insertMessage)
inputMessage.addEventListener("keyup", (event) => {
    const hasValue = inputMessage.value !== ""
    sendMessage.classList.toggle("able-button", hasValue)
    sendMessage.classList.toggle("disabled-button", !hasValue)

    if(hasValue && event.key === "Enter") {
        event.preventDefault()
        insertMessage()
    }
})

function insertMessage() {
    const inputValue = inputMessage.value
    sectionMessage.innerHTML += `
    <div class="image-name">
      <i class="bi bi-person-circle"></i>
      <h4>Você</h4>
    </div>
    <p class="message-p">${inputValue}</p>
    `
    main.classList.remove("empty");
    document.querySelector(".incial-message")?.remove();
    postMessageChat(inputValue)
    formMessage.reset()
    resetSendMessage()
}

function resetSendMessage(){
    sendMessage.classList.remove("able-button")
    sendMessage.classList.add("disabled-button")
    sendMessage.disabled = true
}

function postMessageChat(message) {
    const payload = {
        pergunta: message
    }

    fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro")
        }
        return response.json()
    })
    .then(data => {
        console.log("Resposta da API:", data)

        sectionMessage.innerHTML += `
            <div class="image-name">
              <i class="bi bi-robot"></i>
              <h4>Conodinho</h4>
            </div>
            <p class="message-p">${data.resposta ?? "Sem resposta"}</p>
        `
    })
    .catch(error => {
        console.error(error)
    })

}