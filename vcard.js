// Fetch employee data from employees.json
async function getEmployeeData() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get('id'); // Now expects a token
  
  const response = await fetch('employees.json');
  const employees = await response.json();
  
  // Find employee by token instead of id
  const emp = employees.find(e => e.token === token);
  return emp;
}

// Convert image URL to Base64
async function imageUrlToBase64(url) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result;
        const base64 = dataUrl.split(',')[1]; // remove prefix
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (e) {
    console.error('Error converting image:', e);
    return '';
  }
}

// Main vCard generator
async function downloadVCard() {
  const emp = await getEmployeeData();
  if (!emp) {
    alert('Employee not found');
    return;
  }

  let vCard = `BEGIN:VCARD
VERSION:3.0
FN:${emp.name} (Pollisum)
N:${emp.name.split(' ').slice(-1)[0]} (Pollisum);${emp.name.split(' ')[0]};;;
TITLE:${emp.title}`;

  // Add email only if it exists
  if (emp.email) {
    vCard += `\nEMAIL;TYPE=WORK:${emp.email}`;
  }

  vCard += `\nTEL;TYPE=WORK,VOICE:${emp.phone}
URL;TYPE=WORK:${emp.website}
ADR;TYPE=WORK:;;${emp.location};;;;`;

  // Add personal LinkedIn if exists
  if (emp.personalLinkedIn) {
    vCard += `\nitem1.URL;type=pref:${emp.personalLinkedIn}`;
    vCard += `\nitem1.X-ABLabel:LinkedIn`;
  }

  // Add photo as base64
  const photoBase64 = await imageUrlToBase64(emp.photo);
  if (photoBase64) {
    vCard += `\nPHOTO;ENCODING=b;TYPE=JPEG:${photoBase64}`;
  }

  vCard += `\nEND:VCARD`;

  const blob = new Blob([vCard], { type: 'text/vcard' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${emp.name.replace(/\s+/g, '_')}.vcf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
