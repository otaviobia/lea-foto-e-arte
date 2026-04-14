// Grab the elements from the DOM
const hamburgerBtn = document.querySelector('.header-hamburger'); // From your header HTML
const closeSidebarBtn = document.getElementById('closeSidebarBtn');
const sidebar = document.getElementById('mobileSidebar');
const overlay = document.getElementById('sidebarOverlay');

// Function to open
function openSidebar() {
  sidebar.classList.add('active');
  overlay.classList.add('active');
  // Optional: Prevent the background page from scrolling while menu is open
  document.body.style.overflow = 'hidden'; 
}

// Function to close
function closeSidebar() {
  sidebar.classList.remove('active');
  overlay.classList.remove('active');
  // Allow the background page to scroll again
  document.body.style.overflow = ''; 
}

// Add Click Listeners
hamburgerBtn.addEventListener('click', openSidebar);
closeSidebarBtn.addEventListener('click', closeSidebar);

// Also close it if the user taps the dark background outside the menu!
overlay.addEventListener('click', closeSidebar);