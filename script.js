const chatMessages = document.getElementById("chatMessages");
const symptomInput = document.getElementById("symptomInput");
const sendBtn = document.getElementById("sendBtn");
const clearBtn = document.getElementById("clearBtn");
const downloadBtn = document.getElementById("downloadBtn");
const doctorBtn = document.getElementById("doctorBtn");
const typingIndicator = document.getElementById("typingIndicator");
const historyList = document.getElementById("historyList");
const historyCount = document.getElementById("historyCount");
const patientName = document.getElementById("patientName");
const patientAge = document.getElementById("patientAge");
const patientGender = document.getElementById("patientGender");
const temperature = document.getElementById("temperature");
const oxygen = document.getElementById("oxygen");
const heartRate = document.getElementById("heartRate");
const riskCard = document.getElementById("riskCard");
const riskScore = document.getElementById("riskScore");
const riskNote = document.getElementById("riskNote");
const emergencyBanner = document.getElementById("emergencyBanner");
const themeToggle = document.getElementById("themeToggle");
const quickSymptomButtons = document.querySelectorAll("[data-symptom]");

const CHAT_STORAGE_KEY = "aiMedicalCareBot.currentChat";
const HISTORY_STORAGE_KEY = "aiMedicalCareBot.lastFiveChats";
const PROFILE_STORAGE_KEY = "aiMedicalCareBot.profile";
const THEME_STORAGE_KEY = "aiMedicalCareBot.theme";

const typoMap = {
    fevr: "fever",
    faver: "fever",
    feverr: "fever",
    hedache: "headache",
    headach: "headache",
    hedach: "headache",
    migrane: "migraine",
    couh: "cough",
    coff: "cough",
    caugh: "cough",
    vommiting: "vomiting",
    vomitting: "vomiting",
    diarhea: "diarrhea",
    diarehea: "diarrhea",
    brething: "breathing",
    breathlessnes: "breathlessness"
};

const diseaseMap = [
    {
        name: "Flu or Viral Infection",
        symptoms: ["fever", "cough", "cold", "body pain", "sore throat", "fatigue", "chills"],
        advice: "Rest, drink warm fluids, monitor temperature, and consider medical care if fever stays high for more than 2 days.",
        severity: "normal"
    },
    {
        name: "Common Cold",
        symptoms: ["cough", "cold", "runny nose", "sneezing", "sore throat", "blocked nose"],
        advice: "Steam inhalation, hydration, rest, and warm salt-water gargles may help.",
        severity: "normal"
    },
    {
        name: "Migraine or Stress Headache",
        symptoms: ["headache", "migraine", "nausea", "sensitivity to light", "dizziness"],
        advice: "Rest in a quiet room, hydrate, reduce screen brightness, and avoid skipped meals.",
        severity: "normal"
    },
    {
        name: "Food Poisoning or Stomach Infection",
        symptoms: ["vomiting", "diarrhea", "stomach pain", "nausea", "loose motion", "cramps"],
        advice: "Use oral rehydration, eat light food, and seek care if dehydration, blood in stool, or repeated vomiting occurs.",
        severity: "normal"
    },
    {
        name: "Allergy or Sinus Irritation",
        symptoms: ["sneezing", "itchy eyes", "runny nose", "blocked nose", "rash"],
        advice: "Avoid suspected allergens, keep the room clean, and consult a clinician if breathing becomes difficult.",
        severity: "normal"
    },
    {
        name: "Possible COVID-19 or Respiratory Infection",
        symptoms: ["fever", "cough", "loss of smell", "loss of taste", "breathing problem", "fatigue"],
        advice: "Consider testing, wear a mask, rest, hydrate, and monitor oxygen or breathing changes.",
        severity: "serious"
    },
    {
        name: "Possible Heart or Chest Emergency",
        symptoms: ["chest pain", "left arm pain", "jaw pain", "shortness of breath", "sweating", "breathing problem"],
        advice: "Get urgent medical help immediately, especially if pain is heavy, spreading, or paired with breathing difficulty.",
        severity: "serious"
    },
    {
        name: "Severe Dehydration Risk",
        symptoms: ["vomiting", "diarrhea", "dizziness", "very weak", "dry mouth", "low urine"],
        advice: "Start oral rehydration and contact a doctor quickly if weakness, confusion, or low urination continues.",
        severity: "serious"
    }
];

