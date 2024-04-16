import { PageProps } from "$fresh/server.ts";

export default function Layout({ Component }: PageProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        color: "#333",
        fontFamily: "Arial, sans-serif",
        padding: "0px",
      }}
    >
      <header
        style={{
          width: "100%",
          padding: "20px",
          textAlign: "center",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #ccc",
        }}
      >
        <a href="/">
          <h1>
            Practica-4-B
          </h1>
        </a>
        <div style={{ display: "flex", gap: "20px" }}>
          <a href="/invoice/create">Create Invoice</a>
          <a href="/client/create">Create Client</a>
          <a href="/client">Clients</a>
        </div>
      </header>
      <Component />
    </div>
  );
}
