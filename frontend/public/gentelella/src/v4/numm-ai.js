import { showToast } from './toast.js';

export function initNummAI() {
  // Create the floating chat widget
  const chatHTML = `
    <div id="numm-ai-widget" style="position: fixed; bottom: 20px; right: 20px; z-index: 9999; display: flex; flex-direction: column; align-items: flex-end; font-family: 'Inter', sans-serif;">
      <!-- Chat Window -->
      <div id="numm-ai-window" style="display: none; width: 350px; height: 450px; background: var(--bg-card, #fff); border: 1px solid var(--border-color, #e0e0e0); border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); flex-direction: column; overflow: hidden; margin-bottom: 12px; transition: all 0.3s ease;">
        <div style="background: linear-gradient(135deg, var(--primary, #0056b3), var(--azure, #007bff)); color: white; padding: 12px 16px; font-weight: 600; display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 18px; height: 18px;"><path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM4 10a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10z"/></svg>
            NUMM AI Assistant
          </div>
          <button id="numm-ai-close" style="background: none; border: none; color: white; cursor: pointer; padding: 4px;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 18px; height: 18px;"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        
        <div id="numm-ai-messages" style="flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 12px; background: var(--bg-body, #f8f9fa);">
          <div style="align-self: flex-start; background: var(--bg-card, #fff); border: 1px solid var(--border-color, #eee); padding: 10px 14px; border-radius: 12px; border-bottom-left-radius: 2px; max-width: 85%; font-size: 14px; color: var(--text-color, #333);">
            Hello! I'm the NUMM AI Steward. Powered by Groq for ultra-fast LPU inference. How can I help you harmonize materials today?
          </div>
        </div>

        <div style="padding: 12px; background: var(--bg-card, #fff); border-top: 1px solid var(--border-color, #eee); display: flex; gap: 8px;">
          <input type="text" id="numm-ai-input" placeholder="Ask about ONMC, pipelines, etc..." style="flex: 1; padding: 8px 12px; border: 1px solid var(--border-color, #ddd); border-radius: 6px; outline: none; font-size: 14px; background: var(--bg-input, #fff); color: var(--text-color, #333);">
          <button id="numm-ai-send" style="background: var(--primary, #0056b3); color: white; border: none; border-radius: 6px; padding: 8px 12px; cursor: pointer; font-weight: 500;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 16px; height: 16px;"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </div>
      </div>

      <!-- Trigger Button -->
      <button id="numm-ai-trigger" style="background: linear-gradient(135deg, var(--primary, #0056b3), var(--azure, #007bff)); color: white; border: none; border-radius: 50%; width: 56px; height: 56px; cursor: pointer; box-shadow: 0 4px 15px rgba(0,123,255,0.4); display: flex; justify-content: center; align-items: center; transition: transform 0.2s;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 28px; height: 28px;"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
      </button>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', chatHTML);

  const widget = document.getElementById('numm-ai-widget');
  const trigger = document.getElementById('numm-ai-trigger');
  const windowEl = document.getElementById('numm-ai-window');
  const closeBtn = document.getElementById('numm-ai-close');
  const input = document.getElementById('numm-ai-input');
  const sendBtn = document.getElementById('numm-ai-send');
  const messages = document.getElementById('numm-ai-messages');

  let isOpen = false;

  trigger.addEventListener('click', () => {
    isOpen = !isOpen;
    windowEl.style.display = isOpen ? 'flex' : 'none';
    if (isOpen) input.focus();
  });

  closeBtn.addEventListener('click', () => {
    isOpen = false;
    windowEl.style.display = 'none';
  });

  function appendMessage(text, isUser) {
    const msg = document.createElement('div');
    msg.style.alignSelf = isUser ? 'flex-end' : 'flex-start';
    msg.style.background = isUser ? 'var(--primary, #0056b3)' : 'var(--bg-card, #fff)';
    msg.style.color = isUser ? '#fff' : 'var(--text-color, #333)';
    msg.style.border = isUser ? 'none' : '1px solid var(--border-color, #eee)';
    msg.style.padding = '10px 14px';
    msg.style.borderRadius = '12px';
    msg.style.borderBottomRightRadius = isUser ? '2px' : '12px';
    msg.style.borderBottomLeftRadius = isUser ? '12px' : '2px';
    msg.style.maxWidth = '85%';
    msg.style.fontSize = '14px';
    msg.style.wordBreak = 'break-word';
    msg.innerHTML = text.replace(/\n/g, '<br>');
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  async function handleSend() {
    const text = input.value.trim();
    if (!text) return;

    appendMessage(text, true);
    input.value = '';

    // Typing indicator
    const typing = document.createElement('div');
    typing.style.alignSelf = 'flex-start';
    typing.style.fontSize = '12px';
    typing.style.color = 'var(--text-muted, #888)';
    typing.textContent = 'Groq is thinking...';
    messages.appendChild(typing);
    messages.scrollTop = messages.scrollHeight;

    try {
      const res = await fetch('/api/groq-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });

      typing.remove();

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'API Error');
      }

      const data = await res.json();
      appendMessage(data.reply, false);
    } catch (err) {
      typing.remove();
      appendMessage(
        `**Error:** ${err.message}. \n\nPlease ensure you have added GROQ_API_KEY in the frontend .env file and restarted the Vite server.`,
        false
      );
      showToast('Groq API Error: ' + err.message, 'error');
    }
  }

  sendBtn.addEventListener('click', handleSend);
  input.addEventListener('keypress', e => {
    if (e.key === 'Enter') handleSend();
  });
}
