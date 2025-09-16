import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  console.log(videoRef);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const startValue = isMobile ? "top 50%" : "center 60%";
  const endValue = isMobile ? "120% top" : "bottom top";

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
      .to(".right-leaf", { y: 400 }, 0)
      .to(".left-leaf", { y: -400 }, 0);

    const videoTimeLine = gsap.timeline({
      scrollTrigger: {
        trigger: "video",
        start: startValue,
        end: endValue,
        scrub: true,
        pin: true,
      },
    });

    if (!videoRef.current) return;
    videoRef.current.onloadedmetadata = () => {
      videoTimeLine.to(videoRef.current, {
        currentTime: videoRef.current?.duration, // 动画目标：将 currentTime 从 0 变化到视频总时长
      });
    };
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
          src="/videos/output.mp4"
          muted //静音
          playsInline //在元素内播放
          preload="auto"
          ref={videoRef}
        ></video>
      </div>
    </>
  );
};

export default Hero;
