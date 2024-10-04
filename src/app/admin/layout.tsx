import { Nav } from "../components/Navbar"
import { NavLink } from "../components/Navbar"

export const dynamic = "force-dynamic"

export default function AdminLayout({
    children,
  }: Readonly<{
    children: React.ReactNode
  }>) {
    return (
      <>
        <Nav>
          <NavLink href="/admin">Dashboard</NavLink>
          <NavLink href="/admin/products">Products</NavLink>
          <NavLink href="/">Customers Page</NavLink>
        </Nav>
        <div className="container my-6">{children}</div>  
      </>
    )
  }