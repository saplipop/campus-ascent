// Campus events — used by Analytics → Performance tab and search.
export type EventItem = {
  id: string;
  title: string;
  category: string;
  date: string;
  organizer: string;
  registrations: number;
  attendance: number;
  completion: number;
  satisfaction: number;
  successScore: number;
};

export const events: EventItem[] = [
  { id: "e1", title: "SpringHack 2025", category: "Hackathon", date: "2025-05-14", organizer: "Code Club", registrations: 412, attendance: 386, completion: 92, satisfaction: 4.7, successScore: 94 },
  { id: "e2", title: "Cloud Foundations Workshop", category: "Workshop", date: "2025-02-21", organizer: "AWS Campus", registrations: 248, attendance: 221, completion: 88, satisfaction: 4.5, successScore: 89 },
  { id: "e3", title: "TEDx Campus Connect", category: "Talk", date: "2025-09-09", organizer: "Student Council", registrations: 612, attendance: 588, completion: 97, satisfaction: 4.9, successScore: 96 },
  { id: "e4", title: "AI Bootcamp", category: "Bootcamp", date: "2025-11-02", organizer: "AI Society", registrations: 192, attendance: 174, completion: 84, satisfaction: 4.4, successScore: 87 },
  { id: "e5", title: "Product Design Sprint", category: "Workshop", date: "2026-01-18", organizer: "Design Guild", registrations: 156, attendance: 142, completion: 90, satisfaction: 4.6, successScore: 90 },
  { id: "e6", title: "Cyber Defense Drill", category: "Competition", date: "2026-03-04", organizer: "Sec Society", registrations: 98, attendance: 82, completion: 78, satisfaction: 4.2, successScore: 81 },
];