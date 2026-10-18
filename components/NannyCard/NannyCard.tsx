"use client";

import { useCallback, useState } from "react";
import AppointmentForm from "@/components/AppointmentForm/AppointmentForm";
import Modal from "@/components/Modal/Modal";
import Image from "next/image";
import { NannyWithId } from "@/types/nanny";
import css from "./NannyCard.module.css";

interface NannyCardProps {
  nanny: NannyWithId;
}

function getAge(birthday: string) {
  const birth = new Date(birthday);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age -= 1;
  }

  return age;
}

export default function NannyCard({ nanny }: NannyCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);

  const closeAppointment = useCallback(() => setIsAppointmentOpen(false), []); 
  const characters = nanny.characters
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
    .join(", ");

  return (
    <article className={css.card}>
      <div className={css.avatarWrap}>
        <Image
          src={nanny.avatar_url}
          alt={nanny.name}
          width={96}
          height={96}
          className={css.avatar}
        />
        <span className={css.online} />
      </div>

      <div className={css.body}>
        <div className={css.top}>
          <div>
            <p className={css.role}>Nanny</p>
            <h2 className={css.name}>{nanny.name}</h2>
          </div>

          <div className={css.meta}>
            <span className={css.metaItem}>
              <svg width="16" height="16" aria-hidden="true">
                <use href="/sprite.svg#icon-location" />
              </svg>
              {nanny.location}
            </span>
            <span className={css.metaItem}>
              <svg width="16" height="16" aria-hidden="true">
                <use href="/sprite.svg#icon-star" />
              </svg>
              Rating: {nanny.rating}
            </span>
            <span className={css.metaItem}>
              Price / 1 hour:{" "}
              <span className={css.price}>{nanny.price_per_hour}$</span>
            </span>
            <button
              type="button"
              className={css.heart}
              aria-label="Add to favorites"
            >
              <svg width="26" height="26" aria-hidden="true">
                <use href="/sprite.svg#icon-heart" />
              </svg>
            </button>
          </div>
        </div>

        <ul className={css.tags}>
          <li className={css.tag}>
            Age: <span className={css.value}>{getAge(nanny.birthday)}</span>
          </li>
          <li className={css.tag}>
            Experience: <span className={css.value}>{nanny.experience}</span>
          </li>
          <li className={css.tag}>
            Kids Age: <span className={css.value}>{nanny.kids_age}</span>
          </li>
          <li className={css.tag}>
            Characters: <span className={css.value}>{characters}</span>
          </li>
          <li className={css.tag}>
            Education: <span className={css.value}>{nanny.education}</span>
          </li>
        </ul>

        <p className={css.about}>{nanny.about}</p>

{!isExpanded && (
  <button
    type="button"
    className={css.readMore}
    onClick={() => setIsExpanded(true)}
    aria-expanded={false}
  >
    Read more
  </button>
)}

{isExpanded && (
  <>
    <ul className={css.reviews}>
      {nanny.reviews.map((review, index) => (
        <li key={`${review.reviewer}-${index}`}>
          <div className={css.reviewHeader}>
            <span className={css.reviewAvatar} aria-hidden="true">
              {review.reviewer.charAt(0)}
            </span>
            <div>
              <p className={css.reviewer}>{review.reviewer}</p>
              <p className={css.reviewRating}>
                <svg width="16" height="16" aria-hidden="true">
                  <use href="/sprite.svg#icon-star" />
                </svg>
                {review.rating.toFixed(1)}
              </p>
            </div>
          </div>
          <p className={css.comment}>{review.comment}</p>
        </li>
      ))}
    </ul>

    <button type="button" className={css.appointment} onClick={() => setIsAppointmentOpen(true)}>
      Make an appointment
    </button>
  </>
)}
      </div>
      {isAppointmentOpen && (
  <Modal onClose={closeAppointment} maxWidth="600px">
    <AppointmentForm nanny={nanny} onClose={closeAppointment} />
  </Modal>
)}
    </article>
  );
}