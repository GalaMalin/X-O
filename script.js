
// Задан блок с девятью блоками-ячейками - расположение в виде таблицы три на три:
// все ячейки имеют внутри одинаковую картинку pic00.
// Ячейки одинаковые, но имеет значение их местоположение:
// Eсть два игрока: X и O.
// Игроки ходят попеременно.
// Игрок X - человек, нажимает на ячейку мышкой:
// - в ней меняется картинка на pic01
// - ячейка становится помеченной (приобретает признак игрока X).
// Игрок O - компьютер: 
// - он рандомно выбирает ячейку и помечает ее (приобретает признак игрока O):
// - в ней меняется картинка на pic02.
// Заданы выигрышные комбинации трех помеченных ячеек по их местоположению в таблице:
// 123 456 789 159 753 147 258 369.
// Игрок Х ходит первым.
// После каждого действия игроков:
// - нужно проверить, не появилась ли выигрышная комбинация помеченных ячеек:
// -- если да - конец игры, выиграл игрок, который отметил свяи ячейки в выигрышной комбинации. Появляется надпись "Победил игрок..."
// -- если нет - проверка, есть ли свободные ячейки, которые можно выбрать игроку, чья очередь делать ход: 
// --- если свободные ячейки есть - переход хода другому игроку, игра продолжается,
// --- если свободных ячеек нет - ничья. Появляется надпись "Ничья!"


// // Описание кода
// // HTML Разметка: Создается простая структура с заголовком, ячейками в виде сетки и областью для вывода сообщений.
// // CSS: Используется Grid Layout для отображения ячеек в виде таблицы 3 на 3. Каждая ячейка имеет фоновое изображение pic00.
// // JavaScript:
// // Обработчики событий: Каждая ячейка реагирует на клики, запускается функция playerMove, где проверяется, есть ли возможность сделать ход.
// // Ход игрока X: При клике на ячейку она меняет изображение на X и проверяется, выиграл ли игрок.
// // Ход компьютера O: Компьютер выбирает случайную свободную ячейку, меняет её изображение и также проверяет победителя.
// // Проверка условий выигрыша и ничьей: Функции проверки выигрышных комбинаций и условия ничьей.
// // Закрытие игры: При выигрыше или ничьей отключаются обработчики кликов для дальнейших действий.

// Начало. По нажатию кнопки Начать становится видимым игровое поле и приглашение сделать ход
const zagImg = document.getElementById('zag_img1'); //стартовая картинка
const userBoard = document.getElementById('my_board'); //игровое поле
const btnStart = document.getElementById('btn_start'); //Сыграем
const btn_contin = document.getElementById('btn_contin'); //Начать заново
const message = document.getElementById('message'); // Сообщение

function startGame() {    
    userBoard.style.display = "block";
    zagImg.style.display = "none";
    btnStart.style.display = "none";
    message.style.display = "block";
    message.innerText = 'Твой ход! Выбери ячейку!';
    btn_contin.style.display = "none";    
}

function startGame0() {    
    location.reload();      
}

// Здесь нужно передать функцию как ссылку, без круглых скобок
btnStart.addEventListener("click", startGame);
btn_contin.addEventListener("click", startGame0);


// Игра
// Заданы переменные:
// ячейки
const cells = document.querySelectorAll('.cell');
// картинки игрока X и O
const X_IMAGE = 'pic01.png';
const O_IMAGE = 'pic02.png';
// играющий игрок, первый X
let currentPlayer = 'X';

let board = ['', '', '', '', '', '', '', '', ''];
// выигрышные комбинации по data-index
const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Горизонтальные
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Вертикальные
    [0, 4, 8], [2, 4, 6]             // Диагонали
];
// задана функция щелчка мыши
cells.forEach(cell => {
    cell.addEventListener('click', playerMove);
});

// функция игры игрока X
// определяет, что ячейка пуста, меняет картинку, вносит индекс X, 
// проерка выигрыша игрока, пишет о победе
function playerMove() {
    const index = this.dataset.index;
        if (board[index] === '' && currentPlayer === 'X') {
            this.style.backgroundImage = `url(${X_IMAGE})`;
            board[index] = 'X';
        if (checkWin('X')) {
            message.innerText = 'Ты победил! Отличная игра!';

            endGame();
        return;
        }
    currentPlayer = 'O'; // Смена игрока
    computerMove(); // Ход компьютера
    }
}
// функция игры игрока O
// задает переменную ячейки на карте, без индекса, нумерует их с 0 до длины; 
// задает переменную рандомного выбора номера из пронумерованных, в этой ячейке меняет картинку,
// проверка выигрыша игрока, пишет о победе
function computerMove() {
    let availableCells = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
    if (availableCells.length === 0) {
        draw();
    return;
    }
    const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    cells[randomIndex].style.backgroundImage = `url(${O_IMAGE})`;
    board[randomIndex] = 'O';
    if (checkWin('O')) {
        message.innerText = 'В этот раз компьютер оказался сильнее ☺';
        endGame();
    return;
}
    currentPlayer = 'X'; // Смена игрока обратно
    checkDraw();
}
// функция проверка выигрыша игрока
function checkWin(player) {
    return winConditions.some(condition => {
        return condition.every(index => board[index] === player);
        });
}
// функция проверки свободных ячеек
function checkDraw() {
    if (board.every(cell => cell !== '')) {
        message.innerText = 'Ничья!';
        endGame();
        }
}
// фнкция надписи Ничья
function draw() {
    message.innerText = 'Ничья!';
    endGame();
}
// функция конца игры (не работает, вроде, по щелчку ничего не происходит)
function endGame() {
    cells.forEach(cell => cell.removeEventListener('click', playerMove));
    btn_contin.style.display = "block";
}

