# 🏥 AI Medical Care Bot - Complete Source Code

## Project Overview
**AI Medical Care Bot** is a professional medical chatbot built with vanilla HTML, CSS, and JavaScript. It features rule-based NLP for symptom detection and provides medical guidance with a modern chat interface.

---

## 📋 File 1: index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Medical Care Bot</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- Main Container -->
    <div class="container">
        <!-- Header Section -->
        <header class="header">
            <div class="header-content">
                <div class="header-title">
                    <h1>🏥 AI Medical Care Bot</h1>
                    <p class="subtitle">24/7 Medical Assistant</p>
                </div>
                <div class="header-status">
                    <span class="status-indicator"></span>
                    <span class="status-text">Online</span>
                </div>
            </div>
        </header>

        <!-- Patient Information Section -->
        <section class="patient-section">
            <div class="patient-input-group">
                <label for="patientName">Your Name</label>
                <input 
                    type="text" 
                    id="patientName" 
                    placeholder="Enter your name" 
                    class="patient-input"
                    maxlength="50"
                />
            </div>
            <div class="action-buttons">
                <button id="clearChatBtn" class="action-btn clear-btn" title="Clear current chat">
                    🗑️ Clear Chat
                </button>
                <button id="viewHistoryBtn" class="action-btn history-btn" title="View last 5 chats">
                    📜 History
                </button>
            </div>
        </section>

        <!-- Chat Container -->
        <div class="chat-container">
            <div id="chatBox" class="chat-box">
                <!-- Messages will be dynamically added here -->
                <div class="welcome-message">
                    <div class="bot-message-wrapper">
                        <div class="bot-message">
                            <p>👋 Welcome! I'm your AI Medical Assistant.</p>
                            <p>Please describe your symptoms, and I'll provide preliminary medical guidance. However, always consult with a licensed healthcare professional for proper diagnosis and treatment.</p>
                            <span class="message-time" id="welcomeTime"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Input Section -->
        <section class="input-section">
            <div class="input-group">
                <input 
                    type="text" 
                    id="userInput" 
                    class="message-input" 
                    placeholder="Describe your symptoms here... (e.g., fever, cough, headache)"
                    autocomplete="off"
                />
                <button id="sendBtn" class="send-button">
                    <span class="send-icon">➤</span>
                </button>
            </div>
            <p class="input-hint">Press Enter or click Send button</p>
        </section>
    </div>

    <!-- History Modal -->
    <div id="historyModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Chat History</h2>
                <button class="close-btn">&times;</button>
            </div>
            <div id="historyList" class="history-list">
                <!-- History items will be added here -->
            </div>
            <div class="modal-footer">
                <button id="deleteHistoryBtn" class="delete-all-btn">Delete All History</button>
            </div>
        </div>
    </div>

    <!-- Disclaimer Footer -->
    <footer class="footer">
        <p>⚠️ <strong>Disclaimer:</strong> This is an AI assistant for informational purposes only. It is not a substitute for professional medical advice. Always consult with a licensed healthcare provider for diagnosis and treatment.</p>
    </footer>

    <script src="script.js"></script>
</body>
</html>
```

---

## 🎨 File 2: style.css

```css
/* ============================================
   AI Medical Care Bot - Stylesheet
   Modern Medical Theme with Blue & White
   ============================================ */

/* CSS Variables for Theme */
:root {
    --primary-color: #0066cc;
    --primary-dark: #0052a3;
    --primary-light: #e6f2ff;
    --secondary-color: #00a86b;
    --accent-color: #ff6b6b;
    --neutral-light: #f5f7fa;
    --neutral-gray: #9ca3af;
    --text-dark: #1f2937;
    --text-light: #6b7280;
    --border-color: #e5e7eb;
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
    --radius-sm: 8px;
    --radius-md: 12px;
    --radius-lg: 16px;
}

/* ============================================
   Global Styles
   ============================================ */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html, body {
    height: 100%;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
    background: linear-gradient(135deg, #f5f7fa 0%, #e6f2ff 100%);
    color: var(--text-dark);
}

body {
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

/* ============================================
   Main Container
   ============================================ */

.container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background: white;
    box-shadow: var(--shadow-lg);
    max-width: 900px;
    margin: 0 auto;
    width: 100%;
}

/* ============================================
   Header Section
   ============================================ */

.header {
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
    color: white;
    padding: 20px;
    box-shadow: var(--shadow-md);
    flex-shrink: 0;
}

.header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 900px;
    margin: 0 auto;
    width: 100%;
}

