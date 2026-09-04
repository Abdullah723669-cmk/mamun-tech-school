"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { formatPrice } from "@/lib/utils"
import { Star, ExternalLink, Plus, Pencil, Trash2 } from "lucide-react"
import CourseFormModal from "@/components/courses/CourseFormModal"

interface Course {
  id: string
  title: string
  slug: string
  description: string
  shortDesc: string
  image: string
  price: number
  duration: string
  level: string
  category: string
  instructor: string
  instructorBio: string
  instructorAvatar?: string | null
  curriculum: string
  highlights: string
  requirements: string
  published: boolean
  featured: boolean
  totalStudents: number
  rating: number
}

interface CoursesManagerProps {
  initialCourses: Course[]
}

export default function CoursesManager({ initialCourses }: CoursesManagerProps) {
  const [courses, setCourses] = useState<Course[]>(initialCourses)
  const [showModal, setShowModal] = useState(false)
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const refreshCourses = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/courses")
      if (res.ok) {
        const data = await res.json()
        setCourses(data)
      }
    } catch {
      // silently ignore
    }
  }, [])

  const handleSaved = useCallback(async () => {
    setShowModal(false)
    setEditingCourse(null)
    await refreshCourses()
  }, [refreshCourses])

  const handleOpenNew = () => {
    setEditingCourse(null)
    setShowModal(true)
  }

  const handleOpenEdit = (course: Course) => {
    setEditingCourse(course)
    setShowModal(true)
  }

  const handleDelete = async (course: Course) => {
    if (!confirm(`Are you sure you want to delete "${course.title}"?\nThis cannot be undone.`)) return
    setDeletingId(course.id)
    try {
      const res = await fetch(`/api/admin/courses/${course.id}`, { method: "DELETE" })
      if (res.ok) {
        setCourses((prev) => prev.filter((c) => c.id !== course.id))
      } else {
        alert("Failed to delete course. Please try again.")
      }
    } catch {
      alert("Network error. Please try again.")
    } finally {
      setDeletingId(null)
    }
  }

  const handleClose = () => {
    setShowModal(false)
    setEditingCourse(null)
  }

  return (
    <>
      {/* Page header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontFamily: "Outfit", fontSize: "1.8rem", fontWeight: 800, color: "#F0F0FF" }}>
            Course Management ({courses.length})
          </h1>
          <p style={{ color: "#6060A0", fontSize: "0.9rem" }}>
            Create, edit, and publish course offerings.
          </p>
        </div>
        <button
          id="add-new-course-btn"
          onClick={handleOpenNew}
          className="btn-primary"
          style={{ fontSize: "0.85rem", padding: "0.6rem 1.25rem" }}
        >
          <Plus size={16} /> New Course
        </button>
      </div>

      {/* Table */}
      <div className="glass-card" style={{ padding: "1.5rem" }}>
        {courses.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem 1rem", color: "#6060A0" }}>
            <p style={{ fontSize: "1rem", marginBottom: "1.25rem" }}>No courses found. Create your first one!</p>
            <button
              id="empty-state-add-course-btn"
              onClick={handleOpenNew}
              className="btn-primary"
              style={{ fontSize: "0.85rem" }}
            >
              <Plus size={16} /> Create Course
            </button>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Course</th>
                <th>Category</th>
                <th>Price</th>
                <th>Duration</th>
                <th>Students</th>
                <th>Rating</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  {/* Course name + thumbnail */}
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div
                        style={{
                          position: "relative",
                          width: 44,
                          height: 30,
                          borderRadius: "4px",
                          overflow: "hidden",
                          flexShrink: 0,
                          background: "rgba(108,99,255,0.1)",
                        }}
                      >
                        <Image
                          src={course.image}
                          alt={course.title}
                          fill
                          style={{ objectFit: "cover" }}
                          unoptimized
                        />
                      </div>
                      <span style={{ color: "#F0F0FF", fontWeight: 600, fontSize: "0.88rem" }}>
                        {course.title}
                      </span>
                    </div>
                  </td>

                  <td style={{ color: "#A0A0C0", fontSize: "0.85rem" }}>{course.category}</td>

                  <td style={{ color: "#6C63FF", fontWeight: 800, fontFamily: "Outfit" }}>
                    {formatPrice(course.price)}
                  </td>

                  <td style={{ color: "#6060A0", fontSize: "0.85rem" }}>{course.duration}</td>

                  <td style={{ color: "#43BCCD", fontWeight: 600 }}>{course.totalStudents}</td>

                  <td>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "3px",
                        color: "#FFD700",
                        fontSize: "0.85rem",
                        fontWeight: 700,
                      }}
                    >
                      <Star size={12} fill="#FFD700" /> {course.rating}
                    </div>
                  </td>

                  {/* Published / Draft status badge */}
                  <td>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "0.2rem 0.65rem",
                        borderRadius: "50px",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                        background: course.published ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)",
                        color: course.published ? "#22c55e" : "#f87171",
                        border: `1px solid ${course.published ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`,
                      }}
                    >
                      {course.published ? "Published" : "Draft"}
                    </span>
                  </td>

                  {/* Action buttons */}
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      {/* View */}
                      <Link
                        href={`/courses/${course.slug}`}
                        target="_blank"
                        title="View"
                        style={{
                          color: "#6C63FF",
                          textDecoration: "none",
                          padding: "0.3rem 0.55rem",
                          borderRadius: "6px",
                          border: "1px solid rgba(108,99,255,0.2)",
                          display: "inline-flex",
                          alignItems: "center",
                          transition: "all 0.2s",
                        }}
                      >
                        <ExternalLink size={12} />
                      </Link>

                      {/* Edit */}
                      <button
                        id={`edit-course-btn-${course.id}`}
                        onClick={() => handleOpenEdit(course)}
                        title="Edit"
                        style={{
                          background: "rgba(67,188,205,0.1)",
                          border: "1px solid rgba(67,188,205,0.25)",
                          borderRadius: "6px",
                          color: "#43BCCD",
                          cursor: "pointer",
                          padding: "0.3rem 0.55rem",
                          display: "inline-flex",
                          alignItems: "center",
                          transition: "all 0.2s",
                        }}
                      >
                        <Pencil size={12} />
                      </button>

                      {/* Delete */}
                      <button
                        id={`delete-course-btn-${course.id}`}
                        onClick={() => handleDelete(course)}
                        disabled={deletingId === course.id}
                        title="Delete"
                        style={{
                          background: "rgba(239,68,68,0.1)",
                          border: "1px solid rgba(239,68,68,0.25)",
                          borderRadius: "6px",
                          color: "#f87171",
                          cursor: deletingId === course.id ? "not-allowed" : "pointer",
                          padding: "0.3rem 0.55rem",
                          display: "inline-flex",
                          alignItems: "center",
                          opacity: deletingId === course.id ? 0.5 : 1,
                          transition: "all 0.2s",
                        }}
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add / Edit modal */}
      {showModal && (
        <CourseFormModal
          course={editingCourse}
          onClose={handleClose}
          onSaved={handleSaved}
        />
      )}
    </>
  )
}
