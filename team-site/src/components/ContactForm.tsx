// AI-REVIEW-MARKER: participant must manually remove this marker
import { useState } from 'react';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const formData = new FormData(e.currentTarget);
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    if (accessKey) {
      formData.append('access_key', accessKey);
    }

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      const data = await res.json();
      setStatus(data.success ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" required placeholder="Your name" />
      <input type="email" name="email" required placeholder="Your email" />
      <textarea name="message" required placeholder="How can we help?" />
      <button type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send'}
      </button>
      {status === 'sent' && <p>Thanks — we got your message.</p>}
      {status === 'error' && <p>Something went wrong, please try again.</p>}
    </form>
  );
}