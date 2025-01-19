import * as Yup from "yup";

export const urlSchema = Yup.object().shape({
  url: Yup.string()
    .url("Please enter a valid URL (e.g., https://example.com)")
    .required("URL is required"),
});

const emailHeaderRegex =
  /^(Return-Path:|Received:|Message-ID:|Date:|From:|To:|Subject:|Content-Type:|MIME-Version:)/im;

export const emailSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email content is required")
    .test(
      "is-valid-email-header",
      "Email content must include valid email headers",
      (value) => {
        if (!value) {
          console.log("Validation failed: No value provided");
          return false;
        }

        const lines = value.split("\n");
        const isValid = lines.some((line) => emailHeaderRegex.test(line));

        if (!isValid) {
          console.log("Validation failed: No valid headers found");
        }

        return isValid;
      }
    ),
});
