document.addEventListener('DOMContentLoaded', () => {
    // Lista de credenciales simuladas
    const mockCredentials = [
        {
            code: "ABC123",
            issuer: "Universidad Ejemplo",
            validFrom: "2025-01-01T00:00:00Z",
            validUntil: "2026-01-01T00:00:00Z",
            subject: {
                name: "Juan Pérez",
                degree: "Licenciatura en Ciencias y Artes"
            }
        },
        {
            code: "XYZ789",
            issuer: "Instituto Tecnológico",
            validFrom: "2024-06-15T00:00:00Z",
            validUntil: "2025-06-15T00:00:00Z",
            subject: {
                name: "María García",
                degree: "Maestría en Ingeniería"
            }
        }
    ];

    // Verificar credencial con código
    const verifyForm = document.getElementById('verifyCredentialForm');
    if (verifyForm) {
        verifyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const code = document.getElementById('credentialCode').value.trim();

            // Buscar credencial por código
            const credential = mockCredentials.find(cred => cred.code === code);

            // Verificar validez
            if (credential) {
                const now = new Date();
                const validFrom = new Date(credential.validFrom);
                const validUntil = new Date(credential.validUntil);
                const isValid = now >= validFrom && now <= validUntil;

                const result = `
                Código: ${credential.code}
                Titular: ${credential.subject.name}
                Título: ${credential.subject.degree}
                Emisor: ${credential.issuer}
                Estado: ${isValid ? 'Válida ✅' : 'Inválida ❌'}
                `;

                document.getElementById('verificationResult').textContent = result;
            } else {
                document.getElementById('verificationResult').textContent = "Credencial no encontrada ❌";
            }
        });
    }
});
