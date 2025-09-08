import { signIn } from "@/auth";
import { FaG } from "react-icons/fa6";

export const LoginGoogleButton = ({ redirectUrl }: { redirectUrl: string }) => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: redirectUrl });
      }}
    >
      <button className="flex items-center justify-center gap-3 w-full bg-white border border-gray-300 text-gray-700 font-medium py-3 px-6 rounded-xl shadow-sm hover:shadow-md hover:border-gray-400 transition-all duration-300 cursor-pointer">
        <FaG className="text-red-500 size-5" />
        <span className="text-sm font-medium">Sign in with Google</span>
      </button>
    </form>
  );
};
