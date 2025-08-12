const template = document.createElement("template");
template.innerHTML = /* html */ `
    <style>
        :host {
            display: block;
            font-family:
                -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                "Helvetica Neue", Arial, sans-serif;
            max-width: 400px;
            width: 100%;
            margin: 0 auto;

            /* Default Theme - Light Blue */
            --primary-color: #4f46e5;
            --secondary-color: #7c3aed;
            --background-color: white;
            --surface-color: #f9fafb;
            --border-color: #e5e7eb;
            --text-primary: #111827;
            --text-secondary: #6b7280;
            --text-on-primary: white;
            --bot-bubble-bg: #f3f4f6;
            --bot-bubble-text: #111827;
            --input-bg: #f9fafb;
            --input-focus-bg: white;
            --placeholder-color: #9ca3af;
            --shadow-color: rgba(0, 0, 0, 0.1);
            --focus-ring: rgba(79, 70, 229, 0.1);
            --button-hover-shadow: rgba(79, 70, 229, 0.4);
        }

        /* Dark Theme */
        :host([theme="dark"]) {
            --primary-color: #6366f1;
            --secondary-color: #8b5cf6;
            --background-color: #1f2937;
            --surface-color: #111827;
            --border-color: #374151;
            --text-primary: #f9fafb;
            --text-secondary: #9ca3af;
            --text-on-primary: white;
            --bot-bubble-bg: #374151;
            --bot-bubble-text: #f9fafb;
            --input-bg: #374151;
            --input-focus-bg: #4b5563;
            --placeholder-color: #6b7280;
            --shadow-color: rgba(0, 0, 0, 0.3);
            --focus-ring: rgba(99, 102, 241, 0.2);
            --button-hover-shadow: rgba(99, 102, 241, 0.4);
        }

        /* Green Theme */
        :host([theme="green"]) {
            --primary-color: #10b981;
            --secondary-color: #059669;
            --background-color: white;
            --surface-color: #f0fdf4;
            --border-color: #d1fae5;
            --text-primary: #111827;
            --text-secondary: #6b7280;
            --text-on-primary: white;
            --bot-bubble-bg: #ecfdf5;
            --bot-bubble-text: #111827;
            --input-bg: #f0fdf4;
            --input-focus-bg: white;
            --placeholder-color: #9ca3af;
            --shadow-color: rgba(0, 0, 0, 0.1);
            --focus-ring: rgba(16, 185, 129, 0.1);
            --button-hover-shadow: rgba(16, 185, 129, 0.4);
        }

        /* Pink Theme */
        :host([theme="pink"]) {
            --primary-color: #ec4899;
            --secondary-color: #be185d;
            --background-color: white;
            --surface-color: #fdf2f8;
            --border-color: #fce7f3;
            --text-primary: #111827;
            --text-secondary: #6b7280;
            --text-on-primary: white;
            --bot-bubble-bg: #fef7ff;
            --bot-bubble-text: #111827;
            --input-bg: #fdf2f8;
            --input-focus-bg: white;
            --placeholder-color: #9ca3af;
            --shadow-color: rgba(0, 0, 0, 0.1);
            --focus-ring: rgba(236, 72, 153, 0.1);
            --button-hover-shadow: rgba(236, 72, 153, 0.4);
        }

        /* Orange Theme */
        :host([theme="orange"]) {
            --primary-color: #f59e0b;
            --secondary-color: #d97706;
            --background-color: white;
            --surface-color: #fffbeb;
            --border-color: #fed7aa;
            --text-primary: #111827;
            --text-secondary: #6b7280;
            --text-on-primary: white;
            --bot-bubble-bg: #fef3c7;
            --bot-bubble-text: #111827;
            --input-bg: #fffbeb;
            --input-focus-bg: white;
            --placeholder-color: #9ca3af;
            --shadow-color: rgba(0, 0, 0, 0.1);
            --focus-ring: rgba(245, 158, 11, 0.1);
            --button-hover-shadow: rgba(245, 158, 11, 0.4);
        }

        .chat-container {
            background: var(--background-color);
            border-radius: 16px;
            box-shadow:
                0 10px 25px var(--shadow-color),
                0 4px 6px rgba(0, 0, 0, 0.05);
            border: 1px solid var(--border-color);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            height: 500px;
        }

        .chat-header {
            background: linear-gradient(
                135deg,
                var(--primary-color),
                var(--secondary-color)
            );
            color: var(--text-on-primary);
            padding: 16px 20px;
            text-align: center;
            border-bottom: 1px solid var(--border-color);
        }

        .chat-title {
            margin: 0;
            font-size: 18px;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }

        .messages-area {
            flex: 1;
            padding: 20px;
            background: var(--surface-color);
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        .message-bubble {
            max-width: 80%;
            padding: 12px 16px;
            border-radius: 18px;
            line-height: 1.4;
            word-wrap: break-word;
            position: relative;
        }

        .bot-message {
            background: var(--bot-bubble-bg);
            color: var(--bot-bubble-text);
            align-self: flex-start;
            border-bottom-left-radius: 6px;
        }

        .user-message {
            background: linear-gradient(
                135deg,
                var(--primary-color),
                var(--secondary-color)
            );
            color: var(--text-on-primary);
            align-self: flex-end;
            border-bottom-right-radius: 6px;
        }

        .input-area {
            padding: 20px;
            background: var(--background-color);
            border-top: 1px solid var(--border-color);
            display: flex;
            gap: 12px;
            align-items: center;
            justify-content: center;
        }

        .message-input {
            flex: 1;
            min-height: 20px;
            max-height: 100px;
            padding: 12px 16px;
            border: 2px solid var(--border-color);
            border-radius: 5px;
            font-family: inherit;
            font-size: 14px;
            line-height: 1.4;
            resize: none;
            outline: none;
            transition: all 0.2s ease;
            background: var(--input-bg);
            color: var(--text-primary);
        }

        .message-input:focus {
            border-color: var(--primary-color);
            background: var(--input-focus-bg);
            box-shadow: 0 0 0 3px var(--focus-ring);
        }

        .message-input::placeholder {
            color: var(--placeholder-color);
        }

        .send-button {
            padding: 12px;
            background: linear-gradient(
                135deg,
                var(--primary-color),
                var(--secondary-color)
            );
            color: var(--text-on-primary);
            border: none;
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            font-size: 16px;
        }

        .send-button svg {
            width: 18px;
            height: 18px;
        }

        .send-button:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px var(--button-hover-shadow);
        }

        .send-button:active {
            transform: translateY(0);
        }

        .welcome-message {
            text-align: center;
            color: var(--text-secondary);
            font-style: italic;
            margin: 20px 0;
        }

        /* Scrollbar styling */
        .messages-area::-webkit-scrollbar {
            width: 6px;
        }

        .messages-area::-webkit-scrollbar-track {
            background: transparent;
        }

        .messages-area::-webkit-scrollbar-thumb {
            background: #d1d5db;
            border-radius: 3px;
        }

        .messages-area::-webkit-scrollbar-thumb:hover {
            background: #9ca3af;
        }

        .typing-indicator {
            background: var(--bot-bubble-bg);
            color: var(--bot-bubble-text);
            align-self: flex-start;
            border-bottom-left-radius: 6px;
            max-width: 80%;
            padding: 12px 16px;
            border-radius: 18px;
            display: flex;
            align-items: center;
            gap: 4px;
        }

        .typing-dots {
            display: flex;
            gap: 2px;
        }

        .typing-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: var(--text-secondary);
            animation: typing 1.4s infinite;
        }

        .typing-dot:nth-child(2) {
            animation-delay: 0.2s;
        }

        .typing-dot:nth-child(3) {
            animation-delay: 0.4s;
        }

        @keyframes typing {
            0%,
            60%,
            100% {
                opacity: 0.3;
            }
            30% {
                opacity: 1;
            }
        }

        .send-button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none !important;
        }
        
        .system-message {
            text-align: center;
            padding: 8px 12px;
            margin: 16px auto;
            max-width: 70%;
            background: var(--text-secondary);
            color: var(--background-color);
            border-radius: 12px;
            font-size: 13px;
            opacity: 0.8;
        }
        
        .message-timestamp {
            font-size: 11px;
            opacity: 0.6;
            margin-top: 4px;
            text-align: right;
        }
        
        .user-message .message-timestamp {
            text-align: left;
        }
    </style>
    <div class="chat-container">
        <div class="chat-header">
            <h2 class="chat-title">
                <slot name="title">Chat Assistant</slot>
            </h2>
        </div>
        <div class="messages-area" id="messages">
            <div class="welcome-message">
                <slot name="welcome-message">
                    Welcome! How can I help you today?
                </slot>
            </div>
        </div>
        <div class="input-area">
            <textarea
                class="message-input"
                id="messageInput"
                placeholder="Type your message..."
                rows="1"
            ></textarea>
            <button class="send-button" id="sendButton">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
            </button>
        </div>
    </div>
`;

