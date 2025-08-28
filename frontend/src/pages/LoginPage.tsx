import React, {type FormEvent, useState} from "react";
import {useAuthStore} from "../store/useAuthStore.ts";
import {Loader2} from "lucide-react";
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const {login, isLoggedIn} = useAuthStore();

  const handleSubmit = async (e: FormEvent) :Promise<void> => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await login(formData);
    } catch (e) {
      toast.error('Login failed. Try again later');
      console.error('Login failed with the error: ', e);
    }

  };

  return (
    <div className={'flex items-center justify-center min-h-[calc(100vh-4rem)]'}>

      {/* MAIN LOGIN COMPONENT */}
      <div>

        <div className={'flex flex-col items-center justify-center w-[436px] h-[374px] bg-white border-2 border-[#E5E5E5] rounded-3xl'}>
          {/* Log In Title */}
          <h1 className={'text-xl font-bold text-[#4B4B4B] mb-4'}>
            Log In
          </h1>

          {/* MAIN FORM DIV */}
          <div className={'w-[302px]'}>
            <form onSubmit={handleSubmit} className={"space-y-4"}>
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
                disabled={isLoggedIn}>
                {isLoggedIn ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                    <span className={'text-base font-bold text-[#7D7D7D]'}>Loading...</span>
                  </>
                ) : (
                  <span className={'text-base font-bold text-[#7D7D7D]'}>Sign In</span>
                )}
              </button>
            </form>
          </div>

        </div>

      </div>

    </div>
  );
};

export default LoginPage;