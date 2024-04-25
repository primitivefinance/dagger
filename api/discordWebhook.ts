export default async function handler(req, res) {
    if (req.method === 'POST') {
        const webhookURL = process.env.DISCORD_WEBHOOK_URL
        const { content } = req.body

        if (!webhookURL) {
            return res.status(500).json({ error: 'Webhook URL not configured' })
        }

        const discordResponse = await fetch(webhookURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content }),
        })

        if (!discordResponse.ok) {
            const data = await discordResponse.json()
            return res
                .status(400)
                .json({ error: `Failed to send message: ${data.message}` })
        }

        res.status(200).json({ message: 'Message sent!' })
    } else {
        res.status(405).end() // Method Not Allowed
    }
}
