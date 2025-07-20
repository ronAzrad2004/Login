const blockedChars = ['<', '>', '"', "'", ';'];
const emailDomains = [
  "gmail.com",
  "outlook.com",
  "yahoo.com",
  "icloud.com",
  "protonmail.com",
  "aol.com",
  "zoho.com",
  "gmx.com",
  "mail.com",
  "yandex.com",
  "tutanota.com",
  "fastmail.com",
  "rediffmail.com",
  "inbox.lv",
  "rambler.ru",
  "mail.ru",
  "web.de",
  "freenet.de",
  "orange.fr",
  "seznam.cz"
];
  document.querySelectorAll('.sanitized').forEach((input) => {
    input.addEventListener('keydown', (e) => {
      if (blockedChars.includes(e.key)) {
        e.preventDefault();
      }
    });
  });

  async function handleSubmit(event) {
    event.preventDefault(); // Stop the default form submission

    const form = event.target;
    console.log("Form submitted:", form);
    const data = {
      name: form.querySelector('input[name="name"]').value.trim(),
      phone: form.querySelector('input[name="phone"]').value.trim(),
      email: form.querySelector('input[name="email"]').value.trim(),
      message: form.querySelector('textarea[name="message"]').value.trim()
    };
    if (check_email(data.email)=== false) {
      alert("Please enter a valid email address.");
      return;
    }
    try {
      const res = await fetch("https://sender-h832.onrender.com/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await res.text();
      alert("Message sent: " + result);
      form.reset();
    } catch (err) {
      alert("Failed to send message.");
      console.error(err);
    }
  }
function check_email(email) {
  let domain = email.split('@')[1];
  return emailDomains.includes(domain);
}
