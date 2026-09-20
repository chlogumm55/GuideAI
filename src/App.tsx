import { useState } from "react";
import "./App.css";

type Screen =
  | "home"
  | "chat"
  | "refine"
  | "review"
  | "accessibility"
  | "feedback";

type Mode = "normal" | "simplify" | "summarize" | "explain";

interface Settings {
  textSize: "small" | "medium" | "large" | "extra-large";
  highContrast: boolean;
  font: "Open Sans" | "Arial" | "Verdana";
  spoken: boolean;
}

// Updated Logo matching Prototype Compass Icon
function Logo() {
  return (
    <div className="logo">
      <div className="logo-icon-compass">🧭</div>
      <span className="logo-text">GuideAI</span>
    </div>
  );
}

// Updated Header with Profile Tag
function Header({
  onHome,
  onAccessibility,
}: {
  onHome: () => void;
  onAccessibility: () => void;
}) {
  return (
    <header className="header">
      <button className="logo-button" onClick={onHome}>
        <Logo />
      </button>

      <div className="header-right">
        <button
          className="accessibility-header-button"
          onClick={onAccessibility}
          title="Customize text size, contrast, font, and spoken responses"
        >
          ♿ Accessibility
        </button>
        <div className="user-profile-badge">Chloie</div>
      </div>
    </header>
  );
}

