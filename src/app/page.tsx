import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Home,
  Utensils,
  GraduationCap,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Navbar } from "@/components/ui/Navbar";
import Hero from "@/components/ui/Hero";
export default function Index() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />

        <section id="about" className="py-20 md:py-28">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 md:grid-cols-2 items-center">
              <div>
                <div className="inline-block bg-secondary/20 px-4 py-2 rounded-full text-secondary font-medium mb-4">
                  About Us
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary-foreground mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-muted-foreground mb-4">
                  YoungMinds is dedicated to improving the lives of children in
                  Ethiopia by providing basic necessities, healthcare, and
                  quality education. We believe every child deserves the
                  opportunity to thrive and reach their full potential
                  regardless of their circumstances.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  Founded in 2010, we've helped thousands of children access
                  clean water, nutritious food, safe shelter, and educational
                  resources. Our holistic approach addresses both immediate
                  needs and long-term development.
                </p>
                <Button className="group" variant="outline" asChild>
                  <Link href="#initiatives" className="flex items-center gap-2">
                    Our Initiatives
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
              <div className="relative h-[450px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/child-rm-bg.jpg"
                  alt="Child in classroom"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="initiatives" className="py-20 md:py-28 bg-secondary/10">
          <div className="px-4 md:px-6">
            <div className="text-center mb-16">
              <div className="inline-block bg-primary/20 px-4 py-2 rounded-full text-primary font-medium mb-4">
                Our Work
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary-foreground">
                Our Initiatives
              </h2>
              <p className="mt-4 text-lg text-muted-foreground mx-auto max-w-[800px]">
                We provide comprehensive support to children in Ethiopia through
                these key programs
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-background p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-border/50">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Home className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-primary-foreground">
                  Safe Shelter
                </h3>
                <p className="text-muted-foreground">
                  We build and maintain safe living spaces for vulnerable
                  children, providing security and stability.
                </p>
              </div>
              <div className="bg-background p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-border/50">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Utensils className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-primary-foreground">
                  Nutrition Programs
                </h3>
                <p className="text-muted-foreground">
                  We provide nutritious meals and teach sustainable farming
                  practices to combat malnutrition.
                </p>
              </div>
              <div className="bg-background p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-border/50">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <BookOpen className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-primary-foreground">
                  Basic Education
                </h3>
                <p className="text-muted-foreground">
                  We ensure children have access to quality education by
                  building schools and providing learning materials.
                </p>
              </div>
              <div className="bg-background p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-border/50">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <GraduationCap className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-primary-foreground">
                  Higher Education
                </h3>
                <p className="text-muted-foreground">
                  We offer scholarships and mentoring to help promising students
                  continue their education.
                </p>
              </div>
              <div className="bg-background p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-border/50">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-7 w-7 text-primary"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-primary-foreground">
                  Healthcare
                </h3>
                <p className="text-muted-foreground">
                  We provide basic healthcare services and preventive care to
                  keep children healthy.
                </p>
              </div>
              <div className="bg-background p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-border/50">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-7 w-7 text-primary"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m2 12 20 0" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-primary-foreground">
                  Community Development
                </h3>
                <p className="text-muted-foreground">
                  We work with local communities to build sustainable
                  infrastructure and create opportunities.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="px-4 md:px-6">
            <div className="text-center mb-16">
              <div className="inline-block bg-secondary/20 px-4 py-2 rounded-full text-secondary font-medium mb-4">
                Our Impact
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary-foreground">
                Making a Difference
              </h2>
              <p className="mt-4 text-lg text-muted-foreground mx-auto max-w-[800px]">
                Through the generosity of our donors, we've made a significant
                difference in the lives of Ethiopian children
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="bg-secondary/10 p-10 rounded-xl text-center">
                <div className="text-5xl font-bold text-secondary mb-2">
                  5,000+
                </div>
                <p className="text-lg font-medium text-primary-foreground">
                  Children Supported
                </p>
              </div>
              <div className="bg-primary/10 p-10 rounded-xl text-center">
                <div className="text-5xl font-bold text-primary mb-2">12</div>
                <p className="text-lg font-medium text-primary-foreground">
                  Schools Built
                </p>
              </div>
              <div className="bg-secondary/10 p-10 rounded-xl text-center">
                <div className="text-5xl font-bold text-secondary mb-2">
                  85%
                </div>
                <p className="text-lg font-medium text-primary-foreground">
                  Graduation Rate
                </p>
              </div>
            </div>
            <div className="mt-16 bg-background p-10 rounded-xl shadow-sm border border-border/50">
              <blockquote className="italic text-center text-xl text-muted-foreground">
                "YoungMinds has transformed our community. The children now have
                hope for a better future through education."
                <footer className="mt-4 text-base font-medium not-italic text-primary-foreground">
                  — Abebe, Local Community Leader
                </footer>
              </blockquote>
            </div>
          </div>
        </section>

        <section
          id="donate"
          className="py-20 md:py-28 bg-primary text-primary-foreground"
        >
          <div className="px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
                Make a Difference Today
              </h2>
              <p className="text-xl mb-8 text-primary-foreground/90">
                Your donation helps us provide essential services and education
                to children in need across Ethiopia. Every contribution, no
                matter the size, makes a meaningful impact.
              </p>
              <div className="space-y-6 mb-10">
                <div className="flex items-center gap-3 justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-lg">
                    $25 provides school supplies for one child
                  </span>
                </div>
                <div className="flex items-center gap-3 justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-lg">
                    $50 provides meals for a child for one month
                  </span>
                </div>
                <div className="flex items-center gap-3 justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-lg">
                    $100 covers a child's education for one semester
                  </span>
                </div>
              </div>
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 text-lg h-14 px-10 rounded-full"
                asChild
              >
                <Link href="/donate">Donate Now</Link>
              </Button>
              <p className="text-sm mt-4 text-primary-foreground/80">
                Secure payment processed via Stripe
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="px-4 md:px-6">
            <div className="text-center mb-16">
              <div className="inline-block bg-primary/20 px-4 py-2 rounded-full text-primary font-medium mb-4">
                Get In Touch
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary-foreground">
                Contact Us
              </h2>
              <p className="mt-4 text-lg text-muted-foreground mx-auto max-w-[800px]">
                Have questions or want to learn more about our work? Get in
                touch with our team.
              </p>
            </div>
            <div className="grid gap-10 md:grid-cols-2 max-w-4xl mx-auto">
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-primary-foreground mb-1">
                      Email
                    </h3>
                    <p className="text-muted-foreground">info@youngminds.org</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-primary-foreground mb-1">
                      Phone
                    </h3>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-primary-foreground mb-1">
                      Address
                    </h3>
                    <p className="text-muted-foreground">
                      123 Charity Lane
                      <br />
                      Addis Ababa, Ethiopia
                    </p>
                  </div>
                </div>
                <div className="pt-4">
                  <h3 className="text-lg font-medium text-primary-foreground mb-3">
                    Follow Us
                  </h3>
                  <div className="flex gap-4">
                    <Link
                      href="/404"
                      className="h-12 w-12 flex items-center justify-center rounded-full bg-secondary/10 hover:bg-secondary/20 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-secondary"
                      >
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                      </svg>
                      <span className="sr-only">Facebook</span>
                    </Link>
                    <Link
                      href="/404"
                      className="h-12 w-12 flex items-center justify-center rounded-full bg-secondary/10 hover:bg-secondary/20 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-secondary"
                      >
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                      </svg>
                      <span className="sr-only">Twitter</span>
                    </Link>
                    <Link
                      href="/404"
                      className="h-12 w-12 flex items-center justify-center rounded-full bg-secondary/10 hover:bg-secondary/20 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-secondary"
                      >
                        <rect
                          width="20"
                          height="20"
                          x="2"
                          y="2"
                          rx="5"
                          ry="5"
                        />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                      </svg>
                      <span className="sr-only">Instagram</span>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="bg-background p-8 rounded-xl shadow-sm border border-border/50">
                <form className="space-y-5">
                  <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label
                        htmlFor="contact-name"
                        className="text-sm font-medium text-primary-foreground"
                      >
                        Name
                      </label>
                      <input
                        id="contact-name"
                        className="w-full px-4 py-3 border rounded-lg"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="contact-email"
                        className="text-sm font-medium text-primary-foreground"
                      >
                        Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        className="w-full px-4 py-3 border rounded-lg"
                        placeholder="Your email"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="contact-subject"
                      className="text-sm font-medium text-primary-foreground"
                    >
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      className="w-full px-4 py-3 border rounded-lg"
                      placeholder="Subject"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="contact-message"
                      className="text-sm font-medium text-primary-foreground"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      className="w-full px-4 py-3 border rounded-lg min-h-[150px]"
                      placeholder="Your message"
                    />
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-muted/30">
        <div className="px-4 py-12 md:px-6 md:py-16">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <Link href="/" className="inline-block mb-6">
                <Image
                  src="/images/logo-color.png"
                  alt="YoungMinds Logo"
                  width={180}
                  height={100}
                  className="h-auto w-auto"
                />
              </Link>
              <p className="text-muted-foreground">
                Empowering Ethiopia's children through essential services and
                education since 2010.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4 text-primary-foreground">
                Quick Links
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#about"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#initiatives"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Our Initiatives
                  </Link>
                </li>
                <li>
                  <Link
                    href="#donate"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Donate
                  </Link>
                </li>
                <li>
                  <Link
                    href="/404"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Annual Reports
                  </Link>
                </li>
                <li>
                  <Link
                    href="/404"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Volunteer
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4 text-primary-foreground">
                Contact
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">
                    info@youngminds.org
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">
                    +1 (555) 123-4567
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-primary mt-1" />
                  <span className="text-muted-foreground">
                    123 Charity Lane
                    <br />
                    Addis Ababa, Ethiopia
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>
              &copy; {new Date().getFullYear()} YoungMinds. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
