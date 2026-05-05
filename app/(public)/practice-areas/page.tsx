import { prisma } from "@/lib/prisma"
import Link from "next/link"

type PracticeAreaType = {
  id: string
  title: string
  description: string
  icon: string | null
  order: number
}

async function getServices(): Promise<PracticeAreaType[]> {
  return await prisma.practiceArea.findMany({
    orderBy: { order: "asc" },
  })
}

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title">Services</h1>
        <p className="section-subtitle">
          Comprehensive development services tailored to bring your digital ideas to life. With expertise in modern technologies
          and a commitment to quality, I deliver scalable solutions across various domains of software development.
        </p>

        <div className="grid grid-2" style={{ gap: "2rem" }}>
          {services.map((service: PracticeAreaType) => (
            <div key={service.id} className="card">
              <div
                style={{
                  fontSize: "3rem",
                  marginBottom: "1.5rem",
                  textAlign: "center",
                }}
              >
                {service.icon || "💻"}
              </div>
              <h3 style={{ textAlign: "center", marginBottom: "1.5rem" }}>{service.title}</h3>
              <p style={{ textAlign: "center", lineHeight: "1.8" }}>{service.description}</p>
            </div>
          ))}
        </div>

        {services.length === 0 && (
          <div className="card" style={{ textAlign: "center", padding: "4rem 2rem" }}>
            <h3>Services Coming Soon</h3>
            <p>
              I am currently updating my services. Please contact me directly for information about my development services.
            </p>
          </div>
        )}

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
