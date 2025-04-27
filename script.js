document.addEventListener('DOMContentLoaded', function() {
  // Tab System
  document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
          // Hide all tab contents
          document.querySelectorAll('.tab-content').forEach(content => {
              content.classList.remove('active');
          });
          
          // Deactivate all buttons
          document.querySelectorAll('.tab-btn').forEach(b => {
              b.classList.remove('active');
          });
          
          // Activate current
          btn.classList.add('active');
          document.getElementById(btn.dataset.tab).classList.add('active');
      });
  });

  // Album Buttons
  document.querySelectorAll('.album-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
          e.preventDefault();
          const albumTitle = this.parentElement.querySelector('h3').textContent;
          alert(`Viewing tracks for ${albumTitle}`);
          
          // Change button text temporarily
          const originalText = this.textContent;
          this.textContent = 'Loading...';
          
          setTimeout(() => {
              this.textContent = originalText;
          }, 1000);
      });
  });

  // Image Gallery Lightbox
  const galleryImages = document.querySelectorAll('.image-gallery img');
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox-content');
  const closeBtn = document.querySelector('.close');

  galleryImages.forEach(img => {
      img.addEventListener('click', () => {
          lightbox.style.display = 'flex';
          lightboxImg.src = img.src;
      });
  });

  closeBtn.addEventListener('click', () => {
      lightbox.style.display = 'none';
  });

  lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
          lightbox.style.display = 'none';
      }
  });

  // Secret Button (Long Press)
  const secretButton = document.getElementById('secret-btn');
  let pressTimer;

  secretButton.addEventListener('mousedown', () => {
      pressTimer = setTimeout(() => {
          secretButton.textContent = 'Rolling in the Deep!';
          document.body.classList.add('easter-egg');
          setTimeout(() => {
              secretButton.textContent = 'Press and Hold';
              document.body.classList.remove('easter-egg');
          }, 3000);
      }, 2000);
  });

  secretButton.addEventListener('mouseup', () => {
      clearTimeout(pressTimer);
  });

  secretButton.addEventListener('mouseleave', () => {
      clearTimeout(pressTimer);
  });

  // Form Validation
  const form = document.getElementById('fan-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const formSuccess = document.getElementById('form-success');

  // Real-time name validation
  nameInput.addEventListener('input', () => {
      const nameError = document.getElementById('name-error');
      if (nameInput.value.trim().length < 2) {
          nameError.textContent = 'Name must be at least 2 characters';
          nameInput.classList.add('invalid');
      } else {
          nameError.textContent = '';
          nameInput.classList.remove('invalid');
      }
  });

  // Real-time email validation
  emailInput.addEventListener('input', () => {
      const emailError = document.getElementById('email-error');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
          emailError.textContent = 'Please enter a valid email address';
          emailInput.classList.add('invalid');
      } else {
          emailError.textContent = '';
          emailInput.classList.remove('invalid');
      }
  });

  // Password strength meter
  passwordInput.addEventListener('input', () => {
      const strength = checkPasswordStrength(passwordInput.value);
      updateStrengthMeter(strength);
  });

  function checkPasswordStrength(password) {
      let score = 0;
      if (password.length >= 8) score++;
      if (/[A-Z]/.test(password)) score++;
      if (/[0-9]/.test(password)) score++;
      if (/[^A-Za-z0-9]/.test(password)) score++;
      return score;
  }

  function updateStrengthMeter(strength) {
      const strengthBar = document.querySelector('.strength-bar');
      const strengthText = document.querySelector('.strength-text');
      
      const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
      const strengthColors = ['#ff4444', '#ffbb33', '#00C851', '#33b5e5', '#4285F4'];
      
      strengthBar.style.width = `${(strength / 4) * 100}%`;
      strengthBar.style.backgroundColor = strengthColors[strength];
      strengthText.textContent = strengthLabels[strength];
  }

  // Form submission handler
  form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Validate all fields
      let isValid = true;
      
      if (nameInput.value.trim().length < 2) {
          document.getElementById('name-error').textContent = 'Name must be at least 2 characters';
          nameInput.classList.add('invalid');
          isValid = false;
      }
      
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
          document.getElementById('email-error').textContent = 'Please enter a valid email address';
          emailInput.classList.add('invalid');
          isValid = false;
      }
      
      if (passwordInput.value.length < 8) {
          updateStrengthMeter(0);
          isValid = false;
      }
      
      if (isValid) {
          // Simulate form submission
          form.classList.add('hidden');
          formSuccess.classList.remove('hidden');
      }
  });

  // Reset form button
  document.getElementById('reset-form').addEventListener('click', () => {
      form.reset();
      form.classList.remove('hidden');
      formSuccess.classList.add('hidden');
      
      // Reset validation states
      document.querySelectorAll('.error-message').forEach(el => {
          el.textContent = '';
      });
      
      document.querySelectorAll('input').forEach(input => {
          input.classList.remove('invalid');
      });
      
      updateStrengthMeter(0);
  });

  // Social buttons
  document.querySelectorAll('.social-btn').forEach(btn => {
      btn.addEventListener('click', function() {
          const platform = this.textContent;
          alert(`This would link to Adele's ${platform} page (if this were a real site)`);
      });
  });

  // Keypress detection for Easter egg (Konami code)
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
                     'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
                     'b', 'a'];
  let konamiIndex = 0;

  document.addEventListener('keydown', (e) => {
      if (e.key === konamiCode[konamiIndex]) {
          konamiIndex++;
          if (konamiIndex === konamiCode.length) {
              document.body.classList.add('easter-egg');
              setTimeout(() => {
                  document.body.classList.remove('easter-egg');
              }, 5000);
              konamiIndex = 0;
          }
      } else {
          konamiIndex = 0;
      }
  });
});