const display = document.getElementById('display');

// Добавление символа
function append(char) {
    // Если на экране 0 или ошибка — очищаем перед вводом
    if (display.value === "0" || display.value === "Ошибка") {
        display.value = "";
    }
    display.value += char;
}

// Очистка
function clearDisplay() {
    display.value = "";
}

// Удаление последнего символа
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// Вычисление
function calculate() {
    try {
        // Заменяем визуальную запятую на точку для расчетов (если нужно)
        // Но в коде мы сразу передаем точку в функцию append
        let result = eval(display.value);
        
        // Проверка на деление на ноль или некорректный результат
        if (!isFinite(result)) {
            display.value = "Ошибка";
        } else {
            // Округляем до 8 знаков, чтобы избежать проблем с точностью JS
            display.value = parseFloat(result.toFixed(8));
        }
    } catch (e) {
        display.value = "Ошибка";
    }
}

// Поддержка клавиатуры
document.addEventListener('keydown', (e) => {
    if (/[0-9]/.test(e.key)) append(e.key);
    if (['+', '-', '*', '/'].includes(e.key)) append(e.key);
    if (e.key === '.' || e.key === ',') append('.');
    if (e.key === 'Enter' || e.key === '=') calculate();
    if (e.key === 'Backspace') deleteLast();
    if (e.key === 'Escape') clearDisplay();
});