import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { ThemeProvider } from "@mui/material";
import muiTheme from "../../theme/muiTheme";
import Portfolio from "./Portfolio";
import { CONTACT, NAV } from "../../content/portfolio";

const renderPortfolio = () =>
  render(
    <ThemeProvider theme={muiTheme}>
      <Portfolio />
    </ThemeProvider>,
  );

describe("<Portfolio />", () => {
  it("renders the hero heading as the single <h1>", () => {
    renderPortfolio();
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent(/Chaitanya/);
  });

  it("exposes every nav section as an in-page anchor link", () => {
    renderPortfolio();
    const nav = screen.getByRole("navigation", { name: /primary/i });
    for (const item of NAV) {
      const links = within(nav).getAllByRole("link", { name: new RegExp(item.label, "i") });
      expect(links.some((el) => el.getAttribute("href") === `#${item.id}`)).toBe(true);
    }
  });

  it("renders section headings as <h2> (one per section label)", () => {
    renderPortfolio();
    const h2s = screen.getAllByRole("heading", { level: 2 }).map((el) => el.textContent);
    expect(h2s).toEqual(
      expect.arrayContaining(["About", "Core Skills", "Banking Partners", "Technical Projects", "Get In Touch"]),
    );
  });

  it("wires the contact form fields and submit control", () => {
    renderPortfolio();
    const form = screen.getByRole("button", { name: /send message/i }).closest("form");
    expect(form).not.toBeNull();
    const scope = within(form as HTMLFormElement);
    expect(scope.getByRole("textbox", { name: /your name/i })).toBeInTheDocument();
    expect(scope.getByRole("textbox", { name: /^email$/i })).toBeInTheDocument();
    expect(scope.getByRole("textbox", { name: /tell me about the project/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send message/i })).toBeEnabled();
  });

  it("links out to GitHub and LinkedIn", () => {
    renderPortfolio();
    const githubLinks = screen.getAllByRole("link", { name: /github/i });
    expect(githubLinks.some((el) => el.getAttribute("href") === CONTACT.github)).toBe(true);
    const linkedinLinks = screen.getAllByRole("link", { name: /linkedin/i });
    expect(linkedinLinks.some((el) => el.getAttribute("href") === CONTACT.linkedin)).toBe(true);
  });

  it("does not render the removed colour-scheme switcher", () => {
    renderPortfolio();
    expect(screen.queryByLabelText(/color theme/i)).not.toBeInTheDocument();
  });
});
