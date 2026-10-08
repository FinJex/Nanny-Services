import Header from "@/components/Header/Header";
import css from "./page.module.css";

export default async function Home() {

  return (
<section className={css.homePage}>
      <Header />
</section>
  );
}
