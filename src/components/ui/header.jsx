'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { ChevronsUpDown, LayoutPanelLeft, LogOut } from 'lucide-react';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Component() {
  const [user, setUser] = useState(null);
  const isAuthenticated = useIsAuthenticated();
  const authUser = useAuthUser();
  const signOut = useSignOut();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && authUser) {
      setUser(authUser);
    }
  }, [isAuthenticated, authUser]);

  return (
    <div className="container px-4 mx-auto md:px-6 lg:px-8">
      <header className="flex items-center w-full h-20 px-4 shrink-0 md:px-6">
        <Link href="/" className="hiddenmr-6 lg:flex" prefetch={false}>
          <div className="flex items-center gap-4">
            <F1Icon className="w-20 h-20" />
            <Separator orientation="vertical" className="h-4/5" />
            <p>Plataforma de Votación UAH</p>
          </div>
        </Link>
        <div className="flex items-center gap-2 ml-auto">
          <Link
            href="/"
            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
            prefetch={false}
          >
            Inicio
          </Link>
          <Link
            href="/blogs"
            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
            prefetch={false}
          >
            Noticias
          </Link>
          <Link
            href="/polls"
            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
            prefetch={false}
          >
            Votaciones
          </Link>
          <Link
            href="/calendar"
            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
            prefetch={false}
          >
            Calendario
          </Link>
          <Link
            href="/pilotos"
            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
            prefetch={false}
          >
            Pilotos
          </Link>
          {!isAuthenticated ? (
            <>
              <Button
                asChild
                variant="outline"
                className="px-2 py-1 text-xs justify-self-end"
              >
                <Link href="/auth/signin">Iniciar Sesión</Link>
              </Button>
              <Button asChild className="px-2 py-1 text-xs justify-self-end">
                <Link href="/auth/signup">Regístrate</Link>
              </Button>
            </>
          ) : (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 p-2 border rounded-lg">
                  <Avatar className="w-8 h-8 rounded-lg">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback className="rounded-lg">
                      {user?.name[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-sm leading-tight text-left">
                    <span className="font-semibold truncate">{user?.name}</span>
                    <span className="text-xs truncate">{user?.email}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side="bottom"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuItem
                    onClick={() => {
                      router.push('/panel');
                    }}
                  >
                    <LayoutPanelLeft />
                    Panel de Gestión
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      signOut();
                      router.push('/auth/signin');
                    }}
                  >
                    <LogOut />
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </header>
    </div>
  );
}

function F1Icon(props) {
  return (
    <svg
      {...props}
      version="1.2"
      baseProfile="tiny-ps"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1521 380"
      width="1521"
      height="380"
    >
      <title>F1-svg</title>
      <g id="Logos-/-F1-logo-red">
        <g id="Page-1">
          <path
            id="path-1"
            fillRule="evenodd"
            className="shp0"
            d="M912.29 380L1292.29 0L1521 0L1141 380L912.29 380ZM1237.61 332.52L1276.05 332.52L1276.05 339.7L1260.95 339.7L1260.95 380L1252.64 380L1252.64 339.7L1237.61 339.7L1237.61 332.52ZM1281.43 332.52L1293.14 332.52L1306.24 369.69L1306.37 369.69L1319.14 332.52L1330.71 332.52L1330.71 380L1322.8 380L1322.8 343.35L1322.66 343.35L1309.5 380L1302.65 380L1289.48 343.35L1289.35 343.35L1289.35 380L1281.43 380L1281.43 332.52ZM395.59 205.87C354.11 245 263.87 332.67 215.23 380L1 380C1 380 172.66 208.83 268.08 114.92C366.38 21.34 415.38 0 595.68 0L1252.01 0L1109.9 142.1L609.02 142.1C482.32 142.1 453.86 150.88 395.59 205.87ZM954.05 297.97L614.15 297.97C548.52 297.97 532.41 301.21 501.15 332.46L453.61 380L254.34 380C254.34 380 345.56 289.13 401.73 232.97C461.77 172.92 486.31 165.49 626.5 165.49L1086.52 165.49L954.05 297.97Z"
          />
        </g>
      </g>
    </svg>
  );
}
