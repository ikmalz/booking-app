import { Metadata } from "next";
import { LoginGoogleButton } from "@/components/login-buton";

export const metadata: Metadata = {
  title: "Sign In",
};

const SignInPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ redirect_url?: string }>;
}) => {
  const params = (await searchParams)?.redirect_url;
  const redirectUrl = params ? `/${params}` : "/";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-gray-800 text-center">
          Welcome Back
        </h1>
        <p className="text-gray-500 text-center mt-2 mb-8">
          Sign in to continue
        </p>

        <div className="space-y-4">
          <LoginGoogleButton redirectUrl={redirectUrl} />
        </div>

        <p className="text-sm text-gray-400 text-center mt-8">
          By signing in, you agree to our{" "}
          <a href="#" className="text-orange-500 hover:underline">
            Terms
          </a>{" "}
          and{" "}
          <a href="#" className="text-orange-500 hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
