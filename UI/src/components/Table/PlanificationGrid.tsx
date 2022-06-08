import React, { MouseEvent } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import CollapsableRow from './CollapsableRow';
import { Planification } from '../../constants/interfaces';
import AddIcon from '@mui/icons-material/Add';

interface Props {
    metaData: Array<string>;
    rowData: Array<Planification>;
}

const PlanificationGrid: React.FC<Props> = ( props: Props ) => {

    const { metaData, rowData } = props;

    const handleAddPlanificationButtonClick = ( event: MouseEvent<HTMLButtonElement> ) => {
        const { currentTarget } = event;
        currentTarget.dispatchEvent( new CustomEvent( "set-generic-dialog", { detail: { open: true, type: "AddPlanification" }, bubbles: true, cancelable: true } ) );
    };

    return (
        <TableContainer id="main-table" component={ Paper }>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell><IconButton onClick={ handleAddPlanificationButtonClick }><AddIcon /></IconButton></TableCell>
                        { metaData.map( ( title: string ) => <TableCell align="center" key={ title }>{ title }</TableCell> ) }
                        <TableCell align='right'>Commands</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { rowData.map( ( row: Planification ) => (
                        <CollapsableRow key={ row._id } row={ row } />
                    ) ) }
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default PlanificationGrid;