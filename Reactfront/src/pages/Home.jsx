import { BookForm, Hero, Rooms, ScrollToTop } from "../components";
import { Footer, Header, PageNotFound } from "../components";

const Home = () => {
  return (
    <div>
      <Header />
      <ScrollToTop />

      <Hero />

      <div className="container mx-auto relative">
        <div className="bg-accent/20 mt-4 p-4 lg:absolute lg:left-0 lg:right-0 lg:p-0 lg:-top-12 lg:z-30 lg:shadow-xl">
          <BookForm />
        </div>
      </div>

      <Rooms />
      <Footer />
    </div>
  );
};

export default Home;