function HomeScreen({
  onStart,
  onAccessibility,
}: {
  onStart: () => void;
  onAccessibility: () => void;
}) {
  return (
    <div className="screen home-screen">
      <div className="home-card">
        <Logo />
        <p className="welcome-text">Welcome, Chloie</p>
        <h1>Your AI guide, made simple.</h1>
        <p className="home-description">
          Get clear, easy-to-understand answers, with your control, your way.
        </p>

        <div className="feature-grid">
          <Feature
            icon="✓"
            title="Simplify"
            description="Make complex information easier to understand."
          />
          <Feature
            icon="≡"
            title="Summarize"
            description="Get the key points, quickly."
          />
          <Feature
            icon="?"
            title="Explain"
            description="Learn step by step, with examples."
          />
          <Feature
            icon="🛡️"
            title="You're in control"
            description="Review, edit, and decide."
          />
        </div>

        <button
          className="primary-button large-button"
          onClick={onStart}
        >
          Start a new conversation →
        </button>

        <button
          className="secondary-button accessibility-home-button"
          onClick={onAccessibility}
        >
          ⚙ Manage accessibility settings
        </button>
      </div>
    </div>
  );
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="feature-card">
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function ChatScreen({
  message,
  setMessage,
  response,
  loading,
  onSend,
  onMode,
  onReview,
  onAccessibility,
}: {
  message: string;
  setMessage: (value: string) => void;
  response: string;
  loading: boolean;
  onSend: () => void;
  onMode: (mode: Mode) => void;
  onReview: () => void;
  onAccessibility: () => void;
}) {
  return (
    <div className="screen">
      <div className="chat-container">
        <div className="screen-header">
          <div>
            <p className="small-label">GuideAI</p>
            <h1>How can I help?</h1>
          </div>

          <button
            className="accessibility-small-button"
            onClick={onAccessibility}
            title="Open accessibility settings"
          >
            ♿ Accessibility
          </button>
        </div>

        {message && (
          <div className="chat-bubble user-bubble">
            <p>{message}</p>
            <span className="timestamp">10:24 AM</span>
          </div>
        )}

        {response && (
          <div className="chat-bubble ai-bubble">
            <div className="response-header">
              <span className="ai-label">AI-generated response</span>
            </div>
            <p className="response-text">{response}</p>
            <span className="timestamp">10:24 AM</span>

            <div className="refinement-buttons-horizontal">
              <button
                className="chip-button"
                onClick={() => onMode("simplify")}
              >
                Simplify
              </button>
              <button
                className="chip-button"
                onClick={() => onMode("summarize")}
              >
                Summarize
              </button>
              <button
                className="chip-button"
                onClick={() => onMode("explain")}
              >
                Explain
              </button>
            </div>

            <div className="review-callout">
              <div>
                <strong>Review before using</strong>
                <p>
                  GuideAI generates the response, but you decide whether it is
                  accurate and appropriate to use.
                </p>
              </div>
              <button className="secondary-button" onClick={onReview}>
                Review Response
              </button>
            </div>
          </div>
        )}

        <div className="input-card">
          <div className="message-row">
            <input
              id="question"
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onSend();
              }}
              placeholder="Type your message..."
            />
            <button
              className="primary-button"
              onClick={onSend}
              disabled={loading || !message.trim()}
            >
              {loading ? "Thinking..." : "Ask"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function RefineScreen({
  response,
  editText,
  setEditText,
  onBack,
  onRequestChanges,
  onRegenerate,
  onApprove,
}: {
  response: string;
  editText: string;
  setEditText: (value: string) => void;
  onBack: () => void;
  onRequestChanges: () => void;
  onRegenerate: () => void;
  onApprove: () => void;
}) {
  return (
    <div className="screen">
      <div className="refine-container">
        <button className="back-button" onClick={onBack}>
          ← Back to chat
        </button>

        <div className="refine-card">
          <h1>Refine response</h1>
          <p className="page-description">
            You can edit the AI's response or ask for changes.
          </p>

          <div className="ai-response-label">
            <span>AI-generated response</span>
          </div>

          <textarea
            className="response-editor"
            value={editText || response}
            onChange={(e) => setEditText(e.target.value)}
          />

          <div className="refine-actions">
            <button className="secondary-button" onClick={onRegenerate}>
              Regenerate
            </button>
            <button className="secondary-button" onClick={onRequestChanges}>
              Request Changes
            </button>
            <button className="primary-button" onClick={onApprove}>
              Approve & Use
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewScreen({
  response,
  onBack,
  onEdit,
  onRequestChanges,
  onApprove,
}: {
  response: string;
  onBack: () => void;
  onEdit: () => void;
  onRequestChanges: () => void;
  onApprove: () => void;
}) {
  return (
    <div className="screen">
      <div className="review-container">
        <button className="back-button" onClick={onBack}>
          ← Back to chat
        </button>

        <div className="review-card">
          <div className="review-header-icon">🛡️</div>
          <h1>Review Before Using</h1>
          <p className="page-description">
            You can make changes, ask for more details, or approve the response.
          </p>

          <div className="ai-response-block">
            <span className="ai-label">AI-generated response</span>
            <p>{response}</p>
          </div>

          <div className="review-actions">
            <button className="primary-button" onClick={onApprove}>
              Approve
            </button>
            <button className="secondary-button" onClick={onEdit}>
              Edit
            </button>
            <button className="secondary-button" onClick={onRequestChanges}>
              Request Changes
            </button>
          </div>

          <div className="why-response-box">
            <h3>Why this response?</h3>
            <p>
              We used reliable government sources and the latest BMV information
              to create this response.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AccessibilityScreen({
  settings,
  setSettings,
  onSave,
  onNavigate,
}: {
  settings: Settings;
  setSettings: (settings: Settings) => void;
  onSave: () => void;
  onNavigate: (screen: Screen) => void;
}) {
  return (
    <div className="screen accessibility-layout">
      <nav className="settings-sidebar">
        <button onClick={() => onNavigate("chat")}>💬 Chat</button>
        <button className="active">♿ Accessibility</button>
        <button onClick={() => onNavigate("feedback")}>💬 Feedback</button>
      </nav>

      <div className="accessibility-container">
        <div className="accessibility-card">
          <h1>Accessibility Settings</h1>
          <p className="page-description">
            Make GuideAI work best for you.
          </p>

          <div className="settings-section">
            <h2>Text Size</h2>
            <div className="setting-options">
              {[
                ["small", "Small"],
                ["medium", "Medium"],
                ["large", "Large"],
                ["extra-large", "Extra Large"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  className={`setting-option ${
                    settings.textSize === value ? "selected" : ""
                  }`}
                  onClick={() =>
                    setSettings({
                      ...settings,
                      textSize: value as Settings["textSize"],
                    })
                  }
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="settings-section">
            <h2>Higher Contrast</h2>
            <label className="toggle-row">
              <input
                type="checkbox"
                checked={settings.highContrast}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    highContrast: e.target.checked,
                  })
                }
              />
              <span>Enable higher contrast</span>
            </label>
          </div>

          <div className="settings-section">
            <h2>Font Style</h2>
            <select
              value={settings.font}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  font: e.target.value as Settings["font"],
                })
              }
            >
              <option>Open Sans</option>
              <option>Arial</option>
              <option>Verdana</option>
            </select>
          </div>

          <div className="settings-section">
            <h2>Spoken Response</h2>
            <label className="toggle-row">
              <input
                type="checkbox"
                checked={settings.spoken}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    spoken: e.target.checked,
                  })
                }
              />
              <span>Enable spoken responses</span>
            </label>
          </div>

          <button className="primary-button save-settings" onClick={onSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

function FeedbackScreen({
  feedback,
  setFeedback,
  submitted,
  onSubmit,
  onBack,
}: {
  feedback: string;
  setFeedback: (value: string) => void;
  submitted: boolean;
  onSubmit: () => void;
  onBack: () => void;
}) {
  return (
    <div className="screen">
      <div className="feedback-container">
        {!submitted ? (
          <div className="feedback-card">
            <p className="small-label">GuideAI</p>
            <h1>Your feedback</h1>
            <p className="page-description">
              Tell GuideAI what was missing or what could be improved.
            </p>

            <textarea
              className="feedback-input"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Example: The response was missing information about renewal fees."
            />

            <button
              className="primary-button"
              onClick={onSubmit}
              disabled={!feedback.trim()}
            >
              Submit Feedback
            </button>
          </div>
        ) : (
          <div className="feedback-confirmation-card">
            <div className="robot-icon">🤖</div>
            <h1>Thanks for your feedback!</h1>
            <p>
              Your input helps GuideAI provide better, more accurate responses
              over time.
            </p>

            <div className="feedback-summary-box">
              <strong>Your feedback</strong>
              <p>"{feedback}"</p>
            </div>

            <div className="updated-response-box">
              <strong>Response Updated</strong>
              <p>
                We've added the missing details and improved the explanation
                based on your feedback.
              </p>
            </div>

            <button className="primary-button" onClick={onBack}>
              Back to Chat
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  const [screen, setScreen] = useState<Screen>("home");

  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [editText, setEditText] = useState("");
  const [feedback, setFeedback] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const [loading, setLoading] = useState(false);

  const [settings, setSettings] = useState<Settings>({
    textSize: "medium",
    highContrast: false,
    font: "Open Sans",
    spoken: false,
  });

  const callGuideAI = async (
    userMessage: string,
    mode: Mode = "normal",
    existingResponse?: string
  ) => {
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/guideai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          mode,
          existingResponse,
          feedback,
        }),
      });

      if (!res.ok) {
        throw new Error("GuideAI request failed.");
      }

      const data = await res.json();

      setResponse(data.reply);
      setEditText(data.reply);

      if (settings.spoken && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const speech = new SpeechSynthesisUtterance(data.reply);
        window.speechSynthesis.speak(speech);
      }
    } catch (error) {
      console.error(error);
      setResponse(
        "GuideAI could not connect to the local AI model. Make sure Ollama is running and the GuideAI server is started."
      );
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!message.trim()) return;
    await callGuideAI(message, "normal");
  };

  const useMode = async (mode: Mode) => {
    if (!response) return;

    const modeInstructions: Record<Mode, string> = {
      normal: "",
      simplify:
        "Rewrite the response using simple, easy-to-understand language.",
      summarize:
        "Summarize the response and keep only the most important information.",
      explain:
        "Explain the response in more detail and clarify anything that may be confusing.",
    };

    await callGuideAI(
      `${modeInstructions[mode]}\n\nOriginal response:\n${response}`,
      mode,
      response
    );
  };

  const requestChanges = async () => {
    const changes = window.prompt(
      "What would you like GuideAI to change or add?"
    );

    if (!changes?.trim()) return;

    await callGuideAI(
      `Update the following AI response based on this user feedback:\n\nUser feedback:\n${changes}\n\nCurrent response:\n${editText}`,
      "normal",
      editText
    );

    setScreen("refine");
  };

  const regenerate = async () => {
    await callGuideAI(message, "normal");
  };

  const approveResponse = () => {
    setResponse(editText);
    setScreen("feedback");
  };

  const saveAccessibility = () => {
    setScreen("chat");
  };

  const appClassName = [
    "app",
    `text-${settings.textSize}`,
    settings.highContrast ? "high-contrast" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={appClassName} style={{ fontFamily: settings.font }}>
      <Header
        onHome={() => setScreen("home")}
        onAccessibility={() => setScreen("accessibility")}
      />

      {screen === "home" && (
        <HomeScreen
          onStart={() => setScreen("chat")}
          onAccessibility={() => setScreen("accessibility")}
        />
      )}

      {screen === "chat" && (
        <ChatScreen
          message={message}
          setMessage={setMessage}
          response={response}
          loading={loading}
          onSend={sendMessage}
          onMode={useMode}
          onReview={() => {
            setEditText(response);
            setScreen("review");
          }}
          onAccessibility={() => setScreen("accessibility")}
        />
      )}

      {screen === "refine" && (
        <RefineScreen
          response={response}
          editText={editText}
          setEditText={setEditText}
          onBack={() => setScreen("chat")}
          onRequestChanges={requestChanges}
          onRegenerate={regenerate}
          onApprove={approveResponse}
        />
      )}

      {screen === "review" && (
        <ReviewScreen
          response={editText || response}
          onBack={() => setScreen("chat")}
          onEdit={() => setScreen("refine")}
          onRequestChanges={requestChanges}
          onApprove={approveResponse}
        />
      )}

      {screen === "accessibility" && (
        <AccessibilityScreen
          settings={settings}
          setSettings={setSettings}
          onSave={saveAccessibility}
          onNavigate={(target) => setScreen(target)}
        />
      )}

      {screen === "feedback" && (
        <FeedbackScreen
          feedback={feedback}
          setFeedback={setFeedback}
          submitted={feedbackSubmitted}
          onSubmit={() => setFeedbackSubmitted(true)}
          onBack={() => {
            setFeedbackSubmitted(false);
            setFeedback("");
            setScreen("chat");
          }}
        />
      )}
    </div>
  );
}

export default App;