let activeChat = loadCurrentChat();

function normalizeText(text) {
    let normalized = text.toLowerCase().trim();

    Object.entries(typoMap).forEach(([wrong, correct]) => {
        const pattern = new RegExp(`\\b${wrong}\\b`, "g");
        normalized = normalized.replace(pattern, correct);
    });

    return normalized.replace(/[^\w\s]/g, " ").replace(/\s+/g, " ");
}

function analyzeSymptoms(input) {
    const normalizedInput = normalizeText(input);
    const vitals = getVitals();
    const matches = diseaseMap
        .map((condition) => {
            const matchedSymptoms = condition.symptoms.filter((symptom) => normalizedInput.includes(symptom));
            return {
                ...condition,
                matchedSymptoms,
                score: matchedSymptoms.length
            };
        })
        .filter((condition) => condition.score > 0)
        .sort((a, b) => b.score - a.score);

    const seriousTerms = [
        "chest pain",
        "shortness of breath",
        "breathing problem",
        "fainting",
        "unconscious",
        "severe bleeding",
        "stroke",
        "seizure",
        "very high fever"
    ];
    const hasEmergencyTerm = seriousTerms.some((term) => normalizedInput.includes(term));
    const hasSeriousMatch = matches.some((condition) => condition.severity === "serious");
    const vitalRisk = getVitalRisk(vitals);

    if (!matches.length) {
        const risk = calculateRisk("normal", 0, vitalRisk.points);
        return {
            severity: risk.severity,
            risk,
            text: `I could not confidently match those symptoms.\n\nBasic advice: note when the symptoms started, drink enough water, rest, and consult a doctor for a proper diagnosis if symptoms continue or worsen.\n\nRisk score: ${risk.label} (${risk.points}/10)\n${vitalRisk.notes}`
        };
    }

    const topMatches = matches.slice(0, 3);
    const possibleConditions = topMatches
        .map((condition, index) => {
            const symptoms = condition.matchedSymptoms.join(", ");
            return `${index + 1}. ${condition.name}\nMatched: ${symptoms}\nAdvice: ${condition.advice}`;
        })
        .join("\n\n");

    const severity = hasEmergencyTerm || hasSeriousMatch || vitalRisk.points >= 4 ? "serious" : "normal";
    const risk = calculateRisk(severity, topMatches[0].score, vitalRisk.points);
    const severityAdvice = severity === "serious"
        ? "\u26A0 Serious warning: Some symptoms may need urgent medical attention. Please contact a doctor, emergency service, or nearby clinic immediately if symptoms are intense or worsening."
        : "Severity: Normal guidance. Keep monitoring symptoms, rest, hydrate, and seek medical care if symptoms persist.";

    return {
        severity,
        risk,
        text: `Possible conditions:\n\n${possibleConditions}\n\nRisk score: ${risk.label} (${risk.points}/10)\n${vitalRisk.notes}\n\n${severityAdvice}`
    };
}

function getVitalRisk(vitals) {
    const notes = [];
    let points = 0;

    if (vitals.temperature >= 103) {
        points += 3;
        notes.push("High fever detected.");
    } else if (vitals.temperature >= 100.4) {
        points += 1;
        notes.push("Fever range temperature detected.");
    }

    if (vitals.oxygen && vitals.oxygen < 92) {
        points += 4;
        notes.push("Low oxygen reading detected.");
    } else if (vitals.oxygen && vitals.oxygen < 95) {
        points += 2;
        notes.push("Oxygen is below usual range.");
    }

    if (vitals.heartRate > 120) {
        points += 2;
        notes.push("High pulse reading detected.");
    } else if (vitals.heartRate && vitals.heartRate < 50) {
        points += 2;
        notes.push("Low pulse reading detected.");
    }

    return {
        points,
        notes: notes.length ? `Vitals note: ${notes.join(" ")}` : "Vitals note: No abnormal optional vitals entered."
    };
}

