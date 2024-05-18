function searchRecipe() {
  var searchInput = document.getElementById('search-input').value;
  // Perform your search logic here, e.g., redirect to search results page
  // or filter the recipes based on the search input.
}

function changePage(pageNumber) {
  const buttons = document.querySelectorAll('.pagination button');
  buttons.forEach(button => {
    button.classList.remove('active');
  });

  const selectedButton = document.querySelector(`.pagination button:nth-child(${pageNumber})`);
  selectedButton.classList.add('active');

  // Add logic to change the content based on the selected page
  // For demonstration purposes, let's just log the selected page number
  console.log(`Page ${pageNumber} selected`);
}


// Define the number of recipes per page and the current page
const recipesPerPage = 4; // Change this value if you want a different number of recipes per page
let currentPage = 1;

// Function to show recipes for the current page
function showRecipesForPage(page) {
const recipeCards = document.querySelectorAll(".recipe-card");
const startIndex = (page - 1) * recipesPerPage;
const endIndex = startIndex + recipesPerPage;

recipeCards.forEach((card, index) => {
  if (index >= startIndex && index < endIndex) {
    card.style.display = "block";
  } else {
    card.style.display = "none";
  }
});
}

// Function to handle pagination button clicks
function changePage(page) {
currentPage = page;
showRecipesForPage(currentPage);

// Update active state of pagination buttons
const paginationButtons = document.querySelectorAll(".pagination button");
paginationButtons.forEach((button, index) => {
  if (index + 1 === page) {
    button.classList.add("active");
  } else {
    button.classList.remove("active");
  }
});
}

// Initially show recipes for the first page
showRecipesForPage(currentPage);

function searchRecipe(event) {
event.preventDefault(); // Prevent the form from submitting
const searchQuery = document.getElementById('searchQuery').value.toLowerCase();
const recipeCards = document.querySelectorAll('.recipe-card');
let visibleRecipes = 0; // Track the number of visible recipes

recipeCards.forEach(card => {
  const title = card.querySelector('.recipe-title').textContent.toLowerCase();
  const description = card.querySelector('.recipe-description').textContent.toLowerCase();
  const ingredientList = card.querySelectorAll('.recipe-ingredient');
  
  // Extract ingredients from the current recipe card
  const ingredients = Array.from(ingredientList).map(ingredient => ingredient.textContent.toLowerCase()).join(', ');
  
  // Check if the search query is found in title, description, or ingredients
  const foundInTitle = title.includes(searchQuery);
  const foundInDescription = description.includes(searchQuery);
  const foundInIngredients = ingredients.includes(searchQuery);
  
  // Show the card if any of the fields match the search query
  if (searchQuery === '' || foundInTitle || foundInDescription || foundInIngredients) {
    card.style.display = 'block';
    visibleRecipes++; // Increment the count of visible recipes
  } else {
    card.style.display = 'none';
  }
});

// Update pagination based on the number of visible recipes
updatePagination(visibleRecipes);

// Reset pagination to the first page if the search query is empty
if (searchQuery === '') {
  goToPage(1); // Assuming there's a function goToPage to navigate to a specific page
}
}

// Function to show recipe details popup
function showRecipeDetails(recipeTitle) {
const recipeData = getRecipeData(recipeTitle);
const popup = document.getElementById('recipePopup');
const popupRecipeImage = document.getElementById('popupRecipeImage');
const popupRecipeTitle = document.getElementById('popupRecipeTitle');
const popupRecipeDescription = document.getElementById('popupRecipeDescription');
const popupIngredientsList = document.getElementById('popupIngredientsList');
const popupMethodSteps = document.getElementById('popupMethodSteps');
const popupTimeToCook = document.getElementById('popupTimeToCook');
const popupNutritionalValue = document.getElementById('popupNutritionalValue');

// Set popup content
let imagePath = ''; // Variable to store the image path

// Determine the image path based on recipeTitle
if (recipeTitle === 'Kare-Kare') {
    imagePath = 'pics/karekare.jpg';
} else if (recipeTitle === 'Lumpiang Shanghai') {
    imagePath = 'pics/lumpia.jpg';
} else {
    imagePath = `pics/${recipeTitle.toLowerCase().replace(' ', '-')}.jpg`;
}

popupRecipeImage.src = imagePath; // Set the image src
popupRecipeTitle.textContent = recipeData.title;
popupRecipeDescription.textContent = recipeData.description;
popupIngredientsList.innerHTML = '';
recipeData.ingredients.forEach(ingredient => {
    const li = document.createElement('li');
    li.textContent = ingredient;
    popupIngredientsList.appendChild(li);
});
popupMethodSteps.innerHTML = '';
recipeData.method.forEach(step => {
    const li = document.createElement('li');
    li.textContent = step;
    popupMethodSteps.appendChild(li);
});
popupTimeToCook.textContent = `Time to cook: ${recipeData.timeToCook}`;
popupNutritionalValue.textContent = recipeData.nutritionalValue;

// Show the popup
popup.style.display = 'flex';
}

