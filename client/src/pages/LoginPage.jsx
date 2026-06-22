import { Link } from "react-router-dom";

import Login from "../assets/login.jpg";
import LoginForm from "../components/auth/LoginForm.jsx";

const LoginPage = () => {
  return (
    <div>
      <>
        <>
          <title>Login | BookNest</title>

          <meta
            name="description"
            content="Login to your BookNest account to access your orders, manage profile, and continue shopping for books."
          />

          <link
            rel="canonical"
            href={`${import.meta.env.VITE_CLIENT_URL}/login`}
          />

          {/* Open Graph */}
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Login | BookNest" />
          <meta
            property="og:description"
            content="Sign in to your BookNest account to continue shopping."
          />
          <meta
            property="og:url"
            content={`${import.meta.env.VITE_CLIENT_URL}/login`}
          />

          {/* Twitter/X */}
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content="Login | BookNest" />
          <meta
            name="twitter:description"
            content="Login to your BookNest account."
          />

          {/* Important SEO rule */}
          <meta name="robots" content="noindex,nofollow,noarchive" />
        </>
      </>
      <div className="flex h-175 w-full">
        <div className="w-full hidden md:inline-block">
          <img className="h-full ml-15" src={Login} alt="Login Image" />
        </div>

        <div className="w-full flex flex-col items-center justify-center">
          <LoginForm />
          <p className="text-gray-500/90 text-sm mt-4">
            Don’t have an account?
            <Link className="text-indigo-400 hover:underline" to="/signup">
              Sign up
            </Link>
          </p>
          <div className="w-full flex items-center justify-center mt-8 text-gray-500/80">
            <Link className="text-sm underline" to="/forgot-password">
              Forgot password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
