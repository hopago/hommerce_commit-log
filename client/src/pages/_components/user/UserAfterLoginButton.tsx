import { useNavigate } from "react-router-dom";

import { MoreVertSvg } from "../constants/Icons";

import { useAuth, useUser } from "@clerk/clerk-react";
import { MdLogout } from "react-icons/md";

export default function UserAfterLoginButton() {
  const { user } = useUser();
  const { signOut } = useAuth();

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/myroom");
  };

  const handleLogout = () => {
    signOut();
  };

  return (
    <>
      <button
        className="home-nav__user__session__button"
        onClick={handleNavigate}
      >
        <div className="home-nav__user__session__button__wrapper">
          <div className="home-nav__user__session__button__wrapper__icon">
            <MoreVertSvg />
          </div>
          <div className="home-nav__user__session__button__wrapper__icon">
            <img src={user?.imageUrl} alt="user-image" />
          </div>
        </div>
      </button>
      <button className="session-button logout" onClick={handleLogout}>
        <div className="session-button__wrapper logout">
          <MdLogout size={21} />
        </div>
      </button>
    </>
  );
}
