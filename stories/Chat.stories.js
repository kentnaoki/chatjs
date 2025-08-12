import "../src/Chat.js";

export default {
    title: "Components/Chat",
    component: "chat-container",
    parameters: {
        docs: {
            description: {
                component:
                    "A themeable chat component built with Web Components. Supports multiple themes and persistent theme switching.",
            },
        },
    },
    argTypes: {
        theme: {
            control: { type: "select" },
            options: ["light", "dark", "green", "pink", "orange"],
            description: "Theme color scheme",
        },
        apiEndpoint: {
            control: "text",
            description: "API endpoint for chat messages",
        },
        title: {
            control: "text",
            description: "Chat Title",
        },
        welcomeMessage: {
            control: "text",
            description: "Welcome message displayed in chat",
        },
    },
};

const Template = (args) => {
    const container = document.createElement("div");

    const titleSlot = args.title
        ? `<span slot="title">${args.title}</span>`
        : "";
    const welcomeSlot = args.welcomeMessage
        ? `<div slot="welcome-message">${args.welcomeMessage}</div>`
        : "";
    container.innerHTML = `<chat-container>${titleSlot}${welcomeSlot}</chat-container>`;
    const chatElement = container.firstElementChild;

    if (args.theme) {
        chatElement.setAttribute("theme", args.theme);
    }
    if (args.apiEndpoint) {
        chatElement.setAttribute("api-endpoint", args.apiEndpoint);
    }

    return chatElement;
};

export const Default = Template.bind({});
Default.args = {
    theme: "light",
    apiEndpoint: "mock",
    title: "Chat",
    welcomeMessage: "Welcome! How can I help you today? I'm default",
};

export const DarkTheme = Template.bind({});
DarkTheme.args = {
    theme: "dark",
    apiEndpoint: "mock",
    title: "Chat Dark Theme",
    welcomeMessage: "Welcome, I'm Dark",
};

export const GreenTheme = Template.bind({});
GreenTheme.args = {
    theme: "green",
    apiEndpoint: "mock",
    title: "Chat Green Theme",
};

export const PinkTheme = Template.bind({});
PinkTheme.args = {
    theme: "pink",
    apiEndpoint: "mock",
    title: "Chat Pink Theme",
};

export const OrangeTheme = Template.bind({});
OrangeTheme.args = {
    theme: "orange",
    apiEndpoint: "mock",
    title: "Chat Orange Theme",
};

export const WithEventLogging = () => {
    const container = document.createElement("div");
    container.style.padding = "20px";

    const logContainer = document.createElement("div");
    logContainer.style.marginBottom = "20px";
    logContainer.style.padding = "10px";
    logContainer.style.background = "#f5f5f5";
    logContainer.style.borderRadius = "8px";
    logContainer.style.fontFamily = "monospace";
    logContainer.style.fontSize = "12px";
    logContainer.style.maxHeight = "150px";
    logContainer.style.overflowY = "auto";
    logContainer.innerHTML = "<strong>Event Log:</strong><div id='event-log'></div>";

    const chatContainer = document.createElement("div");
    chatContainer.innerHTML = `<chat-container theme="light" api-endpoint="mock">
        <span slot="title">Event Logging Demo</span>
        <div slot="welcome-message">Send a message to see events in the log above!</div>
    </chat-container>`;
    const chatElement = chatContainer.firstElementChild;

    const eventLog = logContainer.querySelector('#event-log');
    
    const logEvent = (eventName, detail) => {
        const logEntry = document.createElement('div');
        logEntry.style.margin = "2px 0";
        logEntry.innerHTML = `<span style="color: #666;">[${new Date().toLocaleTimeString()}]</span> <strong>${eventName}</strong>: ${JSON.stringify(detail, null, 2)}`;
        eventLog.appendChild(logEntry);
        eventLog.scrollTop = eventLog.scrollHeight;
    };

    chatElement.addEventListener('message-sent', (e) => {
        logEvent('message-sent', e.detail);
    });

    chatElement.addEventListener('typing-start', (e) => {
        logEvent('typing-start', e.detail);
    });

    chatElement.addEventListener('typing-end', (e) => {
        logEvent('typing-end', e.detail);
    });

    chatElement.addEventListener('message-received', (e) => {
        logEvent('message-received', e.detail);
    });

    chatElement.addEventListener('chat-error', (e) => {
        logEvent('chat-error', e.detail);
    });

    container.appendChild(logContainer);
    container.appendChild(chatElement);
    
    return container;
};

