import { prisma } from "@/lib/prisma"
import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: 'Services - Mutuku Joshua | Lumyn Technologies',
  description: 'Professional fullstack development services including web applications, mobile apps, APIs, UI/UX design, and digital solutions.',
  keywords: 'Services, Web Development, Mobile Apps, APIs, UI/UX, Fullstack Developer, Lumyn Technologies',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.lumyn.co.ke/services',
    title: 'Services - Mutuku Joshua',
    description: 'Professional fullstack development services.',
    siteName: 'Lumyn Technologies',
  },
}

type ServiceType = {
  id: string
  title: string
  description: string
  icon: string | null
  order: number
}

async function getServices(): Promise<ServiceType[]> {
  try {
    return await prisma.practiceArea.findMany({
      orderBy: { order: "asc" },
    })
  } catch (error) {
    console.error("Error fetching services:", error)
    return []
  }
}

export default async function ServicesPage() {
  const services = await getServices()

  // Default services if database is empty
  const defaultServices: Array<ServiceType & { icon: string }> = [
    {
      id: "default-1",
      title: "Web Application Development",
      description: "Custom web applications built with modern technologies like React, Next.js, and Node.js. From simple landing pages to complex SaaS platforms.",
      icon: "🌐",
      order: 1,
    },
    {
      id: "default-2",
      title: "Mobile App Development",
      description: "Cross-platform mobile applications using React Native. Deliver native-like experiences on both iOS and Android from a single codebase.",
      icon: "📱",
      order: 2,
    },
    {
      id: "default-3",
      title: "API Development & Integration",
      description: "RESTful and GraphQL APIs design and implementation. Seamless third-party integrations and microservices architecture.",
      icon: "🔌",
      order: 3,
    },
    {
      id: "default-4",
      title: "Database Design & Management",
      description: "Efficient database schema design and optimization. Experience with PostgreSQL, MongoDB, and other database technologies.",
      icon: "🗄️",
      order: 4,
    },
    {
      id: "default-5",
      title: "Cloud Solutions & DevOps",
      description: "Cloud infrastructure setup and management on AWS, Google Cloud, and Azure. CI/CD pipelines, containerization with Docker.",
      icon: "☁️",
      order: 5,
    },
    {
      id: "default-6",
      title: "E-commerce Solutions",
      description: "Full-featured online stores with payment integration, inventory management, and secure checkout experiences.",
      icon: "🛒",
      order: 6,
    },
    {
      id: "default-7",
      title: "CMS Development",
      description: "Custom content management systems and admin dashboards. Easy content updates without technical knowledge.",
      icon: "📝",
      order: 7,
    },
    {
      id: "default-8",
      title: "Technical Consulting",
      description: "Architecture planning, technology selection, code reviews, and technical strategy for your digital products.",
      icon: "💡",
      order: 8,
    },
  ]

  const displayServices: ServiceType[] = services.length > 0 ? services : defaultServices

  return (
    <div className="section">
      <div className="container">
        {/* Hero Section */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h1 className="section-title">My Services</h1>
          <p className="section-subtitle">
            Comprehensive development services tailored to bring your digital ideas to life. 
            With expertise in modern technologies and a commitment to quality, I deliver 
            scalable solutions across various domains of software development.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-2" style={{ gap: "2rem" }}>
          {displayServices.map((service: ServiceType) => (
            <div key={service.id} className="card service-card">
              <div
                style={{
                  fontSize: "3rem",
                  marginBottom: "1.5rem",
                  textAlign: "center",
                }}
              >
                {service.icon || "💻"}
              </div>
              <h3 style={{ textAlign: "center", marginBottom: "1rem", color: "#1a365d" }}>
                {service.title}
              </h3>
              <p style={{ textAlign: "center", lineHeight: "1.8", color: "#666" }}>
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <div style={{ marginTop: "5rem" }}>
          <h2 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "3rem", color: "#1a365d" }}>
            My Development Process
          </h2>
          <div className="grid grid-4" style={{ gap: "1.5rem" }}>
            {[
              { step: "1", title: "Discovery", desc: "Understanding your requirements and goals", icon: "🔍" },
              { step: "2", title: "Planning", desc: "Architecture and technical strategy", icon: "📋" },
              { step: "3", title: "Development", desc: "Agile development with regular updates", icon: "💻" },
              { step: "4", title: "Delivery", desc: "Testing, deployment, and support", icon: "🚀" },
            ].map((item) => (
              <div key={item.step} className="card" style={{ textAlign: "center", padding: "2rem" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{item.icon}</div>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "#1a365d",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1rem",
                    fontWeight: "bold",
                  }}
                >
                  {item.step}
                </div>
                <h3>{item.title}</h3>
                <p style={{ color: "#666", fontSize: "0.9rem" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div
          style={{
            background: "linear-gradient(135deg, #1a365d 0%, #2d3748 100%)",
            color: "white",
            padding: "3rem 2rem",
            borderRadius: "15px",
            marginTop: "5rem",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: "2rem", marginBottom: "2rem" }}>Technologies I Use</h2>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem" }}>
            {[
              { icon: "⚛️", name: "React/Next.js" },
              { icon: "🟢", name: "Node.js" },
              { icon: "🐍", name: "Python" },
              { icon: "📘", name: "TypeScript" },
              { icon: "🗄️", name: "PostgreSQL" },
              { icon: "🍃", name: "MongoDB" },
              { icon: "🐳", name: "Docker" },
              { icon: "☁️", name: "AWS" },
              { icon: "🎨", name: "Tailwind CSS" },
              { icon: "🔷", name: "Prisma" },
              { icon: "📱", name: "React Native" },
              { icon: "🔗", name: "GraphQL" },
            ].map((tech) => (
              <div
                key={tech.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.75rem 1.25rem",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  fontSize: "1rem",
                }}
              >
                <span>{tech.icon}</span>
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div
          style={{
            background: "#f7fafc",
            padding: "3rem 2rem",
            borderRadius: "15px",
            textAlign: "center",
            marginTop: "4rem",
          }}
        >
          <h3 style={{ color: "#1a365d", marginBottom: "1rem" }}>Don't See the Service You Need?</h3>
          <p style={{ marginBottom: "2rem", color: "#666" }}>
            I work on a wide range of projects beyond those listed above. Contact me to discuss your specific
            project requirements and how I can help bring your ideas to life.
          </p>
          <Link href="/contact" className="btn btn-primary">
            Let's Talk
          </Link>
        </div>
      </div>
    </div>
  )
}

