// src/constants/homeData.ts

export const testimonialData = [
    { id: 'pic1', src: 'https://res.cloudinary.com/dlk93aehl/image/upload/v1774460460/Pic1.jpg', caption: "Opening Doors to Infinite Possibilities.", rotate: "rotate-[-2deg]" },
    { id: 'pic2', src: 'https://res.cloudinary.com/dlk93aehl/image/upload/v1774460460/Pic2.jpg', caption: "Laying the Foundation for Your Tomorrow.", rotate: "rotate-[1.5deg]" },
    { id: 'pic3', src: 'https://res.cloudinary.com/dlk93aehl/image/upload/v1774460460/Pic3.jpg', caption: "Built for Community, Designed for Success.", rotate: "rotate-[-1deg]" },
    { id: 'founder', src: 'https://res.cloudinary.com/dlk93aehl/image/upload/team.jpg', caption: "From IDEA to OPERATION, ESPASYO gives you the SPACE, SUPPORT, AND SYSTEM to SUCCEED.", rotate: "rotate-[-3deg]", isFounder: true },
    { id: 1, src: 'https://res.cloudinary.com/dlk93aehl/image/upload/1.jpg', caption: "Where Ambition Meets Opportunity.", rotate: "rotate-[1.5deg]" },
    { id: 2, src: 'https://res.cloudinary.com/dlk93aehl/image/upload/viber_image_2026-03-16_19-43-09-616.jpg', caption: "Empowering Entrepreneurs, Enabling Success.", rotate: "rotate-[-1deg]" },
    { id: 3, src: 'https://res.cloudinary.com/dlk93aehl/image/upload/viber_image_2026-03-16_19-44-21-936.jpg', caption: "Turning Vision into Enterprise.", rotate: "rotate-[2deg]" },
    { id: 4, src: 'https://res.cloudinary.com/dlk93aehl/image/upload/viber_image_2026-03-16_19-44-24-162.jpg', caption: "A HUB for Innovation, Collaboration, and Success.", rotate: "rotate-[-1.5deg]" },
    { id: 5, src: 'https://res.cloudinary.com/dlk93aehl/image/upload/viber_image_2026-03-16_19-44-24-631.jpg', caption: "From Home to CEO, we’ve got your SPACE.", rotate: "rotate-[1deg]" },
    { id: 6, src: 'https://res.cloudinary.com/dlk93aehl/image/upload/viber_image_2026-03-16_19-44-28-832.jpg', caption: "Empowering Business with Space, Solutions, and Support.", rotate: "rotate-[-2deg]" },
    { id: 8, src: 'https://res.cloudinary.com/dlk93aehl/image/upload/viber_image_2026-03-16_19-44-29-257.jpg', caption: "Espasyo is a Space for DREAMERS, DOERS, and ACHIEVERS. ", rotate: "rotate-[1.5deg]" },
    { id: 9, src: 'https://res.cloudinary.com/dlk93aehl/image/upload/viber_image_2026-03-16_19-44-29-668.jpg', caption: "ESPASYO— Where Business Grow Together!", rotate: "rotate-[-1deg]" },
    { id: 'viewall', src: null, caption: "VIEW ALL TESTIMONIALS", rotate: "rotate-0", isViewAll: true },
];

export const serviceCategories = [
    {
        id: 'workspace',
        title: 'Physical & Virtual Space',
        provider: 'Espasyo Coworking',
        bgText: 'WORKSPACE',
        image: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=800&q=80",
        description: "Flexible, inspiring environments designed for focus, collaboration, and finding your tribe.",
        services: [
            { title: "Coworking Desks", items: ["Shared desks", "Dedicated desks", "High-speed fiber internet"] },
            { title: "Private Offices", items: ["Fully furnished", "Conference Room", "Mail handling"] },
            { title: "Virtual Office", items: ["Professional business address", "Mail & package receiving", "Meeting room credits"] },
            { title: "Meeting & Event Spaces", items: ["Boardrooms", "Whiteboard", "A/V equipment included"] },
        ]
    },
    {
        id: 'it',
        title: 'Tech & Digital Solutions',
        provider: 'Alphaexplora Information Technology Services',
        providerLink: 'https://www.alphaexplora.com',
        bgText: 'TECHNOLOGY',
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Comprehensive digital solutions to power your business operations and scale your growth.",
        services: [
            {
                title: "Digital Foundation",
                items: ["Website Development", "E-commerce Solutions", "Custom Applications", "Search Engine Optimization"]
            },
            {
                title: "Traction & Growth",
                items: ["Social Media Marketing", "Lead Generation", "Data Insights", "Digital Transformation"]
            },
            {
                title: "Lean Operations",
                items: ["Workflow Automation", "Process Improvement", "Custom System Solutions", "Business Process Analysis"]
            },
            {
                title: "Managed Reliability",
                items: ["Managed Operations", "System Maintenance", "24/7 IT Helpdesk", "Security Audits"]
            }
        ]
    },
    {
        id: 'accounting',
        title: 'Accounting & Tax',
        provider: 'BORJAL-AMAHAN Tax and Accounting Services',
        bgText: 'ACCOUNTING',
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
        description: "Expert financial management, compliance, and advisory tailored for businesses and freelancers.",
        services: [
            { title: "Tax Compliance and Advisory", items: ["Preparation and filing of tax returns", "Tax compliance assistance", "Tax planning and advisory services", "BIR registration and updates", "Assist client with LOA"] },
            { title: "Accounting and Bookkeeping", items: ["Monthly bookkeeping services", "Financial statement preparation", "Accounting system setup and support", "Financial record organization"] },
            { title: "Business Registration and Compliance", items: ["Business registration with government agencies", "Assistance with regulatory compliance", "Business documentation and reporting support"] },
            { title: "Financial Guidance", items: ["Financial record analysis", "Basic financial advisory support for small businesses", "Assistance in financial organization and reporting"] },
            { title: "Value-Added Services", items: ["Documentation requirements and processing applications for Building Permits", "Assistance in securing Occupational Permits", "Facilitation of Land Title Transfer", "Processing and Documentation for SSS, Pag-ibig, Philhealth", "End-to End Business Compliance Assistance"] },
        ]
    }
];

export const marqueeText = Array(4).fill("COMMUNITY • WORK • CREATE • ");
