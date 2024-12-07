document.addEventListener("DOMContentLoaded", function () {
  function validateForm() {
    const name = document.getElementById("name").value.trim();
    const namePattern = /^[a-zA-ZäöüÄÖÜßéàèÉÀÈ]+(?:\s[a-zA-ZäöüÄÖÜßéàè]+)+$/;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{10,15}$/;

    if (!namePattern.test(name)) {
      alert("Bitte geben Sie einen gültigen Namen ein.");
      return false;
    }

    if (!emailPattern.test(email)) {
      alert("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
      return false;
    }

    if (!phonePattern.test(phone)) {
      alert("Bitte geben Sie eine gültige Telefonnummer ein.");
      return false;
    }

    return true;
  }

  const scrollToTopButton = document.getElementById("scrollToTop");

  // Show or hide the button when scrolling
  window.onscroll = function () {
    if (
      document.body.scrollTop > 200 ||
      document.documentElement.scrollTop > 200
    ) {
      scrollToTopButton.style.display = "flex";
    } else {
      scrollToTopButton.style.display = "none";
    }
  };

  // Scroll to the top when the button is clicked
  scrollToTopButton.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.openSidebar = function () {
    document.getElementById("mySidebar").style.width = "250px";
  };

  window.closeSidebar = function () {
    document.getElementById("mySidebar").style.width = "0";
  };

  const form = document.getElementById("serviceForm");
  form.onsubmit = function (event) {
    event.preventDefault(); // Verhindert das Standard-Formular-Submit

    if (validateForm()) {
      const formData = new FormData(form);
      const currentDate = new Date().toISOString(); // Aktuelles Datum
      const pickupDate = document.getElementById("pickup-date").value;

      // Zusätzliche Daten in das FormData-Objekt einfügen
      formData.append("create_date", currentDate);
      formData.append("pickup_date", pickupDate);
      // Senden an den Server

      fetch("http://localhost:5000/api/registration", {
        method: "POST",
        body: JSON.stringify({
          ...Object.fromEntries(formData),
          pickup_date: pickupDate,
        }), // Hier wird pickupDate hinzugefügt
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          window.location.href = "ende.html";
        })
        .catch((error) => {
          console.error("Fehler:", error);
          alert("Es gab ein Problem mit der Serviceanmeldung.");
        });
    }
  };

  // Logik für das Abholdatum
  const prioritySelect = document.getElementById("priority");

  prioritySelect.addEventListener("change", function () {
    const priority = prioritySelect.value;
    const currentDate = new Date();
    let additionalDays;

    switch (priority) {
      case "tief":
        additionalDays = 5;
        break;
      case "standard":
        additionalDays = 0;
        break;
      case "express":
        additionalDays = -2;
        break;
      default:
        additionalDays = 0;
    }

    const totalDays = 7 + additionalDays;
    const pickupDate = new Date(currentDate);
    pickupDate.setDate(currentDate.getDate() + totalDays);

    const formattedDate = `${pickupDate
      .getDate()
      .toString()
      .padStart(2, "0")}.${(pickupDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}.${pickupDate.getFullYear().toString().slice(-2)}`;

    document.getElementById("pickup-date").value = formattedDate;
  });
});
