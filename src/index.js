import {initRecipeForm, loadAllRecipes, loadAllRecipeNames} from './recipes';

const btnLoadAllRecipes = document.querySelector('.btn-all-recipes');
const btnLoadRecipeForm = document.querySelector('.btn-new-recipe');

loadAllRecipeNames();

btnLoadAllRecipes.addEventListener('click', () => {
    loadAllRecipes();
});

btnLoadRecipeForm.addEventListener('click', () => {
    initRecipeForm();
});