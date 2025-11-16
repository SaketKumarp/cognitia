import { cn } from "@/lib/utils";

interface DottedSeparatorProps {
  className?: string;
  height?: string;
  color?: string;
  gapSize?: string;
  direction?: "horizontal" | "vertical";
  dotSize?: string;
}

export const DottedSeparator = ({
  className,
  height = "2px",
  color = "#d4d4d8",
  gapSize = "6px",
  direction = "horizontal",
  dotSize = "3px",
}: DottedSeparatorProps) => {
  const isHorizontal = direction === "horizontal";

  // Calculate the background size values
  const dotPlusGap = `${parseInt(dotSize) + parseInt(gapSize)}px`;

  return (
    <div
      className={cn(
        isHorizontal
          ? "w-full flex items-center"
          : "h-full flex flex-col items-center",
        className
      )}
    >
      <div
        className="flex-grow"
        style={{
          width: isHorizontal ? "100%" : height,
          height: isHorizontal ? height : "100%",
          backgroundImage: `radial-gradient(circle, ${color} ${dotSize}, transparent ${dotSize})`,
          backgroundSize: isHorizontal
            ? `${dotPlusGap} ${height}`
            : `${height} ${dotPlusGap}`,
          backgroundRepeat: "repeat",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
};
