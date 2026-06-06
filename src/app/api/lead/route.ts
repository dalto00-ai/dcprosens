import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, game } = body;

        // Validation
        if (!name || !email || !game) {
            return NextResponse.json(
                { error: 'Todos os campos são obrigatórios' },
                { status: 400 }
            );
        }

        // Email regex check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Formato de e-mail inválido' },
                { status: 400 }
            );
        }

        // Reject obviously abusive payloads (bots posting huge strings)
        if (name.length > 120 || email.length > 254 || String(game).length > 60) {
            return NextResponse.json(
                { error: 'Campo excede o tamanho máximo permitido' },
                { status: 400 }
            );
        }

        // Local paths setup
        const dirPath = path.join(process.cwd(), 'src/lib');
        const filePath = path.join(dirPath, 'leads.json');
        const tmpPath = path.join(dirPath, `leads.${process.pid}.${Date.now()}.tmp`);

        // Verify dir exists
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        let leads: Array<{ name: string; email: string; game: string; timestamp: string }> = [];
        if (fs.existsSync(filePath)) {
            try {
                const fileData = fs.readFileSync(filePath, 'utf8');
                leads = JSON.parse(fileData || '[]');
            } catch (e) {
                // If corrupted file, reset to empty
                leads = [];
            }
        }

        // Build new lead object
        const newLead = {
            name: name.trim(),
            email: email.trim().toLowerCase(),
            game,
            timestamp: new Date().toISOString()
        };

        leads.push(newLead);

        // Bound file growth: keep only the most recent entries.
        // NOTE: this file lives on local disk — it is reset on every redeploy
        // in containerized/standalone environments. Treat it as a temporary
        // buffer, not a source of truth; export it regularly or replace it
        // with a real datastore/email provider before relying on it.
        const MAX_LEADS = 5000;
        if (leads.length > MAX_LEADS) {
            leads = leads.slice(leads.length - MAX_LEADS);
        }

        // Atomic write: write to a temp file then rename over the target so a
        // crash or concurrent request never leaves leads.json truncated/corrupt.
        fs.writeFileSync(tmpPath, JSON.stringify(leads, null, 2), 'utf8');
        fs.renameSync(tmpPath, filePath);

        return NextResponse.json({ success: true });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erro Interno no Servidor';
        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }
}
