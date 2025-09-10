import { useParams } from "react-router-dom";

export default function DetailGamePage() {
  const { id } = useParams();
  return `Pagina ${id}`;
}
