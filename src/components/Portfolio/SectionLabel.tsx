import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { palette, hexToRgba } from "../../theme/palette";

const { gold: GOLD, offWhite: OFFWHITE } = palette;

/** The small numbered eyebrow that heads every section. Renders the section name as an <h2>. */
const SectionLabel: React.FC<{ index: string; title: string }> = ({ index, title }) => (
  <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: { xs: 5, md: 8 } }}>
    <Typography variant="caption" sx={{ color: GOLD }}>
      {index}
    </Typography>
    <Box sx={{ height: "1px", width: 48, background: hexToRgba(GOLD, 0.5) }} />
    <Typography component="h2" variant="caption" sx={{ color: OFFWHITE, opacity: 0.7, m: 0 }}>
      {title}
    </Typography>
  </Stack>
);

export default SectionLabel;