// Function to close the recipe popup
function closePopup() {
const popup = document.getElementById('recipePopup');
popup.style.display = 'none';
}

// Function to show add recipe form popup
function showAddRecipeForm() {
const addRecipeFormPopup = document.getElementById('addRecipeFormPopup');
addRecipeFormPopup.style.display = 'block';
}

// Function to close add recipe form popup
function closeAddRecipeForm() {
const addRecipeFormPopup = document.getElementById('addRecipeFormPopup');
addRecipeFormPopup.style.display = 'none';
}

// Function to handle adding a new recipe
function submitRecipe(event) {
event.preventDefault(); // Prevent the form from submitting
// Add your logic to handle adding a new recipe here
alert("Functionality to add a new recipe will be implemented here.");
}
// Initially show recipes for the first page
showRecipesForPage(currentPage);

function searchRecipe(event) {
  event.preventDefault(); // Prevent the form from submitting
  const searchQuery = document.getElementById('searchQuery').value.toLowerCase();
  const recipeCards = document.querySelectorAll('.recipe-card');
  let visibleRecipes = 0; // Track the number of visible recipes
  
  recipeCards.forEach(card => {
    const title = card.querySelector('.recipe-title').textContent.toLowerCase();
    const description = card.querySelector('.recipe-description').textContent.toLowerCase();
    const ingredientList = card.querySelectorAll('.recipe-ingredient');
    
    // Extract ingredients from the current recipe card
    const ingredients = Array.from(ingredientList).map(ingredient => ingredient.textContent.toLowerCase()).join(', ');
    
    // Check if the search query is found in title, description, or ingredients
    const foundInTitle = title.includes(searchQuery);
    const foundInDescription = description.includes(searchQuery);
    const foundInIngredients = ingredients.includes(searchQuery);
    
    // Show the card if any of the fields match the search query
    if (searchQuery === '' || foundInTitle || foundInDescription || foundInIngredients) {
      card.style.display = 'block';
      visibleRecipes++; // Increment the count of visible recipes
    } else {
      card.style.display = 'none';
    }
  });
  
  // Update pagination based on the number of visible recipes
  updatePagination(visibleRecipes);
  
  // Reset pagination to the first page if the search query is empty
  if (searchQuery === '') {
    goToPage(1); // Assuming there's a function goToPage to navigate to a specific page
  }
}

// Function to show recipe details popup
function showRecipeDetails(recipeTitle) {
  const recipeData = getRecipeData(recipeTitle);
  const popup = document.getElementById('recipePopup');
  const popupRecipeImage = document.getElementById('popupRecipeImage');
  const popupRecipeTitle = document.getElementById('popupRecipeTitle');
  const popupRecipeDescription = document.getElementById('popupRecipeDescription');
  const popupIngredientsList = document.getElementById('popupIngredientsList');
  const popupMethodSteps = document.getElementById('popupMethodSteps');
  const popupTimeToCook = document.getElementById('popupTimeToCook');
  const popupNutritionalValue = document.getElementById('popupNutritionalValue');
  const popupRecipeCategory = document.getElementById('popupRecipeCategory');

  // Show the popup
  popup.style.display = 'block';


  // Set popup content
  let imagePath = ''; // Variable to store the image path

  // Determine the image path based on recipeTitle
  if (recipeTitle === 'Kare-Kare') {
      imagePath = 'pics/karekare.jpg';
  } else if (recipeTitle === 'Lumpiang Shanghai') {
      imagePath = 'pics/lumpia.jpg';
  } else {
      imagePath = `pics/${recipeTitle.toLowerCase().replace(' ', '-')}.jpg`;
  }

  popupRecipeImage.src = imagePath; // Set the image src
  popupRecipeTitle.textContent = recipeData.title;
  popupRecipeDescription.textContent = recipeData.description;
  popupIngredientsList.innerHTML = '';
  recipeData.ingredients.forEach(ingredient => {
      const li = document.createElement('li');
      li.textContent = ingredient;
      popupIngredientsList.appendChild(li);
  });
  popupMethodSteps.innerHTML = '';
  recipeData.method.forEach(step => {
      const li = document.createElement('li');
      li.textContent = step;
      popupMethodSteps.appendChild(li);
  });
  popupTimeToCook.textContent = `Time to cook: ${recipeData.timeToCook}`;
  popupNutritionalValue.textContent = recipeData.nutritionalValue;
  popupRecipeCategory.textContent = recipeData.category;

  // Show the popup
  popup.style.display = 'flex';
}

