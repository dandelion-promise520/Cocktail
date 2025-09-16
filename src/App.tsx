import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { ReactLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

// 禁用gsap中的延迟平滑以防止滚动动画中的任何延迟
gsap.ticker.lagSmoothing(0);

const App = () => {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    function update(time: number) {
      // 添加lenis的请求动画帧（raf）方法来显示gsap的计时器
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    // 这确保了lenis的平滑滚动动画在每个gsap上的更新
    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <>
      <ReactLenis
        root
        options={{
          autoRaf: false,
          lerp: 0.05, // 值越低，越丝滑 0-1
          smoothWheel: true, //鼠标平滑移动
        }}
        ref={lenisRef}
      />
      <main>
        <Navbar />
        <Hero />
        <div className="h-dvh noisy" id="hero"></div>
      </main>
    </>
  );
};

export default App;
