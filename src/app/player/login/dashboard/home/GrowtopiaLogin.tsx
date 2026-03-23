"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

const GrowtopiaLogin: React.FC = () => {
  const searchParams = useSearchParams();
  const loginFormRef = useRef<HTMLFormElement>(null);
  const guestFormRef = useRef<HTMLFormElement>(null);

  const [growId, setGrowId] = useState("");
  const [password, setPassword] = useState("");

  const token = useMemo(() => searchParams.get("data") || "", [searchParams]);

  useEffect(() => {
    setGrowId(localStorage.getItem("growId") || "");
  }, []);

  useEffect(() => {
    document.title = "Growtopia Player Support";

    const setFavicon = (href: string) => {
      const setIcon = (rel: string) => {
        let link = document.querySelector(`link[rel='${rel}']`) as HTMLLinkElement | null;
        if (!link) {
          link = document.createElement("link");
          link.rel = rel;
          document.head.appendChild(link);
        }
        link.href = href;
      };
      setIcon("icon");
      setIcon("shortcut icon");
    };

    const loadCSS = (href: string) => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        document.head.appendChild(link);
      }
    };

    setFavicon(
      "https://s3.eu-west-1.amazonaws.com/cdn.growtopiagame.com/website/resources/assets/images/growtopia.ico"
    );

    loadCSS(
      "https://s3.eu-west-1.amazonaws.com/cdn.growtopiagame.com/website/resources/assets/css/faq-main.css"
    );
    loadCSS(
      "https://s3.eu-west-1.amazonaws.com/cdn.growtopiagame.com/website/resources/assets/css/shop-custom.css"
    );
    loadCSS(
      "https://s3.eu-west-1.amazonaws.com/cdn.growtopiagame.com/website/resources/assets/css/ingame-custom.css"
    );

    const prevBodyOverflow = document.body.style.overflow;
    const prevBodyHeight = document.body.style.height;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevHtmlHeight = document.documentElement.style.height;
    const prevBodyBg = document.body.style.backgroundColor;
    const prevHtmlBg = document.documentElement.style.backgroundColor;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.height = "100%";
    document.documentElement.style.height = "100%";
    document.body.style.backgroundColor = "transparent";
    document.documentElement.style.backgroundColor = "transparent";

    const keyHandler = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (
        key === "f12" ||
        e.keyCode === 123 ||
        (e.ctrlKey && e.shiftKey && ["i", "c", "j"].includes(key)) ||
        (e.ctrlKey && key === "u")
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", keyHandler);

    return () => {
      document.removeEventListener("keydown", keyHandler);
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.height = prevBodyHeight;
      document.documentElement.style.height = prevHtmlHeight;
      document.body.style.backgroundColor = prevBodyBg;
      document.documentElement.style.backgroundColor = prevHtmlBg;
    };
  }, []);

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (growId.trim() && password.trim()) {
      localStorage.setItem("growId", growId);
      loginFormRef.current?.submit();
    }
  };

  const handleGuestSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("growId", "");
    guestFormRef.current?.submit();
  };

  return (
    <>
      <button type="button" className="btn btn-primary hidden" style={{ display: "none" }} />

      <div
        className="modal fade product-list-popup in"
        style={{
          display: "block",
          inset: 0,
          position: "fixed",
          overflow: "hidden",
          background: "rgba(0,0,0,0.25)",
        }}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
      >
        <div
          className="modal-dialog modal-dialog-centered"
          role="document"
          style={{
            maxWidth: 420,
            width: "92vw",
            margin: "0 auto",
          }}
        >
          <div className="modal-content">
            <div className="modal-body" style={{ padding: 16 }}>
              <div className="content">
                <section className="common-box" style={{ padding: 0 }}>
                  <div className="container" style={{ width: "100%", padding: 0 }}>
                    <div className="row" style={{ margin: 0 }}>
                      <div className="col-md-12 col-sm-12" style={{ padding: 0 }}>
                        <div className="section-title center-align" style={{ marginBottom: 10 }}>
                          <h2 style={{ margin: 0, fontSize: 22 }}>Welcome To GTPS</h2>
                        </div>

                        <div className="row div-content-center" style={{ margin: 0 }}>
                          <div className="col-md-12 col-sm-12" style={{ padding: 0 }}>
                            <form
                              ref={guestFormRef}
                              method="POST"
                              action="/player/growid/login/validate"
                              acceptCharset="UTF-8"
                              role="form"
                              autoComplete="off"
                              onSubmit={handleGuestSubmit}
                              style={{ marginBottom: 10 }}
                            >
                              <input name="_token" type="hidden" value={token} />
                              <input name="growId" type="hidden" value="" />
                              <input name="password" type="hidden" value="" />
                              <div className="form-group text-center" style={{ margin: 0 }}>
                                <input
                                  className="btn btn-primary grow-button"
                                  type="submit"
                                  value="Dont have any GrowID? Register here!"
                                  style={{
                                    fontSize: 12,
                                    padding: "8px 10px",
                                    width: "100%",
                                    whiteSpace: "normal",
                                    lineHeight: 1.2,
                                  }}
                                />
                              </div>
                            </form>

                            <form
                              ref={loginFormRef}
                              method="POST"
                              action="/player/growid/login/validate"
                              acceptCharset="UTF-8"
                              role="form"
                              autoComplete="off"
                              onSubmit={handleLoginSubmit}
                              style={{ marginBottom: 0 }}
                            >
                              <input name="_token" type="hidden" value={token} />

                              <div className="form-group" style={{ marginBottom: 10 }}>
                                <input
                                  id="login-name"
                                  className="form-control grow-text"
                                  placeholder="Your GTPS Name *"
                                  name="growId"
                                  type="text"
                                  value={growId}
                                  onChange={(e) => setGrowId(e.target.value)}
                                  style={{ height: 42 }}
                                />
                              </div>

                              <div className="form-group" style={{ marginBottom: 12 }}>
                                <input
                                  id="password"
                                  className="form-control grow-text"
                                  placeholder="Your GTPS Password *"
                                  name="password"
                                  type="password"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  style={{ height: 42 }}
                                />
                              </div>

                              <div className="form-group text-center" style={{ marginBottom: 0 }}>
                                <input
                                  className="btn btn-lg btn-primary grow-button"
                                  type="submit"
                                  value="Login"
                                  style={{ padding: "10px 14px", fontSize: 16, width: "100%" }}
                                />
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GrowtopiaLogin;