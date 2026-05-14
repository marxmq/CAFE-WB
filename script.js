document.addEventListener('DOMContentLoaded', function() {
    const greetingElement = document.getElementById('dynamic-greeting');
    
    if (greetingElement) {
        const currentHour = new Date().getHours();
        let greetingText = 'Вітаємо у нашій кав’ярні!';

        if (currentHour >= 5 && currentHour < 12) {
            greetingText = 'Доброго ранку! Час для свіжої кави!';
        } else if (currentHour >= 12 && currentHour < 18) {
            greetingText = 'Доброго дня! Завітайте на каву-брейк!';
        } else if (currentHour >= 18 && currentHour < 23) {
            greetingText = 'Доброго вечора! Розслабтеся з нашим чаєм або кавою без кофеїну.';
        } else {
            greetingText = 'Доброї ночі! Ми вже зачинені, але чекаємо вас завтра!';
        }

        greetingElement.textContent = greetingText;
    }
});

function suggestCoffee() {
    const coffees = [
        "Еспресо — для швидкого заряду енергії ⚡",
        "Капучино — класика з ніжною пінкою ☕",
        "Лате на мигдалевому молоці — для легкого настрою 🥛",
        "Флет Вайт — ідеальний баланс кави та молока 🤎",
        "Раф з ваніллю — солодкий десертний напій 🍦",
        "Матча Лате — японська альтернатива каві 🍵"
    ];

    const randomIndex = Math.floor(Math.random() * coffees.length);
    const selectedCoffee = coffees[randomIndex];

    const resultElement = document.getElementById('coffee-result');
    if (resultElement) {
        resultElement.textContent = "Сьогодні ми радимо спробувати: " + selectedCoffee;
        resultElement.style.color = "#c89f7b";
        resultElement.style.fontWeight = "bold";
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const userName = document.getElementById('userName').value;
            const userEmail = document.getElementById('userEmail').value;
            const message = document.getElementById('message').value;

            if (userName.trim() === '' || userEmail.trim() === '' || message.trim() === '') {
                alert('Будь ласка, заповніть усі поля форми!');
            } else {
                alert(`Дякуємо, ${userName}! Ваше повідомлення успішно відправлено. Ми зв'яжемося з вами найближчим часом.`);
                contactForm.reset();
            }
        });
    }
});


async function loadMenuFromDB() {
    try {
        const response = await fetch('http://172.20.10.2:3000/api/sql/menu');
        const menuItems = await response.json();

        const menuContainer = document.getElementById('db-menu-container');
        if (menuContainer && menuItems.length > 0) {
            menuContainer.innerHTML = ''; 
            menuItems.forEach(item => {
                const productElement = document.createElement('p');
                productElement.style.color = '#fdf5e6'; 
                productElement.innerHTML = `<strong>${item.name}</strong> (${item.category}) — ${item.price} грн`;
                menuContainer.appendChild(productElement);
            });
        }

        const coffeeBody = document.getElementById('coffee-table-body');
        if (coffeeBody) {
            coffeeBody.innerHTML = '';
            
            const coffees = menuItems.filter(item => item.category === 'Кава');
            
            coffees.forEach(item => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${item.name}</td>
                    <td>${item.price}</td>
                `;
                coffeeBody.appendChild(tr);
            });
        }

        const dessertsList = document.getElementById('desserts-list');
        if (dessertsList) {
            dessertsList.innerHTML = '';
            
            const desserts = menuItems.filter(item => item.category === 'Десерти');
            
            desserts.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `<b>${item.name}</b> — ${item.price} грн.`;
                dessertsList.appendChild(li);
            });
        }

    } catch (error) {
        console.error("Помилка завантаження меню:", error);
    }
}

document.addEventListener('DOMContentLoaded', loadMenuFromDB);

document.addEventListener('scroll', function() {
    let scrollPosition = window.scrollY;
    let bgLayer = document.getElementById('coffee-bg-layer');
    let textLayer = document.getElementById('coffee-text-layer');
    
    if(bgLayer && textLayer) {
        bgLayer.style.transform = 'translateY(' + scrollPosition * 0.5 + 'px)';
        textLayer.style.transform = 'translateY(' + scrollPosition * 0.3 + 'px)';
        textLayer.style.opacity = 1 - (scrollPosition / 400); 
    }
});