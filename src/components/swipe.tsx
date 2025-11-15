import { Id } from "../../convex/_generated/dataModel";
import { useSwipeProject } from "@/hook/useSwipe";

type ProjectSwipeCardProps = {
  userId: Id<"users">;
  projectId: Id<"projects">;
};

export const ProjectSwipeCard = ({
  userId,
  projectId,
}: ProjectSwipeCardProps) => {
  const { mutate, loading } = useSwipeProject();

  return (
    <div className="p-4 border rounded-xl">
      <button
        disabled={loading}
        onClick={() =>
          mutate(
            { userId, projectId, liked: true },
            {
              onSuccess: () => alert("Liked!"),
            }
          )
        }
        className="bg-green-600 text-white px-4 py-2 rounded-lg"
      >
        Like
      </button>

      <button
        disabled={loading}
        onClick={() => mutate({ userId, projectId, liked: false })}
        className="bg-red-600 text-white px-4 py-2 rounded-lg ml-3"
      >
        Pass
      </button>
    </div>
  );
};
