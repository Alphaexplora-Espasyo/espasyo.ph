const fs = require('fs');

const dataRaw = fs.readFileSync('src/data/testimonials.json', 'utf8');
const data = JSON.parse(dataRaw);
const DEFAULT_PLACEHOLDER = "https://res.cloudinary.com/dlk93aehl/image/upload/Logo.png";

data.forEach(item => {
    // Rename placeholderImage to logo
    if ('placeholderImage' in item) {
        item.logo = item.placeholderImage;
        delete item.placeholderImage;
    }
    
    // Set default placeholder image
    item.placeholderImage = DEFAULT_PLACEHOLDER;

    // Specific business updates based on user notes
    if (item.businessName === "A. Valentin Construction") {
        item.testimonial = "Our Mission is to give our full potential, service, develop and building, To achieve space for every people worth living.";
        item.services = [
            "Supply of Labor and Materials in General Construction",
            "Civil/Structural Works",
            "Architectural Works",
            "Electrical, Plumbing, Fire Protection works"
        ];
        item.links = {
            ...item.links,
            address: "6 T. Bugallon Street, Marikina Heights, Marikina City",
            email: "avalentin_builders@yahoo.com, avalentin.construction@gmail.com",
            phone: "0926-7083787 (Globe) / 0961-0440138 (Smart)"
        };
    }

    if (item.businessName.includes("Shantal's Beauty and Wellness")) {
        item.businessName = "Shantal's Beauty and Wellness Products";
        item.testimonial = "Committed to enriching lives through wellness and beauty, our goal is to offer accessible and inventive solutions that foster self-care, confidence, and holistic health.";
        item.links = {
            ...item.links,
            address: "6 T Bugallon Marikina Heights Marikina City, Philippines",
            phone: "0927 132 6788",
            email: "shantalsbeautyandwellnesscorp@gmail.com"
        };
    }

    if (item.businessName === "SJB Ultimate Enterprises") {
        item.testimonial = "To deliver value through sustainable scrap management while promoting a cleaner and greener environment.";
        item.services = [
            "Collection and sorting of scrap materials",
            "Sale of processed materials to recycling companies and manufacturers",
            "Demolition and retrieving metal materials"
        ];
        item.links = {
            ...item.links,
            address: "6 T. Bugallon Street, Marikina Heights, Marikina City",
            phone: "0995 946 2609 / 0917 7940 084",
            office: "700-600-42"
        };
    }

    if (item.businessName.toLowerCase().includes("elenj consulting")) {
        item.testimonial = "ElenJ Consulting is a purpose-driven staffing and recruitment firm committed to connecting exceptional talent with organizations that value growth, impact, and people. With a strategic approach to hiring and a passion for empowering careers, we deliver smart, scalable solutions that help businesses thrive and individuals succeed.";
    }
});

fs.writeFileSync('src/data/testimonials.json', JSON.stringify(data, null, 2));
console.log("Migration complete.");
