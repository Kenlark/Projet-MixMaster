import {
  useLoaderData,
  Link,
  Form,
  useSearchParams,
  useNavigation,
} from "react-router-dom";

const cocktailSearchUrl =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get("search") || "";
  const response = await fetch(`${cocktailSearchUrl}${searchTerm}`);
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des produits");
  }
  const Drinks = await response.json();

  return Drinks.drinks || [];
};

function Drinks() {
  const data = useLoaderData();
  const [search, setSearch] = useSearchParams();
  const navigation = useNavigation();

  if (navigation.state === "loading") {
    return (
      <main className="loading-center">
        <div className="loading"></div>
      </main>
    );
  }

  return (
    <>
      <div className="test">
        <section className="search-bar">
          <div className="flex-search">
            <Form method="GET">
              <label htmlFor="search" className="sr-only">
                Search Cocktail
              </label>
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search cocktails..."
                defaultValue={search.get("search") || ""}
                className="input-search"
              />
              <button type="submit" className="btn-search">
                Search
              </button>
            </Form>
          </div>
        </section>

        <div className="grid">
          {data.length > 0 ? (
            data.map((Drink) => {
              const {
                idDrink,
                strDrink,
                strGlass,
                strAlcoholic,
                strDrinkThumb,
              } = Drink;
              return (
                <article key={idDrink} className="card">
                  <img
                    src={strDrinkThumb}
                    alt={strDrink}
                    className="drink-img"
                  />
                  <div className="flex-info">
                    <h5>{strDrink}</h5>
                    <p>{strGlass}</p>
                    <p className="glass-type">{strAlcoholic}</p>
                    <Link to={`/cocktail/${idDrink}`}>
                      <button className="btn-card">Details</button>
                    </Link>
                  </div>
                </article>
              );
            })
          ) : (
            <p>No cocktails found.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Drinks;
