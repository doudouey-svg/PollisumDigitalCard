let currentEmployee = null;
async function loadEmployee() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get('id'); // Now expects a token
  
  if (!token) {
    document.body.innerHTML = `<h2>Invalid access</h2>`;
    return;
  }
  
  const response = await fetch('employees.json');
  const employees = await response.json();
  
  // Find employee by token instead of id
  const emp = employees.find(e => e.token === token);
  
  if (!emp) {
    document.body.innerHTML = `<h2>Employee not found</h2>`;
    return;
  }
  // Store current employee for vCard generation
  currentEmployee = emp;
  // Profile picture - use default if not provided
  const profileImg = document.querySelector('.profile-img');
  profileImg.src = emp.photo || 'assets/pictures/default-profile.png';
  document.querySelector('.name').textContent = emp.name;
  document.querySelector('.title').textContent = emp.title;
  // Email - hide if blank
  const emailItem = document.getElementById('email-item');
  if (emp.email) {
    emailItem.style.display = 'flex';
    document.querySelector('.info-value a[href^="mailto"]').textContent = emp.email;
    document.querySelector('.info-value a[href^="mailto"]').href = `mailto:${emp.email}`;
  } else {
    emailItem.style.display = 'none';
  }
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
document.addEventListener('DOMContentLoaded', loadEmployee);
