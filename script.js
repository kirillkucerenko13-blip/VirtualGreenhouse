`use strict`;

// Data
const plant1 = {
  name: `Monstera`,
  wateringFrequency: 10,
  status: `watered`,
};
const plant2 = {
  name: `Snake Plant`,
  wateringFrequency: 21,
  status: `dried`,
};
const plant3 = {
  name: `Peace Lily`,
  wateringFrequency: 7,
  status: `watered`,
};
const plant4 = {
  name: `Aloe Vera`,
  wateringFrequency: 14,
  status: `watered`,
};
const plant5 = {
  name: `Spider Plant`,
  wateringFrequency: 5,
  status: `dried`,
};
const plant6 = {
  name: `Zanzibar Gem`,
  wateringFrequency: 28,
  status: `watered`,
};

const plants = [plant1, plant2, plant3, plant4, plant5, plant6];

// Elements
const btnWaterAll = document.querySelector(`.water`);
const btnSort = document.querySelector(`.sort`);
const btnDried = document.querySelector(`.dried`);
const containerPlants = document.querySelector(`.grid-garden`);

// Display all plants from data
function displayPlants(plants, sort = false, sortDried = false) {
  containerPlants.innerHTML = "";
  // Sorted by wateringFrequency (a > b)
  const plantsToDisplay = sort
    ? plants.toSorted((a, b) => a.wateringFrequency - b.wateringFrequency)
    : plants;
  // Sorted by status
  const plantsToDried = plants.toSorted((a, b) => {
    const isDriedA = a.status === `dried`;
    const isDriedB = b.status === `dried`;
    return isDriedB - isDriedA;
  });
  // Sorted array
  const finalArray = sortDried ? plantsToDried : plantsToDisplay;
  finalArray.forEach(function (plant, i) {
    // Image like plants array name
    const imageName = plant.name.toLowerCase().replace(` `, `-`);
    // Add image and id to html
    let html = `
      <div id="plant${i + 1}" class="plants">
        <img src="image/${imageName}.png" alt="${plant.name}" class="plant-img" />
        
        <h3 class="plant-title">${plant.name}</h3>
        <p class="plant-info">Water every ${plant.wateringFrequency} days</p>
      </div>
    `;
    // We can see plants that need watered (status: `dried`)
    const driedHtml =
      plant.status === `dried`
        ? html.slice(0, 130) +
          `<img class="img-dried" src="image/icon-dry.png" />` +
          html.slice(130)
        : html;
    containerPlants.insertAdjacentHTML("beforeend", driedHtml);
  });
}
displayPlants(plants);
let sorted = false;
// Click on btnSort sort by wateringFrequency (a > b)
btnSort.addEventListener(`click`, function (e) {
  e.preventDefault();
  sorted = !sorted;
  displayPlants(plants, sorted);
});
// Click on btndried sort by status
let isSortedDried = false;
btnDried.addEventListener(`click`, function (e) {
  e.preventDefault();
  isSortedDried = !isSortedDried;
  displayPlants(plants, false, isSortedDried);
});
// Click on btnWater change status `dried` on `watered`
btnWaterAll.addEventListener(`click`, function (e) {
  e.preventDefault();
  plants.forEach(function (plant) {
    plant.status = `watered`;
  });
  displayPlants(plants);
});
