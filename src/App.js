import "./App.css";
import HeatMap from "@uiw/react-heat-map";
import Heatmap from "./components/Heatmap";
import { IoLogoGithub } from "react-icons/io";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { GoLink } from "react-icons/go";
import { MdDownload } from "react-icons/md";
import { toPng } from "html-to-image";
import download from "downloadjs";

import { useEffect, useRef, useState } from "react";

function App() {
  const [userName, setUsername] = useState("");
  const [heatMapValue, setHeatMapValue] = useState(null);
  const [worth, setWorth] = useState(null);
  const [linkedIn, setLinkedIn] = useState(null);
  const [github, setGithub] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [userProfileImage, setUserProfileImage] = useState(null);
  const [twitter, setTwitter] = useState(null);
  const divRef = useRef(null);

  const value = [];

  useEffect(() => {
    console.log(userName);
  });

  const downloadImage = () => {
    if (divRef.current) {
      divRef.current.style.backgroundColor = "white";
      toPng(divRef.current)
        .then(function (dataUrl) {
          download(dataUrl, "div-image.png");
        })
        .catch(function (error) {
          console.error("Error generating image:", error);
        });
    }
  };
  async function getDataForHeatMap(userId) {
    const data = await fetch(
      `http://localhost:4000/user/${userId}/active-years`
    );
    const response = await data.json();
    // console.log(response.data.matchedUser.userCalendar);
    const user_badge = await fetch(
      `http://localhost:4000/user/${userId}/badges`
    );
    const user_badge_response = await user_badge.json();

    const get_contest_data = await fetch(
      `http://localhost:4000/user/${userId}/contests`
    );
    const get_contest_data_response = await get_contest_data.json();
    // console.log()
    let cost_with_contest =
      get_contest_data_response?.data?.userContestRanking
        ?.attendedContestsCount !== null ? (get_contest_data_response?.data?.userContestRanking
          ?.attendedContestsCount * 10):(0);
          console.log("cost_with_contest: ",cost_with_contest);
    let cost_with_badge = !user_badge_response
      ? 0
      : user_badge_response?.data?.matchedUser?.badges?.length * 5;
    console.log("Cost_with_badge",cost_with_badge);
    // console.log(userId)
    // userProfile
    const userProfile = await fetch(`http://localhost:4000/user/${userId}`);
    const userProfile_response = await userProfile.json();
    console.log("user profile: ", userProfile_response.data.matchedUser);
    setGithub(userProfile_response.data.matchedUser?.githubUrl);
    setLinkedIn(userProfile_response.data.matchedUser?.linkedinUrl);
    setTwitter(userProfile_response.data.matchedUser?.twitterUrl);
    setLanguages(userProfile_response.data.matchedUser?.languageProblemCount);
    setUserProfileImage(
      userProfile_response.data.matchedUser?.profile?.userAvatar
    );

    // console.log(user_badge_response.data.matchedUser.badges)
    const data1 = JSON.parse(
      response.data.matchedUser.userCalendar.submissionCalendar
    );

    const dataArray = Object.entries(data1);

    const formattedData = dataArray.map(([timestamp, count]) => {
      const date = new Date(parseInt(timestamp) * 1000);
      const formattedDate = `${date.getFullYear()}/${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}`;
      value.push({ date: formattedDate, count });
    });

    let cost_number_of_active_days = value.length * 0.9;
    console.log("Cost_active_days",cost_number_of_active_days);
    const finalCost = await
      (cost_with_badge + cost_number_of_active_days + cost_with_contest);
    setWorth(finalCost);
    console.log(finalCost)
    setHeatMapValue(value);
  }

  function handleSubmit(e) {
    // console.log("A");
    if (userName === "") {
      return;
    }
    getDataForHeatMap(userName);
  }

  return (
    <div className="flex bg-[#ffffff] flex-col justify-center items-center">
      <div className="mt-5">
        <span className="text-2xl font-semibold">Leetcode Tracker</span>
      </div>
      <div className="mt-10 mb-20 w-full flex justify-center">
        <form
          className="w-[80%] flex border-teal-500"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <input
            type="text"
            className="w-full border py-4 px-4 rounded-full rounded-r-none shadow-md"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="Enter user name"
            value={userName}
          />
          <input
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 transition-all ease-in duration-200 rounded-r-full px-8 text-white font-semibold shadow-md"
            value="Submit"
          />
        </form>
      </div>
      <div ref={divRef}>
        <div className="flex flex-col items-center mb-5">
          {userProfileImage && (
            <img
              src={userProfileImage}
              className="rounded-full w-28 mb-5"
              alt=""
              srcset=""
            />
          )}
          {worth && <div className="font-semibold text-xl">{userName}</div>}
        </div>
        <div className="flex justify-center mb-5">
          {
            <div className="flex gap-x-14">
              <div>
                {github && (
                  <div>
                    <a className="flex items-center gap-x-2" href={github}>
                      <IoLogoGithub /> Github
                    </a>
                  </div>
                )}
              </div>

              <div>
                {linkedIn && (
                  <div>
                    <a className="flex items-center gap-x-2" href={linkedIn}>
                      <FaLinkedin className="text-blue-600" />
                      Linkedin
                    </a>
                  </div>
                )}
              </div>

              <div>
                {twitter && (
                  <div>
                    <a className="flex items-center gap-x-2" href={twitter}>
                      <FaTwitter className="text-blue-500" />
                      Twitter
                    </a>
                  </div>
                )}
              </div>
            </div>
          }
        </div>
        
        {worth && (
          <div className="flex flex-col mb-10 items-center">
            <div className="text-yellow-500 font-semibold text-4xl">
              ${worth}
            </div>
            <div className="font-semibold">Estimated Worth</div>
          </div>
        )}
        {heatMapValue ? <Heatmap heatMapValue={heatMapValue} /> : <div></div>}
      </div>
      {worth && (
        <div className="flex items-center mb-10">
          <button
            className="w-10 h-10 shadow-2xl flex justify-center items-center rounded-full"
            onClick={downloadImage}
          >
            <MdDownload className="text-2xl" />
          </button>
          <button className="flex items-center gap-x-2">
            <GoLink />
            <span className="flex gap-x-1">
              <span className="font-semibold">Get yours</span>
              leetcode-worth-tracker.vercel.app
            </span>
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
