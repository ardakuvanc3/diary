// Kullanıcı adı ve şifre doğrulama işlemi
function login(event) {
    event.preventDefault();

    // Kullanıcı adı ve şifreyi al
    const username = document.getElementById('usernameInput').value;
    const password = document.getElementById('passwordInput').value;

    // Kullanıcı adı ve şifreyi kontrol et
    if (username === 'admin' && password === '1234') {
        // Giriş başarılı ise günlük alanını göster
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('entriesContainer').style.display = 'block';

        // Günlükleri yükle
        loadEntriesFromLocalStorage();
    } else {
        // Giriş başarısız ise hata mesajı göster
        alert('Geçersiz kullanıcı adı veya şifre!');
    }
}

// Günlük yazılarını tutmak için bir dizi
let entries = [];

// Form gönderildiğinde çalışacak fonksiyon
function handleSubmit(event) {
    event.preventDefault();

    // Başlık ve günlük yazısını al
    const title = document.getElementById('titleInput').value;
    const entry = document.getElementById('entryInput').value;

    // Girişleri temizle
    document.getElementById('titleInput').value = '';
    document.getElementById('entryInput').value = '';

    // Günlük nesnesini oluştur
    const newEntry = {
        title,
        entry,
        timestamp: new Date()
    };

    // Günlüklere ekle
    entries.push(newEntry);

    // Günlükleri göster
    displayEntries();

    // Günlüğü yerel depolamaya kaydet
    saveEntryToLocalStorage();
}

// Günlükleri gösteren fonksiyon
function displayEntries() {
    const entriesList = document.getElementById('entriesList');
    entriesList.innerHTML = '';

    // Günlükleri dönerek HTML içeriğini oluştur
    entries.forEach((entry, index) => {
        const entryDiv = document.createElement('div');
        entryDiv.classList.add('entry');

        const titleHeading = document.createElement('h3');
        titleHeading.innerText = entry.title;

        const viewButton = document.createElement('button');
        viewButton.innerText = 'Oku';

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Sil';

        // Okuma butonuna tıklama olayını ekle
        viewButton.addEventListener('click', () => {
            viewEntry(index);
        });

        // Silme butonuna tıklama olayını ekle
        deleteButton.addEventListener('click', () => {
            deleteEntry(index);
        });

        entryDiv.appendChild(titleHeading);
        entryDiv.appendChild(viewButton);
        entryDiv.appendChild(deleteButton);

        entriesList.appendChild(entryDiv);
    });
}

// Günlüğü silen fonksiyon
function deleteEntry(index) {
    entries.splice(index, 1);
    displayEntries();

    // Güncellenmiş günlükleri yerel depolamada sakla
    saveEntryToLocalStorage();
}

// Günlüğü görüntüleme fonksiyonu
function viewEntry(index) {
    const viewEntryContainer = document.getElementById('viewEntryContainer');
    const viewEntryContent = document.getElementById('viewEntryContent');
    const backButton = document.getElementById('backButton');

    // Seçilen günlüğü al
    const selectedEntry = entries[index];

    // Günlük içeriğini oluştur
    const titleHeading = document.createElement('h3');
    titleHeading.innerText = selectedEntry.title;

    const entryPara = document.createElement('p');
    entryPara.innerText = selectedEntry.entry;

    const timestampPara = document.createElement('p');
    timestampPara.innerText = selectedEntry.timestamp.toLocaleString();

    viewEntryContent.innerHTML = '';
    viewEntryContent.appendChild(titleHeading);
    viewEntryContent.appendChild(entryPara);
    viewEntryContent.appendChild(timestampPara);

    // Görüntüleme alanını göster ve günlükler alanını gizle
    document.getElementById('entriesContainer').style.display = 'none';
    viewEntryContainer.style.display = 'block';

    // Geri butonunu dinle
    backButton.addEventListener('click', () => {
        viewEntryContainer.style.display = 'none';
        document.getElementById('entriesContainer').style.display = 'block';
    });
}

// Günlükleri yerel depolamadan yükleme fonksiyonu
function loadEntriesFromLocalStorage() {
    const storedEntries = localStorage.getItem('entries');

    if (storedEntries) {
        entries = JSON.parse(storedEntries);
    }

    displayEntries();
}

// Günlüğü yerel depolamaya kaydetme fonksiyonu
function saveEntryToLocalStorage() {
    localStorage.setItem('entries', JSON.stringify(entries));
}

// Günlük yazma alanını boyuna büyütme işlemi
function expandTextarea() {
    const entryInput = document.getElementById('entryInput');
    entryInput.style.height = 'auto';
    entryInput.style.height = entryInput.scrollHeight + 'px';
}

// Sayfa yüklendiğinde çalışacak işlevler
window.onload = function() {
    // Giriş formunu dinle
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', login);

    // Günlük formunu dinle
    const entryForm = document.getElementById('entryForm');
    entryForm.addEventListener('submit', handleSubmit);

    // Yazı alanını boyuna büyütme işlevini dinle
    const entryInput = document.getElementById('entryInput');
    entryInput.addEventListener('input', expandTextarea);
};