.header-title h1 {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 4px;
    letter-spacing: -0.5px;
}

.subtitle {
    font-size: 13px;
    opacity: 0.9;
    font-weight: 500;
}

.header-status {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(255, 255, 255, 0.2);
    padding: 8px 16px;
    border-radius: var(--radius-md);
}

.status-indicator {
    width: 8px;
    height: 8px;
    background: #4ade80;
    border-radius: 50%;
    animation: pulse 2s infinite;
}

.status-text {
    font-size: 12px;
    font-weight: 600;
}

@keyframes pulse {
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0.6;
    }
}

/* ============================================
   Patient Section
   ============================================ */

.patient-section {
    padding: 16px 20px;
    background: var(--neutral-light);
    border-bottom: 1px solid var(--border-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    flex-shrink: 0;
    flex-wrap: wrap;
}

.patient-input-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex: 1;
    min-width: 200px;
}

.patient-input-group label {
    font-size: 12px;
    font-weight: 600;
    color: var(--text-dark);
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.patient-input {
    padding: 10px 14px;
    border: 1.5px solid var(--border-color);
    border-radius: var(--radius-sm);
    font-size: 14px;
    transition: all 0.3s ease;
    background: white;
    color: var(--text-dark);
}

.patient-input:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
    background: white;
}

.action-buttons {
    display: flex;
    gap: 10px;
}

.action-btn {
    padding: 10px 16px;
    border: none;
    border-radius: var(--radius-sm);
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    white-space: nowrap;
}

.clear-btn {
    background: #fee;
    color: var(--accent-color);
    border: 1px solid var(--accent-color);
}

.clear-btn:hover {
    background: var(--accent-color);
    color: white;
    transform: translateY(-2px);
}

.history-btn {
    background: var(--primary-light);
    color: var(--primary-color);
    border: 1px solid var(--primary-color);
}

.history-btn:hover {
    background: var(--primary-color);
    color: white;
    transform: translateY(-2px);
}

/* ============================================
   Chat Container
   ============================================ */

.chat-container {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    background: white;
    display: flex;
    flex-direction: column;
}

