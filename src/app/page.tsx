"use client";
import { useGetCurrentUser } from "./generated/query/current-user/current-user";

const HomePage = () => {
  const { data } = useGetCurrentUser();
  console.log(data);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        {data && (
          <div className="flex flex-col gap-4">
            <h1>{data.id}</h1>
            <h1>{data.name}</h1>
          </div>
        )}
      </div>
    </main>
  );
};

export default HomePage;
