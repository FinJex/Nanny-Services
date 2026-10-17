import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header/Header";
import css from "./page.module.css";

export default function Home() {
  return (
    <main>
      <section className={css.homePage}>
        <Header />

        <div className={css.hero}>
          <h1 className={css.title}>Make Life Easier for the Family:</h1>
          <p className={css.subtitle}>
            Find Babysitters Online for All Occasions
          </p>
          <Link href="/nannies" className={css.button}>
            Get started
            <svg width="14" height="16" aria-hidden="true">
              <use href="/sprite.svg#icon-arrow" />
            </svg>
          </Link>
        </div>

        <div className={css.photo}>
          <Image
            src="/hero-picture.jpg"
            alt="Child looking through a picture book"
            fill
            priority
            sizes="50vw"
            className={css.image}
          />
          <div className={css.card}>
            <span className={css.cardIcon}>
              <svg width="20" height="15" aria-hidden="true">
                <use href="/sprite.svg#icon-tick" />
              </svg>
            </span>
            <div>
              <p className={css.cardLabel}>Experienced nannies</p>
              <p className={css.cardValue}>15,000</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}