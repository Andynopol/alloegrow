/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactNode, useCallback } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide, { SlideProps } from '@mui/material/Slide';

const Transition = React.forwardRef( function Transition (
    props: SlideProps & { children?: React.ReactElement<any, any>; },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ ref } { ...props } />;
} );

interface Props {
    open: boolean;
    onClose: () => void;
    onOpen: () => void;
    children: ReactNode | Array<ReactNode>;
}

const AuthDialog: React.FC<Props> = ( props: Props ) => {

    const { open, children, onClose, onOpen } = props;
    const dialog = useCallback( ( node: HTMLElement ) => {
        if ( node !== null ) {
            node.addEventListener( 'close-generic-dialog', onClose );
            node.addEventListener( 'open-generic-dialog', onOpen );
        }
    }, [] );

    return (
        <Dialog
            open={ open }
            TransitionComponent={ Transition }
            keepMounted
            onClose={ onClose }
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogContent ref={ dialog }>
                { children }
            </DialogContent>
        </Dialog>

    );
};

export default AuthDialog;
