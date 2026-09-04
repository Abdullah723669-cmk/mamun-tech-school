"use client"

import { useState, useEffect } from "react"
import { X, Loader2, BookOpen, Save } from "lucide-react"

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

interface CourseFormModalProps {
  course?: Course | null
  onClose: () => void
  onSaved: () => void
}

const LEVELS = ["Beginner", "Intermediate", "Advanced"]
const CATEGORIES = [
  "Web Development",
  "Mobile Development",
  "Data Science",
  "Machine Learning",
  "DevOps",
  "Cybersecurity",
  "Graphic Design",
  "Digital Marketing",
  "Business",
  "Other",
]

const defaultForm = {
  title: "",
  description: "",
  shortDesc: "",
  image: "",
  price: "",
  duration: "",
  level: "Beginner",
  category: "Web Development",
  instructor: "",
  instructorBio: "",
  instructorAvatar: "",
  highlights: "",
  requirements: "",
  curriculum: "",
  published: true,
  featured: false,
}

export default function CourseFormModal({ course, onClose, onSaved }: CourseFormModalProps) {
  const isEdit = !!course
  const [form, setForm] = useState({ ...defaultForm })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (course) {
      // Parse JSON arrays to newline-separated strings for textarea
      const parseArr = (val: string) => {
        try {
          const arr = JSON.parse(val)
          return Array.isArray(arr) ? arr.join("\n") : val
        } catch {
          return val
        }
      }
      setForm({
        title: course.title,
        description: course.description,
        shortDesc: course.shortDesc,
        image: course.image,
        price: String(course.price),
        duration: course.duration,
        level: course.level,
        category: course.category,
        instructor: course.instructor,
        instructorBio: course.instructorBio,
        instructorAvatar: course.instructorAvatar || "",
        highlights: parseArr(course.highlights),
        requirements: parseArr(course.requirements),
        curriculum: parseArr(course.curriculum),
        published: course.published,
        featured: course.featured,
      })
    }
  }, [course])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }))
    } else {
      setForm((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Convert newline-separated textarea values to JSON arrays
    const toJsonArr = (val: string) =>
      JSON.stringify(
        val
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean)
      )

    const payload = {
      ...form,
      price: parseFloat(form.price),
      highlights: toJsonArr(form.highlights),
      requirements: toJsonArr(form.requirements),
      curriculum: toJsonArr(form.curriculum),
    }

    try {
      const url = isEdit ? `/api/admin/courses/${course!.id}` : "/api/admin/courses"
      const method = isEdit ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.message || "Something went wrong")
        return
      }

      onSaved()
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.65rem 0.9rem",
    background: "rgba(26,26,40,0.9)",
    border: "1px solid rgba(108,99,255,0.25)",
    borderRadius: "10px",
    color: "#F0F0FF",
    fontSize: "0.9rem",
    outline: "none",
    transition: "border-color 0.2s",
    fontFamily: "Inter, sans-serif",
  }

  const labelStyle: React.CSSProperties = {
    display: "block",
    color: "#A0A0C0",
    fontSize: "0.8rem",
    fontWeight: 600,
    marginBottom: "0.4rem",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  }

  const formGroupStyle: React.CSSProperties = {
    marginBottom: "1.1rem",
  }

  return (
    <div
      id="course-form-modal-overlay"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(4px)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
      onClick={(e) => {
        if ((e.target as HTMLElement).id === "course-form-modal-overlay") onClose()
      }}
    >
      <div
        style={{
          background: "#12121A",
          border: "1px solid rgba(108,99,255,0.25)",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "760px",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1.5rem 2rem",
            borderBottom: "1px solid rgba(108,99,255,0.12)",
            position: "sticky",
            top: 0,
            background: "#12121A",
            zIndex: 1,
            borderRadius: "20px 20px 0 0",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: "10px",
                background: "linear-gradient(135deg,#6C63FF,#43BCCD)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <BookOpen size={18} color="white" />
            </div>
            <div>
              <h2 style={{ fontFamily: "Outfit", fontSize: "1.15rem", fontWeight: 800, color: "#F0F0FF" }}>
                {isEdit ? "Edit Course" : "Add New Course"}
              </h2>
              <p style={{ color: "#6060A0", fontSize: "0.78rem" }}>
                {isEdit ? `Editing: ${course!.title}` : "Fill in the details to create a new course"}
              </p>
            </div>
          </div>
          <button
            id="course-modal-close-btn"
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              color: "#A0A0C0",
              cursor: "pointer",
              padding: "0.4rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s",
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: "1.75rem 2rem" }}>
          {error && (
            <div
              style={{
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.3)",
                borderRadius: "10px",
                padding: "0.75rem 1rem",
                color: "#f87171",
                fontSize: "0.88rem",
                marginBottom: "1.25rem",
              }}
            >
              {error}
            </div>
          )}

          {/* Row 1: Title + Category */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Course Title *</label>
              <input
                id="course-title"
                style={inputStyle}
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Full Stack Web Development"
                required
              />
            </div>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Category *</label>
              <select
                id="course-category"
                style={{ ...inputStyle, cursor: "pointer" }}
                name="category"
                value={form.category}
                onChange={handleChange}
                required
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c} style={{ background: "#12121A" }}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2: Price + Duration + Level */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Price (৳) *</label>
              <input
                id="course-price"
                style={inputStyle}
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={handleChange}
                placeholder="e.g. 4999"
                required
              />
            </div>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Duration *</label>
              <input
                id="course-duration"
                style={inputStyle}
                name="duration"
                value={form.duration}
                onChange={handleChange}
                placeholder="e.g. 40 Hours"
                required
              />
            </div>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Level</label>
              <select
                id="course-level"
                style={{ ...inputStyle, cursor: "pointer" }}
                name="level"
                value={form.level}
                onChange={handleChange}
              >
                {LEVELS.map((l) => (
                  <option key={l} value={l} style={{ background: "#12121A" }}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Short Description */}
          <div style={formGroupStyle}>
            <label style={labelStyle}>Short Description *</label>
            <input
              id="course-short-desc"
              style={inputStyle}
              name="shortDesc"
              value={form.shortDesc}
              onChange={handleChange}
              placeholder="A brief one-line summary of the course"
              required
            />
          </div>

          {/* Full Description */}
          <div style={formGroupStyle}>
            <label style={labelStyle}>Full Description *</label>
            <textarea
              id="course-description"
              style={{ ...inputStyle, minHeight: 90, resize: "vertical" }}
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Detailed description of what students will learn..."
              required
            />
          </div>

          {/* Image URL */}
          <div style={formGroupStyle}>
            <label style={labelStyle}>Course Image URL *</label>
            <input
              id="course-image"
              style={inputStyle}
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://example.com/course-thumbnail.jpg"
              required
            />
          </div>

          {/* Instructor Row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Instructor Name *</label>
              <input
                id="course-instructor"
                style={inputStyle}
                name="instructor"
                value={form.instructor}
                onChange={handleChange}
                placeholder="e.g. Md. Mamun Hossain"
                required
              />
            </div>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Instructor Avatar URL</label>
              <input
                id="course-instructor-avatar"
                style={inputStyle}
                name="instructorAvatar"
                value={form.instructorAvatar}
                onChange={handleChange}
                placeholder="https://example.com/avatar.jpg"
              />
            </div>
          </div>

          {/* Instructor Bio */}
          <div style={formGroupStyle}>
            <label style={labelStyle}>Instructor Bio *</label>
            <textarea
              id="course-instructor-bio"
              style={{ ...inputStyle, minHeight: 70, resize: "vertical" }}
              name="instructorBio"
              value={form.instructorBio}
              onChange={handleChange}
              placeholder="Brief bio about the instructor..."
              required
            />
          </div>

          {/* Highlights */}
          <div style={formGroupStyle}>
            <label style={labelStyle}>Highlights (one per line)</label>
            <textarea
              id="course-highlights"
              style={{ ...inputStyle, minHeight: 80, resize: "vertical" }}
              name="highlights"
              value={form.highlights}
              onChange={handleChange}
              placeholder={"Build 5 real projects\nLearn React, Node.js & MongoDB\nLifetime access"}
            />
          </div>

          {/* Requirements */}
          <div style={formGroupStyle}>
            <label style={labelStyle}>Requirements (one per line)</label>
            <textarea
              id="course-requirements"
              style={{ ...inputStyle, minHeight: 70, resize: "vertical" }}
              name="requirements"
              value={form.requirements}
              onChange={handleChange}
              placeholder={"Basic HTML & CSS knowledge\nA computer with internet access"}
            />
          </div>

          {/* Curriculum */}
          <div style={formGroupStyle}>
            <label style={labelStyle}>Curriculum Modules (one per line)</label>
            <textarea
              id="course-curriculum"
              style={{ ...inputStyle, minHeight: 80, resize: "vertical" }}
              name="curriculum"
              value={form.curriculum}
              onChange={handleChange}
              placeholder={"Module 1: Introduction\nModule 2: Core Concepts\nModule 3: Advanced Topics"}
            />
          </div>

          {/* Published + Featured toggles */}
          <div style={{ display: "flex", gap: "2rem", marginBottom: "1.5rem" }}>
            <label
              id="course-published-toggle"
              style={{ display: "flex", alignItems: "center", gap: "0.6rem", cursor: "pointer", color: "#A0A0C0", fontSize: "0.9rem", fontWeight: 500 }}
            >
              <input
                type="checkbox"
                name="published"
                checked={form.published}
                onChange={handleChange}
                style={{ width: 16, height: 16, accentColor: "#6C63FF" }}
              />
              Published (visible to students)
            </label>
            <label
              id="course-featured-toggle"
              style={{ display: "flex", alignItems: "center", gap: "0.6rem", cursor: "pointer", color: "#A0A0C0", fontSize: "0.9rem", fontWeight: 500 }}
            >
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
                style={{ width: 16, height: 16, accentColor: "#FFD700" }}
              />
              Featured (show on homepage)
            </label>
          </div>

          {/* Submit */}
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
            <button
              id="course-form-cancel-btn"
              type="button"
              onClick={onClose}
              style={{
                padding: "0.65rem 1.5rem",
                background: "transparent",
                border: "1px solid rgba(108,99,255,0.3)",
                borderRadius: "50px",
                color: "#A0A0C0",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "0.9rem",
                transition: "all 0.2s",
              }}
            >
              Cancel
            </button>
            <button
              id="course-form-submit-btn"
              type="submit"
              disabled={loading}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.65rem 1.75rem",
                background: "linear-gradient(135deg,#6C63FF,#43BCCD)",
                border: "none",
                borderRadius: "50px",
                color: "white",
                cursor: loading ? "not-allowed" : "pointer",
                fontWeight: 700,
                fontSize: "0.9rem",
                opacity: loading ? 0.7 : 1,
                transition: "all 0.2s",
              }}
            >
              {loading ? (
                <>
                  <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
                  {isEdit ? "Saving..." : "Creating..."}
                </>
              ) : (
                <>
                  <Save size={16} />
                  {isEdit ? "Save Changes" : "Create Course"}
                </>
              )}
            </button>
          </div>
        </form>

        <style>{`
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          input:focus, textarea:focus, select:focus {
            border-color: #6C63FF !important;
            box-shadow: 0 0 0 3px rgba(108,99,255,0.15) !important;
          }
        `}</style>
      </div>
    </div>
  )
}
