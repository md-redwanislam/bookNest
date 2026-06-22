import { Link } from "react-router-dom";

import RegistrationImage from "../assets/registration.jpg";

import RegistrtationForm from "../components/auth/RegistrtationForm";
const RegistrationPage = () => {
  return (
    <div>
      <>
        <>
          <title>Create Account | BookNest</title>

          <meta
            name="description"
            content="Create your BookNest account to start buying books, track orders, and manage your profile."
          />

          <link
            rel="canonical"
            href={`${import.meta.env.VITE_CLIENT_URL}/signup`}
          />

          {/* Open Graph */}
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Create Account | BookNest" />
          <meta
            property="og:description"
            content="Sign up for BookNest and start exploring thousands of books."
          />
          <meta
            property="og:url"
            content={`${import.meta.env.VITE_CLIENT_URL}/signup`}
          />

          {/* Twitter/X */}
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content="Create Account | BookNest" />
          <meta
            name="twitter:description"
            content="Join BookNest and discover your next favorite book."
          />

          {/* Important SEO rule */}
          <meta name="robots" content="noindex,nofollow,noarchive" />
        </>
      </>
      <div className="flex h-175 w-full">
        <div className="w-full flex flex-col items-center justify-center">
          <RegistrtationForm />

          <p className="text-gray-500/90 text-sm mt-4">
            Already Have an account?
            <Link className="text-indigo-400 hover:underline" to="/signin">
              Sign in
            </Link>
          </p>
        </div>
        <div className="w-full hidden md:inline-block">
          <img
            className="h-full ml-10"
            src={RegistrationImage}
            alt="Registration Image"
          />
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
