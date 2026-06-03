const hamburgerBtn = document.querySelector('.header-hamburger');
const closeSidebarBtn = document.getElementById('closeSidebarBtn');
const sidebar = document.getElementById('mobileSidebar');
const overlay = document.getElementById('sidebarOverlay');

function openSidebar() {
  sidebar.classList.add('active');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden'; 
}

function closeSidebar() {
  sidebar.classList.remove('active');
  overlay.classList.remove('active');
  document.body.style.overflow = ''; 
}

hamburgerBtn.addEventListener('click', openSidebar);
closeSidebarBtn.addEventListener('click', closeSidebar);

overlay.addEventListener('click', closeSidebar);