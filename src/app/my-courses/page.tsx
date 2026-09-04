import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import Image from "next/image"
import { BookOpen, PlayCircle } from "lucide-react"

export default async function MyCoursesPage() {
  const session = await auth()
  if (!session || !session.user?.id) redirect("/auth/signin")

  const enrollments = await prisma.enrollment.findMany({
    where: { userId: session.user.id },
    include: { course: true },
    orderBy: { enrolledAt: "desc" }
  })

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh", paddingTop: "6rem", paddingBottom: "4rem" }}>
      <div className="container-custom">
        <h1 style={{ fontFamily: "Outfit", fontSize: "2rem", fontWeight: 800, color: "#F0F0FF", marginBottom: "0.5rem" }}>
          My Enrolled Courses ({enrollments.length})
        </h1>
        <p style={{ color: "#A0A0C0", fontSize: "0.95rem", marginBottom: "2.5rem" }}>
          Access your lessons, projects, and certificates.
        </p>

        {enrollments.length === 0 ? (
          <div className="card" style={{ padding: "4rem 2rem", textAlign: "center", maxWidth: 500, margin: "0 auto" }}>
            <BookOpen size={48} color="#6060A0" style={{ margin: "0 auto 1rem" }} />
            <h2 style={{ fontFamily: "Outfit", fontSize: "1.3rem", fontWeight: 700, color: "#F0F0FF", marginBottom: "0.5rem" }}>
              No Enrolled Courses Found
            </h2>
            <p style={{ color: "#6060A0", fontSize: "0.9rem", marginBottom: "2rem" }}>
              You haven't enrolled in any courses yet. Browse our top tech programs to start learning!
            </p>
            <Link href="/courses" className="btn-primary" style={{ padding: "0.8rem 2rem" }}>
              Explore Courses
            </Link>
          </div>
        ) : (
          <div className="courses-grid">
            {enrollments.map(({ course, progress }) => (
              <div key={course.id} className="card" style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
                <div style={{ position: "relative", height: 180 }}>
                  <Image src={course.image} alt={course.title} fill style={{ objectFit: "cover" }} />
                </div>
                <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
                  <span className="badge badge-primary" style={{ fontSize: "0.65rem", width: "fit-content", marginBottom: "0.5rem" }}>
                    {course.category}
                  </span>
                  <h3 style={{ fontFamily: "Outfit", fontSize: "1.1rem", fontWeight: 700, color: "#F0F0FF", marginBottom: "0.75rem" }}>
                    {course.title}
                  </h3>

                  <div style={{ marginTop: "auto", marginBottom: "1.25rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", color: "#A0A0C0", marginBottom: "0.4rem" }}>
                      <span>Course Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${progress}%` }} />
                    </div>
                  </div>

                  <button className="btn-primary" style={{ width: "100%", justifyContent: "center", padding: "0.75rem", fontSize: "0.9rem" }}>
                    <PlayCircle size={18} /> Continue Learning
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
