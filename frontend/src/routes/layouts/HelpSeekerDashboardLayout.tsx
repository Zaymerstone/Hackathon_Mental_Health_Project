import { Outlet } from "react-router-dom";

const HelpSeekerDashboardLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Outlet />
    </div>
  );
};

export default HelpSeekerDashboardLayout;
