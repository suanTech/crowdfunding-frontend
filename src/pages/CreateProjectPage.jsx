import { redirect } from "react-router-dom";
import CreateProjectForm from "../components/CreateProjectForm";
import { useUserContext } from "../hooks/use-user-context";

export default function CreateProjectPage() {
  const { user } = useUserContext();
  if (user == null) {
    redirect("/signup");
    return;
  } else {
    return <CreateProjectForm />;
  }
}
