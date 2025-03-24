document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    
    if (!validateEmail(email)) {
        alert('Masukkan email yang valid.');
        return;
    }
    if (!validatePassword(password)) {
        alert('Password harus minimal 6 karakter dan mengandung setidaknya satu huruf besar, satu huruf kecil, dan satu angka.');
        return;
    }

    // Ambil data dari user.txt
    try {
        const response = await fetch('user.txt');
        const data = await response.text();
        const users = data.split('\n').map(line => line.trim().split(',')); // Pisahkan email, password, role
        
        let isAuthenticated = false;
        let userRole = '';

        for (let user of users) {
            if (user[0] === email && user[1] === password) {
                isAuthenticated = true;
                userRole = user[2]; // Ambil role (user atau admin)
                break;
            }
        }
        
        if (isAuthenticated) {
            alert('Login berhasil!');
            if (userRole === 'admin') {
                window.location.href = 'admin.html'; // Halaman admin
            } else {
                window.location.href = 'user.html'; // Halaman user
            }
        } else {
            alert('Email atau password salah!');
        }
    } catch (error) {
        console.error('Gagal mengambil data user:', error);
        alert('Terjadi kesalahan, silakan coba lagi nanti.');
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return re.test(password);
}