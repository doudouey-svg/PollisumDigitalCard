let currentEmployee = null;

async function loadEmployee() {
  const params = new URLSearchParams(window.location.search);
  const employeeId = params.get('id') || 'samantha'; // default
  
  const response = await fetch('employees.json');
  const employees = await response.json();
  const emp = employees.find(e => e.id === employeeId);
  
  if (!emp) {
    document.body.innerHTML = `<h2>Employee not found</h2>`;
    return;
  }

  // Store current employee for vCard generation
  currentEmployee = emp;

  document.querySelector('.profile-img').src = emp.photo;
  document.querySelector('.name').textContent = emp.name;
  document.querySelector('.title').textContent = emp.title;
  document.querySelector('.info-value a[href^="mailto"]').textContent = emp.email;
  document.querySelector('.info-value a[href^="mailto"]').href = `mailto:${emp.email}`;
  document.querySelector('.info-value a[href^="tel"]').textContent = emp.phone;
  document.querySelector('.info-value a[href^="tel"]').href = `tel:${emp.phone}`;
  document.querySelector('.info-value a[href^="https"]').textContent = new URL(emp.website).hostname;
  document.querySelector('.info-value a[href^="https"]').href = emp.website;

  // Location
  const locationLink = document.querySelector('.info-item .info-value a[href*="maps"]');
  locationLink.textContent = emp.location;

  // Personal LinkedIn - only show if exists
  const personalLinkedInItem = document.getElementById('personal-linkedin-item');
  if (emp.personalLinkedIn) {
    personalLinkedInItem.style.display = 'flex';
    document.getElementById('personal-linkedin').href = emp.personalLinkedIn;
    document.getElementById('personal-linkedin').textContent = 'View Profile';
  } else {
    personalLinkedInItem.style.display = 'none';
  }

  // Social links - hide if empty
  const linkedInBtn = document.querySelector('a[title="LinkedIn"]');
  const facebookBtn = document.querySelector('a[title="Facebook"]');
  const instagramBtn = document.querySelector('a[title="Instagram"]');

  if (emp.linkedin) {
    linkedInBtn.href = emp.linkedin;
    linkedInBtn.style.display = 'flex';
  } else {
    linkedInBtn.style.display = 'none';
  }

  if (emp.facebook) {
    facebookBtn.href = emp.facebook;
    facebookBtn.style.display = 'flex';
  } else {
    facebookBtn.style.display = 'none';
  }

  if (emp.instagram) {
    instagramBtn.href = emp.instagram;
    instagramBtn.style.display = 'flex';
  } else {
    instagramBtn.style.display = 'none';
  }
}

// Download vCard function
function downloadVCard() {
  if (!currentEmployee) return;
  
  const emp = currentEmployee;
  const [firstName, ...lastNameParts] = emp.name.split(' ');
  const lastName = lastNameParts.join(' ');
  
  let vCard = `BEGIN:VCARD
VERSION:3.0
FN:${emp.name}
N:${lastName};${firstName};;;
TITLE:${emp.title}
EMAIL:${emp.email}
TEL:${emp.phone}
URL:${emp.website}
ADR;TYPE=WORK:;;${emp.location};;;;`;

  // Add personal LinkedIn to vCard if exists
  if (emp.personalLinkedIn) {
    vCard += `\nURL;TYPE=LinkedIn:${emp.personalLinkedIn}`;
  }

  // Add photo URL if provided
  if (emp.photo) {
    const photoUrl = `${window.location.origin}/${window.location.pathname.replace('index.html', '')}${emp.photo}`;
    vCard += `\nPHOTO;VALUE=URL;TYPE=JPEG:${photoUrl}`;
  }

  // Add Google Maps URL
  vCard += `\nNOTE:Location: https://www.google.com/maps/place/Pollisum+Engineering+Pte+Ltd/@1.4697222,103.8085362,17z/`;

  vCard += `\nEND:VCARD`;

  // Create blob and download
  const blob = new Blob([vCard], { type: 'text/vcard' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${emp.name.replace(/ /g, '_')}.vcf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

document.addEventListener('DOMContentLoaded', loadEmployee);
