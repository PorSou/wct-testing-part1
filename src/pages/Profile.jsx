import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { setUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import defaultAvatar from "../assets/profile.jpeg";

export default function Profile() {
  const reduxUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(defaultAvatar);
  const [loading, setLoading] = useState(false);

  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 600 });
  }, []);

  useEffect(() => {
    if (auth.currentUser) {
      setDisplayName(auth.currentUser.displayName || "");
      setPhotoURL(auth.currentUser.photoURL || "");
      setPreview(auth.currentUser.photoURL || defaultAvatar);
    } else if (!reduxUser) {
      navigate("/login");
    }
  }, [reduxUser, navigate]);

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdateProfile = async () => {
    if (!auth.currentUser) return;

    try {
      setLoading(true);

      let newPhotoURL = photoURL || defaultAvatar;

      if (selectedFile) {
        newPhotoURL = preview; // UI only
      }

      await updateProfile(auth.currentUser, {
        displayName,
        photoURL: newPhotoURL,
      });

      dispatch(
        setUser({
          ...reduxUser,
          displayName,
          photoURL: newPhotoURL,
        })
      );

      setSelectedFile(null);
      showToastMessage("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      showToastMessage("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white/10 backdrop-blur-md rounded-xl text-white border border-gray-200 shadow-lg">
      <h1 className="text-3xl text-blue-900 font-bold mb-6 text-center">
        Your Profile
      </h1>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center">
          <label className="cursor-pointer relative">
            <img
              src={preview}
              alt="profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
            />
            <div className="absolute bottom-0 right-0 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 p-2 rounded-full shadow-md">
              <span className="text-white text-sm">Edit</span>
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>

        <div>
          <label className="block mb-1 text-black font-semibold">
            Display Name
          </label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-200 text-black"
          />
        </div>

        <div>
          <label className="block text-black mb-1 font-semibold">Email</label>
          <input
            type="email"
            value={auth.currentUser?.email || ""}
            readOnly
            className="w-full px-4 py-2 rounded-lg bg-gray-200 text-black"
          />
        </div>

        <button
          onClick={handleUpdateProfile}
          disabled={loading}
          className="w-full py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-lg text-white font-semibold"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </div>

      {showToast && (
        <div
          data-aos="fade-down"
          className="fixed top-6 right-6 z-50 px-4 py-2 rounded-lg text-white shadow-lg bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}
