import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import Dashboard from "@/pages/Dashboard";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Dashboard />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#111820",
            border: "1px solid #1E2A35",
            borderLeft: "3px solid #00B5A3",
            color: "#F0F4F8",
            fontSize: "13px",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
