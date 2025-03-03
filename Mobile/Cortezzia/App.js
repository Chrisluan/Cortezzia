import { React } from "react";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import StackNavigator from "./routes/StackNavigator";
export default function App() {
  return <GluestackUIProvider mode="light"><StackNavigator /></GluestackUIProvider>;
}
