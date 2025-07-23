import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { setAvatarAPI } from "../../utils/ApiRequest";
import loader from "../../assets/loader.gif";

export default function SetAvatar() {
  const api = "https://api.multiavatar.com";
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const toastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    const generateAvatarURLs = () => {
      const avatarUrls = Array.from({ length: 4 }, () => {
        const id = Math.floor(Math.random() * 1000);
        return `${api}/${id}.svg`;
      });
      setAvatars(avatarUrls);
      setIsLoading(false);
    };

    generateAvatarURLs();
  }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar === null) {
      toast.error("Please select an avatar", toastOptions);
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      toast.error("User not logged in. Please login again.", toastOptions);
      navigate("/login");
      return;
    }

    try {
      const { data } = await axios.post(`${setAvatarAPI}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    } catch (error) {
      toast.error("Server error. Please try again later.", toastOptions);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="min-h-screen flex justify-center items-center">
          <img src={loader} alt="loader" className="w-20 h-20 sm:w-24 sm:h-24" />
        </div>
      ) : (
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 py-6 text-white">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center max-w-md">
            Pick an Avatar as your profile picture
          </h1>

          <div className="flex flex-wrap gap-5 justify-center max-w-3xl">
            {avatars.map((avatar, index) => (
              <img
                key={index}
                src={avatar}
                alt={`avatar-${index}`}
                className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full cursor-pointer transition duration-300 border-4 ${selectedAvatar === index
                  ? "border-purple-600"
                  : "border-transparent hover:border-purple-600"
                  }`}
                onClick={() => setSelectedAvatar(index)}
              />
            ))}
          </div>

          <button
            onClick={setProfilePicture}
            className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm sm:text-base font-medium transition duration-300"
          >
            Set as Profile Picture
          </button>
        </div>
      )}
    </>
  );
}
