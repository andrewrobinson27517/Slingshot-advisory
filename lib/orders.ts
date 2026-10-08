import { promises as fs } from 'node:fs';
import path from 'node:path';

/** Website-project order lifecycle. Persisted via dev file log (and/or webhook). */
export type OrderStatus =
  | 'pending_payment'
  | 'paid'
  | 'discovery_scheduled'
  | 'materials_received'
  | 'in_development'
  | 'review'
  | 'launched'
  | 'cancelled';

export type Order = {
  id: string;
  createdAt: string;
  updatedAt: string;
  packageId: string;
  packageName: string;
  totalCents: number;
  chargeNowCents: number;
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  existingWebsite: string;
  category: string;
  functionality: string;
  goal: string;
  status: OrderStatus;
  paymentStatus: 'unpaid' | 'paid';
  source: string;
};

const ORDERS_FILE = path.join(process.cwd(), '.orders', 'orders.jsonl');

/** Append-only dev persistence. Serverless filesystems are ephemeral; wire a
 *  database (Supabase/Postgres) or the LEAD_WEBHOOK_URL for durable storage. */
async function appendDev(order: Order): Promise<boolean> {
  if (process.env.NODE_ENV === 'production') return false;
  try {
    await fs.mkdir(path.dirname(ORDERS_FILE), { recursive: true });
    await fs.appendFile(ORDERS_FILE, JSON.stringify(order) + '\n', 'utf8');
    return true;
  } catch {
    return false;
  }
}

async function postWebhook(order: Order): Promise<boolean> {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return false;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ type: 'order', ...order }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function saveOrder(order: Order): Promise<{ dev: boolean; webhook: boolean }> {
  const [dev, webhook] = await Promise.all([appendDev(order), postWebhook(order)]);
  return { dev, webhook };
}

/** Read the latest state of an order from the dev log (dev only). */
export async function readOrder(id: string): Promise<Order | undefined> {
  try {
    const raw = await fs.readFile(ORDERS_FILE, 'utf8');
    let found: Order | undefined;
    for (const line of raw.split('\n')) {
      if (!line.trim()) continue;
      const o = JSON.parse(line) as Order;
      if (o.id === id) found = o;
    }
    return found;
  } catch {
    return undefined;
  }
}

export function newOrderId(): string {
  return `ord_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}
