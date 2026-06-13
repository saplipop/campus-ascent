const quotes = [
  {
    quote:
      "Campus Connect made it possible to see student development as a curve, not a list. Our placement readiness conversations changed overnight.",
    name: "Dr. Anika Mehta",
    role: "Dean of Student Affairs",
    org: "Lakeside Institute of Technology",
  },
  {
    quote:
      "The CareerIQ score is the first metric our department heads actually look forward to in the weekly review. It tells a story attendance never could.",
    name: "Prof. Marcus Hollis",
    role: "Chair, Computer Science",
    org: "North Ridge University",
  },
  {
    quote:
      "We replaced three reporting tools with Campus Connect. The skill gap intelligence alone has reshaped how we design workshops.",
    name: "Sara Okafor",
    role: "Director of Career Services",
    org: "Meridian College",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-28 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-14">
          <p className="text-xs uppercase tracking-widest text-teal font-medium mb-4">Stories</p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-balance">
            Institutions building a growth culture
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {quotes.map((q) => (
            <figure
              key={q.name}
              className="rounded-2xl border border-white/5 bg-surface/30 p-6 flex flex-col"
            >
              <blockquote className="text-sm leading-relaxed mb-6 text-pretty">
                "{q.quote}"
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3 pt-4 border-t border-white/5">
                <div className="size-9 rounded-full bg-gradient-to-br from-teal/40 to-iris/30 border border-white/10" />
                <div>
                  <p className="text-sm font-medium">{q.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {q.role} · {q.org}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}