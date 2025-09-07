"use client";
import { ContactMessage } from "@/lib/actions";
import { useActionState } from "react";
import cslx from "clsx";

const ContactForm = () => {
  const [state, formAction, isPending] = useActionState(ContactMessage, null);
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      {state?.message ? (
        <div
          className="p-4 mb-4 text-sm text-gray-800 rounded-lg bg-green-50 "
          role="alert"
        >
          <div className="font-medium">{state.message}</div>
        </div>
      ) : null}
      <form action={formAction}>
        <div className="grid md:grid-cols-2 gap-7 mt-6  ">
          <div>
            <input
              type="text"
              name="name"
              className="bg-gray-50 p-3 border border-gray-200 rounded-lg w-full font-light"
              placeholder="Name*"
            />
            <div aria-live="polite" aria-atomic="true">
              <p className="text-sm text-red-500 mt-2">{state?.error?.name}</p>
            </div>
          </div>
          <div>
            <input
              type="email"
              name="email"
              className="bg-gray-50 p-3 border border-gray-200 rounded-lg w-full font-light"
              placeholder="mal@example.com*"
            />
            <div aria-live="polite" aria-atomic="true">
              <p className="text-sm text-red-500 mt-2">{state?.error?.email}</p>
            </div>
          </div>
          <div className="md:col-span-2">
            <input
              type="text"
              name="subject"
              className="bg-gray-50 p-3 border border-gray-200 rounded-lg w-full font-light"
              placeholder="subject*"
            />
            <div aria-live="polite" aria-atomic="true">
              <p className="text-sm text-red-500 mt-2">
                {state?.error?.subject}
              </p>
            </div>
          </div>
          <div className="md:col-span-2">
            <textarea
              rows={5}
              name="message"
              className="bg-gray-50 p-3 border border-gray-200 rounded-lg w-full font-light"
              placeholder="Your Mesage"
            ></textarea>
            <div aria-live="polite" aria-atomic="true">
              <p className="text-sm text-red-500 mt-2">
                {state?.error?.message}
              </p>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className={cslx(
            "px-10 text-center py-4 font-semibold text-white w-full bg-orange-400 rounded-lg hover:bg-orange-500 cursor-pointer",
            {
              "opacity-50 cursor-progress animate-pulse": isPending,
            }
          )}
          disabled={isPending}
        >
          {isPending ? "Loading..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
