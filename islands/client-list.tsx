import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

type Client = {
  id: string;
  Name: string;
  Email: string;
};

const ClientList = () => {
  const clients = useSignal([]);
  const clientsFiltered = useSignal([]);
  const search = useSignal("");
  const loading = useSignal(true);

  async function fetchClients() {
    loading.value = true;
    const response = await fetch("/api/client");
    const data = await response.json();
    clients.value = data;
    clientsFiltered.value = data;
    loading.value = false;
  }

  useEffect(() => {
    fetchClients();
  }, []);

  function deleteClient(id: string) {
    fetch(`/api/client?id=${id}`, {
      method: "DELETE",
    });
    fetchClients();
  }

  return (
    <div style={{ width: "100%" }}>
      <input
        type="text"
        placeholder="Search"
        style={{ width: "100%", marginBottom: "10px", marginTop: "10px" }}
        value={search.value}
        onInput={(event) => {
          search.value = event.currentTarget.value;
          clientsFiltered.value = clients.value.filter((client: Client) =>
            client.Name.toLowerCase().includes(search.value.toLowerCase())
          );
        }}
      />
      {loading.value && <div>Loading...</div>}
      {clients.value.length === 0 && <div>No clients</div>}
      {clients.value.length !== 0 && (
        <div style={{ width: "100%" }}>
          {clientsFiltered.value.map((client: Client) => (
            <div
              key={client.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                itemsAlign: "center",
                padding: "10px",
                borderBottom: "1px solid #ccc",
                width: "calc(100% - 20px)",
              }}
            >
              <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexDirection: "column",
                  }}
                >
                  <p>Name: {client.Name}</p>
                  <p>Email: {client.Email}</p>
                </div>
              </div>
              <button onClick={() => deleteClient(client.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientList;
