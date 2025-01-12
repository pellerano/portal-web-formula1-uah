import { Base } from './base';
import { DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';

const DeleteUser = ({ user }) => {
  return (
    <Base
      title={'Delete User'}
      description={'Test Description'}
      trigger={
        <DialogTrigger asChild>
          <Button variant="destructive" size="icon">
            <Trash />
          </Button>
        </DialogTrigger>
      }
    >
      {user.nombre}
    </Base>
  );
};
export default DeleteUser;
