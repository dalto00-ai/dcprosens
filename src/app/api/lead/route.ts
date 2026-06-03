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

        // Local paths setup
        const dirPath = path.join(process.cwd(), 'src/lib');
        const filePath = path.join(dirPath, 'leads.json');

        // Verify dir exists
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        let leads = [];
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
        
        // Write to local json file
        fs.writeFileSync(filePath, JSON.stringify(leads, null, 2), 'utf8');

        return NextResponse.json({ success: true });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erro Interno no Servidor';
        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }
}
