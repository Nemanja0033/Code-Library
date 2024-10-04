import Footer from "../components/Footer"
import { Nav, NavLink } from "../components/Navbar"

export const dynamic = "force-dynamic"

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode
  }>) {
    return (
        <>
          <Nav>
          <NavLink href="/">Home</NavLink>
          <NavLink href="/products">eBooks</NavLink>
          <NavLink href="/about">Docs</NavLink>
        </Nav>
        <div className="container my-6">{children}</div>
        <Footer />
        </>
    )
  }