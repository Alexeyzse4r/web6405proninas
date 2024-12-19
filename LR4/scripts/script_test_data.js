document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const name = document.getElementById('name').value.trim();
    const surname = document.getElementById('surname').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();

    let isValid = true;
    if (name === '') {
        document.getElementById('nameError').textContent = 'Имя обязательно для заполнения.';
        isValid = false;
    } else {
        document.getElementById('nameError').textContent = '';
    }

    if (surname === '') {
        document.getElementById('surnameError').textContent = 'Фамилия обязательна для заполнения.';
        isValid = false;
    } else {
        document.getElementById('surnameError').textContent = '';
    }

    if (email === '') {
        document.getElementById('emailError').textContent = 'Электронная почта обязательна для заполнения.';
        isValid = false;
    } else if (!validateEmail(email)) {
        document.getElementById('emailError').textContent = 'Введите корректный адрес электронной почты.';
        isValid = false;
    } else {
        document.getElementById('emailError').textContent = '';
    }

if (phone === '') {
    document.getElementById('phoneError').textContent = 'Номер телефона обязателен для заполнения.';
    isValid = false;
} else if (!/^\+?\d{1,3}?[-.\s]?(\(?\d{1,4}?\)?[-.\s]?)?\d{1,4}[-.\s]?\d{1,9}$/.test(phone)) {//Проверка разных форматов номера
    document.getElementById('phoneError').textContent = 'Введите корректный номер телефона.';
    isValid = false;
} else {
    document.getElementById('phoneError').textContent = '';
}


    if (isValid) {
        sendData(name, surname, email, phone);
        document.getElementById('dataForm').reset();
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

async function sendData(name, surname, email, phone) {
    const url = 'http://localhost:3000/form';

    const data = { name, surname, email, phone };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }

        const result = await response.json();
        
        console.log(result.data.response);
        alert('Данные успешно отправлены!'); 
    } catch (error) {
        console.error('Ошибка при отправке данных:', error);
        alert('Не получилось отправить данные');
    }
}