import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { motion } from "framer-motion";

const AboutMe = () => {
  return (
    <div className="about-me-page">
      <Parallax pages={2} className="parallax-container">
        <ParallaxLayer offset={0} speed={0.5} className="background-layer">
          <div className="background"></div>
        </ParallaxLayer>

        <ParallaxLayer offset={0.2} speed={0.3}>
          <motion.div
            className="intro-section"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1>Hi, I am Aswin</h1>
            <p>
              A passionate MERN stack developer with 5 years of experience. I specialize in building
              user-friendly web applications, combining cutting-edge technology with creative design.
            </p>
          </motion.div>
        </ParallaxLayer>

        {/* Skills Section */}
        <ParallaxLayer offset={1} speed={0.5}>
          <motion.div
            className="skills-section"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <h2>What I Do</h2>
            <ul>
              <li>Frontend Development with ReactJS</li>
              <li>Backend Development with Node.js</li>
              <li>Database Management with MongoDB</li>
              <li>Automation and Prompt Engineering</li>
            </ul>
          </motion.div>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
};

export default AboutMe;