"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { appointmentSchema } from "@/schemas/appointment";
import { AppointmentRequest } from "@/types/appointment";
import { NannyWithId } from "@/types/nanny";
import css from "./AppointmentForm.module.css";

interface AppointmentFormProps {
  nanny: NannyWithId;
  onClose: () => void;
}

export default function AppointmentForm({
  nanny,
  onClose,
}: AppointmentFormProps) {
  const [isSent, setIsSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AppointmentRequest>({
    resolver: yupResolver(appointmentSchema),
    defaultValues: {
      address: "",
      phone: "",
      childAge: "",
      time: "",
      email: "",
      parentName: "",
      comment: "",
    },
  });

  const onSubmit = () => {
    setIsSent(true);
  };

  if (isSent) {
    return (
      <div>
        <h2 className={css.title}>Thank you!</h2>
        <p className={css.description}>
          Your request has been sent. {nanny.name} will contact you soon to
          confirm the meeting.
        </p>
        <button type="button" className={css.submit} onClick={onClose}>
          Close
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className={css.title}>Make an appointment with a babysitter</h2>
      <p className={css.description}>
        Arranging a meeting with a caregiver for your child is the first step to
        creating a safe and comfortable environment. Fill out the form below so
        we can match you with the perfect care partner.
      </p>

      <div className={css.nanny}>
        <Image
          src={nanny.avatar_url}
          alt={nanny.name}
          width={44}
          height={44}
          className={css.nannyAvatar}
        />
        <div>
          <p className={css.nannyLabel}>Your nanny</p>
          <p className={css.nannyName}>{nanny.name}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={css.form} noValidate>
        <div className={css.row}>
          <div className={css.field}>
            <label htmlFor="address" className={css.srOnly}>
              Address
            </label>
            <input
              id="address"
              type="text"
              placeholder="Address"
              autoComplete="street-address"
              className={css.input}
              {...register("address")}
            />
            {errors.address && (
              <p className={css.error}>{errors.address.message}</p>
            )}
          </div>

          <div className={css.field}>
            <label htmlFor="phone" className={css.srOnly}>
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="+380"
              autoComplete="tel"
              className={css.input}
              {...register("phone")}
            />
            {errors.phone && <p className={css.error}>{errors.phone.message}</p>}
          </div>
        </div>

        <div className={css.row}>
          <div className={css.field}>
            <label htmlFor="childAge" className={css.srOnly}>
              Child&apos;s age
            </label>
            <input
              id="childAge"
              type="text"
              inputMode="numeric"
              placeholder="Child's age"
              className={css.input}
              {...register("childAge")}
            />
            {errors.childAge && (
              <p className={css.error}>{errors.childAge.message}</p>
            )}
          </div>

          <div className={css.field}>
            <label htmlFor="time" className={css.srOnly}>
              Meeting time
            </label>
            <input
              id="time"
              type="time"
              className={css.input}
              {...register("time")}
            />
            {errors.time && <p className={css.error}>{errors.time.message}</p>}
          </div>
        </div>

        <div className={css.field}>
          <label htmlFor="email" className={css.srOnly}>
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            className={css.input}
            {...register("email")}
          />
          {errors.email && <p className={css.error}>{errors.email.message}</p>}
        </div>

        <div className={css.field}>
          <label htmlFor="parentName" className={css.srOnly}>
            Father&apos;s or mother&apos;s name
          </label>
          <input
            id="parentName"
            type="text"
            placeholder="Father's or mother's name"
            autoComplete="name"
            className={css.input}
            {...register("parentName")}
          />
          {errors.parentName && (
            <p className={css.error}>{errors.parentName.message}</p>
          )}
        </div>

        <div className={css.field}>
          <label htmlFor="comment" className={css.srOnly}>
            Comment
          </label>
          <textarea
            id="comment"
            rows={4}
            placeholder="Comment"
            className={css.textarea}
            {...register("comment")}
          />
          {errors.comment && (
            <p className={css.error}>{errors.comment.message}</p>
          )}
        </div>

        <button type="submit" className={css.submit}>
          Send
        </button>
      </form>
    </div>
  );
}