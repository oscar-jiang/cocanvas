import React, {useState} from 'react';
import {useAuthStore} from "../store/useAuthStore.ts";
import {Loader2} from "lucide-react";
import {Link} from "react-router-dom";
import toast from "react-hot-toast";

const SignupPage = () => {
  // const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  });

  const {signup, isSigningUp} = useAuthStore();

  const validateForm = ():string | boolean => {
    if (!formData.fullName.trim()) {
      return toast.error("Full name is required");
    }

    if (!formData.email.trim()) {
      return toast.error("Email is required");
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return toast.error("Invalid email address");
    }

    if (!formData.password.trim()) {
      return toast.error("Password is required");
    }

    if (formData.password.length < 6) {
      return toast.error("Password must be at least 6 characters");
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

      <form onSubmit={handleSubmit} className={"space-y-6 "}>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Full Name</legend>
          <input type="text" className="input w-full" placeholder="Your Name"
                 value={formData.fullName}
                 onChange={(e) => setFormData({...formData, fullName: e.target.value})}
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Email</legend>
          <input type="email" className="input w-full" placeholder="you@example.com"
                 value={formData.email}
                 onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Password</legend>
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