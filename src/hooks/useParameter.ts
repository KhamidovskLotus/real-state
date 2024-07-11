import { useLocation } from "react-router-dom";

export default function useParameter() {
  return new URLSearchParams(useLocation().search);
}