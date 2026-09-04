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

interface CoursesTableProps {
  initialCourses: Course[]
}

export default function CoursesTable({ initialCourses }: CoursesTableProps) {
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
      // ignore
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
    if (!confirm(`Are you sure you want to delete "${course.title}"? This action cannot be undone.`)) return
    setDeletingId(course.id)
    try {
      const res = await fetch(`/api/admin/courses/${course.id}`, { method: "DELETE" })
      if (res.ok) {
        setCourses((prev) => prev.filter((c) => c.id !== course.id))
      } else {
        alert("Failed to delete course.")
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
      {/* Header action button */}
      <button
        id="add-new-course-btn"
        onClick={handleOpenNew}
        className="btn-primary"
        style={{ fontSize: "0.85rem", padding: "0.6rem 1.25rem" }}
      >
        <Plus size={16} /> New Course
      </button>

      {/* Courses count badge */}
      <span
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "none",
        }}
      >
        {courses.length}
      </span>

      {/* Table */}
      <div className="glass-card" style={{ padding: "1.5rem", marginTop: "0" }}>
        {courses.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "3rem",
              color: "#6060A0",
            }}
          >
            <p style={{ fontSize: "1rem", marginBottom: "1rem" }}>No courses yet.</p>
            <button
              id="empty-state-add-course-btn"
              onClick={handleOpenNew}
              className="btn-primary"
              style={{ fontSize: "0.85rem" }}
            >
              <Plus size={16} /> Create your first course
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
                  <td>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "0.2rem 0.6rem",
                        borderRadius: "50px",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                        background: course.published
                          ? "rgba(34,197,94,0.12)"
                          : "rgba(239,68,68,0.12)",
                        color: course.published ? "#22c55e" : "#f87171",
                        border: `1px solid ${course.published ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`,
                      }}
                    >
                      {course.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <Link
                        href={`/courses/${course.slug}`}
                        target="_blank"
                        title="View course"
                        style={{
                          color: "#6C63FF",
                          textDecoration: "none",
                          fontSize: "0.8rem",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "3px",
                          padding: "0.3rem 0.6rem",
                          borderRadius: "6px",
                          border: "1px solid rgba(108,99,255,0.2)",
                          transition: "all 0.2s",
                        }}
                      >
                        <ExternalLink size={12} />
                      </Link>
                      <button
                        id={`edit-course-btn-${course.id}`}
                        onClick={() => handleOpenEdit(course)}
                        title="Edit course"
                        style={{
                          background: "rgba(67,188,205,0.1)",
                          border: "1px solid rgba(67,188,205,0.2)",
                          borderRadius: "6px",
                          color: "#43BCCD",
                          cursor: "pointer",
                          padding: "0.3rem 0.6rem",
                          display: "inline-flex",
                          alignItems: "center",
                          transition: "all 0.2s",
                        }}
                      >
                        <Pencil size={12} />
                      </button>
                      <button
                        id={`delete-course-btn-${course.id}`}
                        onClick={() => handleDelete(course)}
                        disabled={deletingId === course.id}
                        title="Delete course"
                        style={{
                          background: "rgba(239,68,68,0.1)",
                          border: "1px solid rgba(239,68,68,0.2)",
                          borderRadius: "6px",
                          color: "#f87171",
                          cursor: deletingId === course.id ? "not-allowed" : "pointer",
                          padding: "0.3rem 0.6rem",
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

      {/* Modal */}
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
