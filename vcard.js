
// vCard Configuration
const vcardData = {
    firstName: 'John',
    lastName: 'Doe',
    fullName: 'John Doe',
    title: 'Software Developer',
    email: 'john.doe@email.com',
    phone: '+1234567890',
    website: 'https://johndoe.com',
    address: 'Singapore',
    // Social Media (optional)
    linkedin: 'https://linkedin.com/in/johndoe',
    github: 'https://github.com/johndoe',
    twitter: 'https://twitter.com/johndoe'
};

// Function to generate and download vCard
function downloadVCard() {
    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${vcardData.fullName}
N:${vcardData.lastName};${vcardData.firstName};;;
TITLE:${vcardData.title}
EMAIL:${vcardData.email}
TEL:${vcardData.phone}
URL:${vcardData.website}
ADR:;;${vcardData.address};;;;
END:VCARD`;

    // Create blob and download
    const blob = new Blob([vCard], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${vcardData.firstName}_${vcardData.lastName}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
}
