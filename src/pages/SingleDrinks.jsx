import { useLoaderData, Link } from "react-router-dom";

const singleCocktailUrl =
  "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

export const loader = async ({ params }) => {
  const { DrinkID } = params;

  const response = await fetch(`${singleCocktailUrl}${DrinkID}`);
  const data = await response.json();
  const drinks = data.drinks ? data.drinks[0] : null;

  if (!drinks) {
    throw new Response("", {
      status: 404,
    });
  }

  return drinks;
};

function SingleDrinks() {
  const {
    strDrinkThumb,
    strDrink,
    strCategory,
    strAlcoholic,
    strGlass,
    strIngredient1,
    strIngredient2,
    strIngredient3,
    strIngredient4,
    strIngredient5,
    strIngredient6,
    strIngredient7,
    strIngredient8,
    strIngredient9,
    strInstructions,
  } = useLoaderData();

  const ingredients = [
    strIngredient1,
    strIngredient2,
    strIngredient3,
    strIngredient4,
    strIngredient5,
    strIngredient6,
    strIngredient7,
    strIngredient8,
    strIngredient9,
  ]
    .filter((ingredient) => ingredient)
    .join(", ");

  return (
    <>
      <div className="sd-btn-center">
        <Link to={"/"}>
          <button className="sd-btn">Back Home</button>
        </Link>
        <h3>{strDrink}</h3>
      </div>
      <div className="sd-grid">
        <img src={strDrinkThumb} alt={strDrink} className="single-drink" />
        <div className="sd-info-mb">
          <div className="sd-info">
            <p className="sd-str">
              <span className="sd-info-name">Name :</span>
              {strDrink}
            </p>
            <p className="sd-str">
              <span className="sd-info-name">Category :</span>
              {strCategory}
            </p>
            <p className="sd-str">
              <span className="sd-info-name">Info :</span>
              {strAlcoholic}
            </p>
            <p className="sd-str">
              <span className="sd-info-name">Glass :</span>
              {strGlass}
            </p>
            <p className="sd-str">
              <span className="sd-info-name">Ingredients:</span>
              {ingredients ? ingredients : " "}
            </p>
            <p className="sd-str">
              <span className="sd-info-name">instructions:</span>
              {strInstructions}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleDrinks;
