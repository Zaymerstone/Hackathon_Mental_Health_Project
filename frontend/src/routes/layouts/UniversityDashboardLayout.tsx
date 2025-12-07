import { Outlet } from "react-router-dom";

const UniversityDashboardLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Outlet />
    </div>
  );
};

export default UniversityDashboardLayout;
