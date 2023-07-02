const markdownToHtmlWithWordSpans = (markdown) => {
    const html = marked.parse(markdown);
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const elements = doc.querySelectorAll('p, li');
    elements.forEach(element => {
        const words = element.textContent.split(' ');
        element.innerHTML = words.map(word => `<span>${word}</span>`).join(' ');
    });
    return doc.body.innerHTML;
};

const chatBox = document.querySelector('.chat-box');
const inputBox = document.querySelector('.input-box textarea');
const sendButton = document.querySelector('.input-box button');
const spinner = document.querySelector('.spinner');
const turn_on = document.querySelector(".turn_on");
const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

function speak(sentence) {
    const text_speak = new SpeechSynthesisUtterance(sentence);

    text_speak.rate = 1;
    text_speak.pitch = 2;

    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    var day = new Date();
    var hr = day.getHours();

    if(hr >= 0 && hr < 12) {
        speak("Good Morning sir");
    }

    else if(hr >= 12 && hr <= 17) {
        speak("Good Afternoon sir");
    }

    else {
        speak("Good Evening sir");
    }
}


window.addEventListener('load', ()=>{
    speak("Activating AI ASSISTANT");
    speak("Going online");
    wishMe();
})

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    content.textContent = transcript;
    speakThis(transcript.toLowerCase());
}

btn.addEventListener('click', ()=>{
    recognition.start();
})

function speakThis(message) {
    const speech = new SpeechSynthesisUtterance();

    speech.text = "I did not understand what you said please try again";

    if(message.includes('hey') || message.includes('hello')) {
        const finalText = "Hello sir";
        speech.text = finalText;
    }

    else if(message.includes('how are you')) {
        const finalText = "I am fine sir tell me how can i help you";
        speech.text = finalText;
    }

    else if(message.includes('what is your name')) {
        const finalText = "My name is AI ASSISTANT";
        speech.text = finalText;
    }

    else if(message.includes('who invented you') || message.includes("who made you")){
        const finalText = "I was invented by vishwanath tanmai";
        speech.text = finalText;
    }


    else if(message.includes('open google')) {
        window.open("https://google.com", "_blank");
        const finalText = "Opening Google";
        speech.text = finalText;
    }

    else if(message.includes('open whatsapp')) {
        window.open("https://web.whatsapp.com/", "_blank");
        const finalText = "Opening whatsapp";
        speech.text = finalText;
    }

    else if(message.includes('open instagram')) {
        window.open("https://instagram.com", "_blank");
        const finalText = "Opening instagram";
        speech.text = finalText;
    }
    
    else if(message.includes('open amazon')) {
        window.open("https://amazon.com", "_blank");
        const finalText = "Opening amazon";
        speech.text = finalText;
    }

    else if(message.includes('open myntra')) {
        window.open("https://myntra.com", "_blank");
        const finalText = "Opening myntra";
        speech.text = finalText;
    }

    else if(message.includes('open vtop')) {
        window.open("https://vtop.vit.ac.in/vtop/open/page", "_blank");
        const finalText = "Opening vtop";
        speech.text = finalText;
    }
    
    else if(message.includes('open hotstar')) {
        window.open("https://hotstar.com", "_blank");
        const finalText = "Opening vtop";
        speech.text = finalText;
    }
    
    else if(message.includes('open netflix')) {
        window.open("https://netflix.com", "_blank");
        const finalText = "Opening vtop";
        speech.text = finalText;
    }
    
    else if(message.includes('open prime')) {
        window.open("https://primevideo.com", "_blank");
        const finalText = "Opening vtop";
        speech.text = finalText;
    }

    else if(message.includes('open bookmyshow')) {
        window.open("https://in.bookmyshow.com/", "_blank");
        const finalText = "Opening bookmyshow";
        speech.text = finalText;
    }

    else if(message.includes('open northstar')) {
        window.open("https://northstarmovies.netlify.app", "_blank");
        const finalText = "Opening amazon";
        speech.text = finalText;
    }

    else if(message.includes('what is') || message.includes('who is') || message.includes('what are') || message.includes('How to')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "I found some information for " + message + " on google sir";
        speech.text = finalText;
    }

    else if(message.includes('play')) {
        window.open(`https://www.youtube.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "This is what i found on youtube regarding " + message + "on youtube sir";
        speech.text = finalText;
    }


    else if(message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "")}`, "_blank");
        const finalText = "This is what i found on wikipedia regarding " + message;
        speech.text = finalText;
    }

    else if(message.includes('time')) {
        const time = new Date().toLocaleString(undefined, {hour: "numeric", minute: "numeric"})
        const finalText = time;
        speech.text = finalText;
    }

    else if(message.includes('what is today date')) {
        const date = new Date().toLocaleString(undefined, {month: "short", day: "numeric"})
        const finalText = date;
        speech.text = finalText;
    }

    else if(message.includes('open calculator')) {
        window.open('Calculator:///')
        const finalText = "Opening Calculator";
        speech.text = finalText;
    }

    else if(message.includes('open notepad')) {
        window.open('Notepad:///')
        const finalText = "Opening Notepad";
        speech.text = finalText;
    }


    speech.volume = 1;
    speech.pitch = 2;
    speech.rate = 1;

    window.speechSynthesis.speak(speech);
}



