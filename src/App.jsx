import { useState } from "react";

const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const chain_id = import.meta.env.VITE_TELEGRAM_CHAT_ID;

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = `https://api.telegram.org/bot${botToken}/sendDocument`;

    const formData = new FormData();
    formData.append("chat_id", chain_id);
    formData.append("caption", `New message from \n Name: ${name}, \n Email: ${email}, \n Message: ${message}`);
    formData.append("document", file);

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log("Message sent:", data);
      alert("Message sent successfully!");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("An error occurred while sending your message.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label htmlFor="message">Message</label>
      <textarea
        id="message"
        name="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      ></textarea>

      <label htmlFor="file">File</label>
      <input
        type="file"
        id="file"
        name="file"
        accept="image/*,application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button type="submit">Send Message</button>
    </form>
  );
}

export default ContactForm;
