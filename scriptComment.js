// Получаем элемент canvas из DOM и контекст отрисовки 2D
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

// Устанавливаем размеры canvas равными размерам окна браузера
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Создаем массив частиц
const particlesArray = [];

// Начальное значение для изменения цвета частиц
let hue = 0;

// Обработчик события изменения размера окна браузера
window.addEventListener('resize', function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Объект для отслеживания координат указателя мыши
const mouse = {
  x: undefined,
  y: undefined,
};

// Обработчик события клика по canvas
canvas.addEventListener('click', function (event) {
  // Обновляем координаты указателя мыши при клике
  mouse.x = event.x;
  mouse.y = event.y;
  // Добавляем 10 новых частиц при клике
  for (let i = 0; i < 10; i++) {
    particlesArray.push(new Particle());
  }
});

// Обработчик события перемещения мыши по canvas
canvas.addEventListener('mousemove', function (event) {
  // Обновляем координаты указателя мыши при перемещении
  mouse.x = event.x;
  mouse.y = event.y;
  // Добавляем 2 новых частицы при движении мыши
  for (let i = 0; i < 2; i++) {
    particlesArray.push(new Particle());
  }
});

// Класс, представляющий частицу
class Particle {
  constructor() {
    // Устанавливаем начальные координаты частицы равными координатам указателя мыши
    this.x = mouse.x;
    this.y = mouse.y;
    // Устанавливаем случайный размер частицы
    this.size = Math.random() * 15 + 1;
    // Устанавливаем случайную скорость частицы по осям X и Y
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    // Устанавливаем случайный цвет частицы в формате HSL
    this.color = 'hsl(' + hue + ', 100%, 50%)';
  }
  // Метод для обновления координат частицы
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    // Уменьшаем размер частицы, если он больше 0.2
    if (this.size > 0.2) this.size -= 0.1;
  }
  // Метод для отрисовки частицы
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Функция для обработки частиц
function handleParticles() {
  // Проходимся по массиву частиц
  for (let i = 0; i < particlesArray.length; i++) {
    // Обновляем и отрисовываем каждую частицу
    particlesArray[i].update();
    particlesArray[i].draw();

    // Проверяем расстояние между частицами и рисуем линии, если они близко
    for (let j = i; j < particlesArray.length; j++) {
      const dx = particlesArray[i].x - particlesArray[j].x;
      const dy = particlesArray[i].y - particlesArray[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if(distance < 100) {
        ctx.beginPath();
        ctx.strokeStyle = particlesArray[i].color;
        ctx.lineWidth = 0.2;
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
        ctx.stroke();
        ctx.closePath();
      }
    }
    // Удаляем частицу из массива, если её размер меньше или равен 0.3
    if (particlesArray[i].size <= 0.3) {
      particlesArray.splice(i, 1);
      // Уменьшаем счётчик, чтобы не пропустить следующую частицу после удаления
      i--;
    }
  }
}

// Функция анимации
function animate() {
  // Очищаем canvas перед отрисовкой нового кадра
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Обновляем и отрисовываем частицы
  handleParticles();
  // Изменяем значение hue для изменения цвета частиц
  hue += 0.5;
  // Запрашиваем следующий кадр анимации
  requestAnimationFrame(animate);
}

// Запускаем анимацию
animate();
