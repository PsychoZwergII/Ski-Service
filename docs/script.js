document.addEventListener("DOMContentLoaded", function () {
  function validateForm() {
    const name = document.getElementById("name").value;
    const namePattern = /^[a-zA-ZäöüÄÖÜß]+$/;
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

  window.openSidebar = function () {
    document.getElementById("mySidebar").style.width = "250px";
  };

  window.closeSidebar = function () {
    document.getElementById("mySidebar").style.width = "0";
  };

  document.getElementById("serviceForm").onsubmit = function (event) {
    event.preventDefault();
    if (validateForm()) {
      const formData = new FormData(this);
      fetch("https://example.com/api/submit_service", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          alert("Serviceanmeldung erfolgreich!");
        })
        .catch((error) => {
          console.error("Fehler:", error);
          alert("Es gab ein Problem mit der Serviceanmeldung.");
        });
    }
  };
});

// Get the button
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

document.addEventListener("DOMContentLoaded", function () {
  const prioritySelect = document.getElementById("priority");
  const pickupDateDisplay = document.createElement("p");
  pickupDateDisplay.id = "pickup-date";
  document.getElementById("service-form").appendChild(pickupDateDisplay);

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

    pickupDateDisplay.textContent = `Abholdatum: ${pickupDate.toLocaleDateString(
      "de-DE"
    )}`;
  });
});
