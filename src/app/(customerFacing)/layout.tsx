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
          <a className="self-center font-semibold lg:text-xl" href="/">Code<span className="text-muted-foreground">Commerce</span></a>
          <NavLink href="/">Home</NavLink>
          <NavLink href="/products">eBooks</NavLink>
          <NavLink href="/about">About</NavLink>
        </Nav>
        <div className="container my-6">{children}</div>
        </>
    )
  }