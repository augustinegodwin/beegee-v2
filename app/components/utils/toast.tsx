import React from "react";

const CookieBanner = () => {
  return (
    <div
      className="hidden  z-10 p-4 rounded-2xl"
      data-testid="cookie-banner-root"
      dir="ltr"
  
    >
      <div
        tabIndex={0}
        data-testid="banner-card"
        aria-label="We value your privacy"
        className="!bg-black border-gray-200 rounded-2xl shadow-lg max-w-[360px]"
      >
        <div data-testid="cookie-banner-header" className="p-3 !pb-1">
          <div data-testid="cookie-banner-title" className="hidden">
            We value your privacy
          </div>
          <div
            data-testid="cookie-banner-description"
            className="text-sm leading-body text-(--secondary)"
          >
            We use cookies to collect data and improve our services.{" "}
            <a href="https://expo.dev/privacy/cookies" className="underline">
              Learn more
            </a>
          </div>
        </div>

        <div
          data-testid="cookie-banner-footer"
          className="flex-row-reverse flex !justify-between p-3 "
        >
          <div
            data-testid="cookie-banner-footer-sub-group"
            className="flex flex-1 justify-between"
          >
            <button
              className="order-2 inline-flex h-7 cursor-pointer items-center rounded-full border border-button-secondary bg-button-secondary px-3 text-xs font-medium text-button-secondary transition active:scale-98 hocus:bg-button-secondary-hover"
              data-testid="cookie-banner-reject-button"
            >
              Decline
            </button>
            <button
              className="order-3 inline-flex h-7 cursor-pointer items-center rounded-full border border-button-primary bg-button-primary px-3 text-xs font-medium text-button-primary transition active:scale-98 hocus:bg-button-primary-hover"
              data-testid="cookie-banner-accept-button"
            >
              Refresh
            </button>
          </div>
          <button
            className="order-1 inline-flex h-7 cursor-pointer items-center rounded-full border border-default bg-default px-3 text-xs font-medium text-default transition active:scale-98 hocus:bg-element"
            data-testid="cookie-banner-customize-button"
          >
            Customize
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
