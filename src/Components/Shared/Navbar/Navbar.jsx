import Link from "next/link";
import { FaUserGraduate } from "react-icons/fa";
import { FiSettings, FiLogOut } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LogOut from "@/Components/auth/LogOut";
import Themes from "../Themes/Themes";
import NavMenu from "./[id]/NavMenu";

const Navbar = async () => {
	const session = await getServerSession(authOptions)
	return (
		<div className="w-full fixed p-color z-50">
			<NavMenu session={session} />
		</div>
	);
};

export default Navbar;
