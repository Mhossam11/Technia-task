import { getCookie } from "@/lib/cookies";
import { Button } from "./ui/button";
import { Crown, User, LogOut, ChevronRight } from "lucide-react";

interface IProps {
    children?: React.ReactNode;
    onOpenSidebar?: () => void;
}

const Navbar = ({ children, onOpenSidebar }: IProps) => {
  const user_data=getCookie("technia_user");
  const parsed_user=JSON.parse(user_data!);
  const email=parsed_user.username
    return(
        <div className="flex-1 flex flex-col">
        <header className="border-b bg-card/50 backdrop-blur-sm border-border/50 shadow-sm border-yellow-500">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Mobile: sidebar open button inside navbar */}
                {onOpenSidebar && (
                  <button
                    onClick={onOpenSidebar}
                    className="md:hidden inline-flex h-8 w-10 items-center justify-center rounded-md border border-amber-300/60 bg-gradient-to-br from-amber-500 to-yellow-500 text-white shadow-sm hover:brightness-105 active:scale-95 transition-all"
                    aria-label="Open sidebar"
                  >
                    {/* <span className="i-lucide-menu h-5 w-5" /> */}
                    <ChevronRight className="mx-auto h-5 w-5 text-amber-700 dark:text-amber-300" />

                  </button>
                )}
                <div className="p-2 rounded-lg bg-gradient-to-br from-amber-400/20 to-yellow-500/20 border border-amber-200/30 dark:border-amber-700/30">
                  <Crown className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-700 to-yellow-600 dark:from-amber-400 dark:to-yellow-300 bg-clip-text text-transparent">
                    Technia
                  </h1>
                  <p className="text-sm text-muted-foreground text-yellow-800">Enterprise Management System</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 border border-amber-200/50 dark:border-amber-700/30">
                  <User className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  <div className="text-sm">
                    <span className="text-muted-foreground text-yellow-800">Welcome, </span>
                    <span className="font-medium text-foreground text-yellow-900">{email}</span>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-amber-200 text-amber-700 hover:bg-amber-50 hover:text-amber-800 dark:border-amber-700 dark:text-amber-300 dark:hover:bg-amber-950/50 dark:hover:text-amber-200 transition-all duration-200"
                  onClick={() => {
                    try {
                      const clear = (name: string) => (document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`)
                      clear('technia_user')
                      clear('role')
                      clear('modules')
                    } catch {}
                    window.location.href = '/login'
                  }}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    )
}

export default Navbar;