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

    if (!formData.fullName.trim()) {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid : string | boolean = validateForm();
    if (isValid === true) {
      signup(formData);
    }
  }

  return (
    <div className={""}>
      <h1>Sign Up</h1>

      {/* The form & login is what is important */}
      <form onSubmit={handleSubmit} className={"space-y-6 "}>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Full Name (Required) </legend>
          <input type="text" className="input w-full" placeholder="Your Name"
                 value={formData.fullName}
                 onChange={(e) => setFormData({...formData, fullName: e.target.value})}
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Username (Required) </legend>
          <input type="text" className="input w-full" placeholder="Username"
                 value={formData.username}
                 onChange={(e) => setFormData({...formData, username: e.target.value})}
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Email (Required) </legend>
          <input type="email" className="input w-full" placeholder="you@example.com"
                 value={formData.email}
                 onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Password (Required) </legend>
          <input type="password" className="input w-full" placeholder="********"
                 value={formData.password}
                 onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
        </fieldset>

        <button type={"submit"} className={"btn btn-primary w-full"} disabled={isSigningUp}>
          {
            isSigningUp ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Loading...
              </>
            ) : (
              "Create Account"
            )
          }
        </button>
      </form>

      <div className={"text-center"}>
        <p className={"text-base-content/60"}>
          Already have an account?{" "}
          <Link to="/login" className={"link link-primary"}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;