import type { NextAuthConfig } from "next-auth"

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const pathname = nextUrl.pathname

      const protectedRoutes = ["/dashboard", "/profile", "/cart", "/checkout", "/my-courses", "/orders", "/admin"]
      const isProtected = protectedRoutes.some((route) => pathname.startsWith(route))

      if (isProtected && !isLoggedIn) {
        return Response.redirect(new URL("/auth/signin", nextUrl))
      }

      if (pathname.startsWith("/admin")) {
        const role = (auth?.user as any)?.role
        if (role !== "ADMIN") {
          return Response.redirect(new URL("/", nextUrl))
        }
      }

      return true
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role
        token.avatar = (user as any).avatar
      }
      return token
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        ;(session.user as any).role = token.role
        ;(session.user as any).avatar = token.avatar
      }
      return session
    },
  },
  providers: [], // Empty array for middleware compatibility
}