function calculateRisk(severity, matchScore, vitalPoints) {
    let points = Math.min(10, vitalPoints + matchScore + (severity === "serious" ? 3 : 0));

    if (points >= 7) {
        return { label: "High", points, severity: "serious" };
    }

    if (points >= 4) {
        return { label: "Medium", points, severity: "normal" };
    }

    return { label: "Low", points, severity: "normal" };
}

function addMessage(sender, text, severity = "normal", save = true) {
    const message = document.createElement("div");
    message.className = `message ${sender}${severity === "serious" ? " serious" : ""}`;

    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.textContent = text;

    message.appendChild(bubble);
    chatMessages.appendChild(message);
    scrollChatToBottom();

    if (save) {
        activeChat.push({
            sender,
            text,
            severity,
            time: new Date().toISOString()
        });
        saveCurrentChat();
    }
}

function sendMessage() {
    const userText = symptomInput.value.trim();

    if (!userText) {
        symptomInput.focus();
        return;
    }

    addMessage("user", userText);
    symptomInput.value = "";
    setTyping(true);

    window.setTimeout(() => {
        const result = analyzeSymptoms(userText);
        addMessage("bot", result.text, result.severity);
        updateRiskCard(result.risk);
        emergencyBanner.hidden = result.severity !== "serious";
        setTyping(false);
        saveChatToHistory(userText, result.text, result.severity, result.risk);
    }, 650);
}

function setTyping(isTyping) {
    typingIndicator.hidden = !isTyping;
    scrollChatToBottom();
}

function scrollChatToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function clearChat() {
    activeChat = [];
    localStorage.removeItem(CHAT_STORAGE_KEY);
    chatMessages.innerHTML = "";
    emergencyBanner.hidden = true;
    updateRiskCard();
    addWelcomeMessage();
}

function addWelcomeMessage() {
    addMessage(
        "bot",
        "Hello, I am your AI Medical Care Bot. Share your symptoms in one message, and I will analyze possible conditions, severity, and basic care advice.",
        "normal",
        false
    );
}

function downloadReport() {
    const profile = getProfile();
    const messages = activeChat.length ? activeChat : [];
    const reportLines = [
        "AI Medical Care Bot - Patient Symptom Report",
        "Generated: " + new Date().toLocaleString(),
        "",
        "Patient Profile",
        "Name: " + (profile.name || "Not provided"),
        "Age: " + (profile.age || "Not provided"),
        "Gender: " + (profile.gender || "Not provided"),
        "Temperature: " + (profile.temperature || "Not provided"),
        "Oxygen: " + (profile.oxygen || "Not provided"),
        "Pulse: " + (profile.heartRate || "Not provided"),
        "Current Risk: " + riskScore.textContent,
        "",
        "Chat Transcript",
        messages.length
            ? messages.map((message) => `[${message.sender.toUpperCase()}] ${message.text}`).join("\n\n")
            : "No chat messages available.",
        "",
        "Disclaimer: This report is educational and does not replace professional medical diagnosis."
    ];

    const blob = new Blob([reportLines.join("\n")], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `medical-care-report-${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(link.href);
}

function findNearbyDoctor() {
    const query = encodeURIComponent("doctor near me clinic hospital nearby");
    window.open(`https://www.google.com/search?q=${query}`, "_blank", "noopener,noreferrer");
}

function getProfile() {
    return {
        name: patientName.value.trim(),
        age: patientAge.value.trim(),
        gender: patientGender.value,
        temperature: temperature.value.trim(),
        oxygen: oxygen.value.trim(),
        heartRate: heartRate.value.trim()
    };
}

function getVitals() {
    return {
        temperature: Number(temperature.value),
        oxygen: Number(oxygen.value),
        heartRate: Number(heartRate.value)
    };
}

function saveProfile() {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(getProfile()));
}

