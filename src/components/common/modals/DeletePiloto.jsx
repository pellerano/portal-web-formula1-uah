import { Base } from './base';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogTrigger } from '@/components/ui/dialog';
import { Loader2, Trash } from 'lucide-react';
import { useState } from 'react';

const DeletePiloto = ({ data, deleteUser }) => {
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    try {
      setLoading(true);
      await deleteUser(user).finally(() => {
        setLoading(false);
        document.querySelector('#dialog-close').click();
      });
    } catch (error) {
      setLoading(false);
      document.querySelector('#dialog-close').click();
      console.error(error);
    }
  };

  return (
    <Base
      title={'Eliminar Piloto'}
      trigger={
        <DialogTrigger asChild>
          <Button variant="destructive" size="icon">
            <Trash />
          </Button>
        </DialogTrigger>
      }
    >
      <p>
        ¿Seguro que desea eliminar a <strong>{data.nombre + " " + data.apellidos}</strong>?
      </p>
      <Button
        disabled={loading}
        className="mt-4"
        variant="destructive"
        onClick={() => onSubmit()}
      >
        {loading && <Loader2 className="animate-spin" />}
        Confirmar
      </Button>
      <DialogClose id="dialog-close" className="hidden"></DialogClose>
    </Base>
  );
};
export default DeletePiloto;
