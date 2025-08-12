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
}

customElements.define("chat-container", Chat);
