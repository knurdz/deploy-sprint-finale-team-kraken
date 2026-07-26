import { useState } from 'react';
import {
  Mail,
  User,
  MessageSquare,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  Headphones,
  Sparkles,
} from 'lucide-react';

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
    <div className="contactContainer">
      <div className="contactCard">
        <div className="contactInfoSidebar">
          <div className="contactBadge">
            <Sparkles size={14} />
            <span>24/7 Support Channel</span>
          </div>
          <h3>We're here to help</h3>
          <p>
            Have questions about your cohort, deadlines, or learning tracks? Send us a message and our support team will reach out.
          </p>

          <div className="contactMetrics">
            <div className="metricItem">
              <div className="metricIcon">
                <Clock size={18} />
              </div>
              <div>
                <strong>~2 Hours</strong>
                <span>Avg. Response Time</span>
              </div>
            </div>

            <div className="metricItem">
              <div className="metricIcon">
                <Headphones size={18} />
              </div>
              <div>
                <strong>LMS Specialists</strong>
                <span>Dedicated Assistance</span>
              </div>
            </div>

            <div className="metricItem">
              <div className="metricIcon">
                <Mail size={18} />
              </div>
              <div>
                <strong>Direct Channel</strong>
                <span>Instant Ticket Dispatch</span>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="contactFormElement">
          <div className="inputGroup">
            <label htmlFor="name-input">Full Name</label>
            <div className="inputWrapper">
              <User size={18} className="fieldIcon" />
              <input
                id="name-input"
                type="text"
                name="name"
                required
                placeholder="e.g. Alex Morgan"
                disabled={status === 'sending'}
              />
            </div>
          </div>

          <div className="inputGroup">
            <label htmlFor="email-input">Email Address</label>
            <div className="inputWrapper">
              <Mail size={18} className="fieldIcon" />
              <input
                id="email-input"
                type="email"
                name="email"
                required
                placeholder="alex@example.com"
                disabled={status === 'sending'}
              />
            </div>
          </div>

          <div className="inputGroup">
            <label htmlFor="message-input">Your Message</label>
            <div className="inputWrapper textareaWrapper">
              <MessageSquare size={18} className="fieldIcon fieldIconTop" />
              <textarea
                id="message-input"
                name="message"
                required
                rows={4}
                placeholder="How can we assist you with your sprint or modules?"
                disabled={status === 'sending'}
              />
            </div>
          </div>

          <button type="submit" className="submitBtn" disabled={status === 'sending'}>
            {status === 'sending' ? (
              <>
                <span className="spinnerIcon" />
                <span>Sending Message…</span>
              </>
            ) : (
              <>
                <span>Send Message</span>
                <Send size={16} />
              </>
            )}
          </button>

          {status === 'sent' && (
            <div className="statusAlert statusSuccess">
              <CheckCircle2 size={20} />
              <div>
                <strong>Message Sent Successfully!</strong>
                <p>Thanks for reaching out — our support team will get back to you shortly.</p>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="statusAlert statusError">
              <AlertCircle size={20} />
              <div>
                <strong>Something went wrong</strong>
                <p>Please check your connection or access key setup and try again.</p>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

//test comment