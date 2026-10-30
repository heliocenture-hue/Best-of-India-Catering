import fs from 'fs';
import path from 'path';

export interface LeadPayload {
  fullName: string;
  phone: string;
  email?: string;
  eventType: string;
  eventDate?: string;
  guestCount?: string;
  eventLocation?: string;
  cateringPreference?: string;
  message?: string;
  sourceForm: 'hero' | 'contact';
  language: 'fr' | 'en';
  campaign?: string;
  landingPagePath?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  referrer?: string;
  consentGiven: boolean;
  honeypot?: string; // bot protection
}

export interface StoredLead extends LeadPayload {
  id: string;
  createdAt: string;
  clientIp?: string;
  userAgent?: string;
}

const LEADS_DIR = path.join(process.cwd(), 'data', 'leads');

function ensureDirectoryExists() {
  if (!fs.existsSync(LEADS_DIR)) {
    fs.mkdirSync(LEADS_DIR, { recursive: true });
  }
}

export async function processAndSaveLead(
  payload: LeadPayload,
  clientIp?: string,
  userAgent?: string
): Promise<{ success: boolean; leadId: string; error?: string }> {
  // 1. Bot check: honeypot field must be empty
  if (payload.honeypot && payload.honeypot.trim().length > 0) {
    console.warn('[Lead rejected: Bot trap triggered]');
    return { success: false, leadId: '', error: 'Spam detected' };
  }

  // 2. Server validation
  if (!payload.fullName || payload.fullName.trim().length < 2) {
    return { success: false, leadId: '', error: 'Full name is required' };
  }
  if (!payload.phone || payload.phone.trim().length < 6) {
    return { success: false, leadId: '', error: 'Valid phone number is required' };
  }
  if (!payload.eventType || payload.eventType.trim().length === 0) {
    return { success: false, leadId: '', error: 'Event type is required' };
  }

  const leadId = `boi_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const storedLead: StoredLead = {
    ...payload,
    id: leadId,
    createdAt: new Date().toISOString(),
    clientIp: clientIp || 'unknown',
    userAgent: userAgent || 'unknown',
  };

  try {
    ensureDirectoryExists();
    const filePath = path.join(LEADS_DIR, `${leadId}.json`);
    fs.writeFileSync(filePath, JSON.stringify(storedLead, null, 2), 'utf-8');

    // Also append to a daily master ledger for easy backup & export
    const today = new Date().toISOString().slice(0, 10);
    const ledgerPath = path.join(LEADS_DIR, `leads-${today}.jsonl`);
    fs.appendFileSync(ledgerPath, JSON.stringify(storedLead) + '\n', 'utf-8');

    console.log(`[Lead Saved] ID: ${leadId} | Name: ${storedLead.fullName} | Event: ${storedLead.eventType}`);

    // Dispatch webhook to CRM / Zapier / Make if configured
    if (process.env.LEAD_NOTIFICATION_WEBHOOK_URL) {
      try {
        await fetch(process.env.LEAD_NOTIFICATION_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(storedLead),
        });
      } catch (webhookErr) {
        console.error('[Webhook Dispatch Error]', webhookErr);
      }
    }

    return { success: true, leadId };
  } catch (err: unknown) {
    console.error('[Lead Storage Error]', err);
    return {
      success: false,
      leadId: '',
      error: 'Failed to persist lead on server. Please try again or call us directly.',
    };
  }
}

