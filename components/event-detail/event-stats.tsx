import type React from "react"
import type { Event } from "@/lib/data/events-data"
import { Award, Users } from "lucide-react"

interface EventStatsProps {
  event: Event
}

const StatCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) => (
  <div className="rounded-2xl flex items-center gap-4">
    <div className="bg-gray-200 text-gray-700 p-3 rounded-xl">{icon}</div>
    <div>
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
)

export default function EventStats({ event }: EventStatsProps) {
  return (
    <div className="flex flex-wrap gap-6 mt-8 mb-8">
      {event.yearStarted && (
        <StatCard icon={<Award className="w-6 h-6" />} label="First Held In" value={event.yearStarted} />
      )}
      {event.annualParticipants && (
        <StatCard icon={<Users className="w-6 h-6" />} label="Annual Participants" value={event.annualParticipants} />
      )}
    </div>
  )
}
