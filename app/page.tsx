import DesktopMenu from "@/components/feed/DesktopMenu";
import LayoutMiddle from "@/components/feed/LayoutMiddle";
import LeftSidebar from "@/components/feed/LeftSidebar";
import MobileBottomNavigation from "@/components/feed/MobileBottomNavigation";
import MobileMenu from "@/components/feed/MobileMenu";
import RightSidebar from "@/components/feed/RightSidebar";
import SwitchingButton from "@/components/feed/SwitchingButton";

export default function Home() {
  return (
    <div className="_layout _layout_main_wrapper">
      <SwitchingButton />
      <div className="_main_layout">
        <DesktopMenu />
        <MobileMenu />
        <MobileBottomNavigation />
        {/* <!-- Mobile Bottom Navigation End --> */}
        {/* <!-- Main Layout Structure --> */}
        <div className="container _custom_container">
          <div className="_layout_inner_wrap">
            <div className="row">
              {/* <!-- Left Sidebar --> */}
              <LeftSidebar />
              {/* <!-- Left Sidebar --> */}
              {/* <!-- Layout Middle --> */}
              <LayoutMiddle />
              {/* <!-- Layout Middle --> */}
              {/* <!-- Right Sidebar --> */}
              <RightSidebar />
              {/* <!-- Right Sidebar --> */}
            </div>
          </div>
        </div>
        {/* <!-- Main Layout Structure --> */}
      </div>
    </div>
  );
}
