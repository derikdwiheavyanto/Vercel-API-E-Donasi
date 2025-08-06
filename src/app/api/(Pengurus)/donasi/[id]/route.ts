import { WithRole } from "@/lib/Auth/RoleFilter";
import { DELETEHandler, PATCHHandler } from "./handler";

const ROLE = ["pengurus"];

const DELETE = WithRole(DELETEHandler, ROLE);
const PATCH = WithRole(PATCHHandler, ROLE);

export { DELETE, PATCH };
