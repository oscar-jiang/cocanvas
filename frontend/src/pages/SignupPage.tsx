import React, {useState} from 'react';
import {useAuthStore} from "../store/useAuthStore.ts";
import {Loader2} from "lucide-react";
import {Link} from "react-router-dom";
import toast from "react-hot-toast";

const SignupPage = () => {
  // const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: ""
  });

  // TODO: add an email verification for safety
  // TODO: add a confirm password field
  // TODO: add a rate limiter in the middleware

  const {signup, isSigningUp} = useAuthStore();

  const validateForm = ():string | boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]{4,29}$/;
    const normalizedEmail = formData.email.toLowerCase().trim();
    const username = formData.username.trim();
    const fullName = formData.fullName.trim();

    if (!fullName) {
      return toast.error("Full name is required");
    }

    if (!normalizedEmail) {
      return toast.error("Email is required");
    }

    if (!emailRegex.test(normalizedEmail)) {
      return toast.error("Invalid email address");
    }

    if (!username) {
      return toast.error("Username is required");
    }

    if (!usernameRegex.test(username)) {
      return toast.error("Username must start with a letter and be 5-30 characters long. Only letters, numbers, and underscores are allowed");
    }

    if (!formData.password) {
      return toast.error("Password is required");
    }

    if (formData.password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    if (formData.password.length > 64) {
      return toast.error("Password must be less than 64 characters");
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid : string | boolean = validateForm();
    if (isValid === true) {
      try {
        await signup(formData);
      } catch (e) {
        toast.error('Failed to sign in. Try again later.');
        console.error('Failed to sign in with the error: ',e);
      }
    }
  }

  return (
    // MAIN SIGN UP CONTAINER
    <div className={'font-nunito flex items-center justify-center min-h-[calc(100vh-4rem)]'}>

      {/* MAIN BODY COMPONENT */}
      <div>

        <div className={'flex flex-col items-center justify-center w-[436px] py-10 bg-white border-2 border-[#E5E5E5] rounded-3xl'}>
          {/* Sign up Title */}
          <h1 className={'text-xl font-bold text-[#4B4B4B] mb-4'}>
            Sign Up
          </h1>

          {/* MAIN FORM DIV */}
          <div className={'w-[302px]'}>
            <form onSubmit={handleSubmit} className={"space-y-4"}>
              {/* Full Name Container */}
              <div className={'flex flex-col w-full'}>
                <label className={'font-semibold text-xs text-[#7D7D7D] mb-1'}>Email Address</label>
                <input
                  className={'p-2 border-2 border-[#D8D8D8] rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-[#C8C8C8] bg-[#F7F7F7] max-h-[100px] placeholder:font-nunito placeholder:font-bold placeholder-[#D9D9D9]'}
                  placeholder="Enter your full name"
                  type={"text"}
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                />
              </div>

              {/* Username Container */}
              <div className={'flex flex-col w-full'}>
                <label className={'font-semibold text-xs text-[#7D7D7D] mb-1'}>Email Address</label>
                <input
                  className={'p-2 border-2 border-[#D8D8D8] rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-[#C8C8C8] bg-[#F7F7F7] max-h-[100px] placeholder:font-nunito placeholder:font-bold placeholder-[#D9D9D9]'}
                  placeholder="Enter Username"
                  type={"text"}
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                />
              </div>

              {/* Email Address Container */}
              <div className={'flex flex-col w-full'}>
                <label className={'font-semibold text-xs text-[#7D7D7D] mb-1'}>Email Address</label>
                <input
                  className={'p-2 border-2 border-[#D8D8D8] rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-[#C8C8C8] bg-[#F7F7F7] max-h-[100px] placeholder:font-nunito placeholder:font-bold placeholder-[#D9D9D9]'}
                  placeholder="Enter Email"
                  type={"email"}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              {/* Password Container */}
              <div className={'flex flex-col w-full'}>
                <label className={'font-semibold text-xs text-[#7D7D7D] mb-1'}>Password</label>
                <input
                  className={'p-2 border-2 border-[#D8D8D8] rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-[#C8C8C8] bg-[#F7F7F7] max-h-[100px] placeholder:font-nunito placeholder:font-bold placeholder-[#D9D9D9]'}
                  placeholder="********"
                  type={"password"}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
              </div>

              <button
                type={"submit"}
                className={
                  'px-6 py-3 bg-[#F7F7F7] flex items-center justify-center rounded-xl shadow-[0_6px_0_#D1D1D1] active:shadow-[0_2px_0_#D1D1D1] active:translate-y-1 transition-all duration-150 ease-out border-1 border-[#D1D1D1] w-full mt-5'
                }
                disabled={isSigningUp}
              >
                {isSigningUp ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                    <span className={'text-base font-bold text-[#7D7D7D]'}>Loading...</span>
                  </>
                ) : (
                  <span className={'text-base font-bold text-[#7D7D7D]'}>Sign Up</span>
                )}
              </button>
            </form>

            <div className={"text-center mt-8"}>
              <p className={"text-base-content/60"}>
                Already have an account?{" "}
                <Link to="/login" className={"link"}>
                  Log In
                </Link>
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default SignupPage;