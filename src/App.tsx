
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Inbox from "./pages/Inbox";
import Chats from "./pages/Chats";
import About from "./pages/About";
import AuthPage from "./pages/Auth";
import { AuthProvider } from "./hooks/useAuth";
import PrivateRoute from "./components/PrivateRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<AuthPage />} />
            
            <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/inbox" element={<PrivateRoute><Inbox /></PrivateRoute>} />
            <Route path="/chats/:id" element={<PrivateRoute><Chats /></PrivateRoute>} />
            <Route path="/chats" element={<PrivateRoute><Inbox /></PrivateRoute>} />

            <Route path="/about" element={<About />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
