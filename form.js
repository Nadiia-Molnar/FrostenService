const scriptURL = "https://script.google.com/macros/s/AKfycbyIAVTfhfvjz5FMsJVMZn8d8t2Ugi3R7DWvCHCe28ot1Rul3e1f31MP58-V_WeNNUhZ/exec";
const contactForm = document.getElementById("contact-form");

contactForm?.addEventListener("submit", async function (event) {
    event.preventDefault();
    const button = this.querySelector("button[type='submit']");
    const status = this.querySelector(".form-status");
    const originalText = button.innerHTML;
    button.disabled = true;
    button.textContent = "Sending request...";
    status.textContent = "";

    const formData = {
        name: this.name.value.trim(),
        phone: this.phone.value.trim(),
        company: this.company.value.trim(),
        email: this.email.value.trim(),
        message: this.message.value.trim()
    };

    try {
        const response = await fetch(scriptURL, { method: "POST", body: JSON.stringify(formData) });
        if (!response.ok) throw new Error("Request failed");
        status.textContent = "Thank you — your service request was sent. We’ll be in touch soon.";
        this.reset();
    } catch (error) {
        console.error(error);
        status.innerHTML = 'We could not send the form. Please call <a href="tel:+19049270797">(904) 927-0797</a>.';
    } finally {
        button.disabled = false;
        button.innerHTML = originalText;
    }
});
