const blockedChars = ['<', '>', '"', "'", ';'];

  document.querySelectorAll('.sanitized').forEach((input) => {
    input.addEventListener('keydown', (e) => {
      if (blockedChars.includes(e.key)) {
        e.preventDefault();
      }
    });
  });
  async function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission

    const form = event.target;
    const data = {
      name: form.name.value.trim(),
      phone: form.phone.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim()
    };

    try {
      const res = await fetch("https://sender-h832.onrender.com/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await res.text();
      alert("Message sent: " + result);
      form.reset(); // Optional: clear form after sending
    } catch (err) {
      alert("Failed to send message.");
      console.error(err);
    }
  }
