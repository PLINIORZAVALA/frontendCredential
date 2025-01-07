document.addEventListener('DOMContentLoaded', () => {
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
        }
    ];

    // Crear Credencial
    const createForm = document.getElementById('createCredentialForm');
    if (createForm) {
        createForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const degree = document.getElementById('degree').value;
            const issuer = document.getElementById('issuer').value;
            const validFrom = document.getElementById('validFrom').value;
            const validUntil = document.getElementById('validUntil').value;

            const newCredential = {
                code: `CODE${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
                issuer,
                validFrom,
                validUntil,
                subject: { name, degree }
            };

            mockCredentials.push(newCredential);

            document.getElementById('credentialOutput').textContent = JSON.stringify(newCredential, null, 2);
        });
    }

    // Verificar Credencial
    const verifyForm = document.getElementById('verifyCredentialForm');
    if (verifyForm) {
        verifyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const code = document.getElementById('credentialCode').value.trim();
            const credential = mockCredentials.find(cred => cred.code === code);

            if (credential) {
                const now = new Date();
                const validFrom = new Date(credential.validFrom);
                const validUntil = new Date(credential.validUntil);
                const isValid = now >= validFrom && now <= validUntil;

                document.getElementById('verificationResult').textContent = `
                Código: ${credential.code}
                Titular: ${credential.subject.name}
                Título: ${credential.subject.degree}
                Emisor: ${credential.issuer}
                Estado: ${isValid ? 'Válida ✅' : 'Inválida ❌'}
                `;
            } else {
                document.getElementById('verificationResult').textContent = "Credencial no encontrada ❌";
            }
        });
    }

    // Visualizar Credenciales
    const credentialList = document.getElementById('credentialList');
    if (credentialList) {
        credentialList.innerHTML = mockCredentials.map(cred => `
            <div class="credential">
                <p><strong>Código:</strong> ${cred.code}</p>
                <p><strong>Titular:</strong> ${cred.subject.name}</p>
                <p><strong>Título:</strong> ${cred.subject.degree}</p>
                <p><strong>Emisor:</strong> ${cred.issuer}</p>
            </div>
        `).join('');
    }
});
