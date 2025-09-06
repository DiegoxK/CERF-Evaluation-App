import { cn } from "@/lib/utils";

const cefrLevels = {
  A1: {
    color: "text-red-400",
    progress: 16,
    label: "Beginner",
    gradientFromColor: "#f87171",
    gradientToColor: "#fb923c",
  },
  A2: {
    color: "text-orange-400",
    progress: 33,
    label: "Elementary",
    gradientFromColor: "#fb923c",
    gradientToColor: "#facc15",
  },
  B1: {
    color: "text-yellow-400",
    progress: 50,
    label: "Intermediate",
    gradientFromColor: "#facc15",
    gradientToColor: "#a3e635",
  },
  B2: {
    color: "text-lime-400",
    progress: 66,
    label: "Competent",
    gradientFromColor: "#a3e635",
    gradientToColor: "#4ade80",
  },
  C1: {
    color: "text-green-400",
    progress: 83,
    label: "Advanced",
    gradientFromColor: "#4ade80",
    gradientToColor: "#2dd4bf",
  },
  C2: {
    color: "text-teal-400",
    progress: 100,
    label: "Proficient",
    gradientFromColor: "#2dd4bf",
    gradientToColor: "#22d3ee",
  },
};

interface CefrBadgeProps {
  level: keyof typeof cefrLevels;
  className?: string;
}

export const CefrBadge = ({ level, className }: CefrBadgeProps) => {
  const levelData = cefrLevels[level] || cefrLevels.A1;
  const strokeDasharray = 2 * Math.PI * 45;
  const strokeDashoffset =
    strokeDasharray - (strokeDasharray * levelData.progress) / 100;

  return (
    <div
      className={cn(
        "relative flex size-36 items-center justify-center rounded-full",
        className,
      )}
    >
      {/* Background Circle */}
      <svg className="absolute h-full w-full" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          className="stroke-gray-200 dark:stroke-[#2e2e2e]"
          strokeWidth="10"
          fill="transparent"
        />
      </svg>
      {/* Progress Ring */}
      <svg className="absolute h-full w-full -rotate-90" viewBox="0 0 100 100">
        <defs>
          <linearGradient
            id={`gradient-${level}`}
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            {/* --- THE FIX IS HERE --- */}
            <stop
              offset="0%"
              style={{ stopColor: levelData.gradientFromColor }}
            />
            <stop
              offset="100%"
              style={{ stopColor: levelData.gradientToColor }}
            />
            {/* --- END OF FIX --- */}
          </linearGradient>
        </defs>
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke={`url(#gradient-${level})`}
          strokeWidth="10"
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-in-out"
        />
      </svg>
      {/* Inner Content (This part was already correct) */}
      <div className="z-10 flex flex-col items-center">
        <span className={cn("text-5xl font-bold", levelData.color)}>
          {level}
        </span>
        <span className="text-muted-foreground text-xs font-medium">
          {levelData.label}
        </span>
      </div>
    </div>
  );
};