// Function to close the recipe popup
function closePopup() {
  const popup = document.getElementById('recipePopup');
  popup.style.display = 'none';
}

// Function to show add recipe form popup
function showAddRecipeForm() {
  const addRecipeFormPopup = document.getElementById('addRecipeFormPopup');
  addRecipeFormPopup.style.display = 'block';
}

// Function to close add recipe form popup
function closeAddRecipeForm() {
  const addRecipeFormPopup = document.getElementById('addRecipeFormPopup');
  addRecipeFormPopup.style.display = 'none';
}

// Function to handle adding a new recipe
function submitRecipe(event) {
  event.preventDefault(); // Prevent the form from submitting
  // Add your logic to handle adding a new recipe here
  alert("Functionality to add a new recipe will be implemented here.");
}

function getRecipeData(recipeTitle) {
  const recipes = {
  "Sinigang": {
      title: "Sinigang",
      description: "Sinigang is a traditional Filipino sour soup known for its tangy flavor, typically associated with tamarind but can also use other souring agents like calamansi, guava, or green mango. It is a popular comfort food in the Philippines and is often cooked with various meats such as pork, beef, shrimp, or fish.",
      ingredients: [
          "500g Pork Belly or Pork Ribs, cut into serving pieces",
          "1 pack (40g) Sinigang Mix (tamarind soup base)",
          "1 large Tomato, quartered",
          "1 medium-sized Onion, quartered",
          "2 long Green Chili Peppers (siling pansigang)",
          "1 cup Radish (labanos), sliced",
          "1 cup String Beans (sitaw), cut into 2-inch lengths",
          "1 cup Eggplant (talong), sliced",
          "3 cups Water",
          "Fish Sauce (patis) or Salt to taste"
      ],
      method: [
          "Step 1: In a pot, boil the water and add the pork. Simmer until the pork is tender.",
          "Step 2: Add the onion, tomato, and Sinigang Mix. Simmer for 5 minutes.",
          "Step 3: Add the radish and simmer for another 3 minutes.",
          "Step 4: Add the string beans and eggplant. Simmer until the vegetables are tender.",
          "Step 5: Season with fish sauce or salt to taste. Add the green chili peppers and simmer for another minute.",
          "Step 6: Serve hot with steamed rice. Enjoy!"
      ],
      timeToCook: "Approximately 1 hour",
      nutritionalValue: "Per serving - Calories: 250, Fat: 10g, Carbohydrates: 20g, Protein: 15g",
      category: "Pork"
  },
  "Adobo": {
      title: "Adobo",
      description: "Adobo is a classic Filipino dish known for its savory and tangy flavors. It involves marinating meat, often chicken or pork, in a mixture of soy sauce, vinegar, garlic, and spices, then slowly cooking it until tender. The dish is then typically served with rice and garnished with chopped green onions or cilantro.",
      ingredients: [
          "1 kg Chicken (thighs and drumsticks), cut into serving pieces",
          "1/2 cup Soy Sauce",
          "1/2 cup Vinegar (cane or coconut vinegar preferred)",
          "6 cloves Garlic, crushed",
          "1 tsp Whole Peppercorns",
          "2 Bay Leaves",
          "2 tbsp Cooking Oil",
          "1 cup Water",
          "Salt to taste"
      ],
      method: [
          "Step 1: In a large bowl, combine the chicken pieces, soy sauce, vinegar, crushed garlic, peppercorns, and bay leaves. Mix well to ensure the chicken is evenly coated. Marinate in the refrigerator for at least 1 hour, or preferably overnight.",
          "Step 2: Heat the cooking oil in a large skillet or pot over medium heat. Remove the chicken from the marinade, reserving the marinade for later use. Brown the chicken pieces on all sides, working in batches if necessary. Remove the browned chicken and set aside.",
          "Step 3: In the same skillet or pot, pour in the reserved marinade along with 1 cup of water. Bring to a simmer and add the browned chicken pieces back into the pot. Cover and simmer over low heat for about 30-40 minutes, or until the chicken is tender and fully cooked, stirring occasionally.",
          "Step 4: Once the chicken is cooked, uncover the pot and allow the sauce to reduce and thicken slightly, about 10-15 minutes. Taste and adjust seasoning with salt if needed.",
          "Step 5: Serve the chicken adobo hot with steamed rice. Garnish with chopped green onions or cilantro if desired. Enjoy!"
      ],
      timeToCook: "Approximately 1 hour 30 minutes (including marination time)",
      nutritionalValue: "Per serving - Calories: 300, Fat: 12g, Carbohydrates: 25g, Protein: 20g",
      category: "Chicken"
  },
  "Kare-Kare": {
      title: "Kare-Kare",
      description: "Kare-Kare is a traditional Filipino stew known for its rich and savory peanut sauce. It features tender cuts of meat, often oxtail and tripe, combined with a variety of vegetables such as eggplant, banana flower, and string beans. This dish is typically served with a side of shrimp paste (bagoong) and eaten with steamed rice.",
      ingredients: [
          "1 kg Oxtail, cut into serving pieces",
          "500g Beef tripe, cleaned and sliced",
          "2 cups Peanut Sauce (prepared or homemade)",
          "2-3 Eggplants, sliced",
          "1 Banana flower (heart), sliced",
          "Handful of String beans (sitaw), cut into 2-inch lengths",
          "4 cloves Garlic, minced",
          "1 Onion, chopped",
          "4 cups Water or Beef broth",
          "2 tbsp Cooking Oil",
          "Salt and Pepper to taste",
          "Shrimp paste (bagoong) for serving"
      ],
      method: [
          "Step 1: In a large pot, boil the oxtail and beef tripe in water or beef broth until tender, skimming off any scum that rises to the surface. This may take about 1.5 to 2 hours, depending on the tenderness of the meat.",
          "Step 2: Once the meat is tender, heat oil in a separate pan over medium heat. Sauté garlic and onions until fragrant and translucent.",
          "Step 3: Add the cooked oxtail and tripe to the sautéed garlic and onions. Pour in the peanut sauce and mix well to combine. Allow the mixture to simmer for a few minutes to meld the flavors.",
          "Step 4: Add the sliced eggplants, banana flower, and string beans to the pot. Stir to incorporate all the ingredients. Season with salt and pepper to taste.",
          "Step 5: Simmer the Kare-Kare until the vegetables are cooked through and tender, usually about 10-15 minutes.",
          "Step 6: Once everything is cooked and tender, adjust the seasoning if needed. Serve hot with steamed rice and shrimp paste on the side.",
      ],
      timeToCook: "Approximately 2 hours",
      nutritionalValue: "Per serving - Calories: 350, Fat: 15g, Carbohydrates: 30g, Protein: 25g",
      category: "Beef/Vegetable"
  },
  "Lumpiang Shanghai": {
      title: "Lumpiang Shanghai",
      description: "Lumpiang Shanghai is a popular Filipino appetizer or snack consisting of crispy spring rolls filled with a savory mixture of ground pork, minced onions, carrots, and aromatic spices. These spring rolls are then deep-fried until golden brown and crispy.",
      ingredients: [
          "500g Ground pork",
          "1 cup Minced onions",
          "1 cup Finely grated carrots",
          "2 cloves Garlic, minced",
          "1 tsp Salt",
          "1/2 tsp Ground black pepper",
          "1/2 tsp Five-spice powder (optional)",
          "Spring roll wrappers",
          "Cooking oil for frying"
      ],
      method: [
          "Step 1: In a mixing bowl, combine the ground pork, minced onions, grated carrots, minced garlic, salt, pepper, and optional five-spice powder. Mix well until all ingredients are evenly distributed.",
          "Step 2: Place a small amount of the pork mixture onto a spring roll wrapper. Roll the wrapper tightly around the filling, folding the sides in as you roll. Seal the edge with a bit of water to secure the roll.",
          "Step 3: Heat cooking oil in a deep fryer or a large pan over medium heat. Carefully place the lumpia rolls into the hot oil, seam side down, in batches to avoid overcrowding.",
          "Step 4: Fry the lumpia until they are golden brown and crispy, turning occasionally to ensure even cooking. This typically takes about 5-7 minutes per batch.",
          "Step 5: Once the lumpia are crispy and cooked through, remove them from the oil using a slotted spoon and drain on paper towels to remove excess oil.",
          "Step 6: Serve the Lumpiang Shanghai hot and crispy, optionally with a dipping sauce such as sweet chili sauce or vinegar dipping sauce."
      ],
      timeToCook: "Approximately 45 minutes",
      nutritionalValue: "Per serving - Calories: 200, Fat: 8g, Carbohydrates: 15g, Protein: 10g",
      category: "Pork"
  },
  "Leche Flan": {
      title: "Leche Flan",
      description: "Leche Flan is a classic Filipino dessert known for its velvety smooth texture and decadent caramel flavor. Made with simple ingredients like eggs, condensed milk, and caramelized sugar, it's a favorite treat for special occasions and gatherings.",
      ingredients: [
          "10 large Eggs",
          "1 can (14 oz) Condensed milk",
          "1 cup Granulated sugar",
          "1/4 cup Water"
      ],
      method: [
          "Step 1: Start by preparing the caramel syrup. In a saucepan, combine the granulated sugar and water over medium heat. Allow the sugar to dissolve completely, then let it simmer without stirring until it turns into a deep amber color, swirling the pan occasionally to ensure even caramelization. Once caramelized, immediately pour it into a mold or individual ramekins, tilting them to coat the bottoms evenly. Allow the caramel to cool and harden.",
          "Step 2: In a mixing bowl, crack the eggs and gently beat them until well combined. Add the condensed milk and continue to mix until smooth and creamy. Strain the mixture through a fine mesh sieve to remove any lumps or air bubbles.",
          "Step 3: Carefully pour the egg mixture over the hardened caramel in the mold(s), filling them almost to the top. Cover the mold(s) tightly with aluminum foil to prevent water from seeping in during steaming.",
          "Step 4: Prepare a steamer with enough water for steaming. Once the water is boiling, place the mold(s) in the steamer basket. Steam the leche flan over medium heat for about 30-40 minutes, or until set. To check for doneness, insert a toothpick into the center of the flan; it should come out clean when done.",
          "Step 5: Once cooked, remove the mold(s) from the steamer and allow the leche flan to cool to room temperature. Refrigerate for at least 2 hours or overnight to chill and set completely.",
          "Step 6: To serve, run a knife around the edges of the mold(s) to loosen the flan. Place a serving plate upside down over the mold(s), then quickly and carefully invert them to release the flan onto the plate, allowing the caramel syrup to cascade over the top. Slice and serve chilled, optionally garnished with fresh fruit or whipped cream."
      ],
      timeToCook: "Approximately 1 hour",
      nutritionalValue: "Per serving - Calories: 200, Fat: 8g, Carbohydrates: 25g, Protein: 6g",
      category: "Dessert"
  },
  "Halo-Halo": {
      title: "Halo-Halo",
      description: "Halo-Halo is a beloved Filipino dessert known for its refreshing combination of sweet ingredients layered with shaved ice. It's a delightful treat enjoyed especially during hot summer days.",
      ingredients: [
          "2 cups Shaved ice",
          "Assorted sweet beans (e.g., red beans, white beans, chickpeas)",
          "Assorted fruits (e.g., banana, jackfruit, mango)",
          "Gelatin cubes (various flavors)",
          "1/4 cup Evaporated milk",
          "1 scoop Ice cream (typically ube or vanilla)"
      ],
      method: [
          "Step 1: Prepare your serving glass or bowl. Fill it with a layer of shaved ice, ensuring it covers the bottom evenly.",
          "Step 2: Add a variety of sweet beans, such as cooked red beans, white beans, or chickpeas, on top of the shaved ice. These add texture and sweetness to the dessert.",
          "Step 3: Layer the assorted fruits over the beans. You can use sliced bananas, ripe mangoes, chunks of jackfruit, or any other fruits of your choice. Be creative!",
          "Step 4: Scatter gelatin cubes of various flavors over the fruits. These colorful gelatin cubes provide a fun and chewy element to the dessert.",
          "Step 5: Drizzle evaporated milk generously over the entire mixture. The milk adds creaminess and richness to the dessert.",
          "Step 6: Top the Halo-Halo with a scoop of ice cream, traditionally ube (purple yam) or vanilla flavor. The ice cream adds a luxurious and indulgent touch to the dessert.",
          "Step 7: Serve immediately and enjoy the delightful medley of flavors and textures!"
      ],
      timeToPrepare: "Approximately 15 minutes",
      nutritionalValue: "Per serving - Calories: 300, Fat: 10g, Carbohydrates: 45g, Protein: 5g",
      category: "Dessert"
  },
  "Biko": {
      title: "Biko",
      description: "Biko is a classic Filipino rice cake enjoyed during special occasions and celebrations. Made from glutinous rice, coconut milk, and brown sugar, Biko offers a delightful combination of sweet, chewy, and coconut flavors.",
      ingredients: [
          "2 cups Glutinous rice",
          "2 cups Coconut milk",
          "1 1/2 cups Brown sugar"
      ],
      method: [
          "Step 1: Rinse the glutinous rice under cold water until the water runs clear. Drain well.",
          "Step 2: In a large pot, combine the rinsed glutinous rice and coconut milk. Stir well to ensure the rice is coated with the coconut milk.",
          "Step 3: Add the brown sugar to the pot and mix thoroughly until the sugar is dissolved.",
          "Step 4: Cook the rice mixture over medium heat, stirring constantly to prevent burning, until it becomes thick and sticky. This may take about 20-30 minutes.",
          "Step 5: Once the rice mixture reaches a thick consistency and starts to pull away from the sides of the pot, it's ready. Remove it from the heat.",
          "Step 6: Preheat your oven to 350°F (175°C). Transfer the cooked rice mixture into a greased baking dish or pan, spreading it out evenly.",
          "Step 7: Bake the Biko in the preheated oven for about 20-30 minutes or until the top is golden brown and slightly caramelized.",
          "Step 8: Once baked, remove the Biko from the oven and allow it to cool completely. Once cooled, slice it into squares or diamond shapes for serving.",
          "Step 9: Serve the Biko at room temperature or slightly warmed, and enjoy its deliciously sweet and chewy texture!"
      ],
      timeToCook: "Approximately 1 hour",
      nutritionalValue: "Per serving - Calories: 250, Fat: 5g, Carbohydrates: 40g, Protein: 3g",
      category: "Dessert"
  },
  "Buko Salad": {
      title: "Buko Salad",
      description: "Buko Salad is a popular Filipino dessert enjoyed for its refreshing blend of flavors and textures. This delightful fruit salad features tender young coconut, a medley of mixed fruits, creamy dairy, and sweet condensed milk.",
      ingredients: [
          "2 cups Young coconut meat, shredded",
          "2 cups Mixed fruits (such as pineapple chunks, papaya, nata de coco, and kaong)",
          "1 cup All-purpose cream",
          "1/2 cup Condensed milk, or adjust to taste"
      ],
      method: [
          "Step 1: In a large mixing bowl, combine the shredded young coconut meat, mixed fruits, all-purpose cream, and condensed milk.",
          "Step 2: Gently fold the ingredients together until well combined and evenly coated with the cream and condensed milk.",
          "Step 3: Once thoroughly mixed, cover the bowl with plastic wrap and refrigerate for at least 1 hour to chill and allow the flavors to meld together.",
          "Step 4: After chilling, give the Buko Salad a final stir, then transfer it to a serving dish or individual bowls.",
          "Step 5: Serve the chilled Buko Salad as a refreshing dessert or side dish during gatherings or special occasions, and enjoy its delightful combination of sweet, creamy, and fruity flavors!"
      ],
      timeToPrepare: "30 minutes",
      nutritionalValue: "Per serving - Calories: 180, Fat: 5g, Carbohydrates: 30g, Protein: 2g",
      category: "Dessert"
  },
  "Pinakbet": {
      title: "Pinakbet",
      description: "Pinakbet is a classic Filipino vegetable dish known for its rich flavors and colorful assortment of mixed vegetables. Traditionally cooked with a combination of squash, eggplant, okra, string beans, bitter melon, and shrimp paste or fermented fish sauce, Pinakbet is a savory delight that's both nutritious and delicious.",
      ingredients: [
          "1 cup Squash, cubed",
          "1 cup Eggplant, sliced",
          "1 cup Okra, whole",
          "1 cup String beans, cut into segments",
          "1 cup Bitter melon (ampalaya), sliced",
          "2 tablespoons Shrimp paste or fermented fish sauce (bagoong)"
      ],
      method: [
          "Step 1: In a large skillet or wok, heat a tablespoon of cooking oil over medium heat.",
          "Step 2: Add the sliced bitter melon (ampalaya) to the skillet and sauté until slightly softened.",
          "Step 3: Next, add the cubed squash, sliced eggplant, whole okra, and string beans to the skillet.",
          "Step 4: Stir-fry the vegetables for about 5-7 minutes or until they start to become tender.",
          "Step 5: Add the shrimp paste or fermented fish sauce (bagoong) to the skillet and continue to stir-fry for another 3-5 minutes, ensuring that the vegetables are evenly coated with the savory sauce.",
          "Step 6: Once the vegetables are cooked to your desired tenderness and the flavors have melded together, remove the skillet from heat.",
          "Step 7: Transfer the Pinakbet to a serving dish and serve hot as a flavorful side dish or main course.",
          "Step 8: Enjoy the hearty and nutritious flavors of this traditional Filipino favorite!"
      ],
      timeToCook: "30 minutes",
      nutritionalValue: "Per serving - Calories: 150, Fat: 3g, Carbohydrates: 20g, Protein: 5g",
      category: "Vegetable"
  },
  "Sisig": {
      title: "Sisig",
      description: "Sisig is a beloved Filipino dish renowned for its bold flavors and unique texture. Made from parts of pig's head and liver, Sisig is a savory delicacy that's typically seasoned with calamansi juice, onions, and chili peppers. Often served on a sizzling plate, this dish is topped with a raw egg for added richness and indulgence.",
      ingredients: [
          "1 lb Pig's head, boiled and chopped",
          "1/2 lb Pork liver, boiled and chopped",
          "2-3 tablespoons Calamansi juice",
          "1 large Onion, finely chopped",
          "2-3 Green chili peppers, finely chopped",
          "1 Raw egg, for garnish",
          "Salt and pepper, to taste"
      ],
      method: [
          "Step 1: In a large pot, boil the pig's head and liver until tender. Once cooked, remove from the pot and allow to cool slightly before chopping into small pieces.",
          "Step 2: Heat a skillet or griddle over medium-high heat. Add the chopped pig's head and liver, and grill or fry until crispy and golden brown.",
          "Step 3: In a mixing bowl, combine the crispy pig's head and liver with calamansi juice, chopped onions, and chili peppers. Season with salt and pepper to taste.",
          "Step 4: Transfer the Sisig to a sizzling plate and garnish with a raw egg.",
          "Step 5: Serve immediately, allowing the raw egg to cook slightly on the hot plate, and enjoy the sizzling flavors of this iconic Filipino dish!"
      ],
      timeToCook: "2 hours",
      nutritionalValue: "Per serving - Calories: 400, Fat: 20g, Carbohydrates: 15g, Protein: 30g",
      category: "Pork"
  },
  "Kutsinta": {
      title: "Kutsinta",
      description: "Kutsinta is a beloved Filipino delicacy known for its unique jelly-like texture and sweet flavor. Made primarily from rice flour, brown sugar, and lye water, Kutsinta is a steamed rice cake often enjoyed as a snack or dessert. It's typically served with grated coconut for added flavor and texture.",
      ingredients: [
          "1 cup Rice flour",
          "1 cup Brown sugar",
          "1 1/2 cups Water",
          "1 teaspoon Lye water",
          "Grated coconut, for serving"
      ],
      method: [
          "Step 1: In a mixing bowl, combine the rice flour, brown sugar, and water. Mix until smooth and well-combined.",
          "Step 2: Add the lye water to the mixture and stir until fully incorporated. Lye water helps give Kutsinta its characteristic texture.",
          "Step 3: Pour the mixture into small molds, filling each mold about 3/4 full.",
          "Step 4: Steam the Kutsinta molds over boiling water for about 30-40 minutes, or until set and firm to the touch.",
          "Step 5: Once cooked, remove the Kutsinta from the molds and allow them to cool slightly.",
          "Step 6: Serve the Kutsinta warm or at room temperature, topped with grated coconut for extra flavor and texture.",
          "Step 7: Enjoy this delightful Filipino treat as a snack or dessert!"
      ],
      timeToCook: "45 minutes",
      nutritionalValue: "Per serving - Calories: 150, Fat: 2g, Carbohydrates: 30g, Protein: 1g",
      category: "Dessert"
  },
  "Cassava Cake": {
      title: "Cassava Cake",
      description: "Cassava Cake is a beloved Filipino dessert known for its rich and comforting flavor. Made from grated cassava, coconut milk, eggs, and condensed milk, this cake is baked until set and topped with a creamy custard layer, creating a delightful contrast of textures.",
      ingredients: [
          "4 cups Grated cassava",
          "1 can (14 oz) Coconut milk",
          "3 Eggs",
          "1 can (14 oz) Condensed milk",
          "1/2 cup Butter, melted",
          "1/2 cup Grated cheese (optional, for topping)"
      ],
      method: [
          "Step 1: Preheat your oven to 350°F (175°C). Grease a baking dish with butter or cooking spray.",
          "Step 2: In a large mixing bowl, combine the grated cassava, coconut milk, eggs, condensed milk, and melted butter. Mix until well-combined.",
          "Step 3: Pour the cassava mixture into the prepared baking dish, spreading it evenly.",
          "Step 4: Bake the cassava mixture in the preheated oven for about 45-50 minutes, or until the edges are set and the top is lightly golden brown.",
          "Step 5: While the cake is baking, prepare the custard topping. In a small bowl, mix together 1 can of coconut milk and 1 can of condensed milk until smooth.",
          "Step 6: Once the cake is partially set, remove it from the oven and carefully pour the custard mixture over the top, spreading it evenly with a spatula.",
          "Step 7: Sprinkle grated cheese evenly over the top of the custard layer, if desired.",
          "Step 8: Return the cake to the oven and bake for an additional 30-40 minutes, or until the custard is set and the top is golden brown.",
          "Step 9: Remove the cassava cake from the oven and allow it to cool before slicing into squares.",
          "Step 10: Serve the cassava cake warm or at room temperature, and enjoy the delicious flavors and textures of this Filipino dessert!"
      ],
      timeToCook: "1 hour 30 minutes",
      nutritionalValue: "Per serving - Calories: 280, Fat: 10g, Carbohydrates: 40g, Protein: 5g",
      category: "Dessert"
      
  }     
  };
  return recipes[recipeTitle];
  }

