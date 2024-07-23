import { animate, useMotionValue, useTransform, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

//@ts-expect-error error
export function Counter({ from, to, icon, text }) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldAnimate(true);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1, // Adjust threshold as needed
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (shouldAnimate) {
      const controls = animate(count, to, {
        duration: 6,
      });

      return () => controls.stop();
    }
  }, [shouldAnimate, count, to]);

  return (
    <div ref={sectionRef} className="flex justify-center items-center flex-col my-2">
      <div className="h-32 w-32 rounded-full flex justify-center items-center bg-gray-100">
        {icon}
      </div>
      <div className="text-white flex justify-center items-center flex-col my-2 mt-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          variants={{
            visible: { opacity: 1, scale: 1 },
            hidden: { opacity: 0, scale: 0 },
          }}
          className="w5"
        >
          {rounded}
        </motion.div>
        <p className="w5 text-">{text}</p>
      </div>
    </div>
  );
}
