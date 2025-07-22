import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Buffer } from "buffer";
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
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const data = [];
        for (let i = 0; i < 4; i++) {
          const image = await axios.get(
            `${api}/${Math.round(Math.random() * 1000)}`
          );
          const buffer = Buffer.from(image.data);
          data.push(buffer.toString("base64"));
        }
        setAvatars(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading avatars", error);
        toast.error("Failed to load avatars", toastOptions);
      }
    };

    fetchAvatars();
  }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar === null) {
      toast.error("Please select an avatar", toastOptions);
      return;
    }

    const user = await JSON.parse(localStorage.getItem("chat-app-user"));
    const { data } = await axios.post(`${setAvatarAPI}/${user._id}`, {
      image: avatars[selectedAvatar],
    });

    if (data.isSet) {
      user.isAvatarImageSet = true;
      user.avatarImage = data.image;
      localStorage.setItem("chat-app-user", JSON.stringify(user));
      navigate("/");
    } else {
      toast.error("Error setting avatar. Please try again.", toastOptions);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="h-screen flex justify-center items-center bg-gray-900">
          <img src={loader} alt="loader" className="w-24 h-24" />
        </div>
      ) : (
        <div className="h-screen flex flex-col items-center justify-center gap-8 px-4 bg-gray-900 text-white">
          <h1 className="text-2xl md:text-3xl font-semibold text-center">
            Pick an Avatar as your profile picture
          </h1>

          <div className="flex gap-6 flex-wrap justify-center">
            {avatars.map((avatar, index) => (
              <img
                key={index}
                src={`data:image/svg+xml;base64,${avatar}`}
                alt="avatar"
                className={`w-24 h-24 rounded-full cursor-pointer transition duration-300 ${selectedAvatar === index
                    ? "ring-4 ring-purple-600"
                    : "hover:ring-4 hover:ring-purple-600"
                  }`}
                onClick={() => setSelectedAvatar(index)}
              />
            ))}
          </div>

          <button
            onClick={setProfilePicture}
            className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition duration-300"
          >
            Set as Profile Picture
          </button>
        </div>
      )}
    </>
  );
}
