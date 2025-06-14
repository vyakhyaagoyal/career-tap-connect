export const mockFeedJobs = [
  {
    id: "job1",
    title: "Frontend Developer",
    pay: "₹1,00,000/mo",
    company: "Innovatech Solutions",
    location: "Remote",
    tags: ["React", "TypeScript", "Design", "Full-time"],
    verified: true,
  },
  {
    id: "job2",
    title: "Data Analyst",
    pay: "₹80,000/mo",
    company: "FinSight",
    location: "Hybrid",
    tags: ["Python", "SQL", "Analytics", "Internship"],
    verified: false,
  },
  {
    id: "job3",
    title: "UI/UX Designer",
    pay: "₹90,000/mo",
    company: "Cresta Studios",
    location: "On-site",
    tags: ["Design", "Figma", "Creative"],
    verified: true,
  },
];

export const mockFeedCandidates = [
  {
    id: "cand1",
    name: "Priya Sharma",
    skills: ["React", "Tailwind", "Node.js"],
    education: "B.Tech, Computer Science",
    location: "Mumbai",
    atsScore: 5,
    verified: true,
  },
  {
    id: "cand2",
    name: "Amit Verma",
    skills: ["Python", "SQL", "Data Visualization"],
    education: "MSc, Data Science",
    location: "Delhi",
    atsScore: 4,
    verified: false,
  },
  {
    id: "cand3",
    name: "Sonia Kapoor",
    skills: ["UI/UX", "Figma", "Prototyping"],
    education: "BA, Design",
    location: "Bengaluru",
    atsScore: 3,
    verified: false,
  },
];

export const mockNotifications = [
  {
    id: "notif1",
    text: "You and TechCorp both swiped right on Frontend Developer position",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "notif2",
    text: "StartupXYZ showed interest in your profile!",
    time: "4 hours ago",
    read: false,
  },
  {
    id: "notif3",
    text: "Your interview with Creative Agency is confirmed for tomorrow at 2 PM.",
    time: "1 day ago",
    read: true,
  },
  {
    id: "notif4",
    text: "Datatech decided to move forward with other candidates",
    time: "2 days ago",
    read: true,
  },
  {
    id: "notif5",
    text: "You've been waitlisted for the Backend Developer role at CloudCorp.",
    time: "3 days ago",
    read: true,
  },
];

export const mockInboxMatches = [
  {
    id: "match1",
    company: "TechCorp",
    role: "Frontend Developer Intern",
    message: "Hi! We'd love to schedule an interview with you.",
    time: "Matched 2 hours ago",
    status: "New Match",
    avatar: "T",
  },
  {
    id: "match2",
    company: "StartupXYZ",
    role: "Full Stack Developer",
    message: "Thanks for your interest! When are you available for a call?",
    time: "Matched 1 day ago",
    status: "Active",
    avatar: "S",
  },
  {
    id: "match3",
    company: "Creative Agency",
    role: "UI/UX Designer",
    message: "Interview confirmed for tomorrow at 2 PM",
    time: "Matched 3 days ago",
    status: "Interview Scheduled",
    avatar: "C",
  },
];

export const mockInboxActivity = [
  {
    id: "act1",
    type: "right" as const,
    text: "TechCorp - Frontend Developer",
    details: "You swiped right • 2 hours ago",
    status: "Matched!",
  },
  {
    id: "act2",
    type: "left" as const,
    text: "DataScience Inc - Data Analyst",
    details: "You swiped left • 3 hours ago",
    status: "Passed",
  },
  {
    id: "act3",
    type: "up" as const,
    text: "StartupXYZ - Backend Developer",
    details: "You swiped up • 5 hours ago",
    status: "Waitlisted",
  },
  {
    id: "act4",
    type: "right" as const,
    text: "CloudCorp - DevOps Engineer",
    details: "You swiped right • 1 day ago",
    status: "Pending",
  },
];

export const mockConversations = [
  {
    id: "match1",
    company: "TechCorp",
    role: "Frontend Developer Intern",
    lastMessage: "Perfect! How about tomorrow at 3 PM? We can do it over Google Meet.",
    time: "2:30 PM",
    unread: 2,
    avatar: "T",
    online: true,
  },
  {
    id: "match2",
    company: "StartupXYZ",
    role: "Full Stack Developer",
    lastMessage: "Thanks for your interest! When are you available for a call?",
    time: "Yesterday",
    unread: 0,
    avatar: "S",
    online: false,
  },
  {
    id: "match3",
    company: "Creative Agency",
    role: "UI/UX Designer",
    lastMessage: "Interview confirmed for tomorrow at 2 PM",
    time: "2 days ago",
    unread: 0,
    avatar: "C",
    online: true,
  },
];

export const mockMessages: { [key: string]: { id: number; from: "self" | "other"; text: string; time: string }[] } = {
  match1: [
    { id: 1, from: "other", text: "Hi! We reviewed your profile and we're really impressed with your skills.", time: "2:25 PM" },
    { id: 2, from: "other", text: "We'd love to schedule an interview with you for the Frontend Developer Intern position.", time: "2:26 PM" },
    { id: 3, from: "self", text: "Thank you so much! I'm very excited about this opportunity.", time: "2:28 PM" },
    { id: 4, from: "self", text: "I'm available for an interview anytime this week. What works best for you?", time: "2:29 PM" },
    { id: 5, from: "other", text: "Perfect! How about tomorrow at 3 PM? We can do it over Google Meet.", time: "2:30 PM" },
  ],
  match2: [
    { id: 1, from: "other", text: "Thanks for your interest! When are you available for a call?", time: "Yesterday" },
  ],
  match3: [
    { id: 1, from: "other", text: "Interview confirmed for tomorrow at 2 PM", time: "2 days ago" },
  ]
};
