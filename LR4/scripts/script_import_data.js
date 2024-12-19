async function fetchProductsData() {
    try {
        const response = await fetch('http://localhost:3000/nn510');
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        const responseData = await response.json();
        
        if (!Array.isArray(responseData.data)) {
            console.error('Полученные данные не являются массивом:', responseData.data);
            alert('Не удалось загрузить данные. Пожалуйста, попробуйте позже.');
            return;
        }

        updateTable(responseData.data);
        
    } catch (error) {
        console.error('Ошибка при запросе данных:', error);
        alert('Не удалось загрузить данные. Пожалуйста, попробуйте позже.');
    }
}

function updateTable(data) {
    const tbody = document.querySelector("#productsTable tbody"); 
    tbody.innerHTML = ''; 

    data.forEach(el => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${el.name}</td> <!-- Используем name как название продукта -->
            <td>${el.description}</td> <!-- Используем description как описание -->
            <td>${el.price}</td> <!-- Используем price как цену -->
        `;
        tbody.appendChild(row);
    });
}
document.addEventListener('DOMContentLoaded', fetchProductsData);
