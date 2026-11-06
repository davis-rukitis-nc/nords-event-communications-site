export default function AboutSection() {


  return (
    <section
      className={`py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
        {/* Left Side - Heading */}
        <div>
          <h2 className="text-3xl font-semibold text-foreground leading-tight lg:text-3xl md:text-3xl">About Us</h2>
        </div>

        {/* Right Side - Content */}
        <div className="space-y-6 md:space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {"That\'s right! We are the ones to blame for the explosion of running and mass sports culture in Latvia! We are the driving force of Latvia’s wine and champagne scene! And we are immensely proud of the giant steps we\'re taking to boost the Baltic jazz scene!"}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {"Nords Event Communications (NECom) is not your regular events agency. We\'re a special force crafting experiences that are moving Riga and Latvia - literally and figuratively! Can you keep up?"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
