import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Alert, Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { CONTACT } from "../../../content/portfolio";
import { palette, hexToRgba } from "../../../theme/palette";

const { gold: GOLD } = palette;

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name"),
  email: z.string().trim().email("Enter a valid email address"),
  message: z.string().trim().min(10, "A sentence or two about the project helps"),
});

type FormValues = z.infer<typeof schema>;

type Status = "idle" | "submitting" | "success" | "error";

const WEB3FORMS_KEY = (import.meta.env.VITE_WEB3FORMS_KEY as string | undefined)?.trim();

const buildMailto = ({ name, email, message }: FormValues) => {
  const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
  const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
  return `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
};

const ContactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema), mode: "onBlur" });

  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  const onSubmit = async (values: FormValues) => {
    setStatus("submitting");
    setFeedback("");

    // No form backend configured — fall back to the user's email client, prefilled.
    if (!WEB3FORMS_KEY) {
      window.location.href = buildMailto(values);
      setStatus("success");
      setFeedback("Opening your email app with the message ready to send.");
      reset();
      return;
    }

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Portfolio enquiry from ${values.name}`,
          from_name: values.name,
          name: values.name,
          email: values.email,
          message: values.message,
        }),
      });
      const data: { success?: boolean; message?: string } = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setStatus("success");
        setFeedback("Thanks — your message is on its way. I'll get back to you shortly.");
        reset();
      } else {
        throw new Error(data.message || "Request failed");
      }
    } catch {
      setStatus("error");
      setFeedback(
        `Something went wrong sending that. Please email me directly at ${CONTACT.email}.`,
      );
    }
  };

  if (status === "success") {
    return (
      <Box
        role="status"
        sx={{
          p: { xs: 3, md: 5 },
          border: `1px solid ${hexToRgba(GOLD, 0.4)}`,
          background: hexToRgba(GOLD, 0.04),
        }}
      >
        <Typography sx={{ fontSize: "1.35rem", fontWeight: 500, color: GOLD }}>Message sent</Typography>
        <Typography variant="body1" sx={{ mt: 1.5 }}>
          {feedback}
        </Typography>
        <Button
          variant="text"
          onClick={() => {
            setStatus("idle");
            setFeedback("");
          }}
          sx={{ mt: 2, px: 0, color: "rgba(238,238,238,0.7)", "&:hover": { color: GOLD, background: "transparent" } }}
        >
          Send another
        </Button>
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={3}>
        {status === "error" && (
          <Alert
            severity="error"
            variant="outlined"
            sx={{ color: "rgba(238,238,238,0.9)", borderColor: hexToRgba("#FF6B6B", 0.5) }}
          >
            {feedback}
          </Alert>
        )}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Your name"
              variant="outlined"
              autoComplete="name"
              error={!!errors.name}
              helperText={errors.name?.message}
              {...register("name")}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              autoComplete="email"
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register("email")}
            />
          </Grid>
        </Grid>
        <TextField
          fullWidth
          label="Tell me about the project"
          variant="outlined"
          multiline
          minRows={4}
          error={!!errors.message}
          helperText={errors.message?.message}
          {...register("message")}
        />
        <Box>
          <Button type="submit" variant="contained" endIcon={<ArrowOutwardIcon />} disabled={status === "submitting"}>
            {status === "submitting" ? "Sending…" : "Send message"}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default ContactForm;
