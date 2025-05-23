import { useEffect, useState } from "react";

const generateRandomShapes = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    top: `${10 + Math.random() * 70}%`,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 2}s`,
    size: `${30 + Math.random() * 30}px`,
    pulse: Math.random() > 0.5,
  }));
};

const AuthImagePattern = ({ title, subtitle }) => {
  const [shapes, setShapes] = useState([]);

  useEffect(() => {
    setShapes(generateRandomShapes(36));

    const interval = setInterval(() => {
      setShapes(generateRandomShapes(36));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative hidden lg:flex items-center justify-center bg-base-200 p-12 overflow-hidden min-h-screen">
      <div className="absolute inset-0">
        {shapes.map((shape) => (
          <div
            key={shape.id}
            className={`rounded-full bg-primary/10 absolute ${
              shape.pulse ? "animate-pulse" : ""
            }`}
            style={{
              top: shape.top,
              left: shape.left,
              width: shape.size,
              height: shape.size,
              animationDelay: shape.delay,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;