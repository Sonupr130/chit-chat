import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import chitchat from "../assets/chitchat.png";

const SmoothMarquee = ({
  children,
  speed = 0.5,
  direction = "left",
  pauseOnHover = true,
}) => {
  const marqueeRef = useRef(null);
  const contentRef = useRef(null);
  const [contentWidth, setContentWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef(null);
  const progressRef = useRef(0);

  useEffect(() => {
    if (!contentRef.current) return;

    const updateContentWidth = () => {
      setContentWidth(contentRef.current?.scrollWidth || 0);
    };

    updateContentWidth();
    const resizeObserver = new ResizeObserver(updateContentWidth);
    resizeObserver.observe(contentRef.current);

    return () => {
      resizeObserver.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [children]);

  useEffect(() => {
    if (contentWidth === 0) return;

    const marquee = marqueeRef.current;
    if (!marquee) return;

    const animate = () => {
      if (!isPaused) {
        progressRef.current += direction === "left" ? -speed : speed;

        // When we've scrolled one content width, reset to 0 seamlessly
        if (Math.abs(progressRef.current) >= contentWidth) {
          progressRef.current = 0;
        }

        marquee.style.transform = `translateX(${progressRef.current}px)`;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [contentWidth, speed, direction, isPaused]);

  return (
    <div
      className="relative overflow-hidden w-full"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <div
        ref={marqueeRef}
        className="flex w-max"
        style={{ willChange: "transform" }}
      >
        <div ref={contentRef} className="flex">
          {children}
        </div>
        <div className="flex">{children}</div>
      </div>
    </div>
  );
};

const ReviewCard = ({ avatar, name, rating, review }) => (
  <div className="w-80 p-4 bg-white rounded-lg border border-gray-200 shadow-sm mx-4 flex-shrink-0">
    <div className="flex items-center gap-3 mb-3">
      <img
        src={avatar}
        alt={name}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div>
        <h3 className="font-medium text-gray-900">{name}</h3>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
    <p className="text-sm text-gray-600">{review}</p>
  </div>
);

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Prakash Naik",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=prakash",
      rating: 5,
      review: "ଏହି ଆପ୍ ଟା ବହୁତ ଭଲ! ଫ୍ରେଣ୍ଡସ୍ ସହିତ ଚାଟ୍ କରିବାକୁ ମଜା ଆସେ। 😍",
    },
    {
      id: 2,
      name: "Prakruti Mishra",
      avatar:
        "https://i.pinimg.com/736x/d7/44/24/d74424b79882d573b532073c94dff344.jpg",
      rating: 4,
      review:
        "Ete smooth chaluchi, kintu khaali khaali notifications aaseni. Friends sanga re message karibaku sabar majaa aachi!",
    },
    {
      id: 3,
      name: "Debasis Das",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=debasis",
      rating: 5,
      review:
        "Saala mast! Voice note au photo share karibara option bhala lagila. Dosti re time pass karibaku perfect!",
    },
    {
      id: 4,
      name: "Anjali Mohanty",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=anjali",
      rating: 3,
      review:
        "Bhalo, kintu WhatsApp re jete feature achhi, ete nai. Dark mode bhala, raati use kariba pain comfortable.",
    },
    {
      id: 5,
      name: "Sonu Pradhan",
      avatar:
        "https://instagram.fbbi5-3.fna.fbcdn.net/v/t51.2885-19/472344839_1245163476595534_5766027337548577922_n.jpg?_nc_ht=instagram.fbbi5-3.fna.fbcdn.net&_nc_cat=110&_nc_oc=Q6cZ2QEd1LU3TmXCkzLBSidRlvJ93p6jBy0kAHlIwnFzYUXAbssSKvcyV_-gXEpszrH17Lo&_nc_ohc=sFicAnrlzNQQ7kNvgGm85V-&_nc_gid=amD00vGzcCne6fUis2pbNw&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AYFit6F4Neb_7elnldLn3S-aeHO17a6nzDY1om-et-dhtw&oe=67E8222D&_nc_sid=7a9f4b",
      rating: 5,
      review:
        "Yaar, mast app hai! Group chats aur emojis ka option bohot badhiya hai. Thoda aur sticker options ho toh aur maza aa jaye!",
    },
    {
      id: 6,
      name: "Ishita Reddy",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ishita",
      rating: 4,
      review:
        "Bahut smooth chalta hai, par kabhi-kabhi notifications late aate hain. Overall, accha hai, friends ke saath bakchodi ka best app!",
    },
    {
      id: 7,
      name: "Dinesh Rajgandha",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rohit",
      rating: 5,
      review:
        "Kya baat hai! Voice notes aur GIFs ka feature ekdum zabardast. Ab toh poora family bhi isi pe active hai. 😆",
    },
    {
      id: 8,
      name: "Sapna Mahto",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=karan",
      rating: 5,
      review:
        "Bhai, best app for casual chat! No ads, no spam, bas thoda aur customization dedo profile ka, perfect ho jayega!",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-6xl space-y-4">
        {" "}
        {/* Reduced space-y from 8 to 4 */}
        <div className="flex items-center justify-center gap-3 mb-6">
          {" "}
          {/* Added flex container */}
          <h2 className="text-2xl font-semibold text-center text-gray-900">
            Customer Said about
          </h2>
          <img
            src={chitchat}
            width={140}
            height={100}
            alt="Chat icon"
            className="object-contain"
          />
        </div>
        <SmoothMarquee speed={0.8} pauseOnHover>
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              avatar={review.avatar}
              name={review.name}
              rating={review.rating}
              review={review.review}
            />
          ))}
        </SmoothMarquee>
      </div>
    </div>
  );
};

export default Testimonials;
