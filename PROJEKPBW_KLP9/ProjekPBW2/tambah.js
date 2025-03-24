const userForm = document.getElementById('userForm');

userForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('nameInput').value;
  const desc = document.getElementById('descInput').value;
  const photoFile = document.getElementById('photoInput').files[0];

  const reader = new FileReader();
  
  reader.onloadend = function() {
    const photoData = reader.result; // Hasil base64 dari foto

    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ name, desc, photo: photoData });
    localStorage.setItem('users', JSON.stringify(users));

    window.location.href = 'admin.html';
  };

  if (photoFile) {
    reader.readAsDataURL(photoFile); // Convert to base64
  }
});
