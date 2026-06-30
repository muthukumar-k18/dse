import { RouterProvider } from "react-router";
import { Suspense } from "react";
import { router } from "./routes";
import { UserProvider } from "../contexts/UserContext";

export default function App() {
  return (
    <UserProvider>
      <Suspense
        fallback={
          <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-white/20 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-white/50">Loading...</p>
            </div>
          </div>
        }
      >
        <RouterProvider router={router} />
      </Suspense>
    </UserProvider>
  );
}
