import { WithRole } from "@/lib/Auth/RoleFilter";
import { ChangeActiveHandler, DELETEHandler } from "./handler";

const ROLE = ["admin"];

const DELETE = WithRole(DELETEHandler, ROLE);
const PATCH = WithRole(ChangeActiveHandler, ROLE);

export { DELETE, PATCH };
