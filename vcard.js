// vCard Configuration
const vcardData = {
    firstName: 'Samantha',
    lastName: 'Lee',
    fullName: 'Samantha Lee',
    title: 'Technology Development Manager',
    email: 'samantha@pollisum.com',
    phone: '+65 91377584',
    website: 'https://pollisum.com',
    address: 'Singapore',
    // Full address details (optional - customize as needed)
    streetAddress: '41 Senoko Way',
    city: 'Singapore',
    state: '',
    postalCode: '758053',
    country: 'Singapore',
    // Google Maps URL for location
    mapsUrl: 'https://www.google.com/maps/place/Pollisum+Engineering+Pte+Ltd/@1.4697222,103.8085362,17z/',
    // Profile picture URL (optional - leave empty string if no photo)
    // Upload your image to GitHub and use the raw URL
    photoUrl: 'https://raw.githubusercontent.com/doudouey-svg/PollisumDigitalCard/main/assets/Samantha.jpeg',
    // Social Media (optional)
    linkedin: 'https://www.linkedin.com/company/pollisum-engineering-pte-ltd',
};

// Function to generate and download vCard
function downloadVCard() {
    let vCard = `BEGIN:VCARD
VERSION:3.0
FN:${vcardData.fullName}
N:${vcardData.lastName};${vcardData.firstName};;;
TITLE:${vcardData.title}
EMAIL:${vcardData.email}
TEL:${vcardData.phone}
URL:${vcardData.website}
ADR;TYPE=WORK:;;${vcardData.streetAddress};${vcardData.city};${vcardData.state};${vcardData.postalCode};${vcardData.country}`;

    // Add photo URL if provided
    if (vcardData.photoUrl) {
        vCard += `\nPHOTO;VALUE=URL;TYPE=JPEG:${vcardData.photoUrl}`;
    }

    // Add Google Maps URL as a note with the address
    if (vcardData.mapsUrl) {
        vCard += `\nNOTE:Location: ${vcardData.mapsUrl}`;
    }

    vCard += `\nEND:VCARD`;

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