function restoreProfile() {
    try {
        const profile = JSON.parse(localStorage.getItem(PROFILE_STORAGE_KEY)) || {};
        patientName.value = profile.name || "";
        patientAge.value = profile.age || "";
        patientGender.value = profile.gender || "";
        temperature.value = profile.temperature || "";
        oxygen.value = profile.oxygen || "";
        heartRate.value = profile.heartRate || "";
    } catch {
        localStorage.removeItem(PROFILE_STORAGE_KEY);
    }
}

function updateRiskCard(risk = { label: "Low", points: 0 }) {
    riskCard.classList.remove("medium", "high");

    if (risk.label === "High") {
        riskCard.classList.add("high");
    } else if (risk.label === "Medium") {
        riskCard.classList.add("medium");
    }

    riskScore.textContent = risk.label;
    riskNote.textContent = risk.points
        ? `${risk.points}/10 based on symptoms and vitals.`
        : "Add symptoms to calculate.";
}

function saveCurrentChat() {
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(activeChat));
}

function loadCurrentChat() {
    try {
        return JSON.parse(localStorage.getItem(CHAT_STORAGE_KEY)) || [];
    } catch {
        return [];
    }
}

function saveChatToHistory(symptoms, response, severity, risk) {
    const history = loadHistory();
    const profile = getProfile();
    const entry = {
        symptoms,
        response,
        severity,
        risk: risk ? risk.label : "Low",
        patient: profile.name || "Guest Patient",
        date: new Date().toLocaleString()
    };

    const updatedHistory = [entry, ...history].slice(0, 5);
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updatedHistory));
    renderHistory();
}

function loadHistory() {
    try {
        return JSON.parse(localStorage.getItem(HISTORY_STORAGE_KEY)) || [];
    } catch {
        return [];
    }
}

function renderHistory() {
    const history = loadHistory();
    historyList.innerHTML = "";
    historyCount.textContent = `${history.length} saved`;

    if (!history.length) {
        const emptyItem = document.createElement("li");
        emptyItem.className = "empty-history";
        emptyItem.textContent = "No saved chats yet. Your last 5 symptom checks will appear here.";
        historyList.appendChild(emptyItem);
        return;
    }

    history.forEach((entry) => {
        const item = document.createElement("li");
        const severityLabel = entry.severity === "serious" ? "Serious" : "Normal";
        item.textContent = `${entry.patient} - ${severityLabel} - ${entry.risk || "Low"} risk - ${entry.symptoms} - ${entry.date}`;
        historyList.appendChild(item);
    });
}

function appendQuickSymptom(symptom) {
    const existing = symptomInput.value.trim();
    symptomInput.value = existing ? `${existing}, ${symptom}` : symptom;
    symptomInput.focus();
}

function applyTheme(theme) {
    document.body.classList.toggle("dark", theme === "dark");
    themeToggle.textContent = theme === "dark" ? "Light mode" : "Dark mode";
    localStorage.setItem(THEME_STORAGE_KEY, theme);
}

function restoreChat() {
    if (!activeChat.length) {
        addWelcomeMessage();
        return;
    }

    activeChat.forEach((message) => {
        addMessage(message.sender, message.text, message.severity, false);
    });
}

sendBtn.addEventListener("click", sendMessage);
clearBtn.addEventListener("click", clearChat);
downloadBtn.addEventListener("click", downloadReport);
doctorBtn.addEventListener("click", findNearbyDoctor);
themeToggle.addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("dark") ? "light" : "dark";
    applyTheme(nextTheme);
});

[patientName, patientAge, patientGender, temperature, oxygen, heartRate].forEach((field) => {
    field.addEventListener("input", saveProfile);
    field.addEventListener("change", saveProfile);
});

quickSymptomButtons.forEach((button) => {
    button.addEventListener("click", () => appendQuickSymptom(button.dataset.symptom));
});

symptomInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
});

applyTheme(localStorage.getItem(THEME_STORAGE_KEY) || "light");
restoreProfile();
restoreChat();
updateRiskCard();
renderHistory();
