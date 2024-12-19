// Обработка отправки формы
document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем стандартное поведение формы

    // Получаем значения полей ввода
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();

    // Проверка введенных данных
    let isValid = true;

    // Проверка имени
    if (name === '') {
        document.getElementById('nameError').textContent = 'Имя обязательно для заполнения.';
        isValid = false;
    } else {
        document.getElementById('nameError').textContent = '';
    }

    // Проверка электронной почты
    if (email === '') {
        document.getElementById('emailError').textContent = 'Электронная почта обязательна для заполнения.';
        isValid = false;
    } else if (!validateEmail(email)) {
        document.getElementById('emailError').textContent = 'Введите корректный адрес электронной почты.';
        isValid = false;
    } else {
        document.getElementById('emailError').textContent = '';
    }

    // Если данные валидны, отправляем POST-запрос
    if (isValid) {
        sendData(name, email);
        document.getElementById('dataForm').reset(); // Сбрасываем форму после отправки
    }
});

// Функция для проверки корректности электронной почты
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Простое регулярное выражение для проверки email
    return re.test(String(email).toLowerCase());
}

// Функция для отправки POST-запроса (имитация)
function sendData(name, email) {
    console.log(`Отправка данных: Имя - ${name}, Email - ${email}`);
    
    // Здесь можно добавить код для отправки данных на сервер через fetch или XMLHttpRequest

}

// Асинхронный запрос для получения данных (имитация)
async function fetchData() {
    try {
        const response = await fetch('http://127.0.0.1:3000/nn510')
        if (!response.ok) throw new Error('Ошибка сети');
        
        const data = await response.json();
        populateTable(data);
        
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        alert('Не удалось загрузить данные. Попробуйте позже.');
    }
}

function populateTable(data) {
    const tableBody = document.querySelector('#dataTable tbody');
    
    data.forEach(dataset => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${dataset.name}</td>
            <td>${dataset.description}</td>
            <td>${dataset.price}</td>
        `;
        
        tableBody.appendChild(row);
    });
}

window.onload = fetchData;
