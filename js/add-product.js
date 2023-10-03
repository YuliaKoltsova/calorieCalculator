// добавление продукта из списка продуктов раздел "за сегодня"
import { saveToLocalStorage } from './save-to-local-storage.js'; // функция для сохранения информации в localStorage
import { renderDayProduct } from './render-localStorage-info.js' 

const newProductContainer = document.querySelector('.products-add__container'); // место в разметке куда добавляем новые продукты

const dayProducts = [];

const addProduct = (evt) => {
  if(evt.target.classList.contains('product-add--add')) { // если кликнули на кнопку + в карточке продукта, то:
    const currentProduct = evt.target.closest('.product-add');// находим родителя кнопки(саму карточку товара)

    // забираем значения из карточки товара в переменные 
    const productName = currentProduct.querySelector('.product-add__name').textContent;
    const productCalories = Number(currentProduct.querySelector('.product-add__calories').textContent);
    const productProteins = Number(currentProduct.querySelector('.product-add__proteins').textContent);
    const productFats = Number(currentProduct.querySelector('.product-add__fats').textContent);
    const productCarbohydrates = Number(currentProduct.querySelector('.product-add__carbohydrates').textContent);
    const productWeight = Number(currentProduct.querySelector('.product-add__input').value);

    // расчет в зависимости от веса
    const productCaloriesWithWeight = (productCalories * productWeight) / 100;
    const productProteinsWithWeight = (productProteins * productWeight) / 100;
    const productFatsWithWeight = (productFats * productWeight) / 100;
    const productCarbohydratesWithWeight = (productCarbohydrates * productWeight) / 100;

    // создаем объект с продуктом для раздела "за сегодня"
    const dayProduct = {
      name: productName,
      calories: productCaloriesWithWeight,
      proteins: productProteinsWithWeight,
      fats: productFatsWithWeight,
      carbohydrates: productCarbohydratesWithWeight,
      weight: productWeight,
      id: Date.now(),
    }

    dayProducts.push(dayProduct); // добавляем продукт в массив продуктов раздела "за сегодня"

    renderDayProduct(dayProduct); // добавляем продукт на страницу

    saveToLocalStorage('dayProducts', dayProducts); // сохраняем данные в localStorage
  }
}

newProductContainer.addEventListener('click', addProduct);

export {dayProducts};