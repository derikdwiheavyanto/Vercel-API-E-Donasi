import { WithRole } from "@/lib/Auth/RoleFilter";
import { DELETEHandler, PATCHHandler } from "./handler";
import { GETHandler } from "../handler";

const ROLE = ["pengurus"];

const DELETE = WithRole(DELETEHandler, ROLE);
const PATCH = WithRole(PATCHHandler, ROLE);
const GET = WithRole(GETHandler, ROLE);

export { DELETE, PATCH, GET };
