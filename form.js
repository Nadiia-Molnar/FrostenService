    const scriptURL = "https://script.google.com/macros/s/AKfycbyIAVTfhfvjz5FMsJVMZn8d8t2Ugi3R7DWvCHCe28ot1Rul3e1f31MP58-V_WeNNUhZ/exec";

    document.getElementById("contact-form").addEventListener("submit", function(e) {
        e.preventDefault();

    const formData = {
        name: this.name.value,
    company: this.company.value,
    email: this.email.value,
    message: this.message.value
    };

    fetch(scriptURL, {
        method: "POST",
    body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => {
        alert("Message sent!");
    this.reset();
    })
    .catch(err => {
        console.error(err);
    alert("Error sending message");
    });
});