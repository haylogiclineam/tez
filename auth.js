const tabs = document.querySelectorAll(".tab");
const forms = document.querySelectorAll(".form");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    const target = tab.dataset.tab;
    forms.forEach(form => {
      form.classList.toggle("active", form.id.includes(target));
    });
  });
});

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    window.location.href = "new.html";
  });