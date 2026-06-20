export default function Footer() {
  return (
    <footer
      className="py-10 px-6 text-center"
      style={{ borderTop: "1px solid #1a1a1a", background: "#080808" }}
    >
      <p className="text-xs tracking-widest uppercase" style={{ color: "#333" }}>
        © {new Date().getFullYear()} Moawya &nbsp;·&nbsp; All rights reserved
      </p>
    </footer>
  );
}
