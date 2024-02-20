document.addEventListener("DOMContentLoaded", function () {
    // Весь ваш JavaScript код здесь

    // Создаем двумерный массив
    var map = [];

    //Заполняем массив значениями
    for (var i = 0; i < 24; i++) {
        map[i] = [];
        for (var j = 0; j < 40; j++) {
            // Задаем границы карты
            if (i === 0 || i === 23 || j === 0 || j === 39) {
                map[i][j] = 1; // Стена
            } else {
                map[i][j] = 0; // Пол
            }
        }
    }

    // Теперь у нас есть двумерный массив map, представляющий карту размером 40x24,
    // где 0 обозначает пол, а 1 - стену.

    // Обновляем массив, чтобы пометить все клетки вокруг как стены
    for (var i = 0; i < 24; i++) {
        for (var j = 0; j < 40; j++) {
            map[i][j] = 1; // Стена
        }
    }
    // Функция для создания прямоугольной комнаты и заполнения ее клетками массива полом
    function createRoom(map, x, y, width, height) {
        for (var i = y; i < y + height; i++) {
            for (var j = x; j < x + width; j++) {
                map[i][j] = 0; // Пол
            }
        }
    }

    // Генерируем случайное количество и размеры прямоугольных комнат
    var numberOfRooms = Math.floor(Math.random() * 6) + 5; 
    for (var k = 0; k < numberOfRooms; k++) {
        var roomWidth = Math.floor(Math.random() * 6) + 3; 
        var roomHeight = Math.floor(Math.random() * 6) + 3; 
        var roomX = Math.floor(Math.random() * (39 - roomWidth)) + 1; 
        var roomY = Math.floor(Math.random() * (23 - roomHeight)) + 1; 
        createRoom(map, roomX, roomY, roomWidth, roomHeight);
    }

    // Функция для создания вертикального прохода на всю высоту карты
    function createVerticalPath(map, x) {
        for (var i = 0; i < map.length; i++) {
            map[i][x] = 0; // Пол
        }
    }

    // Функция для создания горизонтального прохода на всю ширину карты
    function createHorizontalPath(map, y) {
        for (var j = 0; j < map[0].length; j++) {
            map[y][j] = 0; // Пол
        }
    }

    // Генерируем случайные вертикальные проходы
    var numberOfVerticalPaths = Math.floor(Math.random() * 3) + 3; 
    for (var v = 0; v < numberOfVerticalPaths; v++) {
        var pathX = Math.floor(Math.random() * 38) + 1;  
        createVerticalPath(map, pathX);
    }

    // Генерируем случайные горизоонтальные проходы
    var numberOfHorizontalPaths = Math.floor(Math.random() * 3) + 3; 
    for (var h = 0; h < numberOfHorizontalPaths; h++) {
        var pathY = Math.floor(Math.random() * 22) + 1; 
        createHorizontalPath(map, pathY);
    }


    // Создаем элементы <div> для клеток и добавляем их в HTML для отображения карты
    var field = document.querySelector('.field');
    var tilesHTML = '';

    for (var i = 0; i < map.length; i++) {
        for (var j = 0; j < map[i].length; j++) {
            var tileClass = (map[i][j] === 1) ? 'W' : '';
            tilesHTML += '<div class="tile' + tileClass + '"></div>';
        }
    }

    field.innerHTML = tilesHTML;

    // Функция для поиска случайного пустого места на карте
    function findEmptyCell(map) {
        var emptyCells = [];
        for (var i = 0; i < map.length; i++) {
            for (var j = 0; j < map[i].length; j++) {
                if (map[i][j] === 0) {
                    emptyCells.push({
                        x: j,
                        y: i
                    });
                }
            }
        }
        // Выбираем случайную клетку из списка пустых клеток
        var randomIndex = Math.floor(Math.random() * emptyCells.length);
        return emptyCells[randomIndex];
    }

    // Находим случайное пустое место на карте
    var emptyCell = findEmptyCell(map);

    // Помещаем героя в найденное пустое место
    var hero = {
        x: emptyCell.x,
        y: emptyCell.y
    };
    // Находим клетку, в которой должен находиться герой, и добавляем ей класс 'hero'
    var heroTile = field.children[hero.y * 40 + hero.x];
    heroTile.classList.add('tileP');

    // Функция для создания случайных врагов на карте
    function createEnemies(map, numberOfEnemies) {
        var enemies = [];
        for (var i = 0; i < numberOfEnemies; i++) {
            var emptyCell = findEmptyCell(map);
            var enemy = {
                x: emptyCell.x,
                y: emptyCell.y
            };
            enemies.push(enemy);
        }
        return enemies;
    }

    // Создаем 10 врагов на карте
    var enemies = createEnemies(map, 10);

    // Добавляем врагов на карту, обновляя соответствующие клетки
    enemies.forEach(function (enemy) {
        var enemyTile = field.children[enemy.y * 40 + enemy.x];
        enemyTile.classList.add('tileE');
    });

    // Функция для создания зелий на карте
    function createPotions(map, numberOfPotions) {
        var potions = [];
        for (var i = 0; i < numberOfPotions; i++) {
            var emptyCell = findEmptyCell(map);
            var potion = {
                x: emptyCell.x,
                y: emptyCell.y
            };
            potions.push(potion);
        }
        return potions;
    }

    // Создаем 10 зелий на карте
    var potions = createPotions(map, 10);

    // Добавляем зелья на карту, обновляя соответствующие клетки
    potions.forEach(function (potion) {
        var potionTile = field.children[potion.y * 40 + potion.x];
        potionTile.classList.add('tileHP');
    });

    // Функция для создания мечей на карте
    function createSwords(map, numberOfSwords) {
        var swords = [];
        for (var i = 0; i < numberOfSwords; i++) {
            var emptyCell = findEmptyCell(map);
            var sword = {
                x: emptyCell.x,
                y: emptyCell.y
            };
            swords.push(sword);
        }
        return swords;
    }

    // Создаем 2 меча на карте
    var swords = createSwords(map, 2);

    // Добавляем мечи на карту, обновляя соответствующие клетки
    swords.forEach(function (sword) {
        var swordTile = field.children[sword.y * 40 + sword.x];
        swordTile.classList.add('tileSW');
    });

    // Функция для перемещения врагов
    function moveEnemies() {
        enemies.forEach(function (enemy) {
            // Выбираем случайное направление (вверх, вниз, влево, вправо)
            var direction = Math.floor(Math.random() * 4);
            var dx = 0,
                dy = 0;
            switch (direction) {
                case 0:
                    dy = -1;
                    break; // Вверх
                case 1:
                    dy = 1;
                    break; // Вниз
                case 2:
                    dx = -1;
                    break; // Влево
                case 3:
                    dx = 1;
                    break; // Вправо
            }

            // Проверяем, куда переместится враг
            var newX = enemy.x + dx;
            var newY = enemy.y + dy;

            // Проверяем, находится ли новая позиция в пределах карты и является ли она проходимой
            if (newX >= 0 && newX < map[0].length && newY >= 0 && newY < map.length && map[newY][newX] === 0) {
                // Убираем врага из текущей клетки
                var currentTile = field.children[enemy.y * 40 + enemy.x];
                currentTile.classList.remove('tileE');

                if (enemy.x === hero.x && enemy.y === hero.y) {
                    alert('Игра окончена, перезагрузите страницу');
                    return; // Выходим из функции, так как игра окончена
                }
                // Перемещаем врага в новую клетку
                enemy.x = newX;
                enemy.y = newY;
                var newTile = field.children[newY * 40 + newX];
                newTile.classList.add('tileE');

            }
        });
    }
    setInterval(function () {
        moveEnemies();

    }, 1000);

    // Функция для обновления полосы здоровья героя
    function newHealthBar() {
        // Находим клетку героя на карте
        var tile = document.querySelector(`#field .tileP`);

        // Находим текущую полосу здоровья
        var healthBar = tile.querySelector('.health');

        // Если полоса здоровья существует, удаляем ее
        if (healthBar) {
            healthBar.remove();
        }

        // Создаем новую полосу здоровья
        var newHealthBar = document.createElement('div');
        newHealthBar.className = 'health';
        newHealthBar.style.width = hero.health + '%'; // Устанавливаем ширину полосы здоровья в процентах

        // Добавляем новую полосу здоровья в клетку героя
        tile.appendChild(newHealthBar);
    }

    // Перемещаем героя и обновляем полосу здоровья
    function moveHero(dx, dy) {
        // Проверяем, находится ли новая позиция в пределах карты и является ли она проходимой
        var newX = hero.x + dx;
        var newY = hero.y + dy;
        if (newX >= 0 && newX < map[0].length && newY >= 0 && newY < map.length && map[newY][newX] === 0) {
            // Удаляем героя из текущей клетки
            var currentTile = field.children[hero.y * 40 + hero.x];
            currentTile.classList.remove('tileP');
            var newTile = field.children[newY * 40 + newX];
            if (newTile.classList.contains('tileHP')) {
                // Удаляем зелье с карты
                newTile.classList.remove('tileHP');
            }

            var newTile = field.children[newY * 40 + newX];
            if (newTile.classList.contains('tileSW')) {
                newTile.classList.remove('tileSW'); //Удаляем меч
            }


            // Перемещаем героя в новую клетку
            hero.x = newX;
            hero.y = newY;
            var newTile = field.children[newY * 40 + newX];
            newTile.classList.add('tileP');

            // Обновляем полосу здоровья
            newHealthBar();
        }
    }

    // Обработчик событий для клавиш WASD
    document.addEventListener('keydown', function (event) {
        // Получаем код нажатой клавиши
        var key = event.key.toLowerCase();

        // Определяем действие в зависимости от нажатой клавиши
        switch (key) {
            case 'w':
                moveHero(0, -1); 
                break;
            case 'a':
                moveHero(-1, 0); 
                break;
            case 's':
                moveHero(0, 1); 
                break;
            case 'd':
                moveHero(1, 0); 
                break;
        }
    });
    // Функция для обновления полосы здоровья
    function updateHealthBar() {
        // Находим все клетки поля, кроме клеток героя
        var tilesWithoutHero = document.querySelectorAll('.tile:not(.tileP)');

        // Проходимся по всем клеткам без героя
        tilesWithoutHero.forEach(function (tile) {
            // Находим текущую полосу здоровья
            var healthBar = tile.querySelector('.health');

            // Если полоса здоровья существует, удаляем ее
            if (healthBar) {
                healthBar.remove();
            }
        });
    }


    setInterval(updateHealthBar, 0.1);

    // Обработчик события для нажатия клавиши пробел
    document.addEventListener('keydown', function (event) {

        if (event.key === ' ') {
            destroyEnemiesNearHero();
        }
    });

    // Функция для уничтожения врагов на соседних клетках от героя
    function destroyEnemiesNearHero() {

        var neighborCoordinates = [{
                x: hero.x - 1,
                y: hero.y
            },
            {
                x: hero.x + 1,
                y: hero.y
            },
            {
                x: hero.x,
                y: hero.y - 1
            },
            {
                x: hero.x,
                y: hero.y + 1
            }
        ];

        // Создаем массив для хранения индексов врагов, которые нужно уничтожить
        var enemiesToDestroy = [];

        // Проходимся по каждой соседней клетке
        neighborCoordinates.forEach(function (coord) {
            // Проверяем, есть ли враг на текущей соседней клетке
            var enemyIndex = enemies.findIndex(function (enemy) {
                return enemy.x === coord.x && enemy.y === coord.y;
            });

            // Если враг найден, добавляем его индекс в массив для уничтожения
            if (enemyIndex !== -1) {
                enemiesToDestroy.push(enemyIndex);
            }
        });


        enemiesToDestroy.forEach(function (index) {
            var enemy = enemies[index];
            enemies.splice(index, 1); // Удаляем врага из массива

            var enemyTile = document.querySelector(`.tile[data-x="${enemy.x}"][data-y="${enemy.y}"]`);
            if (enemyTile) {
                enemyTile.classList.remove('tileE'); // Удаление  класса не происходит по какой-то причине, на месте врагов остаются трупы(
            }
        });
    }



    //console.log(map);
});