// Function to decrease the number of servings
function decreaseServings() {
  const servingsCount = document.getElementById('servings-count');
  let servings = parseInt(servingsCount.textContent);
  if (servings > 1) {
    servings--;
    servingsCount.textContent = servings;
    updateIngredients(servings);
  }
}

// Function to increase the number of servings
function increaseServings() {
  const servingsCount = document.getElementById('servings-count');
  let servings = parseInt(servingsCount.textContent);
  if (servings < 8) { // Limit servings button to 8
    servings++;
    servingsCount.textContent = servings;
    updateIngredients(servings);
  }
}


// Function to update the ingredient values based on the number of servings
function updateIngredients(servings) {
  const recipeTitle = document.getElementById('popupRecipeTitle').textContent; // Retrieve recipe title
  const recipeData = getRecipeData(recipeTitle);
  const popupIngredientsList = document.getElementById('popupIngredientsList');
  popupIngredientsList.innerHTML = '';
  
  recipeData.ingredients.forEach(ingredient => {
    const ingredientParts = ingredient.split(' ');
    let quantity, unit, ingredientName;
    
    // Check if the first part of the ingredient can be parsed as a float
    if (!isNaN(parseFloat(ingredientParts[0]))) {
      quantity = parseFloat(ingredientParts[0]);
      unit = ingredientParts[1];
      ingredientName = ingredientParts.slice(2).join(' ');
    } else {
      quantity = 1; // Assume quantity is 1 if not provided
      unit = ingredientParts[0];
      ingredientName = ingredientParts.slice(1).join(' ');
    }
    
    let adjustedQuantity = quantity * servings;
    
    const li = document.createElement('li');
    li.textContent = `${adjustedQuantity} ${unit} ${ingredientName}`;
    popupIngredientsList.appendChild(li);
  });
}