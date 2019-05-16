const uuidv4 = require('uuid/v4');

const initRecipeForm = (container) => {
    // Default container is #main
    const rootEl = document.querySelector(container ? container : '#main');
    rootEl.innerHTML = '';

    const recipeForm = document.createElement('div');
    const formInputs = document.createElement('div');
    const dishName = document.createElement('input');
    const btnCreateRecipe = document.createElement('button');
    const btnAddIngredient = document.createElement('button');
    
    dishName.placeholder = 'Dish Name';
    dishName.classList.add('display-block');
    dishName.classList.add('input');
    dishName.classList.add('js-dishname');
    
    btnAddIngredient.textContent = 'Add Ingredient';
    btnAddIngredient.classList.add('button');
    btnAddIngredient.classList.add('whitespace');
    
    btnAddIngredient.addEventListener('click', () => {
        const ingredient = document.createElement('input');
        ingredient.placeholder = 'Ingredient';
        ingredient.classList.add('display-block');
        ingredient.classList.add('input');
        ingredient.classList.add('js-ingredient');
        
        formInputs.append(ingredient);
    });
    
    btnCreateRecipe.textContent = 'Create';
    btnCreateRecipe.classList.add('button');
    
    btnCreateRecipe.addEventListener('click', () => {
        const ingredientsList = [];

        const allInputFields = formInputs.childNodes;

        allInputFields.forEach((el) => {
            if (!el.classList.contains('js-dishname')) {
                ingredientsList.push(el.value);
            }
        });

        const recipe = {
            'id': uuidv4(),
            'dishName': dishName.value.trim(),
            'ingredients': JSON.stringify(ingredientsList)
        };

        const storage = getAllRecipes();

        storage.push(recipe);

        localStorage.setItem('recipes', JSON.stringify(storage));

        allInputFields.forEach((el) => {
            el.value = '';
        });
        loadAllRecipeNames();
    });

    formInputs.append(dishName);
    recipeForm.append(formInputs);
    recipeForm.append(btnCreateRecipe);
    recipeForm.append(btnAddIngredient);

    rootEl.append(recipeForm);
}

const getAllRecipes = (storageName) => {
    storageName = storageName ? storageName : 'recipes'; // Default is recipes
    const storage = JSON.parse(localStorage.getItem(storageName));

    return storage ? storage : [];
}

// By default show all recipes, else provide a recipeId to show individual recipe
const loadAllRecipes = (container, recipeId) => {
    const recipes = getAllRecipes();

    // Default container is #main
    const rootEl = document.querySelector(container ? container : '#main');
    rootEl.innerHTML = '';

    const recipesContainer = document.createElement('div');

    recipes.forEach(recipe => {
        const recipeDiv = document.createElement('div');
        const recipeName = document.createElement('p');
        const ingredientsArr = JSON.parse(recipe.ingredients);
        const dishName = recipe.dishName;

        recipeDiv.classList.add('recipe');

        recipeName.textContent = dishName;
        recipeName.classList.add('recipe-name');
        recipeDiv.append(recipeName);

        ingredientsArr.forEach(ingredient => {
            const ingredientEl = document.createElement('p');
            ingredientEl.textContent = ingredient;
            recipeDiv.append(ingredientEl);
        })
        recipesContainer.append(recipeDiv);
    })

    rootEl.append(recipesContainer);
}

const loadAllRecipeNames = (container) => {
    const recipes = getAllRecipes();

    // Default container is #sidebar
    const rootEl = document.querySelector(container ? container : '#sidebar');
    rootEl.innerHTML = '';

    const recipesContainer = document.createElement('div');

    recipes.forEach(recipe => {
        const recipeDiv = document.createElement('div');
        const recipeName = document.createElement('p');
        const dishName = recipe.dishName;

        recipeDiv.classList.add('recipe');

        recipeName.textContent = dishName;
        recipeName.classList.add('recipe-name');
        recipeName.dataset.id = `js-recipe-${recipe.id}`;

        recipeName.addEventListener('click', e => {
            const recipeId = e.target.dataset.id;
            loadAllRecipes(undefined,recipeId);
        });

        recipeDiv.append(recipeName);

        recipesContainer.append(recipeDiv);
    })

    rootEl.append(recipesContainer);
}

export {initRecipeForm, loadAllRecipes, loadAllRecipeNames}