// ============================================================
// FILE: src/data/collegeData.js
// ACTION: REPLACE existing collegeData.js
// CASE 5 FINAL FIX: Google Favicon API gives REAL logos from
// each college's official domain — always works, never breaks
// ============================================================

const favicon = (domain) =>
  `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

export const COLLEGES = [
  {
    id: "iith", name: "IIT Hyderabad", shortName: "IITH", initials: "IH",
    location: "Sangareddy, Telangana", established: 2008, type: "Engineering & Technology",
    color: "#1e40af",
    logo: favicon("iith.ac.in"),
    banner: "https://images.unsplash.com/photo-1562774053-701939374585?w=900&q=80",
    description: "One of India's premier IITs, known for cutting-edge research and vibrant student-run technical events.",
    stats: { events: 24, registrations: "1.2k", rating: 4.2, totalRatings: 38 },
  },
  {
    id: "nitw", name: "NIT Warangal", shortName: "NITW", initials: "NW",
    location: "Warangal, Telangana", established: 1959, type: "Engineering & Technology",
    color: "#15803d",
    logo: favicon("nitw.ac.in"),
    banner: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=900&q=80",
    description: "One of the oldest NITs in India, celebrated for its technical fests and engineering excellence.",
    stats: { events: 31, registrations: "2.1k", rating: 4.4, totalRatings: 62 },
  },
  {
    id: "jntu", name: "JNTU Hyderabad", shortName: "JNTUH", initials: "JH",
    location: "Kukatpally, Hyderabad", established: 1972, type: "Engineering & Technology",
    color: "#b45309",
    logo: favicon("jntuh.ac.in"),
    banner: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=900&q=80",
    description: "Jawaharlal Nehru Technological University — one of the largest universities in India.",
    stats: { events: 18, registrations: "980", rating: 3.9, totalRatings: 44 },
  },
  {
    id: "bits", name: "BITS Pilani Hyd", shortName: "BITS", initials: "BP",
    location: "Shameerpet, Hyderabad", established: 2008, type: "Engineering & Sciences",
    color: "#7c3aed",
    logo: favicon("bits-pilani.ac.in"),
    banner: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=900&q=80",
    description: "BITS Pilani Hyderabad — known for PEARL, its annual technical and cultural fest.",
    stats: { events: 22, registrations: "1.5k", rating: 4.5, totalRatings: 71 },
  },
  {
    id: "iiith", name: "IIIT Hyderabad", shortName: "IIITH", initials: "IH",
    location: "Gachibowli, Hyderabad", established: 1998, type: "Information Technology",
    color: "#0e7490",
    logo: favicon("iiit.ac.in"),
    banner: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&q=80",
    description: "Research-driven institute focused on AI, ML and software innovation.",
    stats: { events: 19, registrations: "1.1k", rating: 4.6, totalRatings: 55 },
  },
  {
    id: "cbit", name: "CBIT Hyderabad", shortName: "CBIT", initials: "CB",
    location: "Gandipet, Hyderabad", established: 1979, type: "Engineering & Technology",
    color: "#be123c",
    logo: favicon("cbit.ac.in"),
    banner: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=900&q=80",
    description: "Top autonomous engineering college in Hyderabad with active technical clubs.",
    stats: { events: 15, registrations: "760", rating: 4.0, totalRatings: 33 },
  },
  {
    id: "vit", name: "VIT Vellore", shortName: "VIT", initials: "VT",
    location: "Vellore, Tamil Nadu", established: 1984, type: "Engineering & Technology",
    color: "#0369a1",
    logo: favicon("vit.ac.in"),
    banner: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=900&q=80",
    description: "Home to GRAVITAS, one of Asia's largest technical fests.",
    stats: { events: 28, registrations: "3.2k", rating: 4.3, totalRatings: 89 },
  },
  {
    id: "ou", name: "Osmania University", shortName: "OU", initials: "OU",
    location: "Hyderabad, Telangana", established: 1918, type: "Arts, Science & Engineering",
    color: "#92400e",
    logo: favicon("osmania.ac.in"),
    banner: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=900&q=80",
    description: "One of the oldest universities in India with a rich legacy of academic excellence.",
    stats: { events: 12, registrations: "540", rating: 3.8, totalRatings: 28 },
  },
];

export const CLUBS = [
  { id: "iith-ieee",    collegeId: "iith",  name: "IEEE Student Branch",  type: "technical",    icon: "⚡", color: "#1e40af", description: "Electronics and IoT hackathons, workshops and competitions.",    since: 2010, members: 320 },
  { id: "iith-coding",  collegeId: "iith",  name: "Coding Club",          type: "technical",    icon: "💻", color: "#0e7490", description: "Competitive programming, open source and hackathon culture.",   since: 2012, members: 280 },
  { id: "iith-robotics", collegeId: "iith", name: "Robotics Club",        type: "technical",    icon: "🤖", color: "#7c3aed", description: "Building autonomous robots and competing nationally.",          since: 2013, members: 150 },
  { id: "iith-nss",     collegeId: "iith",  name: "NSS Unit",             type: "nontechnical", icon: "🌱", color: "#15803d", description: "Community outreach, health camps and social events.",           since: 2009, members: 400 },
  { id: "iith-music",   collegeId: "iith",  name: "Music Club",           type: "nontechnical", icon: "🎵", color: "#be123c", description: "Classical and contemporary music performances.",                 since: 2011, members: 190 },
  { id: "nitw-acm",     collegeId: "nitw",  name: "ACM Student Chapter",  type: "technical",    icon: "🧠", color: "#1e40af", description: "Algorithms, research and competitive coding.",                  since: 2008, members: 350 },
  { id: "nitw-ai",      collegeId: "nitw",  name: "AI & ML Club",         type: "technical",    icon: "🤖", color: "#0e7490", description: "Machine learning, data science and AI research.",               since: 2018, members: 220 },
  { id: "nitw-nss",     collegeId: "nitw",  name: "NSS Unit",             type: "nontechnical", icon: "🌱", color: "#15803d", description: "Community service and social initiatives.",                     since: 2005, members: 500 },
  { id: "nitw-drama",   collegeId: "nitw",  name: "Drama Club",           type: "nontechnical", icon: "🎭", color: "#be123c", description: "Theatre, street plays and cultural performances.",               since: 2007, members: 160 },
  { id: "jntu-ieee",    collegeId: "jntu",  name: "IEEE Branch",          type: "technical",    icon: "⚡", color: "#1e40af", description: "Electronics and technology student chapter.",                    since: 2006, members: 290 },
  { id: "jntu-nss",     collegeId: "jntu",  name: "NSS Unit",             type: "nontechnical", icon: "🌱", color: "#15803d", description: "Social service and community outreach.",                         since: 2004, members: 600 },
  { id: "bits-apogee",  collegeId: "bits",  name: "APOGEE Tech Team",     type: "technical",    icon: "🚀", color: "#7c3aed", description: "Organizers of BITS Pilani's flagship technical fest.",           since: 2009, members: 200 },
  { id: "bits-dance",   collegeId: "bits",  name: "Dance Club",           type: "nontechnical", icon: "💃", color: "#be123c", description: "Classical, western and fusion dance performances.",              since: 2010, members: 180 },
  { id: "iiith-lambda", collegeId: "iiith", name: "Lambda Coding Club",   type: "technical",    icon: "λ",  color: "#0e7490", description: "Premier competitive programming and open source club.",         since: 2005, members: 310 },
  { id: "iiith-rc",     collegeId: "iiith", name: "Research Circle",      type: "technical",    icon: "🔬", color: "#1e40af", description: "Student-led research in AI, NLP and systems.",                  since: 2010, members: 140 },
  { id: "cbit-csea",    collegeId: "cbit",  name: "CSE Association",      type: "technical",    icon: "💻", color: "#1e40af", description: "CS department hackathons, workshops and seminars.",              since: 2011, members: 260 },
  { id: "cbit-nss",     collegeId: "cbit",  name: "NSS Unit",             type: "nontechnical", icon: "🌱", color: "#15803d", description: "Blood donation, awareness campaigns and volunteer drives.",      since: 2008, members: 350 },
  { id: "vit-gravitas", collegeId: "vit",   name: "GRAVITAS Core Team",   type: "technical",    icon: "🌐", color: "#0369a1", description: "Asia's largest student technical fest organising team.",         since: 2009, members: 400 },
  { id: "vit-rivaah",   collegeId: "vit",   name: "RIVAAAH Cultural",     type: "nontechnical", icon: "🎉", color: "#be123c", description: "VIT's cultural fest with music, dance and art events.",          since: 2010, members: 350 },
  { id: "ou-iste",      collegeId: "ou",    name: "ISTE Chapter",         type: "technical",    icon: "📐", color: "#b45309", description: "Indian Society for Technical Education student chapter.",        since: 2003, members: 220 },
  { id: "ou-nss",       collegeId: "ou",    name: "NSS Unit",             type: "nontechnical", icon: "🌱", color: "#15803d", description: "One of the oldest NSS units in Hyderabad.",                     since: 1975, members: 800 },
];

export const EVENTS = [
  { id: 1,  clubId: "iith-ieee",    collegeId: "iith",  title: "CircuitSpark 2025",       date: "Feb 12, 2025", duration: "2 days", category: "hackathon", status: "past",     description: "48-hour electronics and embedded systems hackathon — build IoT prototypes from scratch.", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80", pastImages: ["https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80","https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80","https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80"], rating: 4.8, reviews: 120, conductedSince: 2015, seats: null, reviews_list: [{ name: "Arjun K", rating: 5, comment: "Best circuit hackathon I've attended!", year: "3rd Year, ECE" },{ name: "Priya M", rating: 5, comment: "Amazing experience with real IoT hardware.", year: "2nd Year, EEE" }] },
  { id: 2,  clubId: "iith-ieee",    collegeId: "iith",  title: "TechTalk Webinar",        date: "May 20, 2026", duration: "3 hrs",  category: "webinar",   status: "upcoming", description: "Industry experts from Texas Instruments discuss embedded systems and VLSI design.", image: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?w=800&q=80", pastImages: ["https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80"], rating: null, reviews: 0, conductedSince: 2020, seats: 300, reviews_list: [] },
  { id: 3,  clubId: "iith-coding",  collegeId: "iith",  title: "AI Hackathon 2025",       date: "Mar 5, 2025",  duration: "48 hrs", category: "hackathon", status: "past",     description: "Build AI-powered solutions to real-world problems. Open to all engineering students.", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80", pastImages: ["https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80","https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80","https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80"], rating: 4.9, reviews: 210, conductedSince: 2016, seats: null, reviews_list: [{ name: "Sneha R", rating: 5, comment: "Incredible energy! Built an ML model for crop disease detection.", year: "3rd Year, CSE" },{ name: "Kiran P", rating: 5, comment: "Top-notch problem statements.", year: "4th Year, IT" }] },
  { id: 4,  clubId: "iith-coding",  collegeId: "iith",  title: "Web Dev Bootcamp",        date: "Jun 10, 2026", duration: "1 day",  category: "workshop",  status: "upcoming", description: "Full-stack web development with React and Node.js — hands-on and beginner-friendly.", image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&q=80", pastImages: [], rating: null, reviews: 0, conductedSince: 2019, seats: 80, reviews_list: [] },
  { id: 5,  clubId: "iith-nss",     collegeId: "iith",  title: "Green Campus Marathon",   date: "Jan 20, 2025", duration: "4 hrs",  category: "workshop",  status: "past",     description: "5km run around IITH campus promoting environmental awareness. Open to all.", image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80", pastImages: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80"], rating: 4.7, reviews: 190, conductedSince: 2012, seats: null, reviews_list: [{ name: "Divya L", rating: 5, comment: "Campus looked beautiful, energy was amazing!", year: "1st Year, Mech" }] },
  { id: 6,  clubId: "iith-nss",     collegeId: "iith",  title: "Blood Donation Drive",    date: "Jun 5, 2026",  duration: "1 day",  category: "workshop",  status: "upcoming", description: "Annual NSS blood donation camp in collaboration with local hospitals.", image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80", pastImages: [], rating: null, reviews: 0, conductedSince: 2010, seats: 200, reviews_list: [] },
  { id: 7,  clubId: "nitw-acm",     collegeId: "nitw",  title: "Technozion Hackathon",    date: "Mar 5, 2025",  duration: "36 hrs", category: "hackathon", status: "past",     description: "NITW's flagship ACM hackathon — solve national-level problem statements.", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80", pastImages: ["https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80","https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80"], rating: 4.7, reviews: 145, conductedSince: 2013, seats: null, reviews_list: [{ name: "Vikram N", rating: 5, comment: "Real-world problems and industry judges.", year: "4th Year, CSE" }] },
  { id: 8,  clubId: "nitw-acm",     collegeId: "nitw",  title: "Cybersecurity Webinar",   date: "May 28, 2026", duration: "2 hrs",  category: "webinar",   status: "upcoming", description: "Ethical hacking and cyber defence — led by CrowdStrike professionals.", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80", pastImages: [], rating: null, reviews: 0, conductedSince: 2021, seats: 500, reviews_list: [] },
  { id: 9,  clubId: "nitw-nss",     collegeId: "nitw",  title: "Village Adoption Drive",  date: "Dec 10, 2024", duration: "2 days", category: "workshop",  status: "past",     description: "NSS volunteers visit adopted villages near Warangal for health and education.", image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80", pastImages: ["https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80"], rating: 4.3, reviews: 67, conductedSince: 2006, seats: null, reviews_list: [{ name: "Lavanya T", rating: 5, comment: "Life-changing experience.", year: "2nd Year, Civil" }] },
  { id: 10, clubId: "bits-apogee",  collegeId: "bits",  title: "PEARL Hackathon 2025",    date: "Oct 4, 2025",  duration: "24 hrs", category: "hackathon", status: "past",     description: "Flagship 24-hour hackathon of BITS Hyderabad's annual fest PEARL.", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80", pastImages: ["https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80","https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80"], rating: 4.6, reviews: 132, conductedSince: 2014, seats: null, reviews_list: [{ name: "Siddharth K", rating: 5, comment: "THE hackathon in Hyderabad!", year: "3rd Year, CSE" }] },
  { id: 11, clubId: "bits-apogee",  collegeId: "bits",  title: "App Dev with Flutter",    date: "Jun 5, 2026",  duration: "1 day",  category: "workshop",  status: "upcoming", description: "Build cross-platform mobile apps with Flutter and Dart — zero to deploy.", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80", pastImages: [], rating: null, reviews: 0, conductedSince: 2022, seats: 60, reviews_list: [] },
  { id: 12, clubId: "iiith-lambda", collegeId: "iiith", title: "CodeFest 2025",           date: "Sep 14, 2025", duration: "30 hrs", category: "hackathon", status: "past",     description: "Competitive programming and product hackathon — one of India's toughest.", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80", pastImages: ["https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80","https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80"], rating: 4.8, reviews: 110, conductedSince: 2011, seats: null, reviews_list: [{ name: "Aakash M", rating: 5, comment: "Learned more in 30hrs than a semester!", year: "4th Year, CSE" }] },
  { id: 13, clubId: "iiith-lambda", collegeId: "iiith", title: "NLP & LLMs Workshop",     date: "May 25, 2026", duration: "1 day",  category: "workshop",  status: "upcoming", description: "Deep dive into NLP pipelines and LLM apps with LangChain and HuggingFace.", image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80", pastImages: [], rating: null, reviews: 0, conductedSince: 2023, seats: 75, reviews_list: [] },
  { id: 14, clubId: "cbit-csea",    collegeId: "cbit",  title: "Hackblitz 2025",          date: "Jul 18, 2025", duration: "24 hrs", category: "hackathon", status: "past",     description: "CBIT's inter-college hackathon — web, mobile and AI tracks.", image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800&q=80", pastImages: ["https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80"], rating: 4.1, reviews: 76, conductedSince: 2017, seats: null, reviews_list: [{ name: "Pooja S", rating: 4, comment: "Great for first-timers, supportive mentors.", year: "2nd Year, CSE" }] },
  { id: 15, clubId: "cbit-csea",    collegeId: "cbit",  title: "React JS Workshop",       date: "Jun 15, 2026", duration: "1 day",  category: "workshop",  status: "upcoming", description: "React from zero — components, hooks, state management and a full project.", image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80", pastImages: [], rating: null, reviews: 0, conductedSince: 2022, seats: 90, reviews_list: [] },
  { id: 16, clubId: "vit-gravitas", collegeId: "vit",   title: "GRAVITAS Hackathon",      date: "Sep 20, 2025", duration: "36 hrs", category: "hackathon", status: "past",     description: "Asia's largest student technical fest — 5000+ participants, 50+ sponsors.", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80", pastImages: ["https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80","https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80"], rating: 4.5, reviews: 198, conductedSince: 2010, seats: null, reviews_list: [{ name: "Ishaan V", rating: 5, comment: "5000+ students, insane energy!", year: "3rd Year, CSE" }] },
  { id: 17, clubId: "vit-gravitas", collegeId: "vit",   title: "Blockchain Webinar",      date: "Jun 20, 2026", duration: "2 hrs",  category: "webinar",   status: "upcoming", description: "Industry leaders explain Web3, DeFi and how blockchain reshapes finance.", image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80", pastImages: [], rating: null, reviews: 0, conductedSince: 2022, seats: 500, reviews_list: [] },
  { id: 18, clubId: "ou-nss",       collegeId: "ou",    title: "Heritage Campus Walk",    date: "Jun 22, 2026", duration: "4 hrs",  category: "workshop",  status: "upcoming", description: "Explore Osmania's iconic Gothic architecture and history with photography.", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80", pastImages: [], rating: null, reviews: 0, conductedSince: 2018, seats: 50, reviews_list: [] },
  { id: 19, clubId: "ou-iste",      collegeId: "ou",    title: "Osmania Tech Fest 2025",  date: "Mar 22, 2025", duration: "2 days", category: "hackathon", status: "past",     description: "Annual inter-department technical competition with coding, robotics and quiz.", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80", pastImages: ["https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80"], rating: 3.9, reviews: 52, conductedSince: 2008, seats: null, reviews_list: [{ name: "Farhaan A", rating: 4, comment: "Good exposure to inter-dept competition.", year: "3rd Year, ECE" }] },
];