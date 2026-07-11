import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const MobileMenu: React.FC = () => {
    return (
        <div className="_header_mobile_menu">
            <div className="_header_mobile_menu_wrap">
                <div className="container">
                    <div className="_header_mobile_menu">
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                <div className="_header_mobile_menu_top_inner">
                                    <div className="_header_mobile_menu_logo">
                                        <Link href="feed.html" className="_mobile_logo_link">
                                            <Image height={1000} width={1000} src="/images/logo.svg" alt="Image" className="_nav_logo" />
                                        </Link>
                                    </div>
                                    <div className="_header_mobile_menu_right">
                                        <form className="_header_form_grp">
                                            <Link href="#0" className="_header_mobile_search">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none" viewBox="0 0 17 17">
                                                    <circle cx="7" cy="7" r="6" stroke="#666" />
                                                    <path stroke="#666" stroke-linecap="round" d="M16 16l-3-3" />
                                                </svg>
                                            </Link>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileMenu;