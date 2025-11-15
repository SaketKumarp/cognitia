import { useMutation } from "convex/react";
import { useCallback, useState } from "react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

// -----------------------------------------------------
// 1️⃣ Type derived from your Convex users table schema
// -----------------------------------------------------
export type CreateUserInput = {
  authId: string;
  name: string;
  username: string;
  bio?: string;

  age?: number;
  gender?: string;

  skills: string[];
  interests: string[];
  experienceLevel?: string;

  github?: string;
  portfolio?: string;
  linkedin?: string;

  photos: string[];

  city?: string;
  country?: string;

  createdAt: number;
};

// -----------------------------------------------------
// 2️⃣ Options type
// -----------------------------------------------------
type Options = {
  onSuccess?: (id: Id<"users">) => void;
  onError?: () => void;
};

// -----------------------------------------------------
// 3️⃣ Main Hook
// -----------------------------------------------------
export const useCreateUser = () => {
  const [data, setData] = useState<Id<"users"> | null>(null);
  const [loading, setLoading] = useState(false);

  const mutation = useMutation(api.user.createUser);

  const mutate = useCallback(
    async (values: CreateUserInput, options?: Options) => {
      try {
        setLoading(true);

        // ❗ Correct: mutation returns Id<"users">
        const userId: Id<"users"> = await mutation(values);

        // store ID in state
        setData(userId);

        setLoading(false);

        // pass ID to callback
        options?.onSuccess?.(userId);

        return userId;
      } catch (error) {
        console.error("Create user error:", error);
        setLoading(false);
        options?.onError?.();
      }
    },
    [mutation]
  );

  return {
    mutate,
    loading,
    data, // Id<"users"> | null
  };
};
