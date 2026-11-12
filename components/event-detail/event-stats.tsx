import type { Event } from "@/lib/cms/types"

export default function EventStats({ event }: { event: Event }) {
  const stats = [
    event.yearStarted && { label: "First Held In", value: event.yearStarted },
    event.annualParticipants && { label: "Annual Participants", value: event.annualParticipants },
  ].filter(Boolean) as { label: string; value: string | number }[]

  if (!stats.length) return null

  return (
    <dl className="mt-6 grid grid-cols-2 gap-6">
      {stats.map((stat) => (
        <div key={stat.label}>
          <dt className="text-xs uppercase tracking-wider text-neutral-500">{stat.label}</dt>
          <dd className="mt-1 text-2xl font-bold tabular-nums text-neutral-950">{stat.value}</dd>
        </div>
      ))}
    </dl>
  )
}
