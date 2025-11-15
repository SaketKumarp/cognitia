import { useMutation } from "convex/react";
import { useCallback, useState } from "react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

export type UpdateProfileInput = {
  userId: Id<"users">;
  data: {
    bio?: string;
    skills?: string[];
    interests?: string[];
    github?: string;
    linkedin?: string;
    portfolio?: string;
    photos?: string[];
  };
};

type Options = {
  onSuccess?: () => void;
  onError?: () => void;
};

export const useUpdateProfile = () => {
  const [loading, setLoading] = useState(false);
  const mutation = useMutation(api.user.updateProfile);

  const mutate = useCallback(
    async (values: UpdateProfileInput, options?: Options) => {
      try {
        setLoading(true);

        const response = await mutation(values);

        setLoading(false);
        options?.onSuccess?.();
        return response;
      } catch (error) {
        console.error("Update profile error:", error);
        setLoading(false);
        options?.onError?.();
      }
    },
    [mutation]
  );

  return {
    mutate,
    loading,
  };
};
