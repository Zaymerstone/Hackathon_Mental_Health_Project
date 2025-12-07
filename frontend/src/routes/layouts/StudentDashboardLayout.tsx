import { Outlet } from "react-router-dom";

const StudentDashboardLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Outlet />
    </div>
  );
};

export default StudentDashboardLayout;
