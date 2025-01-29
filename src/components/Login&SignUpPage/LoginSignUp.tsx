import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/shadcn components/tabs";
import { useReducer, useState } from "react";
import googleLogo from "../../assets/google.png";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase/Firebase";
import { useNavigate } from "react-router-dom";
import { AuroraBackground } from "@/ui/aceternity components/aurora-background";

interface State {
  email: string;
  password: string;
  username: string;
  rememberMe: boolean;
}
type Action = | { type: "SET_FIELD"; field: keyof State; value: string | boolean };


const LoginSignUp: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("SignUp");
  const initialState: State = {
    email: "",
    password: "",
    username: "",
    rememberMe: false,
  }

  const reducer = (state: State, action: Action) => {
    switch(action.type){
      case "SET_FIELD":
        return{
          ...state, 
          [action.field]: action.value
        };

        default: 
          return state;
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);


  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // console.log("Results: " ,result);
      console.log("Credential: " ,credential);
      navigate("/username");
      // const token = credential ? credential.accessToken : null;
      // const user = result.user;
    })
    .catch((error) => {
      console.log("Error: ",error);4
      // const errorCode = error?.code;
      // const errorMessage = error?.message;
      // const email = error?.customData?.email;
      // const credential = GoogleAuthProvider.credentialFromError(error);
      // console.log("Credential: " ,credential);
      // console.log("ErrorCode: " ,errorCode);
      // console.log("ErrorMessage: " ,errorMessage);
      // console.log("Email: " ,email);
    })
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(activeTab === "SignUp"){
      await createUserWithEmailAndPassword(auth, state.email, state.password)
      .then((value) => {
        navigate("/username");
        console.log(value)})
      .catch((error) => console.log("Error: ", error))
      // console.log("Email: ", state.email);
      // console.log("Pass:", state.password);
    } else{
      
    }
  }

  return (
    <div className="relative transition-opacity duration-1000"
    >
      <AuroraBackground
        className="w-full flex justify-center items-center"
      >
        <section className="relative w-1/3  border z-10 min-w-xl h-2xl px-10 py-8 rounded-xl bg-[rgba(255,255,255,0.4)] shadow-2xl backdrop-blur-md">
        <div
          className={`rounded-xl  absolute inset-0 z-0 transition-all duration-500 ${
            activeTab === "SignUp"
              ? "bg-green-400/40 shadow-[0px_0px_50px_5px_rgba(34,197,94,0.4)]"
              : "bg-blue-400/40 shadow-[0px_0px_50px_5px_rgba(59,130,246,0.4)]"
          }`}
        ></div>
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
                className={`transition-all duration-700 transform ease-in-out ${
                  activeTab === "SignUp" ? "rotate-y-0" : "rotate-y-180"
                }
                ${
                  activeTab === "SignUp" ? "opacity-100" : "opacity-0"
                }`}
              >
                {activeTab === "SignUp" && (
                  <form onSubmit={handleSubmit} className="space-y-6">
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
                        onChange={(e) =>
                          dispatch({ type: "SET_FIELD", field: "email", value: (e.target as HTMLInputElement).value })
                        }
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
                        onChange={(e) =>
                          dispatch({ type: "SET_FIELD", field: "password", value: (e.target as HTMLInputElement).value })
                        }
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="rememberMe"
                        className="h-4 w-4 rounded border-gray-300 focus:ring-blue-500"
                        onChange={(e) =>
                          dispatch({ type: "SET_FIELD", field: "rememberMe", value: (e.target as HTMLInputElement).value })
                        }
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
                        className="w-full bg-dark-beige text-teal-100 rounded-lg py-2 hover:bg-teal-100 hover:text-teal-500 shadow transition duration-300 flex justify-center items-center gap-x-3 cursor-pointer"
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
                className={`transition-all duration-700 transform ${
                  activeTab === "LogIn" ? "rotate-y-0" : "rotate-y-180"
                }
                ${
                  activeTab === "LogIn" ? "opacity-100" : "opacity-0"
                }`}
              >
                {activeTab === "LogIn" && (
                  <form onSubmit={handleSubmit} className="space-y-6">
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
                        onChange={(e) =>
                          dispatch({ type: "SET_FIELD", field: "username", value: (e.target as HTMLInputElement).value })
                        }
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
                        onChange={(e) =>
                          dispatch({ type: "SET_FIELD", field: "password", value: (e.target as HTMLInputElement).value })
                        }
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="rememberMe"
                          className="h-4 w-4 rounded border-gray-300 focus:ring-blue-500"
                          onChange={(e) =>
                            dispatch({ type: "SET_FIELD", field: "rememberMe", value: (e.target as HTMLInputElement).value })
                          }
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
                        className="w-full bg-dark-beige text-teal-100 rounded-lg py-2 hover:bg-teal-100 hover:text-teal-500 transition duration-300 flex justify-center items-center gap-x-3 shadow-2xl cursor-pointer"
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
      </AuroraBackground>
    </div>
  );
};

export default LoginSignUp;
