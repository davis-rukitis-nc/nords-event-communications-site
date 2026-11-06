import CopyEmailButton from "@/components/layout/copy-email-button"

function ContactUsBlock() {
  const email = "info@necom.lv"
  return (
    <div className="rounded-2xl bg-neutral-950 p-8 text-white md:p-12">
      <h3 className="mb-4 text-2xl font-bold md:text-3xl">Get in touch</h3>
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

export default function ContactPageClient() {
  return (
    <div className="bg-white">
      <div className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-16">
            <div>
              <h2 className="text-3xl font-bold text-primary-dark mb-6">Reach out if you dream big!</h2>
              <p className="text-lg text-secondary-dark leading-relaxed mb-8">
                {"Feel free to reach out with your ideas, interests in creating a partnership with our events, fine-tuning your sponsorship portfolio, generating impactful ideas to activate your sponsorship & charity initiatives, launching a product with a bang, or maybe finding a way to appear cool with your audiences!"}
              </p>
              <p className="text-lg text-secondary-dark leading-relaxed mb-8">
                {"In doubt? No worries, we’ll find a way to help you. For a budget, of course. Or just for the sake of it and fun ... if we like you too much. "}
              </p>


              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-primary-dark mb-2">Email</h3>
                  <p className="text-secondary-dark">
                    <a href="mailto:info@necom.lv" className="underline-offset-4 hover:underline">
                      info@necom.lv
                    </a>
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-primary-dark mb-2">Office</h3>
                  <p className="text-secondary-dark">
                    Nords Event Communications SIA
                    <br />
                    Brīvības iela 40–24, Rīga, LV-1050, Latvia
                    <br />
                    Reg. No. 50003981501
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
                <h3 className="text-xl md:text-2xl font-semibold text-primary-dark mb-4">Our Expertise</h3>
                <div className="space-y-4 text-secondary-dark">
                  <div>
                    <p className="font-semibold text-primary-dark mb-1">Ideas, Impact & Large-Scale Events</p>
                  </div>
                  <div>
                    <p className="font-semibold text-primary-dark mb-1">Sponsorship & Brand Activations</p>
                  </div>
                  <div>
                    <p className="font-semibold text-primary-dark mb-1">Mass Sports, Wine & Gastronomy, Music</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ContactUsBlock />
        </div>
      </div>
    </div>
  )
}