export const ThemeSwitcher = () => {
    const container = document.createElement("div");
    container.style.padding = "20px";

    const chatContainer = document.createElement("div");
    chatContainer.innerHTML = `<chat-container theme="light"></chat-container>`;
    const chatElement = chatContainer.firstElementChild;

    const buttonContainer = document.createElement("div");
    buttonContainer.style.marginBottom = "20px";
    buttonContainer.style.display = "flex";
    buttonContainer.style.gap = "10px";
    buttonContainer.style.flexWrap = "wrap";

    const themes = ["light", "dark", "green", "pink", "orange"];

    themes.forEach((theme) => {
        const button = document.createElement("button");
        button.textContent = theme.charAt(0).toUpperCase() + theme.slice(1);
        button.style.padding = "8px 16px";
        button.style.border = "1px solid #ccc";
        button.style.borderRadius = "4px";
        button.style.cursor = "pointer";
        button.style.backgroundColor = "white";

        button.addEventListener("click", () => {
            chatElement.switchTheme(theme);
        });

        buttonContainer.appendChild(button);
    });

    const cycleButton = document.createElement("button");
    cycleButton.textContent = "Cycle Theme";
    cycleButton.style.padding = "8px 16px";
    cycleButton.style.border = "1px solid #ccc";
    cycleButton.style.borderRadius = "4px";
    cycleButton.style.cursor = "pointer";
    cycleButton.style.backgroundColor = "#f0f0f0";
    cycleButton.style.fontWeight = "bold";

    cycleButton.addEventListener("click", () => {
        chatElement.cycleTheme();
    });

    buttonContainer.appendChild(cycleButton);

    container.appendChild(buttonContainer);
    container.appendChild(chatElement);

    return container;
};

export const MessageTypes = () => {
    const container = document.createElement("div");
    container.style.padding = "20px";

    const chatContainer = document.createElement("div");
    chatContainer.innerHTML = `<chat-container theme="light" api-endpoint="mock">
        <span slot="title">Different Message Types</span>
        <div slot="welcome-message">Try the buttons below to see different message types!</div>
    </chat-container>`;
    const chatElement = chatContainer.firstElementChild;

    const buttonContainer = document.createElement("div");
    buttonContainer.style.marginBottom = "20px";
    buttonContainer.style.display = "flex";
    buttonContainer.style.gap = "10px";
    buttonContainer.style.flexWrap = "wrap";

    const buttons = [
        { text: "Add User Message", action: () => chatElement.addUserMessage("Hello from external code!") },
        { text: "Add Bot Message", action: () => chatElement.addBotMessage("Hi! I'm injected from outside.") },
        { text: "Add System Message", action: () => chatElement.addSystemMessage("User joined the chat") },
        { text: "Add With Timestamp", action: () => chatElement.addBotMessage("This message has a timestamp", new Date().toISOString()) },
        { text: "Clear Messages", action: () => chatElement.clearMessages() },
    ];

    buttons.forEach(({ text, action }) => {
        const button = document.createElement("button");
        button.textContent = text;
        button.style.padding = "8px 12px";
        button.style.border = "1px solid #ccc";
        button.style.borderRadius = "4px";
        button.style.cursor = "pointer";
        button.style.backgroundColor = "white";
        button.addEventListener("click", action);
        buttonContainer.appendChild(button);
    });

    container.appendChild(buttonContainer);
    container.appendChild(chatElement);
    
    return container;
};
