export type Notification = {
  id: string;
  kind: "growth" | "cert" | "dept" | "reminder";
  title: string;
  body: string;
  time: string;
  unread: boolean;
};

export const notifications: Notification[] = [
  { id: "n1", kind: "growth", title: "Engagement up 12%", body: "Student engagement increased across CSE this week.", time: "2h", unread: true },
  { id: "n2", kind: "cert", title: "New certification recorded", body: "Ananya Sharma completed AWS Cloud Practitioner.", time: "5h", unread: true },
  { id: "n3", kind: "dept", title: "Department milestone", body: "MBA crossed an 86 CareerIQ average for the first time.", time: "1d", unread: false },
  { id: "n4", kind: "reminder", title: "Upcoming: AI Bootcamp", body: "Starts in 3 days · 192 registered students.", time: "1d", unread: false },
];