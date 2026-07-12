import DesktopMenu from "@/components/feed/DesktopMenu";
import FeedClient from "@/components/feed/FeedClient";
import LayoutMiddle from "@/components/feed/LayoutMiddle";
import LeftSidebar from "@/components/feed/LeftSidebar";
import MobileBottomNavigation from "@/components/feed/MobileBottomNavigation";
import MobileMenu from "@/components/feed/MobileMenu";
import RightSidebar from "@/components/feed/RightSidebar";
import SwitchingButton from "@/components/feed/SwitchingButton";

export default function Home() {
  return (
    <FeedClient>
      <div className="_layout _layout_main_wrapper">
        <SwitchingButton />
        <div className="_main_layout">
          <DesktopMenu />
          <MobileMenu />
          <MobileBottomNavigation />
          <div className="container _custom_container">
            <div className="_layout_inner_wrap">
              <div className="row">
                <LeftSidebar />
                <LayoutMiddle />
                <RightSidebar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </FeedClient>
  );
}
