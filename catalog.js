const quests = [
    {
        id: 1,
        title: 'Бункер 13',
        genre: 'Хоррор',
        minPlayers: 2,
        maxPlayers: 6,
        duration: '70 мин',
        price: 2500,
        rating: 4.9,
        emoji: '🧟',
        description: 'Вы заперты в заброшенном бункере. Запасы воздуха тают, а по коридорам бродит нечто. Сможете ли вы найти выход до того, как тьма поглотит вас?'
    },
    {
        id: 2,
        title: 'Тайна старой усадьбы',
        genre: 'Детектив',
        minPlayers: 2,
        maxPlayers: 8,
        duration: '80 мин',
        price: 3000,
        rating: 4.8,
        emoji: '🕵️',
        description: 'В усадьбе XIX века найден труп хозяина. Вы — следователи, которым предстоит раскрыть запутанное дело, пока убийца не скрылся.'
    },
    {
        id: 3,
        title: 'Космическая станция',
        genre: 'Фантастика',
        minPlayers: 3,
        maxPlayers: 6,
        duration: '60 мин',
        price: 2200,
        rating: 4.7,
        emoji: '🚀',
        description: 'Системы жизнеобеспечения станции выходят из строя. Найдите причину аварии и почините реактор, пока орбита не стала вашей могилой.'
    },
    {
        id: 4,
        title: 'Безумный шляпник',
        genre: 'Приключения',
        minPlayers: 2,
        maxPlayers: 5,
        duration: '75 мин',
        price: 2400,
        rating: 4.6,
        emoji: '🃏',
        description: 'Сумасшедший чаепитие в Стране чудес обернулось ловушкой. Решите загадки Шляпника и вернитесь домой, пока время не вышло.'
    },
    {
        id: 5,
        title: 'Подземелье дракона',
        genre: 'Фэнтези',
        minPlayers: 4,
        maxPlayers: 8,
        duration: '90 мин',
        price: 3500,
        rating: 4.9,
        emoji: '🏰',
        description: 'Легенда гласит, что в подземелье спит дракон, охраняющий сокровища. Соберите артефакты и выберитесь, не разбудив чудовище.'
    },
    {
        id: 6,
        title: 'Ограбление века',
        genre: 'Экшн',
        minPlayers: 2,
        maxPlayers: 6,
        duration: '70 мин',
        price: 2600,
        rating: 4.8,
        emoji: '⚡',
        description: 'Вы — команда воров, которой поручено ограбить неприступный банк. Взломайте сейф, обойдите охрану и скройтесь до приезда полиции.'
    },
    {
        id: 7,
        title: 'Проклятие куклы',
        genre: 'Хоррор',
        minPlayers: 2,
        maxPlayers: 5,
        duration: '65 мин',
        price: 2300,
        rating: 4.7,
        emoji: '🎎',
        description: 'Старая кукла, найденная на чердаке, оказалась не просто игрушкой. Снимите проклятие, пока она не забрала вас в свой мир.'
    },
    {
        id: 8,
        title: 'Шерлок: Дело о рубине',
        genre: 'Детектив',
        minPlayers: 2,
        maxPlayers: 6,
        duration: '85 мин',
        price: 3200,
        rating: 4.9,
        emoji: '🔍',
        description: 'Бесследно исчез легендарный рубин. Вы — команда Шерлока Холмса. Изучите улики, допросите подозреваемых и найдите вора.'
    },
    {
        id: 9,
        title: 'Зомби-апокалипсис',
        genre: 'Хоррор',
        minPlayers: 3,
        maxPlayers: 8,
        duration: '80 мин',
        price: 2800,
        rating: 4.8,
        emoji: '🧟‍♂️',
        description: 'Город захвачен зомби. Проберитесь через заражённые улицы к вертолётной площадке и спасите свою группу.'
    },
    {
        id: 10,
        title: 'Машина времени',
        genre: 'Фантастика',
        minPlayers: 2,
        maxPlayers: 4,
        duration: '70 мин',
        price: 2500,
        rating: 4.6,
        emoji: '⏰',
        description: 'Сумасшедший учёный изобрёл машину времени, но потерял ключ от неё в прошлом. Отправляйтесь в разные эпохи и исправьте хронолинию.'
    },
    {
        id: 11,
        title: 'Пиратский остров',
        genre: 'Приключения',
        minPlayers: 3,
        maxPlayers: 7,
        duration: '75 мин',
        price: 2700,
        rating: 4.7,
        emoji: '🏴‍☠️',
        description: 'Карта сокровищ привела вас на необитаемый остров. Разгадайте шифры старого пирата и найдите клад, пока корабль не уплыл.'
    },
    {
        id: 12,
        title: 'Королевская темница',
        genre: 'Фэнтези',
        minPlayers: 2,
        maxPlayers: 6,
        duration: '80 мин',
        price: 2900,
        rating: 4.5,
        emoji: '👑',
        description: 'Вы — узники королевской темницы, обвинённые в государственной измене. Найдите доказательства невиновности и сбегите до казни.'
    }
];

const grid          = document.getElementById('quests-grid');
const searchInput   = document.getElementById('search-input');
const genreFilter   = document.getElementById('genre-filter');
const companyFilter = document.getElementById('company-filter');
const resetBtn      = document.getElementById('reset-filters');
const resultsCount  = document.getElementById('results-count');
const noResults     = document.getElementById('no-results');

const state = {
    search: '',
    genre: 'all',
    company: 'all'
};

