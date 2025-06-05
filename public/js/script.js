// Thêm sự kiện khi DOM đã sẵn sàng
document.addEventListener("DOMContentLoaded", () => {
  const aside = document.getElementById("aside");
  const overlay = document.getElementById("overlay");

  // Đóng sidebar khi click vào overlay
  overlay.addEventListener("click", closeSidebar);

  // Hàm mở hoặc đóng sidebar
  function toggleSidebar() {
    aside.classList.toggle("open");
    overlay.classList.toggle("show");
  }

  // Hàm chỉ đóng sidebar
  function closeSidebar() {
    aside.classList.remove("open");
    overlay.classList.remove("show");
  }

  // Gán sự kiện cho nút mở sidebar
  const toggleButton = document.getElementById("menubar");
  const toggleClose = document.getElementById("closeMenuBar");
  toggleButton.addEventListener("click", toggleSidebar);
  toggleClose.addEventListener("click", toggleSidebar);

  const themeToggler = document.querySelector(".theme-toggler");

  themeToggler.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    themeToggler.querySelector("span:nth-child(1)").classList.toggle("active");
    themeToggler.querySelector("span:nth-child(2)").classList.toggle("active");
  });
});
