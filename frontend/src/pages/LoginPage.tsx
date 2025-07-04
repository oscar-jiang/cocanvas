import {type FormEvent, useState} from "react";
import {useAuthStore} from "../store/useAuthStore.ts";
import {Loader2} from "lucide-react";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const {login, isLoggedIn} = useAuthStore();

  const handleSubmit = async (e: FormEvent) :Promise<void> => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div>
      <h1>Sign In</h1>

      <form onSubmit={handleSubmit} className={"space-y-6 "}>
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

        <button type={"submit"} className={"btn btn-primary w-full"} disabled={isLoggedIn}>
          {
            isLoggedIn ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Loading...
              </>
            ) : (
              "Sign In"
            )
          }
        </button>
      </form>
    </div>
  );
};

export default LoginPage;