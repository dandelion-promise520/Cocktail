import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useRef } from "react";

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  console.log(videoRef);

  useGSAP(() => {
    const heroSplit = new SplitText(".title", { type: "chars,words" });
    const paraSplit = new SplitText(".subtitle", { type: "lines" });

    heroSplit.chars.forEach((char) => {
      char.classList.add("text-gradient");
    });

    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
    });

    gsap.from(paraSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      delay: 1,
      stagger: 0.06,
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
      .to(".right-leaf", { y: 200 }, 0)
      .to(".left-leaf", { y: -200 }, 0);
  }, []);

  return (
    <>
      <section id="hero" className="noisy">
        <h1 className="title">MOJITO</h1>
        <img src="/images/hero-left-leaf.png" className="left-leaf" alt="" />
        <img src="/images/hero-right-leaf.png" className="right-leaf" alt="" />

        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p>Cool. Crisp. Classic</p>
              <p className="subtitle">
                Sip the Spirit
                <br />
                of Summer
              </p>
            </div>
          </div>

          <div className="view-cocktails">
            <p className="subtitle mb-4">
              Fresh mint, zesty lime, and crisp rum dance under the Cuban sun. A
              refreshing escape in every sip—perfect for lazy afternoons and
              vibrant nights.
            </p>
            <a href="#cocktails">View Cocktails</a>
          </div>
        </div>
      </section>

      <div className="video absolute inset-0">
        <video
          src="/videos/input.mp4"
          muted
          playsInline
          preload="auto"
          ref={videoRef}
        ></video>
      </div>
    </>
  );
};

export default Hero;
