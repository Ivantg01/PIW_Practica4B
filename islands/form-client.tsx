import { useState } from "preact/hooks";

export default function ClientForm() {
  const [client, setClient] = useState<Client>({
    Name: "",
    Email: "",
    Address: "",
    City: "",
    Country: "",
    Phone: "",
  });

  function handleChange(event: any) {
    event.preventDefault();
    if(validateForm()===true){
      fetch("/api/client", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(client),
      });
    }
  }
  const validateForm = () => {
    if(client.Name && client.Email && client.Address && client.City
        && client.Country && client.Phone){
      return true
    }else{
      return false
    }
  }

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginTop: "20px",
      }}
      onSubmit={handleChange}
    >
      <input
        type="text"
        placeholder="Name"
        value={client?.Name}
        oninput={(event) => setClient({ ...client, Name: event.target.value })}
      />
      <input
        type="text"
        placeholder="Email"
        value={client?.Email}
        oninput={(event) =>
          setClient({ ...client, Email: event.target.value })}
      />
      <input
        type="text"
        placeholder="Address"
        value={client?.Address}
        oninput={(event) =>
          setClient({ ...client, Address: event.target.value })}
      />
      <input
        type="text"
        placeholder="City"
        value={client?.City}
        oninput={(event) => setClient({ ...client, City: event.target.value })}
      />
      <input
        type="text"
        placeholder="Country"
        value={client?.Country}
        oninput={(event) =>
          setClient({ ...client, Country: event.target.value })}
      />
      <input
        type="text"
        placeholder="Phone"
        value={client?.Phone}
        oninput={(event) =>
          setClient({ ...client, Phone: event.target.value })}
      />
      <button type="submit">Create</button>
    </form>
  );
}

type Client = {
  Name: string;
  Email: string;
  Address: string;
  City: string;
  Country: string;
  Phone: string;
};