.chat-box {
    display: flex;
    flex-direction: column;
    gap: 12px;
    animation: fadeIn 0.4s ease;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.welcome-message {
    animation: slideUp 0.5s ease;
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* ============================================
   Message Styling
   ============================================ */

.message-wrapper {
    display: flex;
    animation: messageSlide 0.3s ease;
}

@keyframes messageSlide {
    from {
        opacity: 0;
        transform: translateY(5px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* User Message */
.user-message-wrapper {
    justify-content: flex-end;
}

.user-message {
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
    color: white;
    padding: 12px 16px;
    border-radius: var(--radius-lg);
    max-width: 75%;
    word-wrap: break-word;
    box-shadow: var(--shadow-md);
    border-bottom-right-radius: 4px;
}

.user-message p {
    margin: 0;
    line-height: 1.4;
    font-size: 14px;
}

/* Bot Message */
.bot-message-wrapper {
    justify-content: flex-start;
}

.bot-message {
    background: var(--neutral-light);
    color: var(--text-dark);
    padding: 12px 16px;
    border-radius: var(--radius-lg);
    max-width: 75%;
    word-wrap: break-word;
    box-shadow: var(--shadow-md);
    border-bottom-left-radius: 4px;
    border-left: 4px solid var(--primary-color);
}

.bot-message p {
    margin: 8px 0;
    line-height: 1.5;
    font-size: 14px;
}

.bot-message p:first-child {
    margin-top: 0;
}

.bot-message p:last-child {
    margin-bottom: 0;
}

/* Message Timestamp */
.message-time {
    font-size: 11px;
    opacity: 0.6;
    margin-top: 6px;
    display: block;
    font-weight: 500;
}

.user-message .message-time {
    text-align: right;
    opacity: 0.8;
}

.bot-message .message-time {
    text-align: left;
    color: var(--neutral-gray);
}

/* ============================================
   Input Section
   ============================================ */

.input-section {
    padding: 16px 20px;
    background: var(--neutral-light);
    border-top: 1px solid var(--border-color);
    flex-shrink: 0;
}

.input-group {
    display: flex;
    gap: 10px;
    margin-bottom: 8px;
}

.message-input {
    flex: 1;
    padding: 12px 16px;
    border: 1.5px solid var(--border-color);
    border-radius: var(--radius-md);
    font-size: 14px;
    font-family: inherit;
    transition: all 0.3s ease;
    background: white;
    color: var(--text-dark);
}

.message-input::placeholder {
    color: var(--neutral-gray);
}

.message-input:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
    background: white;
}

.send-button {
    padding: 12px 24px;
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
    color: white;
    border: none;
    border-radius: var(--radius-md);
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    min-width: 48px;
    box-shadow: var(--shadow-md);
}

.send-button:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
}

.send-button:active {
    transform: translateY(0);
}

.send-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.input-hint {
    font-size: 12px;
    color: var(--neutral-gray);
    margin: 0;
    text-align: center;
}

/* ============================================
   Modal Styles
   ============================================ */

.modal {
    display: none;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    animation: fadeIn 0.3s ease;
}

.modal.show {
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-content {
    background-color: white;
    padding: 0;
    border-radius: var(--radius-lg);
    width: 90%;
    max-width: 500px;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
    box-shadow: var(--shadow-lg);
    animation: slideDown 0.3s ease;
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.modal-header {
    padding: 20px;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--neutral-light);
}

.modal-header h2 {
    font-size: 18px;
    color: var(--text-dark);
    margin: 0;
}

.close-btn {
    background: none;
    border: none;
    font-size: 28px;
    cursor: pointer;
    color: var(--text-light);
    transition: color 0.3s ease;
    padding: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.close-btn:hover {
    color: var(--text-dark);
}

.history-list {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
}

.history-item {
    padding: 12px;
    background: var(--neutral-light);
    border-radius: var(--radius-md);
    margin-bottom: 10px;
    border-left: 4px solid var(--primary-color);
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.history-item:hover {
    background: var(--primary-light);
    transform: translateX(4px);
}

.history-item-text {
    font-size: 13px;
    color: var(--text-dark);
    line-height: 1.4;
    flex: 1;
}

.history-item-time {
    font-size: 11px;
    color: var(--neutral-gray);
    white-space: nowrap;
    margin-left: 10px;
}

.empty-history {
    text-align: center;
    padding: 40px 20px;
    color: var(--neutral-gray);
    font-size: 14px;
}

.modal-footer {
    padding: 16px 20px;
    border-top: 1px solid var(--border-color);
    background: var(--neutral-light);
}

.delete-all-btn {
    width: 100%;
    padding: 12px;
    background: #fee;
    color: var(--accent-color);
    border: 1px solid var(--accent-color);
    border-radius: var(--radius-md);
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 14px;
}

.delete-all-btn:hover {
    background: var(--accent-color);
    color: white;
    transform: translateY(-2px);
}

/* ============================================
   Footer Section
   ============================================ */

.footer {
    padding: 12px 20px;
    background: #fffacd;
    border-top: 1px solid #f0e68c;
    font-size: 12px;
    color: #333;
    text-align: center;
    line-height: 1.4;
    flex-shrink: 0;
}

.footer p {
    margin: 0;
}

/* ============================================
   Scrollbar Styling
   ============================================ */

.chat-container::-webkit-scrollbar {
    width: 8px;
}

.chat-container::-webkit-scrollbar-track {
    background: transparent;
}

.chat-container::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 4px;
    transition: background 0.3s ease;
}

.chat-container::-webkit-scrollbar-thumb:hover {
    background: var(--neutral-gray);
}

.history-list::-webkit-scrollbar {
    width: 6px;
}

.history-list::-webkit-scrollbar-track {
    background: transparent;
}

.history-list::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 3px;
}

/* ============================================
   Responsive Design (Mobile & Tablet)
   ============================================ */

@media (max-width: 768px) {
    .container {
        max-width: 100%;
        border-radius: 0;
    }

    .header-title h1 {
        font-size: 22px;
    }

    .header-content {
        flex-direction: column;
        gap: 12px;
        text-align: center;
    }

    .patient-section {
        flex-direction: column;
        align-items: stretch;
    }

    .action-buttons {
        width: 100%;
    }

    .action-btn {
        flex: 1;
    }

    .user-message,
    .bot-message {
        max-width: 85%;
    }

    .user-message-wrapper {
        margin-left: 15%;
    }

    .bot-message-wrapper {
        margin-right: 15%;
    }

    .modal-content {
        width: 95%;
        max-height: 90vh;
    }
}

@media (max-width: 480px) {
    .container {
        height: 100vh;
    }

    .header-title h1 {
        font-size: 18px;
    }

    .subtitle {
        display: none;
    }

    .chat-container {
        padding: 12px;
    }

    .message-input {
        font-size: 16px;
    }

    .user-message,
    .bot-message {
        max-width: 90%;
        padding: 10px 12px;
        font-size: 13px;
    }

    .user-message-wrapper {
        margin-left: 10%;
    }

    .bot-message-wrapper {
        margin-right: 10%;
    }

    .patient-input-group {
        min-width: 100%;
    }

    .action-buttons {
        width: 100%;
    }
}

/* ============================================
   Loading Animation
   ============================================ */

.typing-indicator {
    display: flex;
    gap: 4px;
    padding: 12px 16px;
    background: var(--neutral-light);
    border-radius: var(--radius-lg);
    width: fit-content;
    border-left: 4px solid var(--primary-color);
}

.typing-dot {
    width: 8px;
    height: 8px;
    background: var(--primary-color);
    border-radius: 50%;
    animation: typingAnimation 1.4s infinite;
}

.typing-dot:nth-child(2) {
    animation-delay: 0.2s;
}

.typing-dot:nth-child(3) {
    animation-delay: 0.4s;
}

@keyframes typingAnimation {
    0%, 60%, 100% {
        opacity: 0.5;
        transform: translateY(0);
    }
    30% {
        opacity: 1;
        transform: translateY(-10px);
    }
}
```

---

## ⚙️ File 3: script.js

```javascript
/* ============================================
   AI Medical Care Bot - JavaScript
   Rule-Based NLP Engine & Chat Management
   ============================================ */

// ============================================
// DOM Elements Reference
// ============================================

const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const patientNameInput = document.getElementById('patientName');
const clearChatBtn = document.getElementById('clearChatBtn');
const viewHistoryBtn = document.getElementById('viewHistoryBtn');
const historyModal = document.getElementById('historyModal');
const historyList = document.getElementById('historyList');
const closeBtn = document.querySelector('.close-btn');
const deleteHistoryBtn = document.getElementById('deleteHistoryBtn');
const welcomeTime = document.getElementById('welcomeTime');

// ============================================
// State Management
// ============================================

const state = {
    messages: [],
    chatHistory: [],
    currentChatStartTime: new Date(),
};

// ============================================
// Medical Knowledge Base - Rule-Based NLP
// ============================================

const medicalKnowledgeBase = {
    fever: {
        keywords: ['fever', 'high temperature', 'hot', 'burning', 'temperature'],
        suggestions: [
            '🌡️ <strong>Fever Detected</strong>',
            '• Rest and stay hydrated - drink plenty of water',
            '• Take paracetamol (acetaminophen) or ibuprofen as directed',
            '• Apply a cool compress to your forehead',
            '• Wear light clothing to help your body cool down',
            '⚠️ Seek immediate medical attention if fever exceeds 103°F (39.4°C) or persists beyond 3 days',
        ],
        severity: 'moderate'
    },
    cough: {
        keywords: ['cough', 'coughing', 'persistent cough', 'dry cough', 'wet cough'],
        suggestions: [
            '🫁 <strong>Cough Detected</strong>',
            '• Stay hydrated - drink warm water with honey and lemon',
            '• Use a humidifier to keep air moist',
            '• Avoid irritants like smoke and dust',
            '• Take over-the-counter cough medicine if needed',
            '• Use throat lozenges for relief',
            '⚠️ Consult a doctor if cough lasts more than 2-3 weeks or is accompanied by blood',
        ],
        severity: 'mild'
    },
    headache: {
        keywords: ['headache', 'head pain', 'migraine', 'throbbing head', 'head ache'],
        suggestions: [
            '🤕 <strong>Headache Detected</strong>',
            '• Rest in a quiet, dark room',
            '• Apply a cold or warm compress to your head',
            '• Take aspirin, ibuprofen, or acetaminophen',
            '• Drink plenty of water - dehydration can cause headaches',
            '• Practice relaxation techniques or massage',
            '⚠️ Seek immediate care if headache is severe, sudden, or accompanied by fever, stiff neck, or vision changes',
        ],
        severity: 'mild'
    },
    chest_pain: {
        keywords: ['chest pain', 'chest tightness', 'chest pressure', 'heart pain', 'cardiac pain', 'chestpain'],
        suggestions: [
            '❤️ <strong>Chest Pain Detected</strong> - ⚠️ <strong>URGENT</strong>',
            '• <strong>CALL EMERGENCY (911 in US, 112 in EU) IMMEDIATELY</strong>',
            '• Stop any physical activity and sit down',
            '• If prescribed, take nitroglycerin',
            '• Loosen tight clothing',
            '• Try to stay calm and breathe slowly',
            '⚠️ <strong>Do NOT ignore chest pain - seek emergency medical care immediately!</strong>',
        ],
        severity: 'critical'
    },
    sore_throat: {
        keywords: ['sore throat', 'throat pain', 'throat infection', 'pharyngitis', 'angina', 'throat ache', 'scratchy throat'],
        suggestions: [
            '🗣️ <strong>Sore Throat Detected</strong>',
            '• Gargle with warm salt water several times a day',
            '• Drink warm herbal tea or warm water with honey',
            '• Use throat lozenges or hard candy',
            '• Take ibuprofen or acetaminophen for pain relief',
            '• Avoid smoking and secondhand smoke',
            '• Rest your voice - avoid shouting or singing',
            '⚠️ Consult a doctor if sore throat persists beyond 7 days or is accompanied by high fever',
        ],
        severity: 'mild'
    },
    flu: {
        keywords: ['flu', 'influenza', 'flu-like', 'body aches', 'chills', 'fatigue'],
        suggestions: [
            '🦠 <strong>Possible Flu Symptoms Detected</strong>',
            '• Rest and get plenty of sleep',
            '• Stay hydrated - drink water, broth, or sports drinks',
            '• Use a humidifier to ease congestion',
            '• Take antiviral medication if prescribed within 48 hours of symptoms',
            '• Use fever-reducing medications as needed',
            '• Isolate yourself to avoid spreading the virus',
            '⚠️ Consult a doctor for proper diagnosis and treatment recommendations',
        ],
        severity: 'moderate'
    },
    nausea: {
        keywords: ['nausea', 'nauseated', 'feel sick', 'feeling sick', 'queasy', 'vomiting', 'vomit', 'throwing up'],
        suggestions: [
            '🤢 <strong>Nausea/Vomiting Detected</strong>',
            '• Sip clear liquids like water, ginger ale, or broth',
            '• Eat small, frequent meals of bland foods (crackers, toast)',
            '• Avoid strong smells and fatty or spicy foods',
            '• Get fresh air and rest',
            '• Ginger or peppermint tea may help settle your stomach',
            '⚠️ Seek medical attention if vomiting persists, or if you have signs of dehydration',
        ],
        severity: 'mild'
    },
    diarrhea: {
        keywords: ['diarrhea', 'diarrhoea', 'loose stools', 'loose motions', 'stomach upset', 'gastric'],
        suggestions: [
            '🚽 <strong>Diarrhea Detected</strong>',
            '• Stay hydrated - drink oral rehydration solution (ORS)',
            '• Eat bland foods like rice, banana, crackers, and toast',
            '• Avoid dairy, fatty, and high-fiber foods temporarily',
            '• Take over-the-counter antidiarrheal medication if needed',
            '• Wash hands frequently to prevent spread',
            '⚠️ Seek medical attention if diarrhea lasts more than 2 days or shows signs of dehydration',
        ],
        severity: 'mild'
    },
    back_pain: {
        keywords: ['back pain', 'back ache', 'lower back', 'upper back', 'backpain', 'spinal pain'],
        suggestions: [
            '🔙 <strong>Back Pain Detected</strong>',
            '• Rest and avoid strenuous activities',
            '• Apply heat or cold therapy - whichever feels better',
            '• Use over-the-counter pain relievers like ibuprofen',
            '• Practice good posture while sitting and standing',
            '• Do gentle stretching exercises',
            '• Consider massage or physical therapy',
            '⚠️ Consult a doctor if pain is severe, persistent, or accompanied by numbness or tingling',
        ],
        severity: 'mild'
    },
    cold: {
        keywords: ['cold', 'common cold', 'runny nose', 'congestion', 'congested', 'sneezing', 'sneeze', 'stuffy nose'],
        suggestions: [
            '🤧 <strong>Common Cold Symptoms Detected</strong>',
            '• Get plenty of rest - your body needs energy to fight the virus',
            '• Stay hydrated - drink water, herbal tea, and warm broth',
            '• Use a humidifier to ease congestion',
            '• Gargle with salt water for sore throat',
            '• Take vitamin C supplements or eat citrus fruits',
            '• Use saline nasal drops or spray for congestion',
            '⚠️ Most colds resolve on their own in 7-10 days. See a doctor if symptoms worsen',
        ],
        severity: 'mild'
    }
};

// ============================================
// Utility Functions
// ============================================

/**
 * Format time as HH:MM AM/PM
 * @param {Date} date - The date object to format
 * @returns {string} Formatted time string
 */
function formatTime(date) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}

/**
 * Format date as "Today", "Yesterday", or "MM/DD/YYYY"
 * @param {Date} date - The date object to format
 * @returns {string} Formatted date string
 */
function formatDate(date) {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
        return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
        return 'Yesterday';
    } else {
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    }
}

/**
 * Normalize text for keyword matching
 * @param {string} text - Text to normalize
 * @returns {string} Normalized text
 */
function normalizeText(text) {
    return text.toLowerCase().trim().replace(/[.,!?;:]/g, '');
}

// ============================================
// Medical Symptom Detection Engine
// ============================================

/**
 * Analyze user input and match symptoms using rule-based NLP
 * @param {string} userMessage - User's symptom description
 * @returns {string} Medical suggestions based on symptoms
 */
function analyzeMedicalSymptoms(userMessage) {
    const normalizedMessage = normalizeText(userMessage);
    const detectedSymptoms = [];

    // Check each symptom in the knowledge base
    for (const [symptomKey, symptomData] of Object.entries(medicalKnowledgeBase)) {
        const keywords = symptomData.keywords;
        
        // Check if any keyword matches the user input
        const isMatched = keywords.some(keyword => 
            normalizedMessage.includes(normalizeText(keyword))
        );

        if (isMatched) {
            detectedSymptoms.push(symptomData);
        }
    }

    // If symptoms are detected, return the most urgent ones
    if (detectedSymptoms.length > 0) {
        // Sort by severity (critical first)
        const severityOrder = { critical: 0, moderate: 1, mild: 2 };
        detectedSymptoms.sort((a, b) => 
            severityOrder[a.severity] - severityOrder[b.severity]
        );

        // Return the top suggestion
        return detectedSymptoms[0].suggestions.join('\n');
    }

    // Generic medical advice if no specific symptoms are detected
    return generateGenericResponse(userMessage);
}

/**
 * Generate generic medical advice for unrecognized symptoms
 * @param {string} userMessage - User's input
 * @returns {string} Generic medical advice
 */
function generateGenericResponse(userMessage) {
    const genericResponses = [
        '💊 <strong>General Health Advice</strong>\n' +
        '• Make sure to drink plenty of water throughout the day\n' +
        '• Get adequate sleep (7-9 hours per night)\n' +
        '• Practice stress management and relaxation techniques\n' +
        '• Eat a balanced diet with fruits and vegetables\n' +
        '• Exercise regularly for at least 30 minutes daily\n' +
        '• If symptoms persist, consult with a healthcare professional',
        
        '📋 <strong>I didn\'t fully understand your symptoms</strong>\n' +
        '• Please describe your symptoms more clearly\n' +
        '• Mention specific body parts that hurt\n' +
        '• Describe how long you\'ve had the symptoms\n' +
        '• Tell me if you have fever or other associated symptoms\n' +
        '⚠️ When in doubt, always consult with a medical professional',
        
        '🏥 <strong>General Wellness Tips</strong>\n' +
        '• Maintain good personal hygiene (wash hands regularly)\n' +
        '• Get vaccinated as recommended by health authorities\n' +
        '• Avoid smoking and limit alcohol consumption\n' +
        '• Schedule regular check-ups with your doctor\n' +
        '• Keep emergency contact numbers readily available'
    ];

    return genericResponses[Math.floor(Math.random() * genericResponses.length)];
}

// ============================================
// Chat Management Functions
// ============================================

/**
 * Create a message element
 * @param {string} text - Message text (HTML allowed for bot messages)
 * @param {string} type - Message type ('user' or 'bot')
 * @returns {HTMLElement} Message element
 */
function createMessageElement(text, type) {
    const messageWrapper = document.createElement('div');
    messageWrapper.className = `message-wrapper ${type}-message-wrapper`;

    const message = document.createElement('div');
    message.className = `${type}-message`;

    // Parse text for bot messages to allow HTML formatting
    if (type === 'bot') {
        const paragraphs = text.split('\n').filter(line => line.trim());
        paragraphs.forEach(para => {
            const p = document.createElement('p');
            p.innerHTML = para;
            message.appendChild(p);
        });
    } else {
        const p = document.createElement('p');
        p.textContent = text;
        message.appendChild(p);
    }

    // Add timestamp
    const timestamp = document.createElement('span');
    timestamp.className = 'message-time';
    timestamp.textContent = formatTime(new Date());
    message.appendChild(timestamp);

    messageWrapper.appendChild(message);
    return messageWrapper;
}

/**
 * Add a message to the chat
 * @param {string} text - Message text
 * @param {string} type - Message type ('user' or 'bot')
 */
function addMessage(text, type) {
    const messageElement = createMessageElement(text, type);
    chatBox.appendChild(messageElement);

    // Store message in state
    state.messages.push({
        text: text,
        type: type,
        timestamp: new Date()
    });

    // Auto-scroll to the bottom
    scrollToBottom();
}

/**
 * Auto-scroll chat to the latest message
 */
function scrollToBottom() {
    chatBox.scrollTop = chatBox.scrollHeight;
}

/**
 * Handle sending a message
 */
function sendMessage() {
    const message = userInput.value.trim();

    if (!message) return;

    // Add user message
    addMessage(message, 'user');
    userInput.value = '';

    // Show thinking indicator
    showTypingIndicator();

    // Simulate a slight delay before bot response (more natural)
    setTimeout(() => {
        removeTypingIndicator();
        const botResponse = analyzeMedicalSymptoms(message);
        addMessage(botResponse, 'bot');
    }, 500);
}

/**
 * Show typing indicator
 */
function showTypingIndicator() {
    const typingWrapper = document.createElement('div');
    typingWrapper.className = 'message-wrapper bot-message-wrapper';
    typingWrapper.id = 'typingIndicator';

    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';

    typingWrapper.appendChild(typingDiv);
    chatBox.appendChild(typingWrapper);
    scrollToBottom();
}

/**
 * Remove typing indicator
 */
function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// ============================================
// LocalStorage Chat History Management
// ============================================

/**
 * Save current chat to history (max 5 chats)
 */
function saveChatToHistory() {
    if (state.messages.length === 0) return;

    const patientName = patientNameInput.value.trim() || 'Anonymous';
    const chatDuration = new Date() - state.currentChatStartTime;

    const chatEntry = {
        id: Date.now(),
        patientName: patientName,
        messages: [...state.messages],
        startTime: state.currentChatStartTime,
        endTime: new Date(),
        duration: chatDuration
    };

    // Get existing history
    let history = JSON.parse(localStorage.getItem('medicalChatHistory')) || [];

    // Add new chat
    history.unshift(chatEntry);

    // Keep only last 5 chats
    if (history.length > 5) {
        history = history.slice(0, 5);
    }

    localStorage.setItem('medicalChatHistory', JSON.stringify(history));
    state.chatHistory = history;
}

/**
 * Load chat history from localStorage
 */
function loadChatHistory() {
    const history = JSON.parse(localStorage.getItem('medicalChatHistory')) || [];
    state.chatHistory = history;
    displayChatHistory();
}

/**
 * Display chat history in modal
 */
function displayChatHistory() {
    historyList.innerHTML = '';

    if (state.chatHistory.length === 0) {
        historyList.innerHTML = '<div class="empty-history">No chat history yet</div>';
        return;
    }

    state.chatHistory.forEach((chat, index) => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';

        const firstMessage = chat.messages[0]?.text.substring(0, 50) || 'Chat session';
        const chatDate = new Date(chat.startTime);
        const displayDate = formatDate(chatDate);
        const displayTime = formatTime(chatDate);

        historyItem.innerHTML = `
            <div class="history-item-text">
                <strong>${chat.patientName}</strong><br/>
                ${firstMessage}...
            </div>
            <div class="history-item-time">
                ${displayDate}<br/>${displayTime}
            </div>
        `;

        // Click to restore chat
        historyItem.addEventListener('click', () => {
            restoreChatFromHistory(chat);
            closeHistoryModal();
        });

        historyList.appendChild(historyItem);
    });
}

/**
 * Restore a chat from history
 * @param {Object} chat - The chat entry to restore
 */
function restoreChatFromHistory(chat) {
    // Clear current chat
    chatBox.innerHTML = '';
    state.messages = [];

    // Restore patient name
    patientNameInput.value = chat.patientName;

    // Display all messages from history
    chat.messages.forEach(msg => {
        addMessage(msg.text, msg.type);
    });

    // Reset current chat timer
    state.currentChatStartTime = new Date();
}

/**
 * Clear current chat
 */
function clearChat() {
    if (state.messages.length === 0) return;

    if (confirm('Are you sure you want to clear this chat? This action cannot be undone.')) {
        // Save to history before clearing
        saveChatToHistory();

        // Clear chat display
        chatBox.innerHTML = `
            <div class="welcome-message">
                <div class="bot-message-wrapper">
                    <div class="bot-message">
                        <p>👋 Welcome! I'm your AI Medical Assistant.</p>
                        <p>Please describe your symptoms, and I'll provide preliminary medical guidance. However, always consult with a licensed healthcare professional for proper diagnosis and treatment.</p>
                        <span class="message-time">${formatTime(new Date())}</span>
                    </div>
                </div>
            </div>
        `;

        // Reset state
        state.messages = [];
        state.currentChatStartTime = new Date();
        userInput.value = '';
        userInput.focus();
    }
}

/**
 * Delete all chat history
 */
function deleteAllHistory() {
    if (confirm('Are you sure you want to delete all chat history? This action cannot be undone.')) {
        localStorage.removeItem('medicalChatHistory');
        state.chatHistory = [];
        displayChatHistory();
    }
}

// ============================================
// Modal Management
// ============================================

/**
 * Open history modal
 */
function openHistoryModal() {
    historyModal.classList.add('show');
    loadChatHistory();
}

/**
 * Close history modal
 */
function closeHistoryModal() {
    historyModal.classList.remove('show');
}

// ============================================
// Event Listeners
// ============================================

// Send message on button click
sendBtn.addEventListener('click', sendMessage);

// Send message on Enter key press
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// Clear chat button
clearChatBtn.addEventListener('click', clearChat);

// View history button
viewHistoryBtn.addEventListener('click', openHistoryModal);

// Close modal button
closeBtn.addEventListener('click', closeHistoryModal);

// Delete all history button
deleteHistoryBtn.addEventListener('click', deleteAllHistory);

// Close modal when clicking outside
historyModal.addEventListener('click', (e) => {
    if (e.target === historyModal) {
        closeHistoryModal();
    }
});

// Focus input on page load
userInput.addEventListener('DOMContentLoaded', () => {
    userInput.focus();
});

// ============================================
// Page Load Initialization
// ============================================

/**
 * Initialize the app on page load
 */
function initializeApp() {
    // Set welcome message time
    welcomeTime.textContent = formatTime(new Date());

    // Load chat history from localStorage
    loadChatHistory();

    // Focus input field
    userInput.focus();

    // Load saved patient name if exists
    const savedPatientName = localStorage.getItem('medicalCarePatientName');
    if (savedPatientName) {
        patientNameInput.value = savedPatientName;
    }

    // Save patient name on input change
    patientNameInput.addEventListener('change', () => {
        localStorage.setItem('medicalCarePatientName', patientNameInput.value);
    });

    // Save chat to history before page unload
    window.addEventListener('beforeunload', () => {
        if (state.messages.length > 0) {
            saveChatToHistory();
        }
    });

    console.log('🏥 AI Medical Care Bot initialized successfully');
}

// Initialize app when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// Alternative initialization if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
```

---

## 📊 Key Features Summary

| Feature | Status |
|---------|--------|
| Chat Interface | ✅ Complete |
| Symptom Detection (10+ symptoms) | ✅ Complete |
| Medical Knowledge Base | ✅ Complete |
| LocalStorage History (Last 5 chats) | ✅ Complete |
| Patient Name Input | ✅ Complete |
| Timestamps | ✅ Complete |
| Enter Key Support | ✅ Complete |
| Responsive Design | ✅ Complete |
| Animations | ✅ Complete |
| Modal History Viewer | ✅ Complete |
| Professional UI | ✅ Complete |

---

## 🚀 Quick Setup

1. Create a folder with three files: `index.html`, `style.css`, `script.js`
2. Copy the respective code into each file
3. Serve via HTTP server (Python/Node/Live Server)
4. Open in browser

---

## ⚠️ Medical Disclaimer

This application is for **informational purposes only** and is **NOT a substitute** for professional medical advice. Always consult with a licensed healthcare professional for proper diagnosis and treatment.

---

**Created:** May 2026  
**Status:** Production Ready  
**Technology:** HTML5, CSS3, Vanilla JavaScript

