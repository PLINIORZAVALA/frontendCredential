document.addEventListener('DOMContentLoaded', () => {
    const mockCredentials = [
        {
            "@context": [
                "https://www.w3.org/ns/credentials/v2",
                "https://www.w3.org/ns/credentials/examples/v2"
            ],
            "id": "http://universidad.ejemplo/credenciales/58473",
            "tipo": ["CredencialVerificable", "CredencialExampleAlumni"],
            "emisor": "did:ejemplo:2g55q912ec3476eba2l9812ecbfe",
            "validFrom": "2025-01-01T00:00:00Z",
            "asuntoCredencial": {
                "id": "did:ejemplo:ebfeb1f712ebc6f1c276e12ec21",
                "exalumnoDe": {
                    "id": "did:ejemplo:c276e12ec21ebfeb1f712ebc6f1",
                    "nombre": "Universidad Ejemplo"
                }
            }
        }
    ];

    // Crear Credencial
    const createForm = document.getElementById('createCredentialForm');
    if (createForm) {
        createForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const issuer = document.getElementById('issuer').value;
            const validFrom = document.getElementById('validFrom').value;
            const validUntil = document.getElementById('validUntil').value || null;
            const universityName = document.getElementById('universityName').value;

            const newCredential = {
                "@context": [
                    "https://www.w3.org/ns/credentials/v2",
                    "https://www.w3.org/ns/credentials/examples/v2"
                ],
                "id": `http://universidad.ejemplo/credenciales/${Math.random().toString(36).substring(2, 8)}`,
                "tipo": ["CredencialVerificable", "CredencialExampleAlumni"],
                "emisor": issuer,
                "validFrom": validFrom,
                "validUntil": validUntil,
                "asuntoCredencial": {
                    "id": `did:ejemplo:${Math.random().toString(36).substring(2, 12)}`,
                    "exalumnoDe": {
                        "id": `did:ejemplo:${Math.random().toString(36).substring(2, 12)}`,
                        "nombre": universityName
                    }
                }
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
            const credentialId = document.getElementById('credentialId').value.trim();
            const credential = mockCredentials.find(cred => cred.id === credentialId);

            if (credential) {
                const now = new Date();
                const validFrom = new Date(credential.validFrom);
                const validUntil = credential.validUntil ? new Date(credential.validUntil) : null;
                const isValid = now >= validFrom && (!validUntil || now <= validUntil);

                document.getElementById('verificationResult').textContent = `
                ID: ${credential.id}
                Emisor: ${credential.emisor}
                Estado: ${isValid ? 'Válida ✅' : 'Inválida ❌'}
                Contexto: ${credential.asuntoCredencial.exalumnoDe.nombre}
                Titular DID: ${credential.asuntoCredencial.id}
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
                <p><strong>ID:</strong> ${cred.id}</p>
                <p><strong>Emisor:</strong> ${cred.emisor}</p>
                <p><strong>Contexto:</strong> ${cred.asuntoCredencial.exalumnoDe.nombre}</p>
            </div>
        `).join('');
    }
});
