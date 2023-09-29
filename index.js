openBurgerMenu();
slider();
getOurPetsSlider();

function openBurgerMenu() {
    const burgerIcon = document.querySelector('.burger-menu');
    const burgerMenuNav = document.querySelector('.burger-menu-nav');
    const burgerMenuContainer = document.querySelector('.burger-menu-container');

    burgerIcon.addEventListener('click', () => {
        burgerMenuContainer.classList.toggle('open-container');
        burgerIcon.classList.toggle('open-menu');
        burgerMenuNav.classList.toggle('open-nav');
        document.body.classList.toggle('overflow');
    });

    burgerMenuNav.addEventListener('click', () => {
        burgerMenuContainer.classList.toggle('open-container');
        burgerIcon.classList.toggle('open-menu');
        burgerMenuNav.classList.toggle('open-nav');
        document.body.classList.toggle('overflow');
    });

    burgerMenuContainer.addEventListener('click', () => {
        burgerMenuContainer.classList.toggle('open-container');
        burgerIcon.classList.toggle('open-menu');
        burgerMenuNav.classList.toggle('open-nav');
        document.body.classList.toggle('overflow');
    });

    for (let item of burgerMenuNav.children[0].children) {
        item.addEventListener('click', () => {
            burgerMenuContainer.classList.toggle('open-container');
            burgerIcon.classList.toggle('open-menu');
            burgerMenuNav.classList.toggle('open-nav');
            document.body.classList.toggle('overflow');
        });
    };
};

async function slider() {
    const response = await fetch('./assets/pets.json');
    const jsonData = await response.json();
    const petsSliderItems = document.querySelector('.pets-slider-items');
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');
    let slidesArray = [];

    generateSlidesArray();

    function generateSlidesArray() {
        let visibleArray = generateVisibleArray();
        let unvisibleArray = generateUnvisibleArray(visibleArray);
        let leftArray = unvisibleArray
        let rightArray = unvisibleArray;
        let result = [];

        function generateVisibleArray() {
            let arr = [];
            // if (window.innerWidth >= 1100) {
                for (i = 0; arr.length < 3; i++) {
                    let number = Math.round(Math.random() * (7 - 0) + 0);
                    if (!arr.includes(number)) arr.push(number);
                };
            //     return arr;
            // } else if (window.innerWidth < 1100 && window.innerWidth >= 768) {
            //     for (i = 0; arr.length < 2; i++) {
            //         let number = Math.round(Math.random() * (7 - 0) + 0);
            //         if (!arr.includes(number)) arr.push(number);
            //     };
            //     return arr;
            // } else if (window.innerWidth < 768) {
            //     for (i = 0; arr.length < 1; i++) {
            //         let number = Math.round(Math.random() * (7 - 0) + 0);
            //         if (!arr.includes(number)) arr.push(number);
            //     };
                return arr;
            // };
        };

        function generateUnvisibleArray(visible) {
            let arr = [];
            // if (window.innerWidth > 1100) {
                for (i = 0; arr.length < 3; i++) {
                    let number = Math.round(Math.random() * (7 - 0) + 0);
                    if (!arr.includes(number) && !visible.includes(number)) arr.push(number);
                };
                return arr;
            // } else if (window.innerWidth <= 1100 && window.innerWidth >= 768) {
            //     for (i = 0; arr.length < 2; i++) {
            //         let number = Math.round(Math.random() * (7 - 0) + 0);
            //         if (!arr.includes(number) && !visible.includes(number)) arr.push(number);
            //     };
            //     return arr;
            // } else if (window.innerWidth < 768) {
            //     for (i = 0; arr.length < 1; i++) {
            //         let number = Math.round(Math.random() * (7 - 0) + 0);
            //         if (!arr.includes(number) && !visible.includes(number)) arr.push(number);
            //     };
            //     return arr;
            // };
        };

        result = [leftArray, visibleArray, rightArray];
        slidesArray = result.flat();
        generateSlides();

        function generateSlides() {
            petsSliderItems.innerHTML = '';
            slidesArray.forEach(el => {
                let div = document.createElement('div')
                div.className = `pets-slider-item ${el}`;
                div.innerHTML = `
                    <div>
                        <img src="${jsonData[el].img}" alt="${jsonData[el].name}">
                    </div>
                    <h3>
                        ${jsonData[el].name}
                    </h3>
                    <button>
                        Learn more
                    </button>
            `;
                petsSliderItems.append(div);
            });
            openPopup();
        };

        nextButton.addEventListener('click', () => {
            petsSliderItems.classList.toggle('to-left');
            setTimeout(() => {
                result = [visibleArray, rightArray, generateUnvisibleArray(rightArray)];
                slidesArray = result.flat();
                petsSliderItems.classList.toggle('to-left');
                generateSlides();
            }, 500);
            leftArray = result[0];
            visibleArray = result[1];
            rightArray = result[2];
        });

        prevButton.addEventListener('click', () => {
            petsSliderItems.classList.toggle('to-right');
            setTimeout(() => {
                result = [generateUnvisibleArray(leftArray), leftArray, visibleArray];
                slidesArray = result.flat();
                petsSliderItems.classList.toggle('to-right');
                generateSlides();
            }, 500);
            leftArray = result[0];
            visibleArray = result[1];
            rightArray = result[2];
        });

        const popupWrapper = document.querySelector('.popup-wrapper');
        const closePopup = document.querySelector('.popup-close');
        closePopup.addEventListener('click', (e) => {
            console.log('x');
            popupWrapper.classList.toggle('open-popup');
            document.body.classList.toggle('overflow');
        });

        popupWrapper.addEventListener('click', (e) => {
            console.log(e.target.className);
            if (e.target.className === "popup-wrapper open-popup") {
                popupWrapper.classList.toggle('open-popup')
                document.body.classList.toggle('overflow');
            };
        });

        function openPopup() {
            const sliderItem = document.querySelectorAll('.pets-slider-item');
            const popup = document.querySelector('.popup');
            const popupWrapper = document.querySelector('.popup-wrapper');
            const closePopup = document.querySelector('.popup-close img');
    
            
    
            sliderItem.forEach(element => {
                element.addEventListener('click', () => {
                    let PetNumber = element.classList[1];
                    popup.innerHTML = `
                <div class="popup-img">
                    <img src="${jsonData[PetNumber].img}" alt="${jsonData[PetNumber].name}">
                </div>
                <div class="popup-text">
                    <h2>${jsonData[PetNumber].name}</h2>
                    <h3>${jsonData[PetNumber].type} - ${jsonData[PetNumber].breed}</h3>
                    <p>${jsonData[PetNumber].description}</p>
                    <ul>
                        <li><span>Age:</span> ${jsonData[PetNumber].age}</li>
                        <li><span>Inoculations:</span> ${jsonData[PetNumber].inoculations}</li>
                        <li><span>Diseases:</span> ${jsonData[PetNumber].diseases}</li>
                        <li><span>Parasites:</span> ${jsonData[PetNumber].parasites}</li>
                    </ul>
                </div>
                    `;
                    popupWrapper.classList.toggle('open-popup');
                    document.body.classList.toggle('overflow');
                });
            });
        };
    
        
    };
};

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
};

