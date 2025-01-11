'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SignUp from '../components/signup';
import SignIn from '../components/signin';

export default function AuthPage({ params }) {
  return (
    <div className="flex items-center justify-center w-full overflow-hidden">
      <Tabs defaultValue={params.auth} className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Regístrate</TabsTrigger>
          <TabsTrigger value="signin">Iniciar Sesión</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <SignUp />
        </TabsContent>
        <TabsContent value="signin">
          <SignIn />
        </TabsContent>
      </Tabs>
    </div>
  );
}
