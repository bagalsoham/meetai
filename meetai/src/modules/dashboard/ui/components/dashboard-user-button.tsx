import { authClient } from "@/lib/auth-client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { ChevronDown, ChevronDownIcon, CreditCardIcon, LogInIcon, LogOutIcon } from "lucide-react";
import { da } from "zod/v4/locales";
import { useRouter } from "next/navigation";

const DashboardUserButton = () => {
    const { data, isPending } = authClient.useSession();
    const router = useRouter();
    const onLogout =async ()=>{
        await authClient.signOut({
            fetchOptions:{
                onSuccess:() =>{
                    router.push("/sign-in");
                }
            }
        })
    }
    if (isPending) {
        return <div>Loading...</div>;
    }


    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="w-full rounded-lg border border-border/10 p-3 flex items-center justify-between bg-gray-100 transition-colors duration-200 overflow-hidden">
                {data?.user?.image ? (
                    <Avatar>
                        <AvatarImage src={data.user.image} alt="User" />
                    </Avatar>
                ) : (
                    <GeneratedAvatar seed={data?.user?.name || "User"} className="h-8 w-8 rounded-full" />
                )}
                <div className="flex-1 text-left ml-3 overflow-hidden gap-0.5">
                    <p className="text-sm font-medium">{data?.user?.name || "User"}</p>
                    <p className="text-xs text-muted-foreground">{data?.user?.email || "No Email"}</p>  
                </div>
                <ChevronDownIcon className="size-4 shrink-1"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72" side="right" align="end">
                <DropdownMenuLabel className="font-semibold">
                    <div className="flex flex-col gap-1">
                        <span className="font-medium truncate">{data?.user.name}</span>
                        <span className="font-medium truncate">{data?.user.email}</span>
                    </div>

                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="cursor-pointer flex items-center justify-between">
                    Billing 
                    <CreditCardIcon/>
                </DropdownMenuItem>
                <DropdownMenuItem
                onClick={onLogout}
                    className="cursor-pointer flex items-center justify-between">
                    Logout 
                    <LogOutIcon/>
                </DropdownMenuItem>
            </DropdownMenuContent>

        </DropdownMenu>
    );
};

export default DashboardUserButton;
