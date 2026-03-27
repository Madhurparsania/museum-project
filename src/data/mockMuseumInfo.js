export const museums = [
    {
        id: 'visvesvaraya',
        name: 'Visvesvaraya Industrial & Technological Museum',
        shortName: 'Visvesvaraya Museum',
        tagline: 'Where Science Comes Alive',
        emoji: '🔬',
        description: 'One of the most popular science museums in India, named after Sir M. Visvesvaraya. It features interactive exhibits on engines, space, electricity, and biotechnology, making science fun and accessible for all ages.',
        history: 'Established in 1962, this museum is a constituent unit of the National Council of Science Museums (NCSM). Named after the legendary engineer and Bharat Ratna awardee Sir M. Visvesvaraya, it has inspired millions of young minds through interactive science exhibits.',
        galleries: [
            { id: 1, name: 'Engine Hall', description: 'Steam engines, vintage automobiles, and mechanical marvels from the industrial age.', image: '⚙️', items: 200 },
            { id: 2, name: 'Space Technology', description: 'Models of rockets, satellites, and interactive displays on ISRO achievements.', image: '🚀', items: 150 },
            { id: 3, name: 'Electrotechnic Gallery', description: 'Fascinating demonstrations of electricity, magnetism, and electronics.', image: '⚡', items: 180 },
            { id: 4, name: 'Biotechnology Gallery', description: 'DNA models, genetic engineering exhibits, and biotech innovations.', image: '🧬', items: 120 },
            { id: 5, name: 'Fun Science', description: 'Hands-on interactive exhibits that make physics and chemistry exciting for kids.', image: '🎯', items: 250 },
        ],
        events: [
            { id: 1, title: 'Science Demo Show', date: 'Every Saturday', time: '11:00 AM & 3:00 PM', description: 'Live science demonstrations and experiments for all ages.', price: 'Included with entry' },
            { id: 2, title: '3D Movie Screening', date: 'Daily', time: '12:00 PM & 4:00 PM', description: 'Immersive 3D movies on science and space topics.', price: '₹30' },
            { id: 3, title: 'Robotics Workshop', date: 'First Sunday of month', time: '10:00 AM - 1:00 PM', description: 'Build and program your own robot in this hands-on workshop.', price: '₹500' },
        ],
        visitingHours: { regular: '10:00 AM - 5:30 PM', weekend: '10:00 AM - 6:00 PM', closed: 'Monday & Public Holidays', lastEntry: '30 minutes before closing', specialNote: '' },
        rules: ['Photography allowed in most galleries', 'No food or beverages inside galleries', 'Children under 10 must be accompanied by adults', 'Do not touch exhibits unless marked interactive', 'Maintain silence during 3D shows'],
        ticketCategories: [
            { id: 'adult', name: 'Adult', price: 75, description: 'Ages 18+' },
            { id: 'child', name: 'Child', price: 30, description: 'Ages 5-17' },
            { id: 'student', name: 'Student Group', price: 20, description: 'School groups (min 20)' },
            { id: 'foreigner', name: 'Foreign National', price: 250, description: 'International visitors' },
        ],
        timeSlots: [
            { id: 'slot1', time: '10:00 AM - 11:30 AM', maxCapacity: 300 },
            { id: 'slot2', time: '11:30 AM - 1:00 PM', maxCapacity: 300 },
            { id: 'slot3', time: '1:00 PM - 2:30 PM', maxCapacity: 250 },
            { id: 'slot4', time: '2:30 PM - 4:00 PM', maxCapacity: 300 },
            { id: 'slot5', time: '4:00 PM - 5:30 PM', maxCapacity: 250 },
        ],
        contact: { address: 'Kasturba Road, Bengaluru - 560001', phone: '+91-80-2286-4563', email: 'info@vismuseum.gov.in', website: 'www.vismuseum.gov.in' },
        rating: 4.5,
        totalVisitors: '5M+',
    },
    {
        id: 'hal-aerospace',
        name: 'HAL Aerospace Museum',
        shortName: 'HAL Aerospace Museum',
        tagline: 'India\'s Aviation Legacy',
        emoji: '✈️',
        description: 'The HAL Heritage Centre and Aerospace Museum showcases India\'s aviation history with real aircraft, engines, flight simulators, and the story of Hindustan Aeronautics Limited (HAL).',
        history: 'Inaugurated in 2001 by HAL, this museum chronicles India\'s aerospace journey from the early 1940s. It features decommissioned aircraft, helicopters, and engines that served the Indian Air Force and civilian aviation.',
        galleries: [
            { id: 1, name: 'Aircraft Display', description: 'Real fighter jets, helicopters, and transport aircraft on outdoor display.', image: '🛩️', items: 18 },
            { id: 2, name: 'Engine Gallery', description: 'Aircraft engines from piston to turbofan, showcasing engineering evolution.', image: '⚙️', items: 25 },
            { id: 3, name: 'HAL Heritage Hall', description: 'Story of HAL from 1940s to present, including LCA Tejas development.', image: '🏭', items: 200 },
            { id: 4, name: 'Flight Simulator Zone', description: 'Experience flying in realistic flight simulators.', image: '🎮', items: 4 },
        ],
        events: [
            { id: 1, title: 'Model Aircraft Workshop', date: 'Last Saturday of month', time: '10:00 AM - 12:30 PM', description: 'Build and fly model aircraft under expert guidance.', price: '₹300' },
            { id: 2, title: 'Flight Simulator Experience', date: 'Daily', time: 'During museum hours', description: 'Fly a virtual aircraft in our advanced simulators.', price: '₹100' },
        ],
        visitingHours: { regular: '9:00 AM - 5:00 PM', weekend: '9:00 AM - 5:00 PM', closed: 'Monday & Last Tuesday of month', lastEntry: '4:30 PM', specialNote: '' },
        rules: ['Photography allowed in outdoor areas', 'No climbing on aircraft displays', 'Children under 10 must be accompanied', 'Follow safety instructions in simulator zone', 'No food inside exhibition halls'],
        ticketCategories: [
            { id: 'adult', name: 'Adult', price: 100, description: 'Ages 18+' },
            { id: 'child', name: 'Child', price: 50, description: 'Ages 3-17' },
            { id: 'senior', name: 'Senior Citizen', price: 50, description: 'Ages 60+' },
            { id: 'foreigner', name: 'Foreign National', price: 300, description: 'International visitors' },
        ],
        timeSlots: [
            { id: 'slot1', time: '9:00 AM - 10:30 AM', maxCapacity: 200 },
            { id: 'slot2', time: '10:30 AM - 12:00 PM', maxCapacity: 200 },
            { id: 'slot3', time: '12:00 PM - 1:30 PM', maxCapacity: 150 },
            { id: 'slot4', time: '1:30 PM - 3:00 PM', maxCapacity: 200 },
            { id: 'slot5', time: '3:00 PM - 5:00 PM', maxCapacity: 200 },
        ],
        contact: { address: 'HAL Old Airport Road, Marathahalli, Bengaluru - 560037', phone: '+91-80-2522-0584', email: 'museum@hal-india.co.in', website: 'www.hal-india.co.in' },
        rating: 4.3,
        totalVisitors: '3M+',
    },
    {
        id: 'science-gallery',
        name: 'Science Gallery Bengaluru',
        shortName: 'Science Gallery',
        tagline: 'Science Culture Experiment',
        emoji: '🧪',
        description: 'A unique public institution operating at the intersection of human, natural, and social sciences, engineering, and the arts. Established with the founding support of the Government of Karnataka, it hosts trans-disciplinary exhibitions, workshops, and public events.',
        history: 'Envisioned as Asia\'s first Science Gallery, it officially opened to the public in January 2024. It is part of the Global Science Gallery Network and aims to engage young adults and foster critical appreciation for science through open-ended experiments.',
        galleries: [
            { id: 1, name: 'Exhibition Galleries', description: 'Ever-changing, thematic exhibitions exploring humanity\'s relationship with the environment, culture, and science.', image: '🖼️', items: 20 },
            { id: 2, name: 'Public Lab Complex', description: 'Experimental spaces for intergenerational co-inquiry and workshops.', image: '🧬', items: 5 }
        ],
        events: [
            { id: 1, title: 'Trans-disciplinary Workshops', date: 'Varies', time: 'Varies', description: 'Interactive sessions blending art and science led by expert Mediators.', price: 'Free' },
            { id: 2, title: 'Guided Tour by Experimentors', date: 'Daily', time: 'During operating hours', description: 'Enriching insights discussed with trained young adults.', price: 'Free' }
        ],
        visitingHours: { regular: 'Wednesday, Thursday: 10:00 AM - 6:00 PM', weekend: 'Friday to Sunday: 10:00 AM - 8:00 PM', closed: 'Monday & Tuesday', lastEntry: '1 hour before closing', specialNote: 'No permanent collection, strictly thematic seasons.' },
        rules: ['Respect the experimental setups', 'Engage and ask questions to Mediators', 'Photography rules vary by exhibition season', 'Maintain general decorum'],
        ticketCategories: [
            { id: 'general', name: 'General Admission', price: 0, description: 'Free entry for all programs and exhibitions' }
        ],
        timeSlots: [
            { id: 'slot1', time: '10:00 AM - 12:00 PM', maxCapacity: 100 },
            { id: 'slot2', time: '12:00 PM - 2:00 PM', maxCapacity: 100 },
            { id: 'slot3', time: '2:00 PM - 4:00 PM', maxCapacity: 100 },
            { id: 'slot4', time: '4:00 PM - 6:00 PM', maxCapacity: 100 },
            { id: 'slot5', time: '6:00 PM - 8:00 PM (Fri-Sun ONLY)', maxCapacity: 100 }
        ],
        contact: { address: '10 - 11, Bellary Road, Sanjaynagar, Bengaluru - 560024', phone: '+91-80-0000-0000', email: 'info@sciencegallery.com', website: 'https://bengaluru.sciencegallery.com' },
        rating: 4.8,
        totalVisitors: '50K+',
    }
];

// Helper to find a museum by ID
export function getMuseumById(id) {
    return museums.find(m => m.id === id);
}
