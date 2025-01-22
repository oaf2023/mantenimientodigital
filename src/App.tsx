import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Dashboard from "./pages/Index";
import Setup from "./pages/Setup";
import DataSetup from "./pages/DataSetup";
import WorkOrdersPage from "./pages/work-orders";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [companyLogo, setCompanyLogo] = useState<string>("");

  useEffect(() => {
    const companyData = localStorage.getItem('companyData');
    if (companyData) {
      const { logo } = JSON.parse(companyData);
      setCompanyLogo(logo);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider>
            <div className="min-h-screen flex w-full">
              <AppSidebar />
              <main className="flex-1">
                {companyLogo && (
                  <div className="absolute top-4 left-4 z-50">
                    <img 
                      src={companyLogo} 
                      alt="Logo de la empresa" 
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                )}
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/setup" element={<Setup />} />
                  <Route path="/data-setup" element={<DataSetup />} />
                  <Route path="/work-orders" element={<WorkOrdersPage />} />
                </Routes>
              </main>
            </div>
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;