const pagination = document.querySelector('.pagination-pages');
const productsContainer = document.querySelector('.products-container');
const nextButton = document.querySelector('.next-button');
const prevButton = document.querySelector('.previous-button');

const url = `https://fakestoreapi.com/products`;

const fetchData = async (url) => {
    const result = await fetch(url);
    const data = await result.json();

    const mainProductCards = [];

    data.forEach((data) => {
        let productCard = document.createElement('div');
        productCard.className = 'product-card';

        let productImage = document.createElement('div');
        productImage.className = 'product-image';
        productImage.style.backgroundImage = `url(${data.image})`;

        let productDescription = document.createElement('div');
        productDescription.className = 'product-description';
        let productTitle = document.createElement('span');
        productTitle.className = 'product-title';
        productTitle.textContent = data.title;
        let productPrice = document.createElement('span');
        productPrice.className = 'product-price';
        productPrice.textContent = `$ ${data.price}`;

        productDescription.appendChild(productTitle);
        productDescription.appendChild(productPrice);

        productCard.appendChild(productImage);
        productCard.appendChild(productDescription);

        productsContainer.appendChild(productCard);

        mainProductCards.push(productCard);
    });

    const productsPerPage = 4;
    let currentPage = 1;
    const dataLength = data.length;
    const totalPageLength = Math.ceil(dataLength / productsPerPage);

    const displayPagination = () => {
        pagination.innerHTML = ''; // Clear existing pagination buttons
        const maxVisibleButtons = 5; // Maximum number of pagination buttons to display
        const startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
        const endPage = Math.min(totalPageLength, startPage + maxVisibleButtons - 1);

        for (let i = startPage; i <= endPage; i++) {
            let page = document.createElement('button');
            page.className = 'page';
            page.textContent = i;
            if (i === currentPage) {
                page.classList.add('active');
            }
            pagination.appendChild(page);

            page.addEventListener('click', () => {
                updatePagination(i);
            });
        }
    };

    displayPagination();

    const updatePagination = (index) => {
        currentPage = index;
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;

        mainProductCards.forEach((card, i) => {
            if (i >= startIndex && i < endIndex) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        displayPagination(); // Update pagination buttons after changing page
    };

    updatePagination(1);

    nextButton.addEventListener('click', () => {
        currentPage++;
        if (currentPage <= totalPageLength) {
            updatePagination(currentPage);
            prevButton.disabled = false;
        }
        if (currentPage >= totalPageLength) {
            nextButton.disabled = true;
        }
    });

    prevButton.addEventListener('click', () => {
        currentPage--;
        if (currentPage >= 1) {
            updatePagination(currentPage);
            nextButton.disabled = false;
        }
        if (currentPage <= 1) {
            prevButton.disabled = true;
        }
    });
};

fetchData(url);
