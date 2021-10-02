import * as React from "react"
import { Link } from "gatsby"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer className="footer">
        © {new Date().getFullYear()} Braden Wright
        <div>
          <a href="https://bradenwrightportfolio.gatsbyjs.io/">portfolio</a>{" "}
          •&nbsp;
          <a href="https://github.com/brad0s">github</a> •&nbsp;
          <a href="https://twitter.com/Braden23763605">twitter</a> •&nbsp;
          <a href="https://www.linkedin.com/in/wright-braden/">linkedin</a>
        </div>
      </footer>
    </div>
  )
}

export default Layout