function getOurPetsArray() {
    let result = [];
    let temp = [];
    for (i = 0; result.length < 8; i++) {
        let number = getRandomIntInclusive(0, 7);
        if (!result.includes(number)) result.push(number);
    };

    for (i = 0; result.length < 48; i++) {
        for (i = 0; temp.length < 8; i++) {
            let number = getRandomIntInclusive(0, 7);
            if ((temp.length < 3) && (number !== result[result.length - 1]) && (number !== result[result.length - 2]) && (!temp.includes(number))) {
                temp.push(number);
            } else if ((temp.length > 2) && (!temp.includes(number))) {
                temp.push(number);
            };
        };
        result.push(temp);
        result = result.flat();
        temp = [];
    };
    return result;
};

async function getOurPetsSlider() {
    const response = await fetch('./assets/pets.json');
    const jsonData = await response.json();
    console.log(jsonData);
    const ourPetsSlider = document.querySelector('.our-pets-slider')
    const ourPetsItems = document.querySelector('.our-pets-items');
    ourPetsItems.innerHTML = '';
    const ourPetsArray = getOurPetsArray();
    const sliderNav = document.querySelector('.slider-nav');
    const toStart = sliderNav.children[0];
    const prev = sliderNav.children[1];
    const counter = sliderNav.children[2];
    const next = sliderNav.children[3];
    const toEnd = sliderNav.children[4];
    console.log(window.getComputedStyle(ourPetsItems).width);

    ourPetsArray.forEach(element => {
        let div = document.createElement('div')
        div.className = `our-pets-item ${element}`;
        div.innerHTML = `
                <div>
                    <img src="${jsonData[element].img}" alt="${jsonData[element].name}">
                </div>
                <h3>
                    ${jsonData[element].name}
                </h3>
                <button>
                    Learn more
                </button>
        `;
        ourPetsItems.append(div);
    });


    let shift = 0;
    let count = 1;
    function getCountLimit() {
        let countLimit;
        if (window.getComputedStyle(ourPetsSlider).width === '1235px') countLimit = 6;
        if (window.getComputedStyle(ourPetsSlider).width === '619px') countLimit = 8;
        if (window.getComputedStyle(ourPetsSlider).width === '309px') countLimit = 16;
        return countLimit;
    };

    window.addEventListener('resize', () => {
        if (count > getCountLimit()) {
            count = getCountLimit();
            counter.textContent = count;
        };
        shift = window.getComputedStyle(ourPetsSlider).width.split('').slice(0, -2).join('') * (count - 1);
        ourPetsItems.style.right = `${shift}px`;
        if (count === getCountLimit()) {
            next.disabled = true;
            toEnd.disabled = true;
        } else {
            next.disabled = false;
            toEnd.disabled = false;
        };
        if (count === 1) {
            prev.disabled = true;
            toStart.disabled = true;
        } else {
            prev.disabled = false;
            toStart.disabled = false;
        }

    });

    next.addEventListener('click', () => {
        shift += window.getComputedStyle(ourPetsSlider).width.split('').slice(0, -2).join('') * 1;
        count += 1;
        console.log(window.getComputedStyle(ourPetsSlider).width);
        ourPetsItems.style.right = `${shift}px`;
        if (count === getCountLimit()) {
            next.disabled = true;
            toEnd.disabled = true;
        };
        if (count > 1 && count < getCountLimit()) {
            prev.disabled = false;
            toStart.disabled = false;
        };
        counter.textContent = count;
    })

    prev.addEventListener('click', () => {
        shift -= window.getComputedStyle(ourPetsSlider).width.split('').slice(0, -2).join('') * 1;
        count -= 1;
        ourPetsItems.style.right = `${shift}px`;
        if (count === 1) {
            prev.disabled = true;
            toStart.disabled = true;
        };
        if (count > 1 && count < getCountLimit()) {
            next.disabled = false;
            toEnd.disabled = false;
        };
        counter.textContent = count;
    })

    toEnd.addEventListener('click', () => {
        shift += window.getComputedStyle(ourPetsSlider).width.split('').slice(0, -2).join('') * (getCountLimit() - count);
        count = getCountLimit();
        ourPetsItems.style.right = `${shift}px`;
        if (count === getCountLimit()) {
            next.disabled = true;
            toEnd.disabled = true;
            prev.disabled = false;
            toStart.disabled = false;
        };
        counter.textContent = count;
    });

    toStart.addEventListener('click', () => {
        shift -= window.getComputedStyle(ourPetsSlider).width.split('').slice(0, -2).join('') * (count - 1);
        count = 1;
        ourPetsItems.style.right = `${shift}px`;
        if (count === 1) {
            next.disabled = false;
            toEnd.disabled = false;
            prev.disabled = true;
            toStart.disabled = true;
        };
        counter.textContent = count;
    });

    function openPopup() {
        const ourPetsItem = document.querySelectorAll('.our-pets-item');
        const popup = document.querySelector('.popup');
        const popupWrapper = document.querySelector('.popup-wrapper');
        const closePopup = document.querySelector('.popup-close');
        console.log(ourPetsItem);

        closePopup.addEventListener('click', () => {
            popupWrapper.classList.toggle('open-popup');
            document.body.classList.toggle('overflow');
        });

        popupWrapper.addEventListener('click', (e) => {
            if (e.target.className === "popup-wrapper open-popup") {
                popupWrapper.classList.toggle('open-popup')
                document.body.classList.toggle('overflow');
            };
        });

        ourPetsItem.forEach(element => {
            element.addEventListener('click', () => {
                let PetNumber = element.classList[1];
                popup.innerHTML = `
            <div class="popup-img">
                <img src="${jsonData[PetNumber].img}" alt="${jsonData[PetNumber].name}">
            </div>
            <div class="popup-text">
                <h2>${jsonData[PetNumber].name}</h2>
                <h3>${jsonData[PetNumber].type} - ${jsonData[PetNumber].breed}</h3>
                <p>${jsonData[PetNumber].description}</p>
                <ul>
                    <li><span>Age:</span> ${jsonData[PetNumber].age}</li>
                    <li><span>Inoculations:</span> ${jsonData[PetNumber].inoculations}</li>
                    <li><span>Diseases:</span> ${jsonData[PetNumber].diseases}</li>
                    <li><span>Parasites:</span> ${jsonData[PetNumber].parasites}</li>
                </ul>
            </div>
                `;
                popupWrapper.classList.toggle('open-popup');
                document.body.classList.toggle('overflow');
            });
        });
    };

    openPopup();

};





