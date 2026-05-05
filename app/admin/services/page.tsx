"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

interface Service {
  id: string
  title: string
  description: string
  icon: string | null
  order: number
  createdAt: string
  updatedAt: string
}

export default function ServicesManager() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await fetch("/api/admin/services")
      if (response.ok) {
        const data = await response.json()
        setServices(data)
      }
    } catch (error) {
      console.error("Error fetching services:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return

    try {
      const response = await fetch(`/api/admin/services/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setServices(services.filter((service) => service.id !== id))
      }
    } catch (error) {
      console.error("Error deleting service:", error)
    }
  }

  if (loading) {
    return (
      <div>
        <div className="admin-header">
          <h1 className="admin-title">Services Manager</h1>
        </div>
        <div className="card">
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Services Manager</h1>
        <Link href="/admin/services/new" className="btn btn-primary">
          Add Service
        </Link>
      </div>

      <div className="card">
        {services.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem" }}>
            <h3>No services yet</h3>
            <p>Add your first service to get started.</p>
            <Link href="/admin/services/new" className="btn btn-primary">
              Add First Service
            </Link>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Icon</th>
                <th>Title</th>
                <th>Description</th>
                <th>Order</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id}>
                  <td>
                    <div
                      style={{
                        fontSize: "2rem",
                        width: "50px",
                        height: "50px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {service.icon || "💻"}
                    </div>
                  </td>
                  <td>
                    <strong>{service.title}</strong>
                  </td>
                  <td>{service.description.substring(0, 100)}...</td>
                  <td>{service.order}</td>
                  <td>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <Link href={`/admin/services/edit/${service.id}`} className="btn btn-secondary">
                        Edit
                      </Link>
                      <button onClick={() => handleDelete(service.id)} className="btn btn-danger">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
