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
    },
};

const Template = (args) => {
    const container = document.createElement("div");

    container.innerHTML = `<chat-container></chat-container>`;
    const chatElement = container.firstElementChild;

    if (args.theme) {
        chatElement.setAttribute("theme", args.theme);
    }
    if (args.apiEndpoint) {
        chatElement.setAttribute("api-endpoint", args.apiEndpoint);
    }

    if (args.title) {
        chatElement.setAttribute("title", args.title);
    }

    return chatElement;
};

export const Default = Template.bind({});
Default.args = {
    theme: "light",
    apiEndpoint: "https://api.example.com/chat",
    title: "Chat",
};

export const DarkTheme = Template.bind({});
DarkTheme.args = {
    theme: "dark",
    apiEndpoint: "https://api.example.com/chat",
    title: "Chat Dark Theme",
};

export const GreenTheme = Template.bind({});
GreenTheme.args = {
    theme: "green",
    apiEndpoint: "https://api.example.com/chat",
    title: "Chat Green Theme",
};

export const PinkTheme = Template.bind({});
PinkTheme.args = {
    theme: "pink",
    apiEndpoint: "https://api.example.com/chat",
    title: "Chat Pink Theme",
};

export const OrangeTheme = Template.bind({});
OrangeTheme.args = {
    theme: "orange",
    apiEndpoint: "https://api.example.com/chat",
    title: "Chat Orange Theme",
};

export const ThemeSwitcher = () => {
    const container = document.createElement("div");
    container.style.padding = "20px";

    const chatElement = document.createElement("chat-container");
    chatElement.setAttribute("theme", "light");

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
