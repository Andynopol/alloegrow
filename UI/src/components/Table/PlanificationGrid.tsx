import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import CollapsableRow from './CollapsableRow';
import { Planification } from '../../constants/interfaces';

interface Props {
    metaData: Array<string>;
    rowData: Array<Planification>;
}

const PlanificationGrid: React.FC<Props> = ( props: Props ) => {

    const { metaData, rowData } = props;

    return (
        <TableContainer component={ Paper }>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        { metaData.map( ( title: string ) => <TableCell align="center" key={ title }>{ title }</TableCell> ) }
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