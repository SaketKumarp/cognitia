import { UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function Page() {
  const { isAuthenticated } = await auth();
  console.log(isAuthenticated);
  const user = await currentUser();
  console.log(user);

  return (
    <div className="">
      welcome to placement Board
      <UserButton />
    </div>
  );
}
