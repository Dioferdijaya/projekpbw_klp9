const cardContainer = document.getElementById('cardContainer');
const addButton = document.getElementById('addButton');

// Ambil data dari localStorage
let users = JSON.parse(localStorage.getItem('users')) || [];

// Tampilkan semua user ke halaman
function displayUsers() {
  cardContainer.innerHTML = ''; // Bersihkan dulu
  users.forEach((user, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="foto">
        <img src="${user.photo}" alt="Foto" />
      </div>
      <h3>${user.name}</h3>
      <p>${user.desc}</p>
      <button class="edit-btn" data-index="${index}">Ubah</button>
      <button class="delete-btn" data-index="${index}">Hapus</button>
    `;
    cardContainer.appendChild(card);
  });

  // Event listener tombol hapus (dijalankan ulang setiap displayUsers dipanggil)
  const deleteButtons = document.querySelectorAll('.delete-btn');
  deleteButtons.forEach(button => {
    button.addEventListener('click', function() {
      const index = this.getAttribute('data-index');
      // Hapus user di array berdasarkan index
      users.splice(index, 1);
      // Update localStorage
      localStorage.setItem('users', JSON.stringify(users));
      // Tampilkan ulang data
      displayUsers();
    });
  });

  // Event listener untuk tombol ubah
  const editButtons = document.querySelectorAll('.edit-btn');
  editButtons.forEach(button => {
    button.addEventListener('click', function() {
      const index = this.getAttribute('data-index');
      window.location.href = `ubah-profil.html?index=${index}`;
    });
  });
}

displayUsers();

// Button ke halaman tambah
addButton.addEventListener('click', () => {
  window.location.href = 'tambah-user.html';
});

