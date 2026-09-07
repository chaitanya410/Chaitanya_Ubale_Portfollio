import React, { useEffect, useState } from "react";
import { AppBar, Box, IconButton, Stack, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import { NAV, NAV_IDS } from "../../../content/portfolio";
import { palette, hexToRgba } from "../../../theme/palette";
import { useScrollSpy } from "../../../hooks/useScrollSpy";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import { scrollToId } from "../../../lib/scroll";

const { gold: GOLD, offWhite: OFFWHITE } = palette;

const Nav: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const reducedMotion = useReducedMotion();
  const activeId = useScrollSpy(NAV_IDS);

  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const track = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(track > 0 ? Math.min(1, Math.max(0, y / track)) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const go = (event: React.MouseEvent, id: string) => {
    event.preventDefault();
    scrollToId(id, reducedMotion);
    if (typeof history !== "undefined") history.replaceState(null, "", `#${id}`);
    setMobileOpen(false);
  };

  const focusRing = {
    "&:focus-visible": {
      outline: `2px solid ${GOLD}`,
      outlineOffset: 4,
      borderRadius: 2,
    },
  } as const;

  return (
    <AppBar
      position="fixed"
      component="nav"
      aria-label="Primary"
      sx={{
        background: scrolled ? "rgba(11,12,16,0.78)" : "transparent",
        backdropFilter: scrolled ? "blur(18px)" : "none",
        borderBottom: scrolled ? `1px solid ${hexToRgba(GOLD, 0.1)}` : "1px solid transparent",
        transition: reducedMotion ? "none" : "all .5s cubic-bezier(.22,1,.36,1)",
      }}
    >
      {/* scroll progress */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          left: 0,
          bottom: 0,
          height: 2,
          width: `${progress * 100}%`,
          background: `linear-gradient(90deg, ${hexToRgba(GOLD, 0.2)}, ${GOLD})`,
          transition: reducedMotion ? "none" : "width .1s linear",
        }}
      />

      <Toolbar sx={{ px: { xs: 3, md: 8 }, py: { xs: 1, md: 1.5 }, minHeight: { xs: 64, md: 80 } }}>
        <Typography
          component="a"
          href="#hero"
          onClick={(e) => go(e, "hero")}
          sx={{
            cursor: "pointer",
            flexGrow: 1,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            fontSize: "1.05rem",
            color: OFFWHITE,
            textDecoration: "none",
            "& span": { color: GOLD },
            ...focusRing,
          }}
        >
          Chaitanya<span>.</span>
        </Typography>

        {!isMobile ? (
          <Stack direction="row" spacing={3} alignItems="center" component="ul" sx={{ listStyle: "none", m: 0, p: 0 }}>
            {NAV.map((n, i) => {
              const active = activeId === n.id;
              return (
                <Box component="li" key={n.id} sx={{ display: "flex" }}>
                  <Typography
                    component="a"
                    href={`#${n.id}`}
                    onClick={(e) => go(e, n.id)}
                    aria-current={active ? "true" : undefined}
                    sx={{
                      cursor: "pointer",
                      fontSize: "0.82rem",
                      letterSpacing: "0.06em",
                      textDecoration: "none",
                      color: active ? GOLD : "rgba(238,238,238,0.7)",
                      transition: reducedMotion ? "none" : "color .3s ease",
                      "&:hover": { color: GOLD },
                      "&:before": {
                        content: `"0${i + 1}"`,
                        color: GOLD,
                        marginRight: "8px",
                        fontSize: "0.65rem",
                        opacity: active ? 1 : 0.7,
                      },
                      ...focusRing,
                    }}
                  >
                    {n.label}
                  </Typography>
                </Box>
              );
            })}
          </Stack>
        ) : (
          <IconButton
            onClick={() => setMobileOpen((v) => !v)}
            sx={{ color: OFFWHITE }}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            <Box
              sx={{
                width: 22,
                height: 14,
                position: "relative",
                "&:before, &:after": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  width: "100%",
                  height: "1px",
                  background: GOLD,
                  transition: reducedMotion ? "none" : "transform .4s cubic-bezier(.22,1,.36,1)",
                },
                "&:before": { top: mobileOpen ? 6 : 0, transform: mobileOpen ? "rotate(45deg)" : "none" },
                "&:after": { bottom: mobileOpen ? 7 : 0, transform: mobileOpen ? "rotate(-45deg)" : "none" },
              }}
            />
          </IconButton>
        )}
      </Toolbar>

      {isMobile && (
        <Box
          id="mobile-nav"
          sx={{
            overflow: "hidden",
            maxHeight: mobileOpen ? 460 : 0,
            transition: reducedMotion ? "none" : "max-height .55s cubic-bezier(.22,1,.36,1)",
            background: "rgba(11,12,16,0.95)",
            backdropFilter: "blur(20px)",
            borderTop: mobileOpen ? `1px solid ${hexToRgba(GOLD, 0.1)}` : "none",
          }}
        >
          <Stack spacing={2.5} sx={{ px: 4, py: 4 }} component="ul" style={{ listStyle: "none", margin: 0 }}>
            {NAV.map((n, i) => {
              const active = activeId === n.id;
              return (
                <Box component="li" key={n.id}>
                  <Typography
                    component="a"
                    href={`#${n.id}`}
                    onClick={(e) => go(e, n.id)}
                    aria-current={active ? "true" : undefined}
                    sx={{
                      cursor: "pointer",
                      display: "block",
                      color: active ? GOLD : OFFWHITE,
                      fontSize: "1rem",
                      letterSpacing: "0.04em",
                      textDecoration: "none",
                      ...focusRing,
                    }}
                  >
                    <Box component="span" sx={{ color: GOLD, mr: 1.5, fontSize: "0.7rem" }}>
                      0{i + 1}
                    </Box>
                    {n.label}
                  </Typography>
                </Box>
              );
            })}
          </Stack>
        </Box>
      )}
    </AppBar>
  );
};

export default Nav;
