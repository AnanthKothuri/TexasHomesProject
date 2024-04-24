import gabe_img from "../assets/about-page/members/gabriel-image.png";
import ananth_img from "../assets/about-page/members/ananth-image.png";
import jeronimo_img from "../assets/about-page/members/jeronimo-image.png";
import shahmir_img from "../assets/about-page/members/shahmir-image.png";

import amplify_img from "../assets/about-page/tools-used/aws-amplify.png";
import bootstrap_img from "../assets/about-page/tools-used/bootstrap.png";
import docker_img from "../assets/about-page/tools-used/docker.png";
import gitlab_img from "../assets/about-page/tools-used/gitlab.png";
import postman_img from "../assets/about-page/tools-used/postman.png";
import python_img from "../assets/about-page/tools-used/python.png";
import react_img from "../assets/about-page/tools-used/react.png";
import ec2_img from "../assets/about-page/tools-used/aws-ec2.png";
import supabase_img from "../assets/about-page/tools-used/supabase.png";
import selenium_img from "../assets/about-page/tools-used/selenium.png";

export const tools_used = [
  {
    src: amplify_img,
    name: "AWS Amplify",
  },
  {
    src: ec2_img,
    name: "Amazon EC2",
  },
  {
    src: supabase_img,
    name: "Supabase",
  },
  {
    src: gitlab_img,
    name: "GitLab",
  },
  {
    src: python_img,
    name: "Python",
  },
  {
    src: docker_img,
    name: "Docker",
  },
  {
    src: react_img,
    name: "React",
  },
  {
    src: bootstrap_img,
    name: "Bootstrap",
  },
  {
    src: selenium_img,
    name: "Selenium",
  },
  {
    src: postman_img,
    name: "Postman",
  },
];

const FRONTEND_COLOR = "#c4162a";
const BACKEND_COLOR = "#2e80bf";

// ordering effects order displayed on website
export const contributors = [
  {
    img_src: jeronimo_img,
    name: "Jeronimo Del Valle Ocejo",
    emails: ["jerovo263@gmail.com", "jerodvo@utexas.edu"],
    gitlab_username: "jerodvo",
    description:
      "I'm a junior studying Computer Science at UT Austin. I like gaming, listening to music, and skiing in my free time.",
    role: "backend",
    role_color: BACKEND_COLOR,
    num_tests: 0,
  },
  {
    img_src: gabe_img,
    name: "Gabriel Casanova",
    emails: ["gabecasanova7@gmail.com"],
    gitlab_username: "gabecasanova",
    description:
      "I'm a senior CS major at UT Austin. In my spare time, I enjoy reading, working out with friends, and listening to music!",
    role: "frontend",
    role_color: FRONTEND_COLOR,
    num_tests: 0,
  },
  {
    img_src: shahmir_img,
    name: "Shahmir Masood",
    emails: ["shahmirnation@gmail.com"],
    gitlab_username: "shahmir-m",
    description:
      "I'm a senior majoring in CS, I'm a big football fan, avid rock climber, enjoyer of sports/video games, and a sci-fi nerd :)",
    role: "backend",
    role_color: BACKEND_COLOR,
    num_tests: 0,
  },
  {
    img_src: ananth_img,
    name: "Ananth Kothuri",
    emails: ["ananth.s.kothuri@gmail.com", "ananth.kothuri@utexas.edu"],
    gitlab_username: "ananth.kothuri",
    description:
      "I’m a sophomore CS and Math major at UT Austin. I love to read, play with my dog, and travel to new countries and places.",
    role: "frontend",
    role_color: FRONTEND_COLOR,
    num_tests: 0,
  },
];
