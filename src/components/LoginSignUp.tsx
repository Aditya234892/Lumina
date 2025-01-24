import { WavyBackground } from "@/ui/aceternity components/wavy-background";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/shadcn components/tabs";
import { useState } from "react";
import googleLogo from "../assets/google.png";

const LoginSignUp: React.FC = () => {
  const [activeTab, setActiveTab] = useState("SignUp");

  const signInWithGoogle = () => {
    // Handle Google sign-in here
  };

  return (
    <div className="relative">
      <WavyBackground
        colors={["#22c55e", "#1d4ed8", "#38bdf8", "#ec4899", "#34d399"]}
        backgroundFill="#00111f"
        blur={8}
        speed="fast"
        waveOpacity={0.8}
      >
        <div
          className={`rounded-3xl absolute inset-0 z-0 transition-all duration-500 ${
            activeTab === "SignUp"
              ? "bg-green-500/20 shadow-[0px_0px_100px_40px_rgba(34,197,94,0.6)] animate-move-shadow"
              : "bg-blue-500/20 shadow-[0px_0px_100px_40px_rgba(59,130,246,0.6)] animate-move-shadow"
          }`}
        ></div>

        <section className="relative z-10 min-w-xl h-2xl px-10 py-8 rounded-2xl bg-[rgba(255,255,255,0.4)] shadow-2xl backdrop-blur-md">
          <Tabs
            defaultValue="SignUp"
            onValueChange={(value) => setActiveTab(value)}
            className="relative overflow-hidden"
          >
            <TabsList className="flex justify-between mb-10">
              <TabsTrigger
                value="SignUp"
                className={`text-lg font-semibold px-6 py-2 transition duration-500 cursor-pointer ${
                  activeTab === "SignUp"
                    ? "text-white bg-gradient-to-r from-green-400 to-green-500 shadow-lg rounded-lg"
                    : "text-gray-700 hover:text-green-400"
                }`}
              >
                Sign Up
              </TabsTrigger>
              <TabsTrigger
                value="LogIn"
                className={`text-lg font-semibold px-6 py-2 transition duration-500 cursor-pointer ${
                  activeTab === "LogIn"
                    ? "text-white bg-gradient-to-r from-blue-400 to-blue-500 shadow-lg rounded-lg"
                    : "text-gray-700 hover:text-blue-400"
                }`}
              >
                Log In
              </TabsTrigger>
            </TabsList>

            <div className="relative z-20">
              <TabsContent
                value="SignUp"
                className={`transition-all duration-500 transform ${
                  activeTab === "SignUp" ? "rotate-y-0" : "-rotate-y-180"
                }`}
              >
                {activeTab === "SignUp" && (
                  <form className="space-y-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-none"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-none"
                        placeholder="Enter your password"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="rememberMe"
                        className="h-4 w-4 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <label
                        htmlFor="rememberMe"
                        className="text-sm text-gray-700"
                      >
                        Remember Me
                      </label>
                    </div>
                    <div className="flex gap-x-10">
                      <button
                        type="button"
                        onClick={signInWithGoogle}
                        className="w-full bg-dark-beige text-teal-100 rounded-lg py-2 hover:bg-teal-100 hover:text-teal-500 shadow transition duration-300 flex justify-center items-center gap-x-3"
                      >
                        Sign Up with{" "}
                        <img
                          src={googleLogo}
                          alt="Google Logo"
                          className="w-8"
                        />
                      </button>

                      <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
                      >
                        Sign Up
                      </button>
                    </div>
                  </form>
                )}
              </TabsContent>

              <TabsContent
                value="LogIn"
                className={`transition-all duration-500 transform ${
                  activeTab === "LogIn" ? "rotate-y-0" : "rotate-y-180"
                }`}
              >
                {activeTab === "LogIn" && (
                  <form className="space-y-6">
                    <div>
                      <label
                        htmlFor="username"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Username
                      </label>
                      <input
                        type="text"
                        id="username"
                        className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-none"
                        placeholder="Enter your username"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-none"
                        placeholder="Enter your password"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="rememberMe"
                          className="h-4 w-4 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <label
                          htmlFor="rememberMe"
                          className="text-sm text-gray-700"
                        >
                          Remember Me
                        </label>
                      </div>
                      <a
                        href="#"
                        className="text-sm text-blue-700 hover:underline"
                      >
                        Forgot Password?
                      </a>
                    </div>
                    <div className="flex gap-x-10">
                      <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
                      >
                        Log In
                      </button>
                      <button
                        type="button"
                        onClick={signInWithGoogle}
                        className="w-full bg-dark-beige text-teal-100 rounded-lg py-2 hover:bg-teal-100 hover:text-teal-500 transition duration-300 flex justify-center items-center gap-x-3 shadow-2xl"
                      >
                        Sign In with{" "}
                        <img
                          src={googleLogo}
                          alt="Google Logo"
                          className="w-8"
                        />
                      </button>
                    </div>
                  </form>
                )}
              </TabsContent>
            </div>
          </Tabs>
        </section>
      </WavyBackground>
    </div>
  );
};

export default LoginSignUp;
