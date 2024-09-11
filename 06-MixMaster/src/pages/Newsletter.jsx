import { Form, useNavigation } from "react-router-dom";

function Newsletter() {
  const { state } = useNavigation();

  if (state === "loading") {
    return (
      <main className="loading-center">
        <div className="loading"></div>
      </main>
    );
  }

  console.log(state);

  return (
    <>
      <section className="newsletter-center">
        <div className="newsletter-form">
          <Form method="POST">
            <div className="flex-newsletter">
              <h5>Our Newsletter</h5>
              <div>
                <div className="newsletter-label">
                  <label htmlFor="name">Name</label>
                </div>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="newsletter-search"
                  required
                />
              </div>
              <div>
                <div className="newsletter-label">
                  <label htmlFor="lastname">LastName</label>
                </div>
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  className="newsletter-search"
                  required
                />
              </div>
              <div>
                <div className="newsletter-label">
                  <label htmlFor="email">Email</label>
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="newsletter-search"
                  defaultValue={"test@test.com"}
                  required
                />
              </div>
              <button
                type="submit"
                className="newsletter-btn"
                disabled={state === "submitting"}
              >
                {state === "submitting" ? "Submitting" : "Submit"}
              </button>
            </div>
          </Form>
        </div>
      </section>
    </>
  );
}

export default Newsletter;
