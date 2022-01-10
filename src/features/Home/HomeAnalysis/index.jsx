import React, { useState, useEffect, useRef } from "react";
import "./styles.scss";
import { homeAnalysis } from "../../../utils/homeData";
import { Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import LoadImage from "../../../components/LoadImage";
import { AnalysisThumb } from "../../../utils/homeImages";
import gsap from "gsap";

const HomeAnalysis = () => {
  const [isShow, setIsShow] = useState(false);
  let containerRef = useRef(null);
  let numWpOneRef = useRef(null);
  let numWpTwoRef = useRef(null);
  let numWpThreeRef = useRef(null);
  let numWpFourRef = useRef(null);
  let numOneRef = useRef(null);
  let numTwoRef = useRef(null);
  let numThreeRef = useRef(null);
  let numFourRef = useRef(null);
  const numWpRefs = [numWpOneRef, numWpTwoRef, numWpThreeRef, numWpFourRef];
  const numRefs = [numOneRef, numTwoRef, numThreeRef, numFourRef];

  // animation
  useEffect(() => {
    gsap.registerEffect({
      name: "counter",
      extendTimeline: true,
      defaults: {
        duration: 3,
        ease: "power1",
        increment: 1,
      },
      effect: (targets, config) => {
        const tl = gsap.timeline();
        const num = targets[0].innerText.replace(/,/g, "");
        targets[0].innerText = num;

        tl.to(
          targets,
          {
            duration: config.duration,
            innerText: config.end,
            modifiers: {
              innerText(innerText) {
                return gsap.utils
                  .snap(config.increment, innerText)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              },
            },
            ease: config.ease,
            opacity: 1,
          },
          0
        );

        return tl;
      },
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef,
        start: "-20% top",
      },
    });

    tl.from(numWpRefs[0], { opacity: 0, duration: 0.5 })
      .counter(numRefs[0], { end: 3678 }, 0)
      .from(numWpRefs[1], { opacity: 0, duration: 0.5 }, 0)
      .counter(numRefs[1], { end: 478 }, 0)
      .from(numWpRefs[2], { opacity: 0, duration: 0.5 }, 0)
      .counter(numRefs[2], { end: 350 }, 0)
      .from(numWpRefs[3], { opacity: 0, duration: 0.5 }, 0)
      .counter(numRefs[3], { end: 630 }, 0);
  }, []);

  const toggleModal = () => {
    setIsShow(!isShow);
  };

  return (
    <section
      className="home-analysis"
      style={{ backgroundImage: `url(${LoadImage(AnalysisThumb)})` }}
      ref={(el) => (containerRef = el)}
    >
      <div className="home-analysis__wrapper">
        <div className="home-analysis__content">
          <div className="home-analysis__content-text">
            <span className="home-analysis__content-name">Burger</span>
            <span className="home-analysis__content-price">$89</span>
          </div>
          <div onClick={toggleModal} className="home-analysis__btn">
            <div className="triangle"></div>
          </div>
          <span className="gooey"></span>
          <span className="gooey"></span>
          <span className="gooey"></span>
        </div>
        <div
          className={
            isShow
              ? "home-analysis__video-container show"
              : "home-analysis__video-container"
          }
        >
          <span onClick={toggleModal} className="home-analysis__modal"></span>
          <iframe
            title="Map"
            className={
              isShow ? "home-analysis__video show" : "home-analysis__video"
            }
            src={`https://www.youtube.com/embed/5dQC2JUd27g?autoplay=0&mute=${
              isShow ? 0 : 1
            }`}
          ></iframe>
        </div>
      </div>
      <div className="home-analysis__container">
        <Container>
          <Grid container spacing={3}>
            {homeAnalysis.map(({ description }, index) => (
              <Grid key={index} item xs={12} sm={6} md={3}>
                <div ref={(el) => (numWpRefs[index] = el)}>
                  <span
                    ref={(el) => (numRefs[index] = el)}
                    className="home-analysis__qnt"
                  >
                    0
                  </span>
                </div>
                <div className="home-analysis__description">{description}</div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </section>
  );
};

export default HomeAnalysis;
