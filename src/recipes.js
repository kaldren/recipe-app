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
    btnAddIngredient.classList.add('btn');
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
    btnCreateRecipe.classList.add('btn');
    
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

    if (recipes.length === 0) {
        const noRecipesTxt = document.createElement('h2');
        noRecipesTxt.textContent = 'No recipies found.';

        recipesContainer.append(noRecipesTxt);
        rootEl.append(recipesContainer);
        return;
    }

    // Individual recipe
    if (recipeId) {
        const recipe = recipes.filter(el => {
            return el.id === recipeId;
        })

        const recipeDiv = document.createElement('div');
        const recipeName = document.createElement('p');
        const ingredientsArr = JSON.parse(recipe[0].ingredients);
        const dishName = recipe[0].dishName;

        recipeDiv.classList.add('recipe');

        recipeName.textContent = dishName;
        recipeName.classList.add('recipe-name');
        recipeDiv.append(recipeName);

        ingredientsArr.forEach(ingredient => {
            const ingredientEl = document.createElement('p');
            ingredientEl.textContent = ingredient;
            recipeDiv.append(ingredientEl);
        })
        
        const btnOptions = document.createElement('div');
        const recipeRemoveBtn = document.createElement('button');
        const recipeEditBtn = document.createElement('button');

        recipeRemoveBtn.textContent = 'Remove';
        recipeRemoveBtn.classList.add('btn');
        recipeRemoveBtn.classList.add('btn-remove');
        recipeRemoveBtn.dataset.id = `${recipeId}`;

        recipeRemoveBtn.addEventListener('click', e => {
            const recipeId = e.target.dataset.id;

            if (recipeId) {
                let recipesList = getAllRecipes();
                recipesList = recipesList.filter(recipe => {
                    return recipe.id !== recipeId;
                })
                localStorage.setItem('recipes', JSON.stringify(recipesList));
                loadAllRecipes();
                loadAllRecipeNames();
            }
        });
        
        recipeEditBtn.textContent = 'Edit';
        recipeEditBtn.classList.add('btn');
        recipeEditBtn.classList.add('btn-edit');
        
        btnOptions.classList.add('options');
        btnOptions.append(recipeEditBtn);
        btnOptions.append(recipeRemoveBtn);
        
        recipesContainer.append(recipeDiv);
        recipesContainer.append(btnOptions);
    }
    // Multiple recipes
    else {
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

            const btnOptions = document.createElement('div');
            const recipeRemoveBtn = document.createElement('button');
            const recipeEditBtn = document.createElement('button');

            recipeRemoveBtn.textContent = 'Remove';
            recipeRemoveBtn.classList.add('btn');
            recipeRemoveBtn.classList.add('btn-remove');
            recipeRemoveBtn.dataset.id = `${recipe.id}`;

            recipeRemoveBtn.addEventListener('click', e => {
                const recipeId = e.target.dataset.id;

                if (recipeId) {
                    let recipesList = getAllRecipes();
                    recipesList = recipesList.filter(recipe => {
                        return recipe.id !== recipeId;
                    })
                    localStorage.setItem('recipes', JSON.stringify(recipesList));
                    loadAllRecipes();
                    loadAllRecipeNames();
                }
            });

            recipeEditBtn.textContent = 'Edit';
            recipeEditBtn.classList.add('btn');
            recipeEditBtn.classList.add('btn-edit');
            recipeEditBtn.dataset.id = `${recipe.id}`;


            btnOptions.classList.add('options');
            btnOptions.append(recipeEditBtn);
            btnOptions.append(recipeRemoveBtn);
        
            recipesContainer.append(btnOptions);
        })
    }

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
        recipeName.dataset.id = `${recipe.id}`;

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