function populateFilters() {
    if (!genreFilter) return;

    const genres = [...new Set(quests.map(q => q.genre))].sort();

    genres.forEach(g => {
        const opt = document.createElement('option');
        opt.value = g;
        opt.textContent = g;
        genreFilter.appendChild(opt);
    });
}

function getFilteredQuests() {
    return quests.filter(q => {
        const matchesSearch = q.title.toLowerCase().includes(state.search.toLowerCase());
        const matchesGenre  = state.genre === 'all' || q.genre === state.genre;
        const matchesCompany = state.company === 'all' || q.maxPlayers >= Number(state.company);
        return matchesSearch && matchesGenre && matchesCompany;
    });
}

function renderQuests() {
    if (!grid) return;

    const filtered = getFilteredQuests();
    grid.innerHTML = '';

    if (resultsCount) {
        resultsCount.innerHTML = `Найдено: <span>${filtered.length}</span> из ${quests.length}`;
    }

    if (filtered.length === 0) {
        if (noResults) noResults.style.display = 'block';
        return;
    }

    if (noResults) noResults.style.display = 'none';

    filtered.forEach(q => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.addEventListener('click', () => openQuestModal(q.id));

        card.innerHTML = `
            <div class="poster">${q.emoji}</div>
            <div class="movie-info">
                <h3>${q.title}</h3>
                <p>${q.genre} • ${q.minPlayers}–${q.maxPlayers} чел.</p>
                <div class="movie-footer">
                    <span class="rating">★ ${q.rating}</span>
                    <span style="font-size:13px;color:var(--text-muted);">${q.duration}</span>
                </div>
            </div>
        `;

        grid.appendChild(card);
    });
}

const questModal   = document.getElementById('quest-modal');
const questDetails = document.getElementById('quest-details');

function openQuestModal(id) {
    const quest = quests.find(q => q.id === id);
    if (!quest || !questModal) return;

    const today = new Date().toISOString().split('T')[0];

    questDetails.innerHTML = `
        <div class="movie-modal-body">
            <div class="movie-modal-poster">${quest.emoji}</div>
            <div class="movie-modal-info">
                <h2>${quest.title}</h2>
                <span class="rating-big">★ ${quest.rating}</span>
                <div class="meta">
                    <span>${quest.genre}</span>
                    <span>${quest.minPlayers}–${quest.maxPlayers} чел.</span>
                    <span>${quest.duration}</span>
                </div>
                <p>${quest.description}</p>
                <p><strong>Стоимость:</strong> ${quest.price} ₽ (за команду)</p>

                <div class="booking-form">
                    <h3>Забронировать</h3>
                    <div class="field">
                        <label>Дата</label>
                        <input type="date" id="booking-date" min="${today}">
                    </div>
                    <div class="field">
                        <label>Время</label>
                        <select id="booking-time">
                            <option value="">Выберите время</option>
                            <option>10:00</option>
                            <option>12:00</option>
                            <option>14:00</option>
                            <option>16:00</option>
                            <option>18:00</option>
                            <option>20:00</option>
                            <option>22:00</option>
                        </select>
                    </div>
                    <div class="field">
                        <label>Количество человек</label>
                        <input type="number" id="booking-players"
                               min="${quest.minPlayers}" max="${quest.maxPlayers}"
                               value="${quest.minPlayers}">
                    </div>
                    <button class="btn-watch" onclick="bookQuest(${quest.id})">✅ Забронировать</button>
                </div>
            </div>
        </div>
    `;

    questModal.style.display = 'block';
}

function closeQuestModal() {
    if (questModal) questModal.style.display = 'none';
}

function bookQuest(id) {
    const quest = quests.find(q => q.id === id);
    if (!quest) return;

    const date    = document.getElementById('booking-date').value;
    const time    = document.getElementById('booking-time').value;
    const players = parseInt(document.getElementById('booking-players').value, 10);

    if (!date) {
        alert('Пожалуйста, выберите дату.');
        return;
    }
    if (!time) {
        alert('Пожалуйста, выберите время.');
        return;
    }
    if (isNaN(players) || players < quest.minPlayers || players > quest.maxPlayers) {
        alert(`Количество человек должно быть от ${quest.minPlayers} до ${quest.maxPlayers}.`);
        return;
    }

    alert(
        `Бронь оформлена!\n\n` +
        `Квест: ${quest.title}\n` +
        `Дата: ${date}\n` +
        `Время: ${time}\n` +
        `Человек: ${players}\n` +
        `Стоимость: ${quest.price} ₽\n\n` +
        `Подтверждение придёт на email.`
    );
    closeQuestModal();
}

window.addEventListener('click', (e) => {
    if (e.target === questModal) closeQuestModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeQuestModal();
});

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        state.search = e.target.value;
        renderQuests();
    });
}

if (genreFilter) {
    genreFilter.addEventListener('change', (e) => {
        state.genre = e.target.value;
        renderQuests();
    });
}

if (companyFilter) {
    companyFilter.addEventListener('change', (e) => {
        state.company = e.target.value;
        renderQuests();
    });
}

if (resetBtn) {
    resetBtn.addEventListener('click', () => {
        state.search = '';
        state.genre = 'all';
        state.company = 'all';
        if (searchInput) searchInput.value = '';
        if (genreFilter) genreFilter.value = 'all';
        if (companyFilter) companyFilter.value = 'all';
        renderQuests();
    });
}

populateFilters();
renderQuests();