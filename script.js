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

  // Social links
  document.querySelector('a[title="LinkedIn"]').href = emp.linkedin || '#';
  document.querySelector('a[title="Facebook"]').href = emp.facebook || '#';
  document.querySelector('a[title="Instagram"]').href = emp.instagram || '#';
}

document.addEventListener('DOMContentLoaded', loadEmployee);
