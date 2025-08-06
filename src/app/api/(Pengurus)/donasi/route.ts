import { WithRole } from "@/lib/Auth/RoleFilter";
import { GETHandler, POSTHandler } from "./handler";

const ROLE = ["pengurus"];

const GET = WithRole(GETHandler, ROLE);
const POST = WithRole(POSTHandler, ROLE);

export { GET, POST };
