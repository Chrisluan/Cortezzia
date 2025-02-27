import { extendTheme } from "@chakra-ui/react";

// Custom Blue-Black Color Palette
const colors = {
  black: {
    50: "#dce5f0",  // Lightest Blue-Gray
    100: "#a8b3c5", // Soft Blue-Gray
    200: "#6e7e94", // Muted Blue-Gray
    300: "#49556b", // Darker Blue-Gray
    400: "#2e3a51", // Deep Blue-Black
    500: "#1a2436", // Main Dark Blue-Black
    600: "#141c2a", // Deeper Black with Blue Tint
    700: "#0f1620", // Ultra Dark Blue-Black
    800: "#0a1017", // Near Pitch Black with Blue Hue
    900: "#05080d", // Almost Pure Black (Bluish Tint)
  },
  primary: {
    50: "#dff6ff",  // Light Cyan
    100: "#b0e0ff", // Soft Sky Blue
    200: "#81caff", // Bright Blue
    300: "#52b5ff", // Vivid Blue
    400: "#239eff", // Electric Blue
    500: "#0077e6", // Main Primary Blue
    600: "#005bb3", // Darker Blue
    700: "#004080", // Deep Navy
    800: "#00264d", // Midnight Blue
    900: "#00111f", // Near Black Blue
  },
};

// Custom Fonts
const fonts = {
  heading: "'Poppins', sans-serif",
  body: "'Inter', sans-serif",
};

// Global Styles
const styles = {
  global: {
    body: {
      bg: "black.900",
      color: "white",
    },
    "*::selection": {
      bg: "primary.500",
      color: "black.100",
    },
    a: {
      color: "primary.400",
      _hover: {
        textDecoration: "underline",
        color: "primary.300",
      },
    },
  },
};

// Custom Component Styles
const components = {
  Button: {
    baseStyle: {
      borderRadius: "8px",
      fontWeight: "bold",
    },
    variants: {
      solid: {
        bg: "primary.500",
        color: "white",
        _hover: { bg: "primary.400" },
        _active: { bg: "primary.600" },
      },
      outline: {
        borderColor: "primary.500",
        color: "primary.500",
        _hover: {
          bg: "primary.500",
          color: "white",
        },
      },
    },
  },
  Card: {
    baseStyle: {
      bg: "black.700",
      borderRadius: "12px",
      boxShadow: "lg",
      p: 4,
    },
  },
  Input: {
    baseStyle: {
      field: {
        bg: "black.100",
        
        color: "white",
        _placeholder: { color: "black.300" },
      },
    },
    variants: {
      filled: {
        field: {
          bg: "black.800",
          _hover: { bg: "black.700" },
          _focus: { bg: "black.600" },
        },
      },
    },
  },
};

// Extend the theme
const theme = extendTheme({
  colors,
  fonts,
  styles,
  components,
});

export default theme;
