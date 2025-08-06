import { WithRole } from "@/lib/Auth/RoleFilter";
import { GETHandler, POSTHandler } from "./handler";

const ROLE = ["admin"];

const POST = WithRole(POSTHandler, ROLE);
const GET = WithRole(GETHandler, ROLE);

export { POST, GET };
