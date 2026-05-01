import { NextRequest, NextResponse } from 'next/server'

interface OrderItem {
  name: string
  quantity: number
  price: number
  color: string
}

interface OrderData {
  // Contact
  firstName: string
  lastName: string
  email: string
  phone: string
  // Shipping
  address: string
  city: string
  state: string
  zip: string
  // Payment
  paymentMethod: 'cod' | 'vodafone_cash' | 'etisalat_cash'
  senderDetails?: string
  // Order
  items: OrderItem[]
  subtotal: number
  discount?: number
  couponCode?: string | null
  shipping: number
  total: number
  notes?: string
}

const PAYMENT_LABELS: Record<string, string> = {
  cod: '💵 Cash on Delivery',
  vodafone_cash: '🔴 Vodafone Cash',
  etisalat_cash: '🟢 Etisalat Cash',
}

async function sendTelegramMessage(text: string) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!botToken || !chatId) {
    console.error('Telegram credentials not configured')
    return false
  }

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: 'HTML',
        }),
      }
    )

    const data = await res.json()
    if (!data.ok) {
      console.error('Telegram API error:', data)
      return false
    }
    return true
  } catch (error) {
    console.error('Failed to send Telegram message:', error)
    return false
  }
}

function formatOrderMessage(order: OrderData): string {
  const itemsList = order.items
    .map(
      (item, i) =>
        `   ${i + 1}. ${item.name}\n      Qty: ${item.quantity} × EGP ${item.price.toFixed(2)} = EGP ${(item.quantity * item.price).toFixed(2)}${item.color ? `\n      Color: ${item.color}` : ''}`
    )
    .join('\n')

  const orderNumber = `RV-${Date.now().toString(36).toUpperCase()}`

  return `🛍️ <b>NEW ORDER — ${orderNumber}</b>

━━━━━━━━━━━━━━━━━━━━

👤 <b>Customer Info</b>
   Name: ${order.firstName} ${order.lastName}
   Email: ${order.email}
   Phone: ${order.phone}

📦 <b>Shipping Address</b>
   ${order.address}
   ${order.city}, ${order.state} ${order.zip}

💳 <b>Payment Method</b>
   ${PAYMENT_LABELS[order.paymentMethod] || order.paymentMethod}
   ${order.senderDetails ? `<b>Sender:</b> ${order.senderDetails}` : ''}

━━━━━━━━━━━━━━━━━━━━

🛒 <b>Order Items</b>
${itemsList}

━━━━━━━━━━━━━━━━━━━━

💰 Subtotal: EGP ${order.subtotal.toFixed(2)}
${order.discount && order.discount > 0 ? `🎟️ Discount: - EGP ${order.discount.toFixed(2)} ${order.couponCode ? `(Code: ${order.couponCode})` : ''}\n` : ''}🚚 Shipping: ${order.shipping === 0 ? 'FREE' : 'EGP ' + order.shipping.toFixed(2)}
<b>💎 Total: EGP ${order.total.toFixed(2)}</b>${order.notes ? `\n\n📝 Notes: ${order.notes}` : ''}

━━━━━━━━━━━━━━━━━━━━
⏰ ${new Date().toLocaleString('en-EG', { timeZone: 'Africa/Cairo' })}`
}

export async function POST(req: NextRequest) {
  try {
    const order: OrderData = await req.json()

    // Validate required fields
    if (
      !order.firstName ||
      !order.lastName ||
      !order.email ||
      !order.phone ||
      !order.address ||
      !order.city ||
      !order.paymentMethod ||
      !order.items?.length
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Format and send Telegram message
    const message = formatOrderMessage(order)
    const sent = await sendTelegramMessage(message)

    if (!sent) {
      console.warn('Telegram notification failed, but order is still processed')
    }

    const orderNumber = `RV-${Date.now().toString(36).toUpperCase()}`

    return NextResponse.json({
      success: true,
      orderNumber,
      message: 'Order placed successfully!',
    })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to process order' },
      { status: 500 }
    )
  }
}
