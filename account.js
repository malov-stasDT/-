(function () {

    const userRaw = localStorage.getItem('currentUser');
    if (!userRaw) {

        window.location.href = 'index.html';
        return;
    }

    const user = JSON.parse(userRaw);

    const greeting = document.getElementById('user-greeting');
    if (greeting) greeting.textContent = `Привет, ${user.name}!`;

    const welcomeText = document.getElementById('welcome-text');
    if (welcomeText) {
        welcomeText.textContent = `Рады видеть вас снова, ${user.name}. Управляйте бронями и настройками здесь.`;
    }

    const profileName  = document.getElementById('profile-name');
    const profileEmail = document.getElementById('profile-email');
    const avatar       = document.getElementById('profile-avatar');
    if (profileName)  profileName.textContent  = user.name;
    if (profileEmail) profileEmail.textContent = user.email;
    if (avatar)       avatar.textContent       = user.name.charAt(0).toUpperCase();

    // Брони
    const bookingsList  = document.getElementById('bookings-list');
    const emptyBookings = document.getElementById('empty-bookings');

    const bookings = JSON.parse(localStorage.getItem('bookings_' + user.email) || '[]');

    if (bookings.length === 0) {
        if (bookingsList)  bookingsList.style.display  = 'none';
        if (emptyBookings) emptyBookings.style.display = 'block';
    } else {
        if (emptyBookings) emptyBookings.style.display = 'none';

        bookingsList.innerHTML = bookings.map((b, idx) => `
            <div class="booking-card">
                <div class="booking-emoji">${b.emoji || '🔐'}</div>
                <div class="booking-info">
                    <h3>${b.title}</h3>
                    <p>${b.date} • ${b.time} • ${b.players} чел.</p>
                    <p class="booking-price">${b.price} ₽</p>
                </div>
                <button class="booking-cancel" onclick="cancelBooking(${idx})">Отменить</button>
            </div>
        `).join('');
    }

    window.cancelBooking = function (index) {
        if (!confirm('Отменить эту бронь?')) return;

        const updated = bookings.filter((_, i) => i !== index);
        localStorage.setItem('bookings_' + user.email, JSON.stringify(updated));
        location.reload();
    };

    window.logout = function () {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    };
})();