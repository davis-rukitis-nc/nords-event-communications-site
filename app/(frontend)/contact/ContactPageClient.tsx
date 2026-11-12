import CopyEmailButton from "@/components/layout/copy-email-button"
import type { getContactPage } from "@/lib/cms"

type ContactPage = Awaited<ReturnType<typeof getContactPage>>

function ContactUsBlock({ email, heading }: { email: string; heading: string }) {
  return (
    <div className="rounded-2xl bg-neutral-950 p-8 text-white md:p-12">
      <h3 className="mb-4 text-2xl font-bold md:text-3xl">{heading}</h3>
      <div className="flex flex-wrap items-center gap-4">
        <a
          href={`mailto:${email}`}
          className="text-lg font-medium text-white underline-offset-4 decoration-1 hover:underline md:text-xl"
        >
          {email}
        </a>
        <CopyEmailButton
          email={email}
          label="Copy Email"
          className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm transition-colors hover:bg-white/20"
        />
      </div>
    </div>
  )
}

export default function ContactPageClient({ page }: { page: ContactPage }) {
  return (
    <div className="bg-white">
      <div className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-16">
            <div>
              <h2 className="text-3xl font-bold text-primary-dark mb-6">{page.heading}</h2>
              {page.intro.map((p, i) => (
                <p key={i} className="text-lg text-secondary-dark leading-relaxed mb-8">
                  {p}
                </p>
              ))}

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-primary-dark mb-2">Email</h3>
                  <p className="text-secondary-dark">
                    <a href={`mailto:${page.email}`} className="underline-offset-4 hover:underline">
                      {page.email}
                    </a>
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-primary-dark mb-2">Office</h3>
                  <p className="text-secondary-dark">
                    {page.office.map((line, i) => (
                      <span key={i} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-neutral-50 p-6 md:p-8 rounded-2xl">
                <p className="text-4xl font-bold text-primary-dark mb-2">{new Date().getFullYear() - 1999}+ Years</p>
                <p className="text-secondary-dark">of Experience in Event Marketing</p>
              </div>

              <div className="bg-neutral-50 p-6 md:p-8 rounded-2xl">
                <h3 className="text-xl md:text-2xl font-semibold text-primary-dark mb-4">{page.expertiseHeading}</h3>
                <ul className="space-y-4 text-secondary-dark">
                  {page.expertise.map((item) => (
                    <li key={item} className="font-semibold text-primary-dark mb-1">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <ContactUsBlock email={page.email} heading={page.ctaHeading} />
        </div>
      </div>
    </div>
  )
}
