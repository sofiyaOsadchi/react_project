import { useState } from "react";
import './About.scss';
import { ClimbingBoxLoader } from "react-spinners";
//rafce
const About = () => {
  //state variables: when the value changes -> the html is re-rendered!
  const [showProgress, setShowProgress] = useState(false);
  return (
    <div className="about-container dark:text-white">

      <h1 className="text-3xl">About Us</h1>
      <p className="text-lg">
        Welcome to our website, a dynamic platform designed to streamline the way you manage and interact with digital business cards. Our site offers a user-friendly interface that simplifies the process of creating, storing, and sharing business cards, ensuring you can effortlessly maintain professional connections. Whether you are a business owner or someone looking to expand your professional network, our site provides the necessary tools to manage your contacts effectively.
</p>

      <h2>How It Works</h2>
      
      <p> Our platform allows users to create digital business cards by entering their details into our intuitive form, which then generates a polished and professional-looking card. These cards can be saved to your profile for easy access and shared with others via email, social media, or a direct link. Additionally, our site supports robust search functionality that allows users to quickly find specific cards based on the card title.</p>
     
      <h2>Interface and Interaction</h2>
      <p>
        Navigating our site is straightforward. Users can access a dashboard where they can manage their cards, edit their details, or delete cards they no longer need. For added convenience, our platform includes features such as the ability to mark cards as favorites for quick access. Importantly, only the user who created a card can update or delete it, ensuring personal management of each entry. Whether accessing the site from a desktop or a mobile device, the experience is seamless and optimized for all users.</p>
      


     {/*  <button className="bg-purple-500 text-white rounded p-5 text-2xl mb-2"
        onClick={() => {
          setShowProgress(!showProgress);
        }}
      >
        Toggle
      </button>
      {showProgress && (
        <ClimbingBoxLoader color="#36d7b7" speedMultiplier={3} />
      )} */}
    </div>
  );
};

export default About;
