
function loadContent(category) {
  const targetSection = document.getElementById(category + '-section');
  
  if (targetSection) {
      targetSection.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
      });
  }
}
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.accordion-toggle').forEach(toggle => {
      toggle.addEventListener('click', function() {
          const parent = this.closest('.box-content-block');
          const answer = parent.querySelector('.box-content-answer');
          
          // بستن بقیه
          document.querySelectorAll('.box-content-block').forEach(box => {
              if (box !== parent) {
                  box.classList.remove('active');
                  box.querySelector('.box-content-answer').style.maxHeight = null;
              }
          });

          // باز یا بسته کردن فعلی
          if (parent.classList.contains('active')) {
              parent.classList.remove('active');
              answer.style.maxHeight = null;
          } else {
              parent.classList.add('active');
              answer.style.maxHeight = answer.scrollHeight + "px"; // محاسبه دقیق ارتفاع
          }
      });
  });
});