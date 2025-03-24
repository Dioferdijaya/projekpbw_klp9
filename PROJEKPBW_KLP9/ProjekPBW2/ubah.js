const userForm = document.getElementById('userForm');

// Ambil data pengguna dari localStorage
let users = JSON.parse(localStorage.getItem('users')) || [];
const userIndex = new URLSearchParams(window.location.search).get('index');
const user = users[userIndex];

// Tampilkan data pengguna di form
document.getElementById('nameInput').value = user.name;
document.getElementById('descInput').value = user.desc;

if (user.photo) {
  const img = document.createElement('img');
  img.src = user.photo;
  img.alt = "Foto Pengguna";
  img.style.width = "100px"; // Atur ukuran gambar
  document.body.appendChild(img);
}

userForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('nameInput').value;
  const desc = document.getElementById('descInput').value;
  const photoFile = document.getElementById('photoInput').files[0];

  const reader = new FileReader();
  
  reader.onloadend = function() {
    const photoData = reader.result; // Hasil base64 dari foto

    // Update data pengguna
    users[userIndex] = { name, desc, photo: photoFile ? photoData : user.photo };
    localStorage.setItem('users', JSON.stringify(users));

    window.location.href = 'admin.html';
  };

  if (photoFile) {
    reader.readAsDataURL(photoFile); // Convert to base64
  } else {
    // Jika tidak ada foto baru, langsung simpan
    users[userIndex].name = name;
    users[userIndex].desc = desc;
    localStorage.setItem('users', JSON.stringify(users));
    window.location.href = 'admin.html';
  }
});

// Tambahkan event listener untuk tombol kembali
document.getElementById('backButton').addEventListener('click', function() {
  window.location.href = 'admin.html'; // Kembali ke halaman utama
});