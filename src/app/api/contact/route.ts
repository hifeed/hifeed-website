import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, whatsapp, farmName, location, herdSize, feedType, dailyFeed } = body;

        if (!name || !whatsapp || !farmName || !location) {
            return NextResponse.json(
                { error: 'Nama, WhatsApp, Nama Peternakan, dan Lokasi wajib diisi' },
                { status: 400 }
            );
        }

        const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

        if (!SLACK_WEBHOOK_URL) {
            return NextResponse.json(
                { error: 'Konfigurasi Slack webhook belum diatur' },
                { status: 500 }
            );
        }

        const slackMessage = {
            text: "📩 Konsultasi Baru dari Website HiFeed",
            blocks: [
                {
                    type: "header",
                    text: {
                        type: "plain_text",
                        text: "📩 Konsultasi Baru dari Website www.hifeed.co",
                        emoji: true
                    }
                },
                {
                    type: "section",
                    fields: [
                        { type: "mrkdwn", text: `*Nama:*\n${name}` },
                        { type: "mrkdwn", text: `*WhatsApp:*\n${whatsapp}` }
                    ]
                },
                {
                    type: "section",
                    fields: [
                        { type: "mrkdwn", text: `*Peternakan:*\n${farmName}` },
                        { type: "mrkdwn", text: `*Lokasi:*\n${location}` }
                    ]
                },
                ...(herdSize || feedType || dailyFeed ? [{
                    type: "section" as const,
                    fields: [
                        ...(herdSize ? [{ type: "mrkdwn" as const, text: `*Populasi Ternak:*\n${herdSize}` }] : []),
                        ...(feedType ? [{ type: "mrkdwn" as const, text: `*Pakan Digunakan:*\n${feedType}` }] : []),
                        ...(dailyFeed ? [{ type: "mrkdwn" as const, text: `*Konsumsi Pakan/Hari/Sapi:*\n${dailyFeed} kg` }] : []),
                    ]
                }] : []),
                { type: "divider" },
                {
                    type: "context",
                    elements: [
                        {
                            type: "mrkdwn",
                            text: `*Status:* 🔴 Baru  |  *Tips:* React dengan 👀 jika sedang diproses, dan ✅ jika selesai.`
                        }
                    ]
                },
                {
                    type: "context",
                    elements: [
                        {
                            type: "mrkdwn",
                            text: `Dikirim pada: ${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}`
                        }
                    ]
                }
            ]
        };

        const slackResponse = await fetch(SLACK_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(slackMessage),
        });

        if (!slackResponse.ok) {
            console.error('Slack webhook error:', slackResponse.status);
            return NextResponse.json(
                { error: 'Gagal mengirim ke Slack' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Contact API error:', error);
        return NextResponse.json(
            { error: 'Terjadi kesalahan server' },
            { status: 500 }
        );
    }
}
