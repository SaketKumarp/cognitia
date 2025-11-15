// "use client";

// import { useState, useCallback } from "react";
// import { useMutation } from "convex/react";
// import { api } from "../../convex/_generated/api";
// import { Id } from "../../convex/_generated/dataModel";

// type SwipeArgs = {
//   userId: Id<"users">;

//   liked: boolean;
// };

// type Options = {
//   onSuccess?: (response: string | Id<"matches">) => void;
//   onError?: (error: unknown) => void;
// };

// export const useSwipeProject = () => {
//   const [loading, setLoading] = useState(false);

//   const mutation = useMutation(api.matches.getMatches);

//   const mutate = useCallback(
//     async (values: SwipeArgs, options?: Options) => {
//       try {
//         setLoading(true);

//         const response = await mutation(values);

//         options?.onSuccess?.(response);
//         return response;
//       } catch (error) {
//         console.error("Swipe failed:", error);
//         options?.onError?.(error);
//         throw error;
//       } finally {
//         setLoading(false);
//       }
//     },
//     [mutation]
//   );

//   return { mutate, loading };
// };