class Chat extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        shadow.appendChild(template.content.cloneNode(true));

        if (!this.hasAttribute("theme")) {
            this.setAttribute("theme", "light");
        }

        this.loadSavedTheme();
    }

    connectedCallback() {
        this.setupEventListeners();
    }

    disconnectedCallback() {
        this.removeEventListeners();
    }

    setupEventListeners() {
        const sendButton = this.shadowRoot.querySelector("#sendButton");
        const messageInput = this.shadowRoot.querySelector("#messageInput");

        if (sendButton) {
            sendButton.addEventListener(
                "click",
                this.handleSendMessage.bind(this),
            );
        }

        if (messageInput) {
            messageInput.addEventListener(
                "keypress",
                this.handleKeyPress.bind(this),
            );
        }
    }

    removeEventListeners() {
        const sendButton = this.shadowRoot.querySelector("#sendButton");
        const messageInput = this.shadowRoot.querySelector("#messageInput");

        if (sendButton) {
            sendButton.removeEventListener(
                "click",
                this.handleSendMessage.bind(this),
            );
        }

        if (messageInput) {
            messageInput.removeEventListener(
                "keypress",
                this.handleKeyPress.bind(this),
            );
        }
    }

    async handleSendMessage() {
        const messageInput = this.shadowRoot.querySelector("#messageInput");
        const message = messageInput.value.trim();

        if (!message) return;

        this.addMessage(message, true);
        messageInput.value = "";

        this.dispatchEvent(new CustomEvent('message-sent', {
            detail: { 
                message: message, 
                timestamp: new Date().toISOString() 
            },
            bubbles: true
        }));

        this.setInputDisabled(true);
        this.showTypingIndicator();

        this.dispatchEvent(new CustomEvent('typing-start', {
            detail: { message: message },
            bubbles: true
        }));

        try {
            const response = await this.sendToAPI(message);
            this.hideTypingIndicator();
            this.addMessage(response, false);

            this.dispatchEvent(new CustomEvent('message-received', {
                detail: { 
                    message: message,
                    response: response,
                    timestamp: new Date().toISOString()
                },
                bubbles: true
            }));

        } catch (error) {
            this.hideTypingIndicator();
            this.addMessage(
                "Sorry, something went wrong. Please try again.",
                false,
            );

            this.dispatchEvent(new CustomEvent('chat-error', {
                detail: { 
                    message: message,
                    error: error.message,
                    timestamp: new Date().toISOString()
                },
                bubbles: true
            }));

            console.error("API Error:", error);
        } finally {
            this.setInputDisabled(false);
            
            this.dispatchEvent(new CustomEvent('typing-end', {
                detail: { message: message },
                bubbles: true
            }));
        }
    }

    handleKeyPress(event) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            this.handleSendMessage();
        }
    }

    addMessage(messageText, isUser = false, messageType = 'text', timestamp = null) {
        const messagesArea = this.shadowRoot.querySelector("#messages");

        this.removeWelcomeMessage();

        const messageDiv = document.createElement("div");
        
        // Handle different message types
        if (messageType === 'system') {
            messageDiv.className = 'system-message';
        } else {
            messageDiv.className = `message-bubble ${isUser ? "user-message" : "bot-message"}`;
        }

        // Handle content based on type
        if (messageType === 'html') {
            messageDiv.innerHTML = messageText;
        } else {
            messageDiv.textContent = messageText;
        }

        // Add timestamp if provided
        if (timestamp) {
            const timeDiv = document.createElement('div');
            timeDiv.className = 'message-timestamp';
            timeDiv.textContent = new Date(timestamp).toLocaleTimeString();
            messageDiv.appendChild(timeDiv);
        }

        messagesArea.appendChild(messageDiv);
        messagesArea.scrollTop = messagesArea.scrollHeight;
    }

    removeWelcomeMessage() {
        const welcomeMessage =
            this.shadowRoot.querySelector(".welcome-message");
        if (welcomeMessage) {
            welcomeMessage.remove();
        }
    }

    showTypingIndicator() {
        this.removeWelcomeMessage();

        const messagesArea = this.shadowRoot.querySelector("#messages");
        const typingDiv = document.createElement("div");
        typingDiv.className = "typing-indicator";
        typingDiv.id = "typing-indicator";
        typingDiv.innerHTML = `
            <div class="typing-dots">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;

        messagesArea.appendChild(typingDiv);
        messagesArea.scrollTop = messagesArea.scrollHeight;
    }

    hideTypingIndicator() {
        const typingIndicator =
            this.shadowRoot.querySelector("#typing-indicator");
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    setInputDisabled(disabled) {
        const sendButton = this.shadowRoot.querySelector("#sendButton");
        const messageInput = this.shadowRoot.querySelector("#messageInput");

        if (sendButton) {
            sendButton.disabled = disabled;
        }
        if (messageInput) {
            messageInput.disabled = disabled;
        }
    }

    async sendToAPI(message) {
        const apiEndpoint = this.getAttribute("api-endpoint");

        if (apiEndpoint && apiEndpoint !== "mock") {
            return this.sendToRealAPI(apiEndpoint, message);
        } else {
            return this.sendToMockAPI(message);
        }
    }

    async sendToMockAPI(message) {
        await new Promise((resolve) =>
            setTimeout(resolve, 1000 + Math.random() * 1000),
        );

        const mockResponses = [
            `Thanks for sharing "${message}" with me. How can I help further?`,
            `I received your message about "${message}". Let me think about that.`,
            `You mentioned "${message}". Could you tell me more?`,
            `I see you're asking about "${message}". Here's what I think...`,
        ];

        return mockResponses[Math.floor(Math.random() * mockResponses.length)];
    }

    async sendToRealAPI(endpoint, message) {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.response || data.message || "No response from server";
    }

    static get observedAttributes() {
        return ["theme"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "theme" && oldValue !== newValue) {
            this.saveTheme(newValue);
        }
    }

    setTheme(themeName) {
        this.setAttribute("theme", themeName);
    }

    getTheme() {
        return this.getAttribute("theme") || "light";
    }

    saveTheme(theme) {
        try {
            localStorage.setItem("chat-theme", theme);
        } catch (e) {
            console.warn("Could not save theme preference");
        }
    }

    loadSavedTheme() {
        try {
            const savedTheme = localStorage.getItem("chat-theme");
            if (
                savedTheme &&
                ["light", "dark", "green", "pink", "orange"].includes(
                    savedTheme,
                )
            ) {
                this.setAttribute("theme", savedTheme);
            }
        } catch (e) {
            console.warn("Could not load theme preference");
        }
    }

    switchTheme(themeName) {
        const validThemes = ["light", "dark", "green", "pink", "orange"];
        if (validThemes.includes(themeName)) {
            this.setTheme(themeName);

            this.dispatchEvent(
                new CustomEvent("theme-changed", {
                    detail: { theme: themeName },
                    bubbles: true,
                }),
            );
        } else {
            console.warn(
                `Invalid theme: ${themeName}. Valid themes: ${validThemes.join(", ")}`,
            );
        }
    }

    cycleTheme() {
        const themes = ["light", "dark", "green", "pink", "orange"];
        const currentIndex = themes.indexOf(this.getTheme());
        const nextIndex = (currentIndex + 1) % themes.length;
        this.switchTheme(themes[nextIndex]);
    }

    // Public API for external message injection
    addUserMessage(message, timestamp = null) {
        this.addMessage(message, true, 'text', timestamp);
        this.dispatchEvent(new CustomEvent('external-message-added', {
            detail: { message, type: 'user', timestamp },
            bubbles: true
        }));
    }

    addBotMessage(message, timestamp = null) {
        this.addMessage(message, false, 'text', timestamp);
        this.dispatchEvent(new CustomEvent('external-message-added', {
            detail: { message, type: 'bot', timestamp },
            bubbles: true
        }));
    }

    addSystemMessage(message, timestamp = null) {
        this.addMessage(message, null, 'system', timestamp);
        this.dispatchEvent(new CustomEvent('external-message-added', {
            detail: { message, type: 'system', timestamp },
            bubbles: true
        }));
    }

    clearMessages() {
        const messagesArea = this.shadowRoot.querySelector("#messages");
        messagesArea.innerHTML = '';
        this.dispatchEvent(new CustomEvent('messages-cleared', {
            bubbles: true
        }));
    }
}

customElements.define("chat-container", Chat);
