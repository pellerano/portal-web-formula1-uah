import { React, useState, useEffect } from 'react';
import * as Dialog from "@radix-ui/react-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

export default function NewsDialog({ id,buttonTrigerProps,dialogTitle, description,content,open,setOpen }){
	const [openDialog, setOpenDialog] = useState(false);

	useEffect(() => {
		console.log("ENTRE A DIALOG COMPONENTE");
		setOpenDialog(open);
	}, [open]);
	
	const handleClose = () => {
		setOpenDialog(false);
	};
	
	const handleOpen = () => {
		setOpen(true);
		setOpenDialog(true);
	};

	const overlayStyle = {
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		zIndex: 999,
	  };
	  
	const dialogContentStyle = {
		position: 'fixed',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		backgroundColor: 'white',
		padding: '20px',
		borderRadius: '8px',
		zIndex: 1000,
		overflow:'auto',
		height: '80%'
	  };
	return(
		<div id={`${openDialog}`}>
            <Dialog.Root open={openDialog} onOpenChange={setOpenDialog}>
                <Dialog.Trigger 
                    {...buttonTrigerProps} 
                    onClick={handleOpen} 
                    style={{ background: 'black', color: 'white', padding: '1%', borderRadius: '10%' }}
                >
                    {buttonTrigerProps.value}
                </Dialog.Trigger>
                <Dialog.Overlay style={overlayStyle} />
                <Dialog.Content style={dialogContentStyle}>
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                        <Dialog.Close onClick={handleClose}>
                            <Cross1Icon style={{ width: '16px', height: '16px' }} />
                        </Dialog.Close>
                    </div>
                    <Dialog.Title>{dialogTitle}</Dialog.Title>
                    <Dialog.Description>{description}</Dialog.Description>
                    {content}
                </Dialog.Content>
            </Dialog.Root>
        </div>
	)
} 

