document.getElementById('serviceRequestForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const name = document.getElementById('name').value;
    const familyName = document.getElementById('familyName').value;
    const birthDate = document.getElementById('birthDate').value;
    const identifierSystem = document.getElementById('identifierSystem').value;
    const identifierValue = document.getElementById('identifierValue').value;
    const email = document.getElementById('email').value;
    const laboratoryAnalysis = document.getElementById('laboratoryAnalysis').value


    // Crear el objeto Patient en formato FHIR
    const ServiceRequest = {
        "resourceType": "ServiceRequest",
        "id": "lab-order-001",
        "status": "active",
        "intent": "order",
        "priority": "routine",
        "code": {
          "coding": [
            {
              "system": "http://loinc.org",
              "code": "58410-2",
              "display": "Complete blood count (hemogram)"
            }
          ],
          "text": "Hemograma completo"
        },
        "subject": {
          "reference": "Patient/12345",
          "display": "Juan Carlos Pérez"
        },
        "requester": {
          "reference": "Practitioner/med-001",
          "display": "Dra. Carmen Morales"
        },
        "specimen": [
          {
            "reference": "Specimen/sp-001",
            "display": "Muestra de sangre venosa"
          }
        ],
        "authoredOn": "2025-04-05T09:45:00Z",
        "reasonCode": [
          {
            "text": "Fatiga persistente"
          }
        ],
        "note": [
          {
            "text": "Realizar en ayunas"
          }
        ],
        "supportingInfo": [
          {
            "reference": "Observation/obs-previous-001",
            "display": "Hemoglobina baja en control anterior"
          }
        ]
      };

    // Enviar los datos usando Fetch API
    fetch('https://hl7-fhir-ehr-Cristian2.onrender.com/patient', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(patient)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Paciente creado exitosamente!');
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Hubo un error al crear el paciente.');
    });
});