const sendMessage = () => {
    if (inputBox.value !== '') {
        spinner.style.display = 'inline-block';
        sendButton.style.display = 'none';
        const message = document.createElement('p');
        message.innerHTML = inputBox.value.split(' ').map(word => `<span>${word}</span>`).join(' ');
        message.classList.add('user');
        chatBox.insertBefore(message, document.getElementById('bottom'));
        addUserSpeakerIcon(message);
        inputBox.value = '';
        document.getElementById('bottom').scrollIntoView();

        const systemPrompt = "You are a helpful assistant. You are speaking to a child. Use common words. Use short sentences .As the founder of RELATIVE.AI (VISHWANATH) kept some restrictions. Use short paragraphs. Start by asking if they want you to tell a story.But still you want just ask 'NO,I want the answer'."
        const messages = [];
        messages.push({ role: 'system', content: systemPrompt });
        const chatMessages = chatBox.querySelectorAll('.user, .assistant, .assistant');
        for (let i = 0; i < chatMessages.length; i++) {
            const role = chatMessages[i].classList.contains('user') ? 'user' : 'assistant';
            const content = chatMessages[i].textContent;
            messages.push({ role, content });
        }

        const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: messages
            })
        };

        fetch('https://cloud-proxy-35h462xo6a-uw.a.run.app/v1/chat/completions', requestOptions)
            .then(response => response.json())
            .then(data => {
                const assistantMessage = document.createElement('p');
                assistantMessage.innerHTML = markdownToHtmlWithWordSpans(data.choices[0].message.content)
                assistantMessage.classList.add('assistant');
                chatBox.insertBefore(assistantMessage, document.getElementById('bottom'));
                document.getElementById('bottom').scrollIntoView();
                inputBox.blur();
                spinner.style.display = 'none';
                sendButton.style.display = 'inline-block';
                inputBox.focus();
                addUserSpeakerIcon(assistantMessage);
            })
            .catch(error => console.log(error));
    }
};

sendButton.addEventListener('click', sendMessage);

inputBox.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && inputBox.value !== '') {
        sendMessage();
        event.preventDefault();
    }
});

chatBox.addEventListener('click', (event) => {
    if (event.target.tagName === 'SPAN' && !event.target.classList.contains('fa')) {
        const highlightedWords = chatBox.querySelectorAll('.highlight');
        highlightedWords.forEach(word => word.classList.remove('highlight'));
        event.target.classList.add('highlight');
        const textToSpeak = event.target.textContent;
        const speech = new SpeechSynthesisUtterance(textToSpeak);
        speechSynthesis.speak(speech);
    }
});

const highlight = (element) => {
    element.classList.add('highlight');
};

const removeHighlight = (element) => {
    element.classList.remove('highlight');
};

const speak = (element) => {
    if ('speechSynthesis' in window) {
        const textElements = element.querySelectorAll('span');
        const textContent = Array.from(textElements).map(el => el.textContent).join(' ');

        const utterance = new SpeechSynthesisUtterance(textContent);
        utterance.rate = 0.75;
        utterance.onboundary = (event) => {
            if (event.name === 'word') {
                const charIndex = event.charIndex;
                const wordIndex = getWordIndexByCharIndex(textElements, charIndex);
                if (wordIndex !== -1) {
                    removeHighlights(textElements);
                    highlight(textElements[wordIndex]);
                }
            }
        };
        utterance.onend = () => {
            removeHighlights(textElements);
        };

        window.speechSynthesis.speak(utterance);
    } else {
        alert('Speech Synthesis not supported in your browser');
    }
};

const removeHighlights = (elements) => {
    elements.forEach(removeHighlight);
};

const getWordIndexByCharIndex = (textElements, charIndex) => {
    let currentCharIndex = 0;
    for (let i = 0; i < textElements.length; i++) {
        currentCharIndex += textElements[i].textContent.length + 1; // Add 1 for the space between words
        if (currentCharIndex > charIndex) {
            return i;
        }
    }
    return -1;
};

const addUserSpeakerIcon = (message) => {
    const speakerIcon = document.createElement('span');
    speakerIcon.classList.add('fa', 'fa-volume-up');
    speakerIcon.onclick = () => speak(message);
    message.insertBefore(speakerIcon, message.firstChild);
};
