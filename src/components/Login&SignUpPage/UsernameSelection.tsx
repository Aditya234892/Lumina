import { AuroraBackground } from "../../ui/aceternity components/aurora-background";
import { PlaceholdersAndVanishInput } from "@/ui/aceternity components/placeholders-and-vanish-input";
import { motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { firestoredb } from "@/firebase/Firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { debounce } from "../../custom functions/debounce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faSearchengin } from "@fortawesome/free-brands-svg-icons";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

export default function Username() {
  const [username, setUsername] = useState<string>("");
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const checkUsername = useCallback(
    debounce(async (inputUsername: string) => {
      if (!inputUsername || inputUsername.length < 4 ) {
        setIsAvailable(null);
        return;
      }

      setLoading(true);
      const usersRef = collection(firestoredb, "userDetails");
      const q = query(usersRef, where("username", "==", inputUsername));
      const querySnap = await getDocs(q);

      setIsAvailable(querySnap.empty);
      setLoading(false);
    }, 800),
    []
  );

  useEffect(() => {
    // Check if the username is valid
    if (username && !/^[a-zA-Z0-9_]+$/.test(username.slice(1))) {
      setError("Username can only contain letters, numbers, and _ (starting with @).");
    } else if (username && username.length < 4) {
      setError("Username must be at least 4 characters long.");
    } else if (username && username[0] !== "@") {
      setError("Username must start with @.");
    } else {
      setError(""); // Clear error if username is valid
      checkUsername(username);
    }
  }, [username, checkUsername]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isAvailable && !error) {
      try {
        await addDoc(collection(firestoredb, "userDetails"), { username });
        console.log("Username saved:", username);
        setUsername("");
      } catch (error) {
        console.error("Error saving username:", error);
      }
    }
  };

  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div
          className="text-3xl md:text-6xl font-bold dark:text-white text-center"
          style={{ fontFamily: "Merienda, serif" }}
        >
          From the darkness, your name ignites the night.
        </div>
        <div
          className="font-extralight text-base md:text-3xl dark:text-neutral-200 py-4"
          style={{ fontFamily: "Merienda, serif" }}
        >
          Unmask your identity. Choose your Lumin'ame.
        </div>
      </motion.div>

      <div className="w-1/2">
        <PlaceholdersAndVanishInput
          placeholders={["Enter your username"]}
          onChange={handleChange}
          onSubmit={onSubmit}
        />

        <div className="mt-4 h-12 text-start text-md px-28 transition-all duration-500">
          {error && <p className="text-red-500">{error}</p>}

          {loading ? (
            <FontAwesomeIcon icon={faSearchengin} className="text-white text-2xl" />
          ) : isAvailable === null ? null : isAvailable ? (
            <p className="text-green-400 flex items-center gap-x-3">
              <FontAwesomeIcon
                icon={faCheck}
                className="text-white bg-green-500 w-3 h-3 px-1 py-1 rounded-full"
              />
              Username is available
            </p>
          ) : (
            <p className="text-red-400 flex items-center gap-x-3">
              <FontAwesomeIcon icon={faCircleXmark} className="text-red-500 text-2xl" />
              Username is already taken
            </p>
          )}
        </div>
      </div>
    </AuroraBackground>
  );
}
