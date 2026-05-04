# 🏥 AI Medical Care Bot

A professional, modern medical chatbot built with vanilla HTML, CSS, and JavaScript. This application provides preliminary medical guidance based on user-described symptoms using rule-based NLP.

## ✨ Features

### Core Functionality
- **Intelligent Symptom Detection**: Rule-based NLP engine that recognizes medical symptoms and provides appropriate guidance
- **Real-time Chat Interface**: Clean, professional chat bubbles similar to modern messaging apps
- **Smart Medical Knowledge Base**: Pre-trained responses for common symptoms (fever, cough, headache, chest pain, flu, cold, etc.)

### User Experience
- **Chat Bubbles**: Distinct styling for user and bot messages with color differentiation
- **Timestamps**: Each message displays the time it was sent
- **Auto-scroll**: Chat automatically scrolls to the latest message
- **Smooth Animations**: Professional transitions and typing indicators
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### Advanced Features
- **Enter Key Support**: Send messages by pressing Enter
- **Patient Profile**: Save patient name for personalized interactions
- **Chat History**: Automatically stores the last 5 chats in browser localStorage
- **History Modal**: View and restore previous chat sessions
- **Typing Indicator**: Shows when the bot is "thinking"

### Design
- **Modern Medical Theme**: Professional blue and white color scheme
- **Professional UI**: Startup-level design with smooth gradients and shadows
- **Accessibility**: Clear typography, high contrast, and intuitive controls
- **Mobile Optimized**: Touch-friendly buttons and responsive layouts

## 🚀 Getting Started

### Installation
1. Navigate to the project directory
2. Simply open `index.html` in your web browser
3. No dependencies, no installation required!

### Usage
1. **Enter Your Name** (Optional): Type your name in the patient name field
2. **Describe Your Symptoms**: Type your symptoms in the chat input (e.g., "I have a fever and cough")
3. **Get Medical Suggestions**: The bot analyzes your input and provides preliminary guidance
4. **Use the Chat**: 
   - Press Enter or click Send button to send messages
   - View chat history by clicking the "📜 History" button
   - Clear current chat with the "🗑️ Clear Chat" button

## 📋 Supported Symptoms

The bot can recognize and provide guidance for:

- **Fever** - Temperature-related conditions
- **Cough** - Various types of coughs
- **Headache** - Migraines and general head pain
- **Chest Pain** - ⚠️ Critical condition alert
- **Sore Throat** - Pharyngitis and throat infections
- **Flu** - Influenza and flu-like symptoms
- **Nausea/Vomiting** - Digestive issues
- **Diarrhea** - Gastrointestinal problems
- **Back Pain** - Spinal and muscular pain
- **Cold** - Common cold symptoms

Type any of these symptoms (or related keywords) to receive relevant medical suggestions.

## 📁 File Structure

```
ai-medical-care-bot/
├── index.html          # HTML structure and layout
├── style.css           # Styling and responsive design
├── script.js           # JavaScript logic and NLP engine
└── README.md           # Documentation
```

## 🔧 Technical Details

### Technologies Used
- **HTML5**: Semantic markup
- **CSS3**: Flexbox, Grid, Animations, Media Queries
- **JavaScript (ES6+)**: Modern JavaScript features
- **localStorage**: Browser-based data persistence

### Key JavaScript Functions

#### Medical Analysis
- `analyzeMedicalSymptoms()` - Main NLP engine for symptom detection
- `generateGenericResponse()` - Fallback responses for unrecognized symptoms

#### Chat Management
- `addMessage()` - Add messages to chat
- `sendMessage()` - Handle message sending
- `scrollToBottom()` - Auto-scroll functionality

#### History Management
- `saveChatToHistory()` - Save chats to localStorage
- `loadChatHistory()` - Load history from storage
- `restoreChatFromHistory()` - Restore previous chats

### CSS Classes
- `.chat-container` - Chat message area
- `.user-message` / `.bot-message` - Message styling
- `.modal` - History modal popup
- `.typing-indicator` - Bot thinking animation

## 💾 LocalStorage

The app uses browser localStorage to persist data:
- **medicalChatHistory**: Stores last 5 chat sessions (JSON format)
- **medicalCarePatientName**: Saves patient name

Data is automatically saved and can be viewed in the History modal.

## 🎨 Design Features

### Color Scheme
- **Primary Blue**: `#0066cc` - Main theme color
- **Secondary Green**: `#00a86b` - Success states
- **Accent Red**: `#ff6b6b` - Warning/critical states
- **Neutral Light**: `#f5f7fa` - Background color

### Responsive Breakpoints
- **Desktop**: Full layout
- **Tablet** (≤768px): Adjusted spacing and font sizes
- **Mobile** (≤480px): Optimized touch targets and typography

## ⚠️ Important Disclaimer

**This application is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment.** 

- Always consult with a licensed healthcare professional for proper medical guidance
- In case of medical emergencies, call emergency services immediately (911 in US, 112 in EU)
- The AI suggestions are based on pattern matching, not actual medical knowledge
- Never delay seeking professional medical care based on bot suggestions

## 🔐 Privacy

- All data is stored locally in your browser
- No data is sent to external servers
- Chat history is only stored on your device
- You can delete all history anytime with the "Delete All History" button

## 🚀 Future Enhancements

Potential improvements for future versions:
- Integration with real medical APIs
- Voice input support
- Multi-language support
- Advanced symptom severity assessment
- Integration with healthcare providers
- Appointment scheduling
- Prescription management

## 👨‍💻 Code Quality

The codebase features:
- ✅ Comprehensive comments explaining each section
- ✅ Semantic HTML markup
- ✅ CSS variables for easy theme customization
- ✅ Clean, modular JavaScript functions
- ✅ Proper error handling
- ✅ Responsive and accessible design

## 🐛 Browser Support

- Chrome/Edge (Latest)
- Firefox (Latest)
- Safari (Latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 License

This project is open source and available for personal and educational use.

## 🤝 Support

For questions or issues:
1. Check the code comments for detailed explanations
2. Review the feature list above
3. Test with different symptom keywords
4. Clear browser cache if experiencing issues

---

**Built with ❤️ as a professional medical assistant demonstration**

*Last Updated: 